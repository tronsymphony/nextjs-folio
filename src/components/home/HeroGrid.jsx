'use client';

import { useEffect, useRef } from 'react';

// Background for the sync hero: a dot grid on a 2D canvas. A few orange
// "packets" slide along the grid lines, dots darken around the cursor, and an
// orange ripple spreads from wherever a `casa:sync` window event says (SyncDemo
// sends one when an order lands in NetSuite). Still grid only with reduced
// motion; paused while off screen or in a hidden tab.

const GAP = 22;
const INK = '20,20,19';
const ACCENT = '232,80,26';
const MAX_PACKETS = 7;
const RIPPLE_MS = 1800;
const RIPPLE_SPEED = 0.55; // px per ms

export default function HeroGrid({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let pointer = null;
    const packets = [];
    const ripples = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) draw(performance.now());
    }

    function spawnPacket() {
      const horizontal = Math.random() < 0.6;
      const dir = Math.random() < 0.5 ? 1 : -1;
      const lane = horizontal ? Math.floor(Math.random() * (h / GAP)) * GAP + GAP / 2 : Math.floor(Math.random() * (w / GAP)) * GAP + GAP / 2;
      const span = horizontal ? w : h;
      packets.push({ horizontal, dir, lane, pos: dir > 0 ? -80 : span + 80, speed: 0.05 + Math.random() * 0.07, span });
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // Ripples: drop the finished ones.
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t0 > RIPPLE_MS) ripples.splice(i, 1);

      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          let a = 0.09;
          let r = 1;
          let warm = 0;
          if (pointer) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d < 150) {
              const k = 1 - d / 150;
              a += 0.3 * k * k;
              r += 0.6 * k;
            }
          }
          for (const rp of ripples) {
            const age = now - rp.t0;
            const off = Math.abs(Math.hypot(x - rp.x, y - rp.y) - age * RIPPLE_SPEED);
            if (off < 36) warm = Math.max(warm, (1 - off / 36) * (1 - age / RIPPLE_MS));
          }
          if (warm > 0.02) {
            ctx.fillStyle = `rgba(${ACCENT},${Math.min(1, 0.15 + warm * 0.75)})`;
            r += warm * 1.2;
          } else {
            ctx.fillStyle = `rgba(${INK},${a})`;
          }
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }

      // Packets: a short fading trail along a grid line.
      for (const p of packets) {
        const head = p.pos;
        const tail = head - p.dir * 70;
        const [x0, y0, x1, y1] = p.horizontal ? [tail, p.lane, head, p.lane] : [p.lane, tail, p.lane, head];
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, `rgba(${ACCENT},0)`);
        g.addColorStop(1, `rgba(${ACCENT},0.55)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.fillStyle = `rgba(${ACCENT},0.8)`;
        ctx.fillRect(x1 - 1.75, y1 - 1.75, 3.5, 3.5);
      }
    }

    let last = performance.now();
    function frame(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.pos += p.dir * p.speed * dt;
        if (p.pos < -100 || p.pos > p.span + 100) packets.splice(i, 1);
      }
      if (packets.length < MAX_PACKETS && Math.random() < dt / 700) spawnPacket();
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (still || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => (pointer = null);
    const onSync = (e) => {
      if (still) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: e.detail.x - rect.left, y: e.detail.y - rect.top, t0: performance.now() });
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const section = canvas.closest('section') || canvas.parentElement;
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    window.addEventListener('casa:sync', onSync);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('casa:sync', onSync);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}
