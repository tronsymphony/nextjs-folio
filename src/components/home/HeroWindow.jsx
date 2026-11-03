'use client';

import { useEffect, useRef } from 'react';

// Background for the sync hero: an office window with horizontal aluminium
// venetian blinds, a city skyline behind them in the visitor's own daylight
// (cool morning, bright noon, warmer dusk, lit windows at night), and the
// light through the slats falling as bars across the wall where the headline
// sits. The slats flutter a little in the draught, part around the cursor like
// fingers peeking through, and turn open in a ring from wherever a `casa:sync`
// window event says (SyncDemo sends one when an order lands). A still frame
// with reduced motion; paused while off screen or in a hidden tab. 2D canvas.

const PITCH = 20; // px from one slat to the next
const CLOSED = 0.5; // resting turn (0 = open, PI/2 = shut), radians
const SEGMENTS = 28; // each slat is drawn in pieces so it can bend open locally
const WAVE_MS = 2400;
const WAVE_SPEED = 0.5; // px per ms
const FRAME = [214, 218, 222];
const SLAT = [233, 236, 238];
const WALL = [244, 242, 238]; // the page canvas

// Sky top, sky horizon, near buildings, far buildings, light strength, lit windows (0-1) by hour.
const SKIES = [
  { h: 0, top: [28, 38, 64], low: [62, 72, 104], near: [34, 40, 56], far: [52, 60, 82], sun: 0.15, lit: 1 },
  { h: 6, top: [150, 178, 214], low: [240, 214, 190], near: [120, 128, 142], far: [168, 176, 190], sun: 0.6, lit: 0.4 },
  { h: 9, top: [160, 196, 232], low: [222, 234, 244], near: [128, 138, 152], far: [182, 192, 206], sun: 0.85, lit: 0 },
  { h: 13, top: [140, 186, 232], low: [214, 230, 244], near: [122, 134, 150], far: [178, 190, 206], sun: 1, lit: 0 },
  { h: 17, top: [150, 180, 220], low: [246, 214, 182], near: [112, 116, 132], far: [166, 166, 182], sun: 0.8, lit: 0.3 },
  { h: 19.5, top: [70, 86, 130], low: [222, 150, 128], near: [56, 58, 76], far: [100, 98, 122], sun: 0.4, lit: 0.9 },
  { h: 21, top: [32, 42, 72], low: [70, 76, 112], near: [36, 40, 58], far: [54, 60, 84], sun: 0.15, lit: 1 },
  { h: 24, top: [28, 38, 64], low: [62, 72, 104], near: [34, 40, 56], far: [52, 60, 82], sun: 0.15, lit: 1 },
];

const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
const rgb = (c, a = 1) => `rgba(${c.map((v) => Math.round(Math.max(0, Math.min(255, v)))).join(',')},${a})`;

function skyAt(hour) {
  let i = 0;
  while (i < SKIES.length - 2 && SKIES[i + 1].h <= hour) i++;
  const a = SKIES[i];
  const b = SKIES[i + 1];
  const k = (hour - a.h) / (b.h - a.h);
  return {
    top: mix(a.top, b.top, k),
    low: mix(a.low, b.low, k),
    near: mix(a.near, b.near, k),
    far: mix(a.far, b.far, k),
    sun: a.sun + (b.sun - a.sun) * k,
    lit: a.lit + (b.lit - a.lit) * k,
  };
}

// Seeded so the skyline is the same on every visit.
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function skyline(width, seed, minH, maxH, minW, maxW) {
  const rand = rng(seed);
  const out = [];
  for (let x = -20; x < width + 20; ) {
    const bw = minW + rand() * (maxW - minW);
    const tall = rand() < 0.12;
    out.push({ x, w: bw, h: minH + rand() * (maxH - minH) * (tall ? 1.6 : 1), crown: rand() < 0.25, seed: Math.floor(rand() * 1e9) });
    x += bw + rand() * 6;
  }
  return out;
}

export default function HeroWindow({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const now = new Date();
    const sky = skyAt(now.getHours() + now.getMinutes() / 60);
    let w = 0;
    let h = 0;
    let win = { x: 0, y: 0, w: 0, h: 0 };
    let raf = 0;
    let visible = true;
    let pointer = null;
    let tilts = []; // [slat][segment]
    let far = [];
    let near = [];
    const waves = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The window fills the right of the hero on wide screens, leaving wall for the headline; all of it on phones.
      const wide = w >= 1024;
      win = wide ? { x: w * 0.44, y: h * 0.1, w: w * 0.56 - 32, h: h * 0.8 } : { x: 0, y: 0, w, h };
      const rows = Math.ceil(win.h / PITCH);
      tilts = Array.from({ length: rows }, () => new Array(SEGMENTS).fill(CLOSED));
      far = skyline(win.w, 7, win.h * 0.18, win.h * 0.38, 26, 64);
      near = skyline(win.w, 21, win.h * 0.08, win.h * 0.26, 34, 90);
      if (still) draw(performance.now());
    }

    function target(row, seg, t) {
      const x = win.x + ((seg + 0.5) / SEGMENTS) * win.w;
      const y = win.y + (row + 0.5) * PITCH;
      // A draught: a slow ripple down the blind.
      let a = CLOSED + 0.05 * Math.sin(t * 0.0012 + row * 0.5) * Math.sin(t * 0.0003);
      if (pointer) {
        const d = Math.hypot((x - pointer.x) * 0.6, y - pointer.y);
        const near = Math.max(0, 1 - d / 110);
        a -= 0.45 * near * near;
      }
      for (const wv of waves) {
        const age = t - wv.t0;
        const off = Math.abs(Math.hypot(x - wv.x, y - wv.y) - age * WAVE_SPEED);
        if (off < 120) a -= 0.5 * (1 - off / 120) * (1 - age / WAVE_MS);
      }
      return Math.max(-0.1, a);
    }

    function drawCity(t) {
      const { x, y, w: ww, h: wh } = win;
      const sg = ctx.createLinearGradient(0, y, 0, y + wh);
      sg.addColorStop(0, rgb(sky.top));
      sg.addColorStop(0.75, rgb(sky.low));
      ctx.fillStyle = sg;
      ctx.fillRect(x, y, ww, wh);
      const base = y + wh;
      for (const [layer, color] of [[far, sky.far], [near, sky.near]]) {
        ctx.fillStyle = rgb(color);
        for (const b of layer) {
          ctx.fillRect(x + b.x, base - b.h, b.w, b.h);
          if (b.crown) ctx.fillRect(x + b.x + b.w * 0.4, base - b.h - 14, b.w * 0.2, 14);
        }
      }
      // Lit windows after dark, a few flickering on and off.
      if (sky.lit > 0.05) {
        for (const b of near) {
          const rand = rng(b.seed);
          for (let wy = base - b.h + 8; wy < base - 6; wy += 9) {
            for (let wx = b.x + 5; wx < b.x + b.w - 6; wx += 8) {
              const r = rand();
              if (r > 0.42) continue;
              const on = r < 0.4 || Math.sin(t * 0.0005 + r * 900) > 0;
              if (!on) continue;
              ctx.fillStyle = `rgba(255,214,150,${0.75 * sky.lit})`;
              ctx.fillRect(x + wx, wy, 3, 4);
            }
          }
        }
      }
    }

    function drawBlinds() {
      const { x, y, w: ww } = win;
      const segW = ww / SEGMENTS;
      for (let r = 0; r < tilts.length; r++) {
        const top = y + r * PITCH;
        for (let s = 0; s < SEGMENTS; s++) {
          const a = tilts[r][s];
          // A slat turned by `a` covers PITCH * sin(a) of its row (plus a little, so shut means shut).
          const cover = Math.min(PITCH, PITCH * Math.abs(Math.sin(a)) + 2.5);
          const sx = x + s * segW;
          const g = ctx.createLinearGradient(0, top, 0, top + cover);
          g.addColorStop(0, rgb(SLAT, 1));
          g.addColorStop(0.55, rgb(mix(SLAT, [255, 255, 255], 0.5), 1));
          g.addColorStop(1, rgb(mix(SLAT, [150, 156, 164], 0.35), 1));
          ctx.fillStyle = g;
          ctx.fillRect(sx - 0.5, top, segW + 1, cover);
        }
      }
      // Ladder strings and the cords.
      ctx.strokeStyle = 'rgba(120,126,134,0.35)';
      ctx.lineWidth = 1;
      for (const f of [0.2, 0.5, 0.8]) {
        ctx.beginPath();
        ctx.moveTo(x + ww * f, y);
        ctx.lineTo(x + ww * f, y + win.h);
        ctx.stroke();
      }
    }

    function drawFrame() {
      const { x, y, w: ww, h: wh } = win;
      if (w < 1024) return;
      ctx.strokeStyle = rgb(FRAME);
      ctx.lineWidth = 10;
      ctx.strokeRect(x - 5, y - 5, ww + 10, wh + 10);
      ctx.fillStyle = rgb(FRAME);
      ctx.fillRect(x + ww / 2 - 4, y, 8, wh); // mullion
      ctx.fillStyle = 'rgba(20,20,19,0.08)';
      ctx.fillRect(x - 10, y + wh + 5, ww + 20, 6); // sill shadow
    }

    // Light through the gaps, thrown down and to the left across the wall.
    function drawLightOnWall() {
      if (w < 1024) return;
      const { x, y } = win;
      const k = sky.sun;
      const dx = -w * 0.5; // how far left the bars reach
      const dy = h * 0.22; // and how far they drop on the way
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, x - 10, h);
      ctx.clip();
      for (let r = 0; r < tilts.length; r += 1) {
        const row = tilts[r];
        // The third of the slat nearest the wall decides the bar.
        let shut = 0;
        for (let s = 0; s < SEGMENTS / 3; s++) shut += Math.abs(Math.sin(row[s]));
        shut /= SEGMENTS / 3;
        const open = 1 - shut;
        const gap = PITCH * open - 2.5;
        if (gap <= 0.3) continue;
        const top = y + r * PITCH;
        const a = 0.5 * k * Math.min(1, open * 1.6);
        const g = ctx.createLinearGradient(x, 0, x + dx, 0);
        g.addColorStop(0, `rgba(255,252,244,${a})`);
        g.addColorStop(1, 'rgba(255,252,244,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, top + gap * 1.4);
        ctx.lineTo(x + dx, top + dy + gap * 2.2);
        ctx.lineTo(x + dx, top + dy);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    function draw(t) {
      ctx.fillStyle = rgb(WALL);
      ctx.fillRect(0, 0, w, h);
      if (w >= 1024) {
        // The wall is a touch darker than the page, so the light reads.
        ctx.fillStyle = 'rgba(20,20,19,0.035)';
        ctx.fillRect(0, 0, w, h);
      }
      drawLightOnWall();
      drawCity(t);
      drawBlinds();
      drawFrame();
    }

    let last = performance.now();
    function frame(t) {
      const dt = Math.min(t - last, 50);
      last = t;
      for (let i = waves.length - 1; i >= 0; i--) if (t - waves[i].t0 > WAVE_MS) waves.splice(i, 1);
      const ease = Math.min(1, dt / 120);
      for (let r = 0; r < tilts.length; r++) {
        for (let s = 0; s < SEGMENTS; s++) tilts[r][s] += (target(r, s, t) - tilts[r][s]) * ease;
      }
      draw(t);
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
      waves.push({ x: e.detail.x - rect.left, y: e.detail.y - rect.top, t0: performance.now() });
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
