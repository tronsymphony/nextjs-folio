'use client';

import { useEffect, useRef } from 'react';

// Background for the sync hero: white vertical blinds across the hero with a
// warm sun behind them, light showing through the gaps. The slats hang from
// the top and swing in gusts of wind (each one a damped spring, so they lag and overshoot),
// get pushed when the cursor brushes past, and turn open in a wave from
// wherever a `casa:sync` window event says (SyncDemo sends one when an order
// lands in NetSuite). Dust drifts in the light. A still frame with reduced
// motion; paused while off screen or in a hidden tab. 2D canvas.

const PITCH = 72; // px from one slat to the next
const CLOSED = 0.2; // resting turn (0 = fully closed), radians
const WIND = 34; // px a steady gust pushes the bottom of a slat
const STIFFNESS = 0.000006; // spring toward the wind's push: a swing takes ~2.5 s
const DAMPING = 0.0015;
const WAVE_MS = 2200;
const WAVE_SPEED = 0.45; // px per ms
const MOTES = 40;

const CANVAS = [244, 242, 238];
const SLAT = [250, 246, 238]; // white, a little warm in the sun

const shade = (rgb, d) => `rgb(${rgb.map((c) => Math.max(0, Math.min(255, Math.round(c + d)))).join(',')})`;

export default function HeroBlinds({ className = '' }) {
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
    let slats = []; // { tilt, swing (px at the bottom), v }
    const waves = [];
    const motes = [];
    let R = 1; // hero diagonal

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      slats = Array.from({ length: Math.ceil(w / PITCH) + 1 }, () => ({ tilt: CLOSED, swing: 0, v: 0 }));
      motes.length = 0;
      for (let i = 0; i < MOTES; i++) {
        motes.push({ x: Math.random() * w, y: Math.random() * h, vx: 0.004 + Math.random() * 0.01, vy: -0.004 + Math.random() * 0.008, r: 0.6 + Math.random() * 1.2, p: Math.random() * 6.28 });
      }
      R = Math.hypot(w, h);
      if (still) draw(performance.now());
    }

    // Where the sun sits and how bright it is: drifts slowly, and "clouds"
    // (a few slow sines) dim it now and then.
    function sun(t) {
      const s = t / 1000;
      return {
        x: w * (0.78 + 0.03 * Math.sin(s * 0.05)),
        y: h * (0.28 + 0.04 * Math.sin(s * 0.037)),
        k: 0.85 + 0.15 * Math.sin(s * 0.21) * Math.sin(s * 0.13 + 1),
      };
    }

    // Wind at a slat, 0 to about 1: gusts that roll across from the left,
    // stronger and calmer spells, and a little flutter of its own.
    function wind(i, x, t) {
      const spell = 0.55 + 0.45 * Math.sin(t * 0.00021) * Math.sin(t * 0.00009 + 2);
      const gust = Math.max(0, Math.sin(t * 0.0011 - x * 0.006)) ** 2;
      const flutter = 0.15 * Math.sin(t * 0.004 + i * 1.7);
      return spell * (0.25 + 0.75 * gust) + flutter * spell;
    }

    function targetTilt(i, x, t, gust) {
      let a = CLOSED + 0.35 * gust;
      if (pointer) {
        const near = Math.max(0, 1 - Math.abs(x - pointer.x) / 200);
        a += 0.6 * near * near;
      }
      for (const wv of waves) {
        const age = t - wv.t0;
        const off = Math.abs(Math.abs(x - wv.x) - age * WAVE_SPEED);
        if (off < 110) a += 0.9 * (1 - off / 110) * (1 - age / WAVE_MS);
      }
      return Math.min(a, 1.3);
    }

    function draw(t) {
      const s = sun(t);

      // The light behind the blinds.
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R * 0.75);
      g.addColorStop(0, `rgba(255,248,226,${s.k})`);
      g.addColorStop(0.12, `rgba(255,220,160,${0.95 * s.k})`);
      g.addColorStop(0.38, `rgba(240,140,80,${0.55 * s.k})`);
      g.addColorStop(0.75, `rgba(${CANVAS},1)`);
      ctx.fillStyle = `rgb(${CANVAS})`;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Dust in the light (drawn before the slats, so it only shows in gaps).
      for (const m of motes) {
        const near = Math.max(0, 1 - Math.hypot(m.x - s.x, m.y - s.y) / (R * 0.5));
        if (near <= 0) continue;
        ctx.fillStyle = `rgba(255,250,235,${0.8 * near * (0.6 + 0.4 * Math.sin(t * 0.002 + m.p))})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 6.283);
        ctx.fill();
      }

      // Slats: hung from the top, the bottom pushed sideways by `swing`. Each
      // covers PITCH * cos(turn) of its column; the rest is gap. Slats near
      // the sun glow through a little, and the edge turned toward it is lit.
      const warm = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R * 0.6);
      warm.addColorStop(0, `rgba(255,214,150,${0.4 * s.k})`);
      warm.addColorStop(1, 'rgba(255,214,150,0)');
      for (let i = 0; i < slats.length; i++) {
        const { tilt, swing } = slats[i];
        const x = i * PITCH;
        const wid = PITCH * Math.cos(tilt) * 0.97;
        const left = x + (PITCH - wid) / 2;
        const glow = Math.max(0, 1 - Math.abs(x - s.x) / w) * s.k;
        const lift = 8 + 18 * glow;
        const towardSun = x + PITCH / 2 < s.x;
        const lit = shade(SLAT, lift + 6);
        const dark = shade(SLAT, -12 - 14 * tilt);

        ctx.beginPath();
        ctx.moveTo(left, 0);
        ctx.lineTo(left + wid, 0);
        ctx.lineTo(left + wid + swing, h);
        ctx.lineTo(left + swing, h);
        ctx.closePath();

        const sg = ctx.createLinearGradient(left + swing / 2, 0, left + wid + swing / 2, 0);
        sg.addColorStop(0, towardSun ? dark : lit);
        sg.addColorStop(0.5, shade(SLAT, 0));
        sg.addColorStop(1, towardSun ? lit : dark);
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.fillStyle = warm;
        ctx.fill();

        // Thin shadow along the edge away from the sun.
        ctx.strokeStyle = 'rgba(20,20,19,0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const ex = towardSun ? left : left + wid;
        ctx.moveTo(ex, 0);
        ctx.lineTo(ex + swing, h);
        ctx.stroke();
      }
    }

    let last = performance.now();
    function frame(t) {
      const dt = Math.min(t - last, 50);
      last = t;
      for (let i = waves.length - 1; i >= 0; i--) if (t - waves[i].t0 > WAVE_MS) waves.splice(i, 1);
      for (let i = 0; i < slats.length; i++) {
        const sl = slats[i];
        const x = i * PITCH + PITCH / 2;
        const gust = wind(i, x, t);
        sl.v += ((WIND * gust - sl.swing) * STIFFNESS - sl.v * DAMPING) * dt;
        sl.swing += sl.v * dt;
        sl.tilt += (targetTilt(i, x, t, gust) - sl.tilt) * Math.min(1, dt / 140);
      }
      for (const m of motes) {
        m.x += m.vx * dt + Math.sin(t * 0.0004 + m.p) * 0.02;
        m.y += m.vy * dt;
        if (m.x > w + 5) m.x = -5;
        if (m.y < -5) m.y = h + 5;
        if (m.y > h + 5) m.y = -5;
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

    // The cursor brushing past pushes the slats it crosses.
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const next = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (pointer && !still) {
        const dx = Math.max(-40, Math.min(40, next.x - pointer.x));
        for (let i = 0; i < slats.length; i++) {
          const near = Math.max(0, 1 - Math.abs(i * PITCH + PITCH / 2 - next.x) / 90);
          slats[i].v = Math.max(-0.12, Math.min(0.12, slats[i].v + dx * near * 0.002));
        }
      }
      pointer = next;
    };
    const onLeave = () => (pointer = null);
    const onSync = (e) => {
      if (still) return;
      const rect = canvas.getBoundingClientRect();
      waves.push({ x: e.detail.x - rect.left, t0: performance.now() });
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
