'use client';

import { useEffect, useRef, useState } from 'react';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

// Decorative WebGL background for the homepage hero. three.js is imported only
// after hydration so it never delays the headline; the canvas fades in once
// the first frame has rendered. Without WebGL, nothing renders and the hero's
// CSS gradients stand on their own.
export default function HeroScene({ className = '' }) {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !supportsWebGL()) return;

    let dispose = () => {};
    let cancelled = false;

    Promise.all([
      import('three'),
      import('three/addons/renderers/CSS2DRenderer.js'),
      import('./integrationScene'),
    ])
      .then(([THREE, { CSS2DRenderer, CSS2DObject }, { createIntegrationScene }]) => {
        if (cancelled) return;
        dispose = createIntegrationScene({ THREE, CSS2DRenderer, CSS2DObject, mount, onFirstFrame: () => setReady(true) });
      })
      .catch((err) => console.error('Hero scene failed to load:', err));

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`transition-opacity duration-[1500ms] ease-out ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
