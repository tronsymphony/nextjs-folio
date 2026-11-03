import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// Branded 1200x630 share card used by every opengraph-image route.
export function ogCard({ eyebrow = 'Casa Dev', title, footer = 'casa-dev.com · Oracle NetSuite & custom front-end engineering' }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0b1a33 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: 3 }}>{eyebrow}</div>
        <div style={{ display: 'flex', fontSize: title.length > 70 ? 56 : 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 26, color: '#a3a3a3' }}>{footer}</div>
      </div>
    ),
    OG_SIZE
  );
}
