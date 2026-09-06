"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { accentColor } from "@/lib/content";

function GlassShape({
  position,
  speed,
  children,
}: {
  position: [number, number, number];
  speed: number;
  children: React.ReactNode;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        {children}
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.08}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.03}
          distortion={0.15}
          color={accentColor}
          backside
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes({
  reducedDetail = false,
}: {
  reducedDetail?: boolean;
}) {
  const segments = reducedDetail ? 0 : 1;

  return (
    <>
      <GlassShape position={[-2.6, 0.9, -1]} speed={1}>
        <icosahedronGeometry args={[0.85, segments]} />
      </GlassShape>
      <GlassShape position={[2.4, -0.6, -1.5]} speed={1.4}>
        <torusGeometry args={[0.6, 0.22, 24, 80]} />
      </GlassShape>
      {!reducedDetail && (
        <GlassShape position={[0.3, -1.7, -2.5]} speed={0.8}>
          <octahedronGeometry args={[0.55, 0]} />
        </GlassShape>
      )}
    </>
  );
}
