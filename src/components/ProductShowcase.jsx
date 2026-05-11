import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import "./ProductShowcase.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProductScene({ index }) {
  const meshRef  = useRef();
  const edgeRef  = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (edgeRef.current) {
      edgeRef.current.rotation.y = t * 0.4;
      edgeRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      // pulse edge opacity
      edgeRef.current.material.opacity = 0.55 + 0.35 * Math.sin(t * 1.8);
    }
  });

  const colors  = ["#4f8ef7", "#a259ff", "#e8b86d"];
  const emits   = ["#1a3a8f", "#4a1a8f", "#8f4a10"];
  const color   = colors[index];
  const emit    = emits[index];

  const shapes = [
    // 0 - distorted sphere
    <>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial color={color} emissive={emit} emissiveIntensity={1.2}
          metalness={1} roughness={0} distort={0.4} speed={2} />
      </Sphere>
      {/* glowing wireframe overlay */}
      <mesh ref={edgeRef}>
        <sphereGeometry args={[1.02, 16, 16]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>,

    // 1 - cube
    <>
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial color={color} emissive={emit} emissiveIntensity={1.2}
          metalness={1} roughness={0.05} />
      </Box>
      {/* glowing edge lines */}
      <mesh ref={edgeRef}>
        <boxGeometry args={[1.52, 1.52, 1.52]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.7}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>,

    // 2 - torusknot
    <>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 200, 32]} />
        <meshStandardMaterial color={color} emissive={emit} emissiveIntensity={1.2}
          metalness={0.9} roughness={0.05} />
      </mesh>
      {/* glowing wireframe overlay */}
      <mesh ref={edgeRef}>
        <torusKnotGeometry args={[0.81, 0.255, 80, 16]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>,
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      {shapes[index % 3]}
    </Float>
  );
}

const products = [
  { name: "FORGE CORE", tag: "AI Infrastructure",   desc: "The neural backbone of enterprise-grade AI systems. Built for sub-millisecond inference at planetary scale.", stat: "12ms",  statLabel: "avg inference" },
  { name: "NOVA LENS",  tag: "Computer Vision",      desc: "Context-aware visual intelligence for retail, logistics, and smart environments that sees beyond the pixel.",   stat: "99.4%", statLabel: "accuracy rate" },
  { name: "ECHO MIND",  tag: "Conversational AI",    desc: "Emotionally-calibrated language models fine-tuned for your brand voice, deployed across every customer touchpoint.", stat: "4.9/5", statLabel: "user satisfaction" },
];

export default function ProductShowcase() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="work" className="showcase">
      <motion.div className="section-header" ref={ref}
        initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}>
        <span className="section-tag">Product Suite</span>
        <h2 className="section-title">Engineered for<br /><span className="grad">Market Leaders</span></h2>
        <p className="section-sub">Three flagship products. Infinite configuration. One unified intelligence platform.</p>
      </motion.div>
      <div className="showcase__grid">
        {products.map((p, i) => (
          <motion.div key={p.name} className="showcase__card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            viewport={{ once: true }}>
            <div className="showcase__canvas">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[3, 3, 3]}   intensity={3}   color={products[i].tag === "AI Infrastructure" ? "#4f8ef7" : i === 1 ? "#a259ff" : "#e8b86d"} />
                <pointLight position={[-3, -2, 2]} intensity={1.5} color={i === 0 ? "#4f8ef7" : i === 1 ? "#a259ff" : "#e8b86d"} />
                <Suspense fallback={null}>
                  <ProductScene index={i} />
                  <EffectComposer>
                    <Bloom intensity={1.8} luminanceThreshold={0.15} luminanceSmoothing={0.8} blendFunction={BlendFunction.ADD} />
                  </EffectComposer>
                </Suspense>
              </Canvas>
            </div>
            <div className="showcase__info">
              <span className="showcase__tag">{p.tag}</span>
              <h3 className="showcase__name">{p.name}</h3>
              <p className="showcase__desc">{p.desc}</p>
              <div className="showcase__bottom">
                <div className="showcase__stat">
                  <span className="showcase__stat-num">{p.stat}</span>
                  <span className="showcase__stat-label">{p.statLabel}</span>
                </div>
                <button className="showcase__btn" onClick={() => scrollTo("#contact")}>
                  Learn More &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
