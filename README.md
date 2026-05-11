<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1a,50:1a2a6f,100:a259ff&height=200&section=header&text=Nova%20Forge%203D&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Premium%20AI%20Studio%20%E2%80%94%20Company%20Portal%20Concept&descAlignY=58&descSize=18" width="100%" />
</div>

<div align="center">

[![Live Demo](https://img.shields.io/badge/%F0%9F%94%B4%20Live%20Demo-nova--forge--3d.vercel.app-a259ff?style=for-the-badge)](https://nova-forge-3d.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Rahul777111-181717?style=for-the-badge&logo=github)](https://github.com/Rahul777111)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

> ### 👉 I hand-coded every single line of this project myself.
> No AI code generation. No copy-paste. Pure learning, pure grind.

<br/>

**[🌐 View Live](https://nova-forge-3d.vercel.app/)** &nbsp;·&nbsp; **[📂 Browse Code](https://github.com/Rahul777111/nova-forge-3d)** &nbsp;·&nbsp; **[🧑‍💻 My Profile](https://github.com/Rahul777111)**

<br/>

</div>

---

## 🧠 About This Project

I'm a **self-taught frontend developer** from India, and I built **Nova Forge 3D** entirely from scratch as a personal challenge — to see how far I could push the browser.

This is a **concept company portal** for a fictional AI studio. I designed every component, wrote every shader, and animated every interaction by hand — learning as I built.

> *"What if an AI company had the most jaw-dropping website on the internet?"*
> That question drove every decision in this project.

---

## ✨ What I Built

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
- 🖱️ Lag-based cursor tooltip bot
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
- 🔢 1073 modules — builds in 2.86s

</td>
<td width="50%">

**Features**
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
│  Shaders      →  Custom GLSL (hand-written)     │
│  Forms        →  EmailJS Browser                │
│  Styling      →  Pure CSS + CSS custom props    │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
nova-forge-3d/
├── 📄 index.html
├── ⚙️  vite.config.js
├── 📦 package.json
├── public/
│   └── favicon.svg
└── src/
    ├── 🏠 App.jsx              ← Root component
    ├── 🎨 App.css              ← Global layout
    ├── 🎨 index.css            ← CSS design system
    ├── context/
    │   └── ThemeContext.jsx    ← Dark/light mode
    └── components/             ← 30+ components
        ├── Hero.jsx            ← GLSL liquid orb hero
        ├── ShaderBackground    ← Animated FBM noise BG
        ├── ScrollJourney       ← 3D scroll scene
        ├── ProductShowcase     ← 3D product canvases
        ├── ParticleGalaxy      ← GPU star particles
        ├── ParticleMorph       ← Morphing particle mesh
        ├── BgBot               ← Floating AI orb
        ├── CursorBot           ← Cursor AI tooltip
        ├── Services            ← Service cards grid
        ├── Pricing             ← Pricing tiers
        ├── Contact             ← EmailJS form
        └── ...18 more
```

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/Rahul777111/nova-forge-3d.git
cd nova-forge-3d

# 2. Install
npm install

# 3. Dev server
npm run dev
# → http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

---

## 📬 Enable Contact Form

Get free keys from [emailjs.com](https://www.emailjs.com/) and add to `src/components/Contact.jsx`:

```js
const SERVICE_ID  = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY  = "your_public_key";
```

---

## 🧑‍🎓 About Me

```text
Name     →  D L Narayana
From     →  India 🇮🇳
Role     →  Student & Self-taught Frontend Developer
Focus    →  3D Web, Creative UI, React Ecosystem
```

I built this project purely through self-learning — MDN docs, Three.js docs, shader tutorials, and a lot of trial and error. Every component in this repo was written by hand, line by line.

No frameworks were copy-pasted. No AI wrote the code. Just me, my editor, and a browser console full of errors that I fixed one by one. 💪

---

## 📊 Build Stats

```text
✓ 1073 modules transformed
✓ Built in 2.86s
✓ Zero build errors
✓ Deployed on Vercel
```

---

<div align="center">

### If this project impressed you, please drop a ⭐ — it genuinely motivates me!

[![Star History](https://img.shields.io/github/stars/Rahul777111/nova-forge-3d?style=for-the-badge&color=a259ff&logo=github)](https://github.com/Rahul777111/nova-forge-3d/stargazers)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:a259ff,100:0a0f1a&height=100&section=footer" width="100%" />

</div>
