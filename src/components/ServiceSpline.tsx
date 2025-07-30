import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

export default function ServiceSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const splineAppRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const isLowEndDevice = () => {
      return (
        navigator.hardwareConcurrency <= 4 ||
        (navigator as any).deviceMemory <= 2
      );
    };

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const pixelRatio = isLowEndDevice() || isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const antialias = !isLowEndDevice();

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    sceneRef.current = scene;

    // Camera - Reduced size for better performance on desktop
    const scaleFactor = isMobile ? 1 : 0.7; // Reduce size by 30% on desktop
    const width = container.clientWidth * scaleFactor;
    const height = container.clientHeight * scaleFactor;
    
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      -100000,
      100000
    );
    camera.position.set(980.99, 179.96, 196.84);
    camera.quaternion.setFromEuler(new THREE.Euler(-0.64, 1.33, 0.63));
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearAlpha(0);
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.userSelect = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true; // Enable rotation for mouse interaction
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;
    controlsRef.current = controls;

    // 🚀 Load Spline Animation Immediately
    const app = new Application(renderer.domElement);
    app
      .load('https://prod.spline.design/0HhtDF4IAOrdc6FJ/scene.splinecode')
      .then(() => {
        splineAppRef.current = app;
        console.log('Spline scene loaded');
      })
      .catch((error) => {
        console.error('Spline loading failed:', error);
      });

    // Animate
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Resize
    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        if (!camera || !renderer) return;
        const currentScaleFactor = isMobile ? 1 : 0.7; // Same scale factor
        const newWidth = container.clientWidth * currentScaleFactor;
        const newHeight = container.clientHeight * currentScaleFactor;
        
        camera.left = newWidth / -2;
        camera.right = newWidth / 2;
        camera.top = newHeight / 2;
        camera.bottom = newHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
      resizeObserver.observe(container);
    }

    // Cleanup
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (splineAppRef.current) splineAppRef.current.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'transparent',
      }}
    />
  );
} 