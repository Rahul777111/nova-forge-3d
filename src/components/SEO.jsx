import { Helmet } from 'react-helmet-async';

const defaults = {
  title: 'D L Narayana | Full-Stack Developer & AI Builder',
  description:
    'Portfolio of D L Narayana — Full-Stack Developer and AI Builder from India. I build fast, modern web apps and AI-powered tools using React, Node.js, Three.js and more.',
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
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={u} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      <meta name="theme-color" content="#0a0a0f" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
