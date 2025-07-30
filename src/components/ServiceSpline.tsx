import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

export default function ServiceSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const userAgent = navigator.userAgent || navigator.vendor;
    const mobile = /android|iphone|ipad|mobile/i.test(userAgent);
    setIsMobile(mobile);

    const isLowEndDevice = () =>
      (navigator.hardwareConcurrency || 4) <= 4 ||
      ((navigator as any).deviceMemory || 4) <= 2;

    const pixelRatio = isLowEndDevice() || mobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
    const antialias = !isLowEndDevice();

    // Set up scene and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    sceneRef.current = scene;

    const scaleFactor = mobile ? 1 : 0.7;
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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;
    controlsRef.current = controls;

    // Animation Loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize Observer
    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        if (!camera || !renderer) return;
        const currentScale = mobile ? 1 : 0.7;
        const newW = container.clientWidth * currentScale;
        const newH = container.clientHeight * currentScale;

        camera.left = newW / -2;
        camera.right = newW / 2;
        camera.top = newH / 2;
        camera.bottom = newH / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
      resizeObserver.observe(container);
    }

    // ✅ Defer Spline Load (to prevent initial lag)
    const deferredSplineLoad = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadSplineScene(renderer));
      } else {
        setTimeout(() => loadSplineScene(renderer), 300);
      }
    };
    deferredSplineLoad();

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

  // Load Spline Scene
  const loadSplineScene = async (renderer: THREE.WebGLRenderer) => {
    try {
      const app = new Application(renderer.domElement);
      await app.load('https://prod.spline.design/0HhtDF4IAOrdc6FJ/scene.splinecode');
      splineAppRef.current = app;
      setIsSceneLoaded(true);
      console.log('✅ Spline animation loaded.');
    } catch (err) {
      console.error('❌ Failed to load Spline:', err);
    }
  };

  return (
    <>
      {!isSceneLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99,
            fontSize: '1rem',
            fontFamily: 'sans-serif',
          }}
        >
          Loading animation...
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
        }}
      />
    </>
  );
} 
