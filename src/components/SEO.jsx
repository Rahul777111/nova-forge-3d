import { Helmet } from 'react-helmet-async';

const defaults = {
  title: 'Nova Forge 3D | Immersive 3D Web Experiences',
  description:
    'Nova Forge 3D builds cutting-edge 3D web experiences powered by React Three Fiber, WebGL shaders, and immersive UI design.',
  url: 'https://nova-forge-3d.vercel.app',
  image: 'https://nova-forge-3d.vercel.app/og-image.png',
};

export default function SEO({ title, description, url, image }) {
  const t = title || defaults.title;
  const d = description || defaults.description;
  const u = url || defaults.url;
  const img = image || defaults.image;
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={u} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:image" content={img} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      {/* Misc */}
      <meta name="theme-color" content="#0a0a0f" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
