<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:1a2a6f,100:a259ff&height=200&section=header&text=Nova%20Forge%203D&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Premium%20AI%20Studio%20%E2%80%94%20Company%20Portal%20Concept&descAlignY=58&descSize=18" width="100%" />
</div>

<div align="center">

[![Live Demo](https://img.shields.io/badge/%F0%9F%94%B4%20Live%20Demo-nova--forge--3d.vercel.app-a259ff?style=for-the-badge)](https://nova-forge-3d.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

> **A concept company portal showcasing what modern frontend tech is truly capable of.**
> 3D shaders, GPU particles, scroll-driven WebGL — all in the browser.

<br/>

**[🌐 View Live](https://nova-forge-3d.vercel.app/)** &nbsp;·&nbsp; **[📂 Source Code](https://github.com/Rahul777111/nova-forge-3d)**

<br/>

</div>

---

## 🧠 About

**Nova Forge 3D** is a concept portal for a fictional AI product studio — designed to demonstrate how a premium, immersive web experience can be built with today's frontend stack.

Every layer of the UI has intentional depth: animated GLSL shaders, scroll-reactive 3D scenes, GPU particle systems, and fluid 60fps motion throughout.

---

## ✨ Features

<table>
<tr>
<td width="50%">

**3D & WebGL**
- 🌊 Custom GLSL vertex + fragment shaders
- 🌌 Scroll-driven 3D asteroid field
- 🪐 Tunnel ring system with rotation
- 🌫️ Nebula cloud meshes
- ⭐ Procedural star fields
- 🔵 Per-product 3D canvas scenes

</td>
<td width="50%">

**UI & Animations**
- ⚡ GPU particle galaxy + morph system
- 🤖 Ambient floating AI orb (canvas 2D)
- 🖱️ Smooth cursor tooltip follower
- 🎬 60fps Framer Motion entrances
- ✍️ GSAP glitch text effects
- 🧲 Magnetic hover buttons

</td>
</tr>
<tr>
<td width="50%">

**Architecture**
- 🗂️ 30+ component pairs (JSX + CSS)
- 💤 React.lazy() code splitting
- 🌗 Dark / Light theme context
- 📦 Vite 8 production build
- 🔢 1073 modules — built in 2.86s

</td>
<td width="50%">

**Product Features**
- 📱 Fully responsive (mobile-first)
- ✉️ EmailJS contact form + toast
- 🍪 Cookie consent banner
- 📜 Scroll progress indicator
- 🔒 Policy modal
- 🏷️ Custom animated cursor

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

```text
┌─────────────────────────────────────────────────┐
│  Framework    →  React 19 + Vite 8              │
│  3D Engine    →  Three.js r184                  │
│  R3F          →  @react-three/fiber             │
│  3D Helpers   →  @react-three/drei              │
│  Post FX      →  @react-three/postprocessing    │
│  Animation    →  Framer Motion 12 + GSAP 3      │
│  Shaders      →  Custom GLSL                    │
│  Forms        →  EmailJS Browser                │
│  Styling      →  Pure CSS + CSS custom props    │
└─────────────────────────────────────────────────┘
```

---

## 📁 Structure

```
nova-forge-3d/
├── index.html
├── vite.config.js
├── package.json
├── public/
└── src/
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── ThemeContext.jsx
    └── components/
        ├── Hero.jsx            ← GLSL liquid orb
        ├── ShaderBackground    ← FBM noise BG
        ├── ScrollJourney       ← 3D scroll scene
        ├── ProductShowcase     ← 3D product canvases
        ├── ParticleGalaxy      ← GPU particles
        ├── ParticleMorph       ← Morphing mesh
        ├── BgBot               ← Floating AI orb
        ├── CursorBot           ← Cursor tooltip
        └── ...22 more
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/Rahul777111/nova-forge-3d.git
cd nova-forge-3d
npm install
npm run dev
```

Open → [http://localhost:5173](http://localhost:5173)

```bash
npm run build
npm run preview
```

---

## 📬 Contact Form

Add your [EmailJS](https://www.emailjs.com/) keys to `src/components/Contact.jsx`:

```js
const SERVICE_ID  = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY  = "your_public_key";
```

---

## 📊 Stats

```text
✓ 1073 modules transformed
✓ Built in 2.86s
✓ Zero errors
✓ Live on Vercel
```

---

<div align="center">

### Found this useful? Drop a ⭐

[![Stars](https://img.shields.io/github/stars/Rahul777111/nova-forge-3d?style=for-the-badge&color=a259ff&logo=github)](https://github.com/Rahul777111/nova-forge-3d/stargazers)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:a259ff,100:0a0f1a&height=100&section=footer" width="100%" />

</div>
