'use client';

// Replaces the root layout when it fails, so it must render <html> and <body>
// itself and cannot rely on globals.css.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f4f2ee', color: '#141413', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: 32, marginBottom: 16 }}>Something went wrong.</h1>
            <p style={{ color: '#5f5c56', marginBottom: 24 }}>Please try again, or email nityahoyos@gmail.com if it keeps happening.</p>
            <button onClick={reset} style={{ padding: '10px 20px', borderRadius: 999, border: 0, background: '#141413', color: '#f4f2ee', fontWeight: 700, cursor: 'pointer' }}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
