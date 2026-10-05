'use client';

import { useEffect, useRef, useState } from 'react';

// Homepage hero background: slow-drifting topographic contour lines drawn by a
// single WebGL2 fragment shader (no library). Lines near the pointer brighten
// toward the accent colour. It pauses when off screen or in a hidden tab,
// draws one still frame for reduced motion, and renders nothing without
// WebGL2, leaving the hero's CSS background on its own.

const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec2 pointer = uPointer * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.025;

  vec2 p = uv * 1.35 + (uPointer - 0.5) * 0.12;
  float h = fbm(p + vec2(t, -t * 0.7) + fbm(p * 0.6 - t) * 0.7);

  float bands = 24.0;
  float v = h * bands;
  float f = fract(v);
  float w = fwidth(v);
  float line = 1.0 - smoothstep(0.0, w * 1.4, min(f, 1.0 - f));
  float major = 1.0 - step(0.5, mod(floor(v + 0.5), 5.0));

  float near = smoothstep(0.42, 0.0, distance(uv, pointer));
  vec3 paper = vec3(0.949, 0.941, 0.922);
  vec3 accent = vec3(1.0, 0.353, 0.122);
  vec3 col = mix(paper, accent, near * 0.85);
  float alpha = line * (0.07 + major * 0.08 + near * 0.35);

  outColor = vec4(col * alpha, alpha);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'shader compile failed');
  }
  return shader;
}

export default function HeroField({ className = '' }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', { antialias: false, premultipliedAlpha: true, alpha: true });
    if (!gl) return;

    let program;
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link failed');
    } catch (err) {
      console.error('Hero field failed to start:', err);
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the whole viewport.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uPointer = gl.getUniformLocation(program, 'uPointer');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.72, y: 0.55 };
    const target = { x: 0.72, y: 0.55 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
    };

    let frame = 0;
    let visible = true;
    let first = true;
    const start = performance.now();

    const draw = (now) => {
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      gl.uniform1f(uTime, reduceMotion ? 12 : (now - start) / 1000 + 12);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (first) {
        first = false;
        setReady(true);
      }
    };

    const loop = (now) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!frame && visible && !document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', resume);
    if (reduceMotion) draw(performance.now());
    else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', resume);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full transition-opacity duration-[2000ms] ease-out ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
