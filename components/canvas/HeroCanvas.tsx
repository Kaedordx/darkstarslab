"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Starfield from "./Starfield";
import FloatingShapes from "./FloatingShapes";
import { accentColor } from "@/lib/content";

function ParallaxGroup({
  enableParallax,
  reducedDetail,
}: {
  enableParallax: boolean;
  reducedDetail: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (enableParallax) {
      const targetX = state.pointer.y * 0.15;
      const targetY = state.pointer.x * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.04
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingShapes reducedDetail={reducedDetail} />
    </group>
  );
}

export default function HeroCanvas({
  enableParallax,
  particleCount,
  reducedDetail,
}: {
  enableParallax: boolean;
  particleCount: number;
  reducedDetail: boolean;
}) {
  return (
    <Canvas
      dpr={[1, reducedDetail ? 1.5 : 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#05060d"]} />
      <fog attach="fog" args={["#05060d", 8, 22]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color={accentColor} />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#3a4a8f" />
      <Starfield count={particleCount} />
      <ParallaxGroup
        enableParallax={enableParallax}
        reducedDetail={reducedDetail}
      />
    </Canvas>
  );
}
