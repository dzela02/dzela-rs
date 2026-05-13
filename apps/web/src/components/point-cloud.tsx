import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function resolveAccentColor(): string {
  const el = document.createElement('div');
  el.style.cssText = 'display:none;color:var(--accent-green)';
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);
  return rgb;
}

export function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 60);
    camera.position.z = 6;

    const N = 600;
    const positions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color(resolveAccentColor()),
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const cloud = new THREE.Points(geo, mat);
    scene.add(cloud);
    renderer.render(scene, camera);

    // Update point color when theme class changes
    const observer = new MutationObserver(() => {
      mat.color.set(resolveAccentColor());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    if (reducedMotion) {
      return () => {
        observer.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    }

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cloud.rotation.y += 0.0008;
      cloud.rotation.x += 0.00015;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="point-cloud-canvas"
    />
  );
}
