import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Subtle3DCanvas({ className = "w-full h-full" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const outerGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const outerWire = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.55
    });
    const outerMesh = new THREE.LineSegments(outerWire, outerMat);
    mainGroup.add(outerMesh);

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', outerGeo.getAttribute('position'));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.08,
      transparent: true,
      opacity: 0.9
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    mainGroup.add(nodePoints);

    const innerGeo = new THREE.OctahedronGeometry(1.05, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35
    });
    const innerMesh = new THREE.LineSegments(innerWire, innerMat);
    mainGroup.add(innerMesh);

    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.012, 8, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.75, 0.01, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    mainGroup.add(ring2);

    const satGeo1 = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const satMat1 = new THREE.LineSegments(
      new THREE.WireframeGeometry(satGeo1),
      new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.75 })
    );
    mainGroup.add(satMat1);

    const satGeo2 = new THREE.OctahedronGeometry(0.3, 0);
    const satMat2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(satGeo2),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 })
    );
    mainGroup.add(satMat2);

    const satGeo3 = new THREE.TetrahedronGeometry(0.28, 0);
    const satMat3 = new THREE.LineSegments(
      new THREE.WireframeGeometry(satGeo3),
      new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.7 })
    );
    mainGroup.add(satMat3);

    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particles);

    const maxLineSegments = 50;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2
    });
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(constellationLines);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;

      if (!prefersReducedMotion) {
        outerMesh.rotation.y += 0.003;
        outerMesh.rotation.x += 0.0015;
        nodePoints.rotation.y += 0.003;
        nodePoints.rotation.x += 0.0015;

        innerMesh.rotation.y -= 0.004;
        innerMesh.rotation.z += 0.002;

        ring1.rotation.z += 0.003;
        ring1.rotation.y += 0.002;
        ring2.rotation.z -= 0.0025;
        ring2.rotation.x += 0.0015;

        const t1 = elapsedTime * 0.55;
        satMat1.position.x = Math.cos(t1) * 3.1;
        satMat1.position.y = Math.sin(t1 * 1.2) * 1.3;
        satMat1.position.z = Math.sin(t1) * 3.1;
        satMat1.rotation.x += 0.02;
        satMat1.rotation.y += 0.025;

        const t2 = elapsedTime * 0.42 + 2.1;
        satMat2.position.x = Math.sin(t2) * 2.7;
        satMat2.position.y = Math.cos(t2 * 0.9) * 2.1;
        satMat2.position.z = Math.cos(t2) * 2.7;
        satMat2.rotation.y += 0.03;
        satMat2.rotation.z += 0.015;

        const t3 = elapsedTime * 0.65 + 4.2;
        satMat3.position.x = Math.cos(t3 * 0.8) * 3.4;
        satMat3.position.y = Math.sin(t3 * 0.7) * 2.4;
        satMat3.position.z = Math.sin(t3 * 0.8) * 3.4;
        satMat3.rotation.x -= 0.025;
        satMat3.rotation.z += 0.02;

        const posAttr = particlesGeo.attributes.position;
        const positions = posAttr.array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVelocities[i].x;
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3 + 2] += particleVelocities[i].z;

          if (Math.abs(positions[i * 3]) > 4.5) particleVelocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 3.8) particleVelocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 4.5) particleVelocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        let lineIdx = 0;
        const linePosArray = lineGeo.attributes.position.array;

        for (let i = 0; i < particleCount && lineIdx < maxLineSegments; i++) {
          for (let j = i + 1; j < particleCount && lineIdx < maxLineSegments; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 2.2) {
              linePosArray[lineIdx * 6] = positions[i * 3];
              linePosArray[lineIdx * 6 + 1] = positions[i * 3 + 1];
              linePosArray[lineIdx * 6 + 2] = positions[i * 3 + 2];

              linePosArray[lineIdx * 6 + 3] = positions[j * 3];
              linePosArray[lineIdx * 6 + 4] = positions[j * 3 + 1];
              linePosArray[lineIdx * 6 + 5] = positions[j * 3 + 2];

              lineIdx++;
            }
          }
        }
        lineGeo.setDrawRange(0, lineIdx * 2);
        lineGeo.attributes.position.needsUpdate = true;
      }

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX * 0.25;
      mainGroup.rotation.x = -mouseY * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      outerGeo.dispose();
      outerWire.dispose();
      outerMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      innerGeo.dispose();
      innerWire.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo1.dispose();
      satMat1.geometry.dispose();
      satMat1.material.dispose();
      satGeo2.dispose();
      satMat2.geometry.dispose();
      satMat2.material.dispose();
      satGeo3.dispose();
      satMat3.geometry.dispose();
      satMat3.material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
