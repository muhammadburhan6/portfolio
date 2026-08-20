"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const world = new THREE.Group();
    scene.add(world);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 3),
      new THREE.MeshPhysicalMaterial({
        color: 0x63e6be,
        metalness: 0.62,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        transmission: 0.08,
      }),
    );
    world.add(core);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.22, 2)),
      new THREE.LineBasicMaterial({ color: 0xb7ffea, transparent: true, opacity: 0.3 }),
    );
    world.add(wire);

    const rings: THREE.Mesh[] = [];
    [
      [1.7, 0.25, 0.8],
      [1.92, 1.1, 0.15],
      [2.12, 0.75, 1.5],
    ].forEach(([radius, x, y], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.014 : 0.009, 8, 180),
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0x63e6be : 0x5b7c78, transparent: true, opacity: index === 1 ? 0.7 : 0.42 }),
      );
      ring.rotation.set(x, y, index * 0.7);
      rings.push(ring);
      world.add(ring);
    });

    const particlePositions = new Float32Array(150 * 3);
    for (let index = 0; index < 150; index += 1) {
      const radius = 2.25 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x8ff5d8, size: 0.025, transparent: true, opacity: 0.55 }),
    );
    world.add(particles);

    scene.add(new THREE.AmbientLight(0xbde9dd, 1.2));
    const keyLight = new THREE.PointLight(0x8fffe0, 35, 18);
    keyLight.position.set(3.5, 2.8, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x705cff, 24, 15);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35;
    };
    canvas.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const time = clock.getElapsedTime();
      world.rotation.y += (pointer.x - world.rotation.y) * 0.035;
      world.rotation.x += (-pointer.y - world.rotation.x) * 0.035;
      if (!reducedMotion) {
        core.rotation.y = time * 0.22;
        core.rotation.x = time * 0.11;
        wire.rotation.y = -time * 0.16;
        rings[0].rotation.z += 0.0018;
        rings[1].rotation.y += 0.0012;
        rings[2].rotation.x -= 0.001;
        particles.rotation.y = time * 0.025;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="scene-shell">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="scene-label scene-label-top"><span /> Interactive 3D</div>
      <div className="scene-label scene-label-left">REACT.JS</div>
      <div className="scene-label scene-label-right">FULL-STACK</div>
      <div className="scene-coordinate">31.5204° N · 74.3587° E</div>
    </div>
  );
}
