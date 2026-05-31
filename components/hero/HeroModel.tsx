"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Float, useGLTF, Bounds, Center } from "@react-three/drei";

interface HeroModelProps {
  mousePosition: { x: number; y: number };
}

export default function HeroModel({ mousePosition }: HeroModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLTF model from the public directory
  const { scene } = useGLTF("/models/scene.gltf");

  useFrame((state, delta) => {
    // Interactive tilt based on mouse position
    if (groupRef.current) {
      // const targetX = mousePosition.y * 0.3; // max ±0.3 rad
      const targetY = mousePosition.x * 0.3;
      
      // groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0} rotationIntensity={0} floatIntensity={0}>
        <Bounds fit clip observe margin={0.7265}>
          <Center>
            <primitive object={scene} />
          </Center>
        </Bounds>
      </Float>
    </group>
  );
}

// Preload the model to avoid pop-in
useGLTF.preload("/models/scene.gltf");
