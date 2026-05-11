import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import "./ParticleMorph.css";

const COUNT = 8000;

function buildSphere(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2.5 + (Math.random() - 0.5) * 0.3;
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.cos(phi);
    pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return pos;
}

function buildTorus(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const R = 2.5, r = 0.9;
    pos[i*3]   = (R + r * Math.cos(v)) * Math.cos(u);
    pos[i*3+1] = r * Math.sin(v);
    pos[i*3+2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return pos;
}

function buildDNA(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 14;
    const strand = i % 2;
    const angle = t + strand * Math.PI;
    const r = 1.8;
    const spread = (Math.random() - 0.5) * 0.25;
    pos[i*3]   = Math.cos(angle) * r + spread;
    pos[i*3+1] = (i / count - 0.5) * 10;
    pos[i*3+2] = Math.sin(angle) * r + spread;
  }
  return pos;
}

const SHAPES = [buildSphere, buildTorus, buildDNA];
const SHAPE_LABELS = ["SPHERE", "TORUS", "DNA"];
const SHAPE_COLORS = ["#4f8ef7", "#a259ff", "#e8b86d"];
const INITIAL_SPHERE = buildSphere(COUNT);

const COLORS = (() => {
  const arr = new Float32Array(COUNT * 3);
  const palette = [
    new THREE.Color("#4f8ef7"),
    new THREE.Color("#a259ff"),
    new THREE.Color("#e8b86d"),
  ];
  for (let i = 0; i < COUNT; i++) {
    const c = palette[i % 3];
    arr[i*3] = c.r; arr[i*3+1] = c.g; arr[i*3+2] = c.b;
  }
  return arr;
})();

function MorphMesh({ targetRef }) {
  const points = useRef();
  const currentPos = useRef(new Float32Array(INITIAL_SPHERE));
  const posArray = useMemo(() => new Float32Array(INITIAL_SPHERE), []);

  useEffect(() => {
    targetRef.current = (shapeIdx) => {
      const target = SHAPES[shapeIdx](COUNT);
      const from = { t: 0 };
      const snapshot = new Float32Array(currentPos.current);
      gsap.to(from, {
        t: 1, duration: 1.8, ease: "power3.inOut",
        onUpdate: () => {
          if (!points.current) return;
          const pos = points.current.geometry.attributes.position.array;
          for (let i = 0; i < COUNT * 3; i++)
            pos[i] = snapshot[i] + (target[i] - snapshot[i]) * from.t;
          currentPos.current.set(pos);
          points.current.geometry.attributes.position.needsUpdate = true;
        },
      });
    };
  }, [targetRef]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.08;
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.15;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={posArray} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={COLORS}   itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

export default function ParticleMorph() {
  const sectionRef = useRef();
  const morphFn = useRef(null);
  const [active, setActive] = useState(0);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleShape = (i) => {
    setActive(i);
    if (morphFn.current) morphFn.current(i);
  };

  return (
    <section ref={sectionRef} className="morph">
      <div className="morph__canvas">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5,5,5]} intensity={2} color="#4f8ef7" />
          <pointLight position={[-5,-5,-5]} intensity={1.5} color="#a259ff" />
          <Suspense fallback={null}>
            <MorphMesh targetRef={morphFn} />
          </Suspense>
        </Canvas>
      </div>
      <div className="morph__ui">
        <motion.span className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          Particle Engine
        </motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8 }}>
          8,000 particles.<br /><span className="grad">One command.</span>
        </motion.h2>
        <motion.p className="section-sub"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}>
          Click a shape to watch the swarm reorganize in real time.
        </motion.p>
        <motion.div className="morph__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}>
          {SHAPE_LABELS.map((label, i) => (
            <button
              key={label}
              className={`morph__btn${active === i ? " morph__btn--active" : ""}`}
              style={{ "--accent-color": SHAPE_COLORS[i] }}
              onClick={() => handleShape(i)}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
