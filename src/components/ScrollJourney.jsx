import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";
import "./ScrollJourney.css";

const NUM_ASTEROIDS = 120;

function Asteroids({ isDark }) {
  const meshes = useRef([]);
  const positions = useRef(
    Array.from({ length: NUM_ASTEROIDS }, () => ({
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 40,
      z: Math.random() * -200,
      speed: 0.003 + Math.random() * 0.006,
      size: 0.08 + Math.random() * 0.35,
      type: Math.floor(Math.random() * 3),
    }))
  );
  const darkColors = ["#4f8ef7", "#a259ff", "#e8b86d"];
  const lightColors = ["#0e5ad2", "#7c3aed", "#c8860a"];
  const cols = isDark ? darkColors : lightColors;
  const emissives = isDark
    ? ["#1a3a8f", "#3a1a6f", "#8f5a10"]
    : ["#a8c4f0", "#c4a8f0", "#f0d8a8"];

  useFrame(() => {
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const p = positions.current[i];
      m.rotation.x += p.speed;
      m.rotation.y += p.speed * 0.7;
    });
  });
  return (
    <group>
      {positions.current.map((p, i) => (
        <mesh key={i} ref={el => (meshes.current[i] = el)} position={[p.x, p.y, p.z]}>
          <dodecahedronGeometry args={[p.size, 0]} />
          <meshStandardMaterial
            color={cols[p.type]}
            emissive={emissives[p.type]}
            emissiveIntensity={isDark ? 0.4 : 0.15}
            metalness={isDark ? 0.8 : 0.4}
            roughness={isDark ? 0.3 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function TunnelRings({ isDark }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.getElapsedTime() * 0.04;
  });
  const c1 = isDark ? "#4f8ef7" : "#0e5ad2";
  const c2 = isDark ? "#a259ff" : "#7c3aed";
  return (
    <group ref={group}>
      {Array.from({ length: 18 }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * 12 - 5]}>
          <torusGeometry args={[6 + i * 0.3, 0.015, 6, 120]} />
          <meshBasicMaterial color={i % 2 === 0 ? c1 : c2} transparent opacity={isDark ? 0.07 - i * 0.002 : 0.12 - i * 0.004} />
        </mesh>
      ))}
    </group>
  );
}

function NebulaClouds({ isDark }) {
  const data = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 25,
      z: -20 - i * 30,
      scale: 5 + Math.random() * 10,
      type: i % 2,
    }))
  );
  const darkCols = ["#1a2a6f", "#3a1a5f"];
  const lightCols = ["#c8d8f8", "#d8c8f8"];
  const cols = isDark ? darkCols : lightCols;
  return (
    <group>
      {data.current.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[d.scale, 8, 8]} />
          <meshBasicMaterial color={cols[d.type]} transparent opacity={isDark ? 0.04 : 0.07} side={THREE.BackSide} />
        </mesh>
      ))}
    </group>
  );
}

function JourneyCamera() {
  const { camera } = useThree();
  const scrollZ = useRef(0);
  const scrollY = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / max;
      scrollZ.current = -progress * 160;
      scrollY.current = Math.sin(progress * Math.PI * 3) * 4;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useFrame(() => {
    camera.position.z += (scrollZ.current - camera.position.z) * 0.04;
    camera.position.y += (scrollY.current - camera.position.y) * 0.04;
    camera.position.x += (Math.sin(camera.position.z * 0.015) * 3 - camera.position.x) * 0.02;
    camera.lookAt(camera.position.x * 0.1, camera.position.y * 0.1, camera.position.z - 10);
  });
  return null;
}

export default function ScrollJourney() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="scroll-journey" style={{ opacity: isDark ? 0.55 : 0.28 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={isDark ? 0.3 : 0.8} />
        <pointLight position={[10,10,10]} intensity={2} color={isDark ? "#4f8ef7" : "#0e5ad2"} />
        <pointLight position={[-10,-10,-30]} intensity={1.5} color={isDark ? "#a259ff" : "#7c3aed"} />
        <Suspense fallback={null}>
          <JourneyCamera />
          <Stars radius={120} depth={60} count={isDark ? 6000 : 2000} factor={4} fade speed={0.5} />
          <TunnelRings isDark={isDark} />
          <NebulaClouds isDark={isDark} />
          <Asteroids isDark={isDark} />
          <EffectComposer>
            <Bloom intensity={isDark ? 1.2 : 0.4} luminanceThreshold={0.1} luminanceSmoothing={0.9} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
