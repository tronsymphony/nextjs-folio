// Homepage hero scene: NetSuite as a core, the systems it feeds orbiting it,
// and data packets flowing both ways along the connections. Plain three.js,
// injected by HeroScene so the library is only fetched after hydration.
//
// Returns a cleanup function that stops the loop and frees all GPU resources.

const COLORS = {
  core: 0x60a5fa, // blue-400
  coreFill: 0x1d4ed8, // blue-700
  node: 0x67e8f9, // cyan-300
  outbound: 0x60a5fa, // NetSuite -> system
  inbound: 0x34d399, // system -> NetSuite (emerald-400)
  line: 0x3b82f6,
  dust: 0x94a3b8,
};

const SYSTEMS = ['Storefront', '3PL / WMS', 'CRM', 'EDI', 'Customer portal', 'Reporting'];
const NODE_RADIUS = 4;
const GRAPH_EXTENT = 4.8; // approx. radius of the graph including labels

function glowTexture(THREE) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeLabel(CSS2DObject, text, isCore) {
  const el = document.createElement('div');
  el.textContent = text;
  Object.assign(el.style, {
    font: `${isCore ? 600 : 500} ${isCore ? 11 : 10}px/1 ui-monospace, SFMono-Regular, Menlo, monospace`,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: isCore ? 'rgba(191,219,254,0.95)' : 'rgba(203,213,225,0.8)',
    padding: '4px 7px',
    border: `1px solid ${isCore ? 'rgba(96,165,250,0.45)' : 'rgba(96,165,250,0.2)'}`,
    background: 'rgba(5,5,5,0.65)',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.2s linear',
  });
  return new CSS2DObject(el);
}

export function createIntegrationScene({ THREE, CSS2DRenderer, CSS2DObject, mount, onFirstFrame }) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = () => mount.clientWidth < 1024;
  let lowPower = false;

  // --- Renderers -----------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = 'block';
  mount.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  Object.assign(labelRenderer.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none' });
  mount.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const glow = glowTexture(THREE);
  // Glows and packets skip the depth test so the solid core never hides them.
  const additive = { transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending };

  // graph: positioned per layout; tilt: fixed tilt; spin: slow rotation.
  const graph = new THREE.Group();
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.rotation.set(0.32, 0, -0.12);
  scene.add(graph);
  graph.add(tilt);
  tilt.add(spin);

  // --- Core (NetSuite) -----------------------------------------------------
  const core = new THREE.Group();
  spin.add(core);
  const coreWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.05, 1)),
    new THREE.LineBasicMaterial({ color: COLORS.core, transparent: true, opacity: 0.85 })
  );
  const coreFill = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.8, 2),
    new THREE.MeshBasicMaterial({ color: COLORS.coreFill, transparent: true, opacity: 0.35 })
  );
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: COLORS.core, opacity: 0.9, ...additive }));
  coreGlow.scale.setScalar(4.6);
  core.add(coreFill, coreWire, coreGlow);

  const rings = [1.75, 2.2].map((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.006, 6, 160),
      new THREE.MeshBasicMaterial({ color: COLORS.core, transparent: true, opacity: 0.3 - i * 0.1 })
    );
    ring.rotation.set(Math.PI / 2 + (i ? 0.5 : -0.2), i ? 0.4 : 0, 0);
    spin.add(ring);
    return ring;
  });

  const coreLabel = makeLabel(CSS2DObject, 'NetSuite', true);
  coreLabel.position.set(0, -1.65, 0);
  core.add(coreLabel);

  // --- Systems, connections, packets --------------------------------------
  const up = new THREE.Vector3(0, 1, 0);
  const nodes = SYSTEMS.map((name, i) => {
    // Evenly spread on a flattened sphere shell (golden-angle spiral).
    const phi = Math.acos(1 - (2 * (i + 0.5)) / SYSTEMS.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const position = new THREE.Vector3(
      NODE_RADIUS * Math.sin(phi) * Math.cos(theta),
      NODE_RADIUS * Math.cos(phi) * 0.55,
      NODE_RADIUS * Math.sin(phi) * Math.sin(theta)
    );

    const group = new THREE.Group();
    group.position.copy(position);
    const body = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.15, 0),
      new THREE.MeshBasicMaterial({ color: COLORS.node })
    );
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: COLORS.node, opacity: 0.55, ...additive }));
    halo.scale.setScalar(1.1);
    const label = makeLabel(CSS2DObject, name, false);
    label.position.set(0, 0.42, 0);
    group.add(body, halo, label);
    spin.add(group);

    // Gentle arc from the core's surface out to the node.
    const start = position.clone().normalize().multiplyScalar(1.1);
    const control = position.clone().multiplyScalar(0.5).add(new THREE.Vector3().crossVectors(position, up).normalize().multiplyScalar(0.9));
    const curve = new THREE.QuadraticBezierCurve3(start, control, position.clone());
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
      new THREE.LineBasicMaterial({ color: COLORS.line, transparent: true, opacity: 0.28 })
    );
    spin.add(line);

    return { group, body, halo, label, curve, pulse: 0 };
  });

  // Two outbound packets and one inbound per connection: two-way sync.
  const packets = [];
  nodes.forEach((node, n) => {
    [
      { dir: 1, offset: 0 },
      { dir: 1, offset: 0.5 },
      { dir: -1, offset: 0.25 },
    ].forEach(({ dir, offset }) => {
      packets.push({ node: n, dir, t: (offset + n * 0.17) % 1, speed: 0.11 + Math.random() * 0.07 });
    });
  });
  const packetPositions = new Float32Array(packets.length * 3);
  const packetColors = new Float32Array(packets.length * 3);
  packets.forEach((p, i) => new THREE.Color(p.dir > 0 ? COLORS.outbound : COLORS.inbound).toArray(packetColors, i * 3));
  const packetGeometry = new THREE.BufferGeometry();
  packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
  packetGeometry.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));
  const packetPoints = new THREE.Points(
    packetGeometry,
    new THREE.PointsMaterial({ size: 0.55, map: glow, vertexColors: true, sizeAttenuation: true, ...additive })
  );
  spin.add(packetPoints);

  // --- Ambient dust for depth ------------------------------------------------
  const dustCount = isSmall() ? 220 : 520;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const r = 6 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    dustPositions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.6, r * Math.sin(phi) * Math.sin(theta)], i * 3);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeometry,
    new THREE.PointsMaterial({ size: 0.05, color: COLORS.dust, transparent: true, opacity: 0.45, depthWrite: false })
  );
  graph.add(dust);

  // --- Layout ----------------------------------------------------------------
  function layout() {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(lowPower ? 1 : Math.min(window.devicePixelRatio, isSmall() ? 1.5 : 2));
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = `${w}px`;
    renderer.domElement.style.height = `${h}px`;
    labelRenderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    if (isSmall()) {
      // Behind the text on phones and tablets, no labels.
      graph.position.set(0, halfH * 0.18, 0);
      graph.scale.setScalar(THREE.MathUtils.clamp((halfW * 0.95) / GRAPH_EXTENT, 0.45, 1));
      labelRenderer.domElement.style.display = 'none';
    } else {
      // Right half of the hero, beside the headline.
      graph.position.set(halfW * 0.5, -0.1, 0);
      graph.scale.setScalar(THREE.MathUtils.clamp(Math.min((halfW * 0.46) / GRAPH_EXTENT, (halfH * 0.95) / (GRAPH_EXTENT * 0.75)), 0.6, 1.15));
      labelRenderer.domElement.style.display = '';
    }
  }

  // --- Interaction -------------------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (e) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  };
  if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

  // --- Frame update --------------------------------------------------------------
  const worldPos = new THREE.Vector3();
  const packetPos = new THREE.Vector3();
  let elapsed = 0;

  function update(dt) {
    elapsed += dt;

    spin.rotation.y += dt * 0.07;
    core.rotation.x += dt * 0.12;
    core.rotation.z += dt * 0.05;
    rings[0].rotation.z += dt * 0.15;
    rings[1].rotation.z -= dt * 0.1;
    dust.rotation.y -= dt * 0.012;
    coreGlow.scale.setScalar(4.6 + Math.sin(elapsed * 1.4) * 0.3);

    packets.forEach((p, i) => {
      const previous = p.t;
      p.t = (p.t + dt * p.speed) % 1;
      if (p.t < previous) {
        // A packet just arrived: pulse the node it reached.
        if (p.dir > 0) nodes[p.node].pulse = 1;
      }
      nodes[p.node].curve.getPoint(p.dir > 0 ? p.t : 1 - p.t, packetPos);
      packetPos.toArray(packetPositions, i * 3);
    });
    packetGeometry.attributes.position.needsUpdate = true;

    nodes.forEach((node) => {
      node.pulse *= Math.exp(-dt * 3);
      node.halo.scale.setScalar(1.1 + node.pulse * 0.9);
      node.halo.material.opacity = 0.55 + node.pulse * 0.4;
      // Fade labels on the far side of the core for a sense of depth.
      node.group.getWorldPosition(worldPos);
      const depth = THREE.MathUtils.clamp((worldPos.z + NODE_RADIUS) / (2 * NODE_RADIUS), 0, 1);
      node.label.element.style.opacity = String(0.25 + depth * 0.75);
    });

    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  }

  function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  // --- Loop control: run only while visible ----------------------------------------
  const clock = new THREE.Clock();
  let inView = true;
  let running = false;
  let firstFrame = true;
  // Adaptive quality: machines without a real GPU (blocklisted drivers,
  // remote desktops) drop to 1x pixel density if the first frames are slow.
  const probe = { frames: 0, time: 0, done: false };

  function tick() {
    const dt = clock.getDelta();
    if (!probe.done) {
      probe.frames++;
      probe.time += dt;
      if (probe.frames === 90) {
        probe.done = true;
        if (probe.time / probe.frames > 1 / 30 && renderer.getPixelRatio() > 1) {
          lowPower = true;
          layout();
        }
      }
    }
    update(Math.min(dt, 0.05));
    render();
    if (firstFrame) {
      firstFrame = false;
      onFirstFrame?.();
    }
  }

  function syncLoop() {
    const shouldRun = !reduceMotion && inView && !document.hidden;
    if (shouldRun === running) return;
    running = shouldRun;
    if (running) clock.getDelta(); // discard the time spent paused
    renderer.setAnimationLoop(running ? tick : null);
  }

  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncLoop();
  });
  intersection.observe(mount);
  document.addEventListener('visibilitychange', syncLoop);

  const resize = new ResizeObserver(() => {
    layout();
    if (!running) render();
  });
  resize.observe(mount);

  layout();
  if (reduceMotion) {
    // A single still frame with packets mid-flight.
    update(0);
    render();
    onFirstFrame?.();
  } else {
    syncLoop();
  }

  // --- Cleanup -----------------------------------------------------------------------
  return function dispose() {
    renderer.setAnimationLoop(null);
    intersection.disconnect();
    resize.disconnect();
    document.removeEventListener('visibilitychange', syncLoop);
    window.removeEventListener('pointermove', onPointerMove);
    scene.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) [].concat(object.material).forEach((m) => m.dispose());
    });
    glow.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    labelRenderer.domElement.remove();
  };
}
