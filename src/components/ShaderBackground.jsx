import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";
import "./ShaderBackground.css";

const darkFrag = `
uniform float uTime;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=0.5;}return v;}
void main(){
  vec2 uv=vUv*3.0;
  float t=uTime*0.12;
  float n=fbm(uv+fbm(uv+fbm(uv+t)));
  vec3 col1=vec3(0.01,0.03,0.12);
  vec3 col2=vec3(0.05,0.02,0.18);
  vec3 col3=vec3(0.02,0.06,0.20);
  vec3 col=mix(col1,mix(col2,col3,n),smoothstep(0.3,0.7,n));
  col+=0.04*vec3(0.31,0.56,0.97)*smoothstep(0.6,0.9,n);
  col+=0.03*vec3(0.64,0.35,1.0)*smoothstep(0.7,1.0,n);
  gl_FragColor=vec4(col,1.0);
}
`;

const lightFrag = `
uniform float uTime;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=0.5;}return v;}
void main(){
  vec2 uv=vUv*3.0;
  float t=uTime*0.09;
  float n=fbm(uv+fbm(uv+t*0.5));
  vec3 base=vec3(0.94,0.96,1.0);
  vec3 mid=vec3(0.88,0.92,1.0);
  vec3 accent=vec3(0.82,0.88,1.0);
  vec3 col=mix(base,mix(mid,accent,n),smoothstep(0.35,0.75,n));
  col+=0.06*vec3(0.05,0.35,0.85)*smoothstep(0.65,0.9,n);
  col+=0.04*vec3(0.48,0.23,0.88)*smoothstep(0.75,1.0,n);
  gl_FragColor=vec4(col,1.0);
}
`;

const vertexShader = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;

function BgMesh({ isDark }) {
  const matRef = useRef();
  const { viewport } = useThree();
  const fragRef = useRef(isDark ? darkFrag : lightFrag);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  const frag = isDark ? darkFrag : lightFrag;
  return (
    <mesh>
      <planeGeometry args={[viewport.width * 1.1, viewport.height * 1.1]} />
      <shaderMaterial
        key={frag}
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={frag}
        uniforms={{ uTime: { value: 0 } }}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="shader-bg" style={{ opacity: isDark ? 0.85 : 0.65 }}>
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }} gl={{ antialias: false, alpha: false }} dpr={1}>
        <BgMesh isDark={isDark} />
      </Canvas>
    </div>
  );
}
