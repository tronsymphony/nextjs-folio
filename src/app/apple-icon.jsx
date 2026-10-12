import { ImageResponse } from 'next/og';

// Home-screen icon for iOS: the Casa Dev mark (a "c" and the accent cursor)
// on ink. Generated at build time so it always matches the SVG logo.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141413' }}>
        <svg width="150" height="150" viewBox="0 0 32 32">
          <path d="M17.5 10.64A7 7 0 1 0 17.5 21.36" fill="none" stroke="#f4f2ee" strokeWidth="3" strokeLinecap="round" />
          <rect x="21.4" y="8.5" width="2.8" height="15" rx="0.6" fill="#e8501a" />
        </svg>
      </div>
    ),
    size
  );
}
