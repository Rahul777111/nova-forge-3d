# Nova Forge 3D

**Nova Forge** is a premium AI product engineering studio landing page built with React 19, Vite 8, Three.js, and custom GLSL shaders.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| 3D Engine | Three.js 0.184 + @react-three/fiber |
| 3D Helpers | @react-three/drei + @react-three/postprocessing |
| Animation | Framer Motion 12 + GSAP 3 |
| Forms | EmailJS Browser |
| Styling | Pure CSS with CSS custom properties |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     # 30+ JSX+CSS component pairs
  context/        # ThemeContext (dark mode)
  assets/         # Static assets
  App.jsx         # Root - lazy loads all below-fold sections
  main.jsx        # Entry point
```

## Key Components

- **Hero** - Custom GLSL wobble orb shader + postprocessing
- **ShaderBackground** - Animated FBM noise background shader
- **ScrollJourney** - 3D asteroid field driven by scroll position
- **ProductShowcase** - Per-product 3D canvas scenes
- **ParticleGalaxy / ParticleMorph** - GPU particle systems
- **BgBot** - Ambient floating AI orb (canvas-based)
- **CursorBot** - Context-aware AI cursor tooltip

## Contact Form Setup

Replace the placeholder keys in `src/components/Contact.jsx`:

```js
const SERVICE_ID  = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY  = "your_public_key";
```

Get keys from [emailjs.com](https://www.emailjs.com/)

## License

Private - Nova Forge Studio
