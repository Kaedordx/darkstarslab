"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function PlaceholderScreen({
  variant,
}: {
  variant: "browser" | "laptop" | "phone";
}) {
  return (
    // REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(155deg, #262b3c 0%, #14161f 60%, #2a2f42 100%)",
        borderRadius: variant === "phone" ? 22 : 10,
        padding: variant === "phone" ? "18px 10px" : "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: variant === "phone" ? 8 : 14,
          width: "45%",
          borderRadius: 6,
          background: "rgba(212,168,87,0.85)",
        }}
      />
      {Array.from({ length: variant === "phone" ? 5 : 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: variant === "phone" ? 26 : 34,
            width: i % 2 === 0 ? "100%" : "70%",
            borderRadius: 8,
            background: "rgba(244,242,236,0.16)",
          }}
        />
      ))}
    </div>
  );
}

function DeviceFrame({
  position,
  rotation = [0, 0, 0],
  size,
  parallax,
  progressRef,
  variant,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  parallax: number;
  progressRef: RefObject<number>;
  variant: "browser" | "laptop" | "phone";
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = progressRef.current ?? 0;
    groupRef.current.position.x = position[0] + p * parallax;
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.05;
    groupRef.current.rotation.y = rotation[1] + p * 0.2;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#22252f"
          metalness={0.75}
          roughness={0.2}
          emissive="#d4a857"
          emissiveIntensity={0.04}
        />
      </RoundedBox>
      <Html
        transform
        occlude
        position={[0, 0, size[2] / 2 + 0.001]}
        distanceFactor={1.9}
        style={{
          width: `${size[0] * 260}px`,
          height: `${size[1] * 260}px`,
          pointerEvents: "none",
        }}
      >
        <PlaceholderScreen variant={variant} />
      </Html>
    </group>
  );
}

export default function DeviceShowcaseScene({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#d4a857" />
      <directionalLight position={[-3, 2, 4]} intensity={1} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={30} color="#3a4a8f" />

      <DeviceFrame
        variant="laptop"
        position={[-1.6, -0.3, -1.4]}
        rotation={[0, 0.35, 0]}
        size={[2.4, 1.5, 0.06]}
        parallax={-1.6}
        progressRef={progressRef}
      />
      <DeviceFrame
        variant="browser"
        position={[0.4, 0.4, 0]}
        rotation={[0, -0.15, 0]}
        size={[2.9, 1.8, 0.06]}
        parallax={-3.2}
        progressRef={progressRef}
      />
      <DeviceFrame
        variant="phone"
        position={[2.1, -0.6, 0.9]}
        rotation={[0, -0.3, 0]}
        size={[0.9, 1.9, 0.08]}
        parallax={-4.6}
        progressRef={progressRef}
      />

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={2}
        color="#000000"
      />
    </>
  );
}
