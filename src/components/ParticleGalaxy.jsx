import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ParticleGalaxy.css";

gsap.registerPlugin(ScrollTrigger);

const COUNT = 6000;

function Galaxy({ scrollRef }) {
  const points = useRef();
  const { camera } = useThree();
  const progress = useRef(0);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const arms = 3;
    const spin = 1.5;
    const spread = 0.4;
    const color1 = new THREE.Color("#4f8ef7");
    const color2 = new THREE.Color("#a259ff");
    const color3 = new THREE.Color("#e8b86d");
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 5;
      const arm = (i % arms) / arms * Math.PI * 2;
      const angle = arm + radius * spin;
      const rSpread = (Math.random() - 0.5) * spread * radius;
      const hSpread = (Math.random() - 0.5) * 0.5;
      positions[i3]     = Math.cos(angle) * radius + rSpread;
      positions[i3 + 1] = hSpread;
      positions[i3 + 2] = Math.sin(angle) * radius + rSpread;
      const mixFactor = radius / 5;
      const c = new THREE.Color();
      if (i % 3 === 0) c.lerpColors(color1, color2, mixFactor);
      else if (i % 3 === 1) c.lerpColors(color2, color3, mixFactor);
      else c.lerpColors(color1, color3, mixFactor);
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => { progress.current = self.progress; }
      });
    });
    return () => ctx.revert();
  }, [scrollRef]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const p = progress.current;
    points.current.rotation.y = t * 0.05 + p * Math.PI * 1.5;
    points.current.rotation.x = p * 0.4;
    const scale = 0.6 + p * 0.6;
    points.current.scale.setScalar(scale);
    camera.position.z = 9 - p * 3;
    camera.position.y = p * 1.5;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

export default function ParticleGalaxy() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });
  return (
    <section ref={sectionRef} className="galaxy">
      <div className="galaxy__canvas">
        <Canvas camera={{ position: [0, 2, 9], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Galaxy scrollRef={sectionRef} />
          </Suspense>
        </Canvas>
      </div>
      <div className="galaxy__content">
        <motion.span className="section-tag"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>The NOVA Network</motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8 }}>
          6,000 data points.<br /><span className="grad">One living system.</span>
        </motion.h2>
        <motion.p className="section-sub"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          Every particle represents a signal - scroll to watch the intelligence converge.
        </motion.p>
      </div>
    </section>
  );
}
