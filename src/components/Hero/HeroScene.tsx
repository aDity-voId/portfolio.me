import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface SphereProps {
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

const AnimatedSphere: React.FC<SphereProps> = ({ mousePosition, isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Continuous slow rotation
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.z += delta * 0.1;

      // Smooth mouse interaction
      const targetRotationX = mousePosition.y * 0.4;
      const targetRotationY = mousePosition.x * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.06);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.06);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <MeshDistortMaterial
          color="#0e172e"
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          metalness={0.92}
          roughness={0.08}
          distort={isMobile ? 0.3 : 0.42}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
};

interface HeroSceneProps {
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

const HeroScene: React.FC<HeroSceneProps> = ({ mousePosition, isMobile }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />

          {/* Neon Point Lights */}
          <pointLight position={[10, 10, 8]} color="#00f0ff" intensity={3} distance={20} />
          <pointLight position={[-10, -8, -6]} color="#a855f7" intensity={3} distance={20} />
          <pointLight position={[0, -10, 10]} color="#f43f5e" intensity={2} distance={20} />
          <pointLight position={[0, 10, -5]} color="#00ff9d" intensity={1.5} distance={15} />

          {/* Floating Neon Sparkles */}
          <Sparkles
            count={isMobile ? 30 : 70}
            scale={6}
            size={isMobile ? 2 : 3}
            speed={0.4}
            color="#00f0ff"
            opacity={0.6}
          />
          <Sparkles
            count={isMobile ? 20 : 40}
            scale={7}
            size={isMobile ? 1.5 : 2.5}
            speed={0.3}
            color="#a855f7"
            opacity={0.5}
          />

          <AnimatedSphere mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
