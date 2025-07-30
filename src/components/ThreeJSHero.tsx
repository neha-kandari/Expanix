import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

// Detect basic device performance
const detectDeviceCapabilities = () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  return { isMobile, memory, cores };
};

export default function ThreeJSHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const splineAppRef = useRef<Application | null>(null);

  const [sceneReady, setSceneReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    setDeviceInfo(detectDeviceCapabilities());
  }, []);

  useEffect(() => {
    if (!containerRef.current || !deviceInfo) return;

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

    const { isMobile, memory, cores } = deviceInfo;
    const lowEndDevice = isMobile || memory <= 2 || cores <= 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: !lowEndDevice,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(lowEndDevice ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controlsRef.current = controls;

    // Rotation area limited to bottom 40% of screen on mobile
    if (isMobile) {
      renderer.domElement.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        const touchY = touch.clientY - rect.top;
        const areaHeight = rect.height;
        const lowerAreaThreshold = areaHeight * 0.6;
        if (touchY < lowerAreaThreshold) {
          controls.enableRotate = false;
        } else {
          controls.enableRotate = true;
        }
      });
    }

    const animate = () => {
      if (sceneReady) {
        controls.update();
        renderer.render(scene, camera);
      }
      requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resize);

    const deferredLoad = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadSpline(scene, camera, controls, renderer));
      } else {
        setTimeout(() => loadSpline(scene, camera, controls, renderer), 200);
      }
    };
    deferredLoad();

    return () => {
      window.removeEventListener('resize', resize);
      if (splineAppRef.current) splineAppRef.current.dispose();
      if (renderer) renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [deviceInfo]);

  const loadSpline = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    renderer: THREE.WebGLRenderer
  ) => {
    const app = new Application(renderer.domElement);
    try {
      await app.load('https://prod.spline.design/2VoTq6B1iob8D37P/scene.splinecode');
      splineAppRef.current = app;
      setSceneReady(true);
      setLoading(false);

      setTimeout(() => {
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
      }, 100);
    } catch (err) {
      console.error('Failed to load Spline scene:', err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#0f0f0f',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontFamily: 'Arial, sans-serif',
            zIndex: 10,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          Preparing experience...
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          touchAction: 'auto', // allow scroll
          pointerEvents: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      />
    </>
  );
} 
