<div align="center">

# 🚀 Nova Forge 3D

### *A Company Portal Concept — Built as a Student Demo Project*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![GLSL](https://img.shields.io/badge/GLSL-Shaders-FF6B35?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)

<br/>

> **This project is a demo I built to show how a modern AI company's web portal could look and feel.**
> Built entirely by a student — to practice and showcase real-world frontend skills.

<br/>

[🔴 Live Demo](#) &nbsp;&nbsp;|&nbsp;&nbsp; [📂 Source Code](https://github.com/Rahul777111/nova-forge-3d) &nbsp;&nbsp;|&nbsp;&nbsp; [🧑‍💻 My GitHub](https://github.com/Rahul777111)

</div>

---

## 🎯 What is This?

This is a **concept company portal** I designed and built for a fictional AI studio called **Nova Forge** — to demonstrate how a premium, modern, and immersive company website could be built.

I built this as a **student project** to push my frontend skills as far as possible — using real production-grade libraries, writing custom GLSL shaders, and implementing advanced 3D/WebGL experiences directly in the browser.

**Think of it as:** *"What if an AI company had the most impressive website on the internet?"*

---

## ✨ Features Showcase

| Feature | Description |
|---|---|
| 🌊 **GLSL Shader Hero** | Custom vertex + fragment shaders — animated liquid orb with FBM noise |
| 🌌 **3D Scroll Journey** | Full 3D asteroid field + tunnel rings that react to the user's scroll position |
| ⚡ **GPU Particle Systems** | ParticleGalaxy and ParticleMorph — thousands of particles on GPU |
| 🎨 **Animated Shader BG** | Full-screen FBM noise background — dark and light variants |
| 🤖 **BgBot AI Orb** | Ambient floating canvas orb — pure 2D canvas, no extra dependencies |
| 🖱️ **CursorBot** | AI tooltip that follows the cursor with smooth lag and context hints |
| 🃏 **Product Showcase** | 3 AI products each with their own live Three.js 3D canvas |
| ✉️ **Contact Form** | EmailJS-integrated contact form with toast notifications |
| 📱 **Fully Responsive** | Mobile-first design — works on all screen sizes |
| 🎞️ **60fps Animations** | Framer Motion + GSAP — smooth entrance animations throughout |

---

## 🛠️ Tech Stack

```
Frontend Framework  →  React 19 + Vite 8
3D Engine           →  Three.js 0.184 + @react-three/fiber
3D Extras           →  @react-three/drei + @react-three/postprocessing
Animations          →  Framer Motion 12 + GSAP 3
Shaders             →  Custom GLSL (vertex + fragment)
Contact Form        →  EmailJS Browser
Styling             →  Pure CSS (CSS custom properties, no Tailwind)
```

---

## 🗂️ Project Structure

```
nova-forge-3d/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/         # 30+ JSX + CSS component pairs
│   │   ├── Hero.jsx            ← GLSL shader orb
│   │   ├── ShaderBackground.jsx ← Animated noise BG
│   │   ├── ScrollJourney.jsx   ← 3D scroll scene
│   │   ├── ProductShowcase.jsx ← Per-product 3D canvases
│   │   ├── ParticleGalaxy.jsx  ← GPU particles
│   │   ├── ParticleMorph.jsx   ← Morphing particles
│   │   ├── BgBot.jsx           ← Floating AI orb
│   │   ├── CursorBot.jsx       ← Cursor tooltip
│   │   ├── Services.jsx        ← Service cards
│   │   ├── Contact.jsx         ← EmailJS form
│   │   └── ...many more
│   ├── context/
│   │   └── ThemeContext.jsx    ← Dark/light mode
│   ├── App.jsx                 ← Root, lazy-loads all sections
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Run It Locally

```bash
# Clone the repo
git clone https://github.com/Rahul777111/nova-forge-3d.git
cd nova-forge-3d

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open → [http://localhost:5173](http://localhost:5173)

```bash
# Production build
npm run build
npm run preview
```

---

## 📬 Contact Form Setup

To enable the contact form, replace these in `src/components/Contact.jsx`:

```js
const SERVICE_ID  = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY  = "your_public_key";
```

Get free keys at → [emailjs.com](https://www.emailjs.com/)

---

## 🧑‍🎓 About Me

Hi! I'm **D L Narayana**, a student from **India** passionate about frontend development, 3D web experiences, and creative engineering.

I built this project to explore what's possible with modern web tech — GLSL shaders, Three.js, real-time GPU particle systems, and smooth 60fps animations — all running in the browser.

This is a **demo/concept project** — not affiliated with any real company.

---

<div align="center">

**If you liked this project, please ⭐ star the repo — it means a lot!**

[![GitHub](https://img.shields.io/badge/GitHub-Rahul777111-181717?style=for-the-badge&logo=github)](https://github.com/Rahul777111)

</div>
