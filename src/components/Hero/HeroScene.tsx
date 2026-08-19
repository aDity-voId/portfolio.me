import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei';
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
      meshRef.current.rotation.y += delta * 0.2;
      
      // Mouse interaction (dampened)
      const targetRotationX = mousePosition.y * 0.3;
      const targetRotationY = mousePosition.x * 0.3;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.1}
          distort={isMobile ? 0.3 : 0.4}
          speed={1.5}
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
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#4fc3f7" intensity={0.8} />
          <pointLight position={[0, -10, 10]} color="#ff6b6b" intensity={0.8} />
          
          <AnimatedSphere mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
