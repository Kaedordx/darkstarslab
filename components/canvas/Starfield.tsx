"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateStarPositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 8 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi) - 10;
  }
  return pos;
}

export default function Starfield({ count = 4000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Lazy initializer: runs once on mount, not on every render — the
  // React-sanctioned place for one-time non-deterministic setup.
  const [positions] = useState(() => generateStarPositions(count));

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#f4f2ec"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
