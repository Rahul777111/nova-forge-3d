import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";
import "./Hero.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const wobbleVert = `
uniform float uTime;
uniform float uDistort;
varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vWorldPos;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
   +i.y+vec4(0.0,i1.y,i2.y,1.0))
   +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPos = position;
  float n  = snoise(position * 1.8 + uTime * 0.38) * 0.42;
       n += snoise(position * 3.6 + uTime * 0.55 + 1.7) * 0.18;
       n += snoise(position * 7.2 + uTime * 0.72 + 3.3) * 0.08;
  vec3 displaced = position + normal * n * uDistort;
  vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const wobbleFrag = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vWorldPos;

void main() {
  vec3 norm = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 3.5);
  float hShift = norm.y * 0.5 + norm.x * 0.3 + uTime * 0.08;
  vec3 col1 = vec3(0.28, 0.08, 0.95);
  vec3 col2 = vec3(0.05, 0.55, 1.00);
  vec3 col3 = vec3(0.80, 0.10, 0.60);
  float t1 = sin(hShift * 3.14) * 0.5 + 0.5;
  float t2 = cos(hShift * 2.71 + 1.1) * 0.5 + 0.5;
  vec3 base = mix(mix(col1, col2, t1), col3, t2 * 0.4);
  vec3 light1 = normalize(vec3(1.5, 2.0, 2.0));
  vec3 light2 = normalize(vec3(-2.0, -1.0, 1.5));
  float diff1 = max(dot(norm, light1), 0.0);
  float diff2 = max(dot(norm, light2), 0.0) * 0.4;
  vec3 half1 = normalize(light1 + viewDir);
  float spec = pow(max(dot(norm, half1), 0.0), 64.0) * 0.9;
  vec3 col = base * (0.15 + diff1 * 0.7 + diff2)
           + vec3(0.8, 0.85, 1.0) * spec
           + vec3(0.4, 0.2, 1.0) * fresnel * 1.2;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function LiquidOrb() {
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uDistort: { value: 0.55 },
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    if (ringRef.current)  ringRef.current.rotation.z  = clock.getElapsedTime() * 0.22;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -clock.getElapsedTime() * 0.15;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 128, 128]} />
        <shaderMaterial vertexShader={wobbleVert} fragmentShader={wobbleFrag} uniforms={uniforms} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial color="#5010ff" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI * 0.45, 0.3, 0]}>
        <torusGeometry args={[1.68, 0.009, 6, 256]} />
        <meshBasicMaterial color="#a259ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI * 0.55, -0.5, 0.8]}>
        <torusGeometry args={[1.9, 0.006, 6, 256]} />
        <meshBasicMaterial color="#4f8ef7" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial color="#6020ff" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function ShockwaveRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1.5 + ((t * 0.5) % 1) * 3;
    const op = 1 - ((t * 0.5) % 1);
    if (ref.current) {
      ref.current.scale.setScalar(s);
      ref.current.material.opacity = op * 0.15;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.0, 1.06, 256]} />
      <meshBasicMaterial color="#a259ff" transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function FloatingParticles() {
  const points = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 28;
      arr[i*3+1] = (Math.random() - 0.5) * 28;
      arr[i*3+2] = (Math.random() - 0.5) * 28;
    }
    return arr;
  }, []);
  const colors = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    const c1 = new THREE.Color("#4f8ef7");
    const c2 = new THREE.Color("#a259ff");
    for (let i = 0; i < 2000; i++) {
      const c = new THREE.Color().lerpColors(c1, c2, Math.random());
      arr[i*3] = c.r; arr[i*3+1] = c.g; arr[i*3+2] = c.b;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.025;
      points.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2000} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={2000} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

function ParallaxCamera({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.035;
    camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__canvas">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1.5, window.devicePixelRatio]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 4, 4]}  intensity={3.5} color="#7040ff" />
          <pointLight position={[-4, 3, 3]} intensity={2.5} color="#4f8ef7" />
          <pointLight position={[2, -4, 2]} intensity={1.5} color="#ff40a0" />
          <Suspense fallback={null}>
            <ParallaxCamera mouse={mouse} />
            <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.3}>
              <LiquidOrb />
            </Float>
            <ShockwaveRing />
            <FloatingParticles />
            <Stars radius={100} depth={50} count={6000} factor={3} fade />
            <EffectComposer>
              <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.8} blendFunction={BlendFunction.ADD} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0006, 0.0006]} />
              <Vignette eskil={false} offset={0.1} darkness={0.72} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      <div className="hero__content">
        <motion.div className="hero__badge"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}>
          <span className="hero__badge-dot" />
          Full-Stack Developer & AI Builder
        </motion.div>
        <motion.h1 className="hero__title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.9, ease: "easeOut" }}>
          Hi, I'm<br />
          <span className="hero__title--grad">D L Narayana</span>
        </motion.h1>
        <motion.p className="hero__sub"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}>
          I build fast, modern web apps and AI-powered tools.
          Passionate about clean code, 3D web experiences, and turning ideas into reality.
        </motion.p>
        <motion.div className="hero__actions"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.8 }}>
          <button className="btn btn--primary" onClick={() => scrollTo("#contact")}>Get in Touch</button>
          <button className="btn btn--ghost" onClick={() => scrollTo("#projects")}>View My Work</button>
        </motion.div>
      </div>
      <div className="hero__scroll-hint" onClick={() => scrollTo("#about")} style={{ cursor: "pointer" }}>
        <div className="hero__scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
