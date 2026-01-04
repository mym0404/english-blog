"use client";

import { Center, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { DoubleSide } from "three";

type AlphabetProps = {
  letter: string;
  initialPosition: [number, number, number];
  speed: number;
  color: string;
  size: number;
  fadeDelay: number;
};

const Alphabet = ({
  letter,
  initialPosition,
  speed,
  color,
  size,
  fadeDelay,
}: AlphabetProps) => {
  const ref = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsed = clock.getElapsedTime();
    const t = elapsed * speed + offset;

    ref.current.position.x = initialPosition[0] + Math.sin(t * 0.5) * 2;
    ref.current.position.y = initialPosition[1] + Math.cos(t * 0.3) * 1.5;
    ref.current.position.z = initialPosition[2] + Math.sin(t * 0.4) * 2;

    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.3;

    if (materialRef.current) {
      const fadeProgress = Math.max(0, elapsed - fadeDelay);
      materialRef.current.opacity = Math.min(1, fadeProgress * 2);
    }
  });

  return (
    <group ref={ref} position={initialPosition}>
      <Center>
        <Text fontSize={size} color={color}>
          {letter}
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            metalness={0.1}
            roughness={0.2}
            transparent
            opacity={0}
            side={DoubleSide}
          />
        </Text>
      </Center>
    </group>
  );
};

const ALPHABETS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const COLORS = [
  "#ffb3ba",
  "#ffdfba",
  "#ffffba",
  "#baffc9",
  "#bae1ff",
  "#e0b0ff",
  "#ffb3de",
  "#b3fff0",
  "#ffd1dc",
  "#c9c9ff",
];

const generateAlphabets = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const letter = ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
    const radius = 10 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    return {
      id: i,
      letter,
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) - 2,
        radius * Math.cos(phi),
      ] as [number, number, number],
      speed: 0.1 + Math.random() * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 0.5 + Math.random() * 0.5,
      fadeDelay: Math.random() * 3,
    };
  });
};

const Scene = () => {
  const alphabets = useMemo(() => generateAlphabets(700), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.6}
        color={"#e0b0ff"}
      />
      <pointLight position={[0, 10, 0]} intensity={0.4} color={"#bae1ff"} />

      {alphabets.map((a) => (
        <Alphabet
          key={a.id}
          letter={a.letter}
          initialPosition={a.position}
          speed={a.speed}
          color={a.color}
          size={a.size}
          fadeDelay={a.fadeDelay}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

export const FlyingAlphabets = () => {
  return (
    <div className={"absolute inset-0 -z-10"}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]} shadows>
        <Scene />
      </Canvas>
    </div>
  );
};
