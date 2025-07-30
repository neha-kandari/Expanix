import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

const detectDeviceCapabilities = () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const memory = (navigator as any).deviceMemory || 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  return { isMobile, memory, hardwareConcurrency };
};

export default function ThreeJSHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState<any>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

  useEffect(() => {
    const capabilities = detectDeviceCapabilities();
    setDeviceCapabilities(capabilities);
    requestIdleCallback(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !deviceCapabilities) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      5000
    );
    cameraRef.current = camera;

    const { isMobile, memory, hardwareConcurrency } = deviceCapabilities;
    const isLowEndDevice = isMobile || memory <= 2 || hardwareConcurrency <= 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEndDevice,
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowEndDevice ? 1 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.userSelect = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;
    controlsRef.current = controls;

    renderer.setAnimationLoop(() => {
      if (isSceneLoaded) {
        controls.update();
        renderer.render(scene, camera);
      }
    });

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    loadSplineScene(scene, camera, controls, renderer);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (splineAppRef.current) splineAppRef.current.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [deviceCapabilities]);

  const loadSplineScene = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    renderer: THREE.WebGLRenderer
  ) => {
    const app = new Application(renderer.domElement);
    try {
      await app.load('https://prod.spline.design/2VoTq6B1iob8D37P/scene.splinecode');
      splineAppRef.current = app;
      setIsSceneLoaded(true);

      requestIdleCallback(() => {
        scene.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(scene);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ = Math.max(cameraZ, 500);

        camera.position.set(center.x, center.y, cameraZ);
        camera.lookAt(center);
        controls.target.copy(center);
        controls.update();
        scene.position.set(0, 0, 0);
        renderer.render(scene, camera);
      });
    } catch (error) {
      console.error('ThreeJSHero: Failed to load Spline scene:', error);
    }
  };

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
} 