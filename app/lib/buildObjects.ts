import * as THREE from "three";

// ─── Shared materials helper ──────────────────────────────────────────────────
const mat = (color: number, emissive: number, opacity = 1) =>
  new THREE.MeshStandardMaterial({
    color, metalness: 0.85, roughness: 0.15,
    emissive, emissiveIntensity: 0.5,
    transparent: opacity < 1, opacity,
  });

const wireMat = (color: number, opacity = 0.12) =>
  new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

const lineMat = (color: number, opacity = 0.6) =>
  new THREE.LineBasicMaterial({ color, transparent: true, opacity });

// ─── 1. DNA Double Helix ──────────────────────────────────────────────────────
export function buildDNA(): THREE.Group {
  const g = new THREE.Group();
  const turns = 4, pointsPerTurn = 20, total = turns * pointsPerTurn;
  const radius = 0.8, height = 4;

  const sphereGeo = new THREE.SphereGeometry(0.07, 8, 8);
  const matA = mat(0x89E900, 0x5a9900);
  const matB = mat(0xe8e8e8, 0x6db800);

  for (let i = 0; i < total; i++) {
    const t = i / total;
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;

    // Strand A
    const sA = new THREE.Mesh(sphereGeo, matA);
    sA.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    g.add(sA);

    // Strand B (offset by π)
    const sB = new THREE.Mesh(sphereGeo, matB);
    sB.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
    g.add(sB);

    // Rungs every 4 steps
    if (i % 4 === 0) {
      const pA = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const pB = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      const rungGeo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
      g.add(new THREE.Line(rungGeo, lineMat(0xaaf033, 0.5)));
    }
  }

  // Backbone tubes
  const ptsA: THREE.Vector3[] = [], ptsB: THREE.Vector3[] = [];
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;
    ptsA.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    ptsB.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
  }
  const tubeA = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsA), 120, 0.025, 6, false);
  const tubeB = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsB), 120, 0.025, 6, false);
  g.add(new THREE.Mesh(tubeA, mat(0x89E900, 0x5a9900, 0.8)));
  g.add(new THREE.Mesh(tubeB, mat(0xe8e8e8, 0x6db800, 0.8)));

  return g;
}

// ─── 2. Neural Network ────────────────────────────────────────────────────────
export function buildNeuralNet(): THREE.Group {
  const g = new THREE.Group();
  const layers = [3, 5, 5, 3];
  const nodePositions: THREE.Vector3[] = [];
  const nodeGeo = new THREE.SphereGeometry(0.1, 12, 12);

  layers.forEach((count, li) => {
    const x = (li - (layers.length - 1) / 2) * 1.4;
    for (let ni = 0; ni < count; ni++) {
      const y = (ni - (count - 1) / 2) * 0.7;
      const pos = new THREE.Vector3(x, y, (Math.random() - 0.5) * 0.4);
      nodePositions.push(pos);
      const node = new THREE.Mesh(nodeGeo, mat(li % 2 === 0 ? 0x89E900 : 0xe8e8e8, 0x5a9900));
      node.position.copy(pos);
      g.add(node);

      // Glow ring around each node
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.16, 0.012, 6, 32),
        new THREE.MeshBasicMaterial({ color: 0x89E900, transparent: true, opacity: 0.3 })
      );
      ring.position.copy(pos);
      g.add(ring);
    }
  });

  // Connections between adjacent layers
  let offset = 0;
  for (let li = 0; li < layers.length - 1; li++) {
    const countA = layers[li], countB = layers[li + 1];
    for (let a = 0; a < countA; a++) {
      for (let b = 0; b < countB; b++) {
        const pA = nodePositions[offset + a];
        const pB = nodePositions[offset + countA + b];
        const geo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
        g.add(new THREE.Line(geo, lineMat(0x89E900, 0.18)));
      }
    }
    offset += countA;
  }

  return g;
}

// ─── 3. Gear / Cog Mechanism ─────────────────────────────────────────────────
export function buildGear(): THREE.Group {
  const g = new THREE.Group();

  const makeGear = (teeth: number, r: number, color: number) => {
    const shape = new THREE.Shape();
    const toothH = r * 0.22, toothW = (Math.PI * 2 / teeth) * 0.35;
    for (let i = 0; i < teeth; i++) {
      const a0 = (i / teeth) * Math.PI * 2;
      const a1 = a0 + toothW;
      const a2 = a0 + (Math.PI * 2 / teeth) - toothW;
      const a3 = a0 + (Math.PI * 2 / teeth);
      if (i === 0) shape.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
      shape.lineTo(Math.cos(a0) * r, Math.sin(a0) * r);
      shape.lineTo(Math.cos(a1) * (r + toothH), Math.sin(a1) * (r + toothH));
      shape.lineTo(Math.cos(a2) * (r + toothH), Math.sin(a2) * (r + toothH));
      shape.lineTo(Math.cos(a3) * r, Math.sin(a3) * r);
    }
    shape.closePath();
    // Hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, r * 0.3, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.25, bevelEnabled: false });
    return new THREE.Mesh(geo, mat(color, 0x5a9900));
  };

  const g1 = makeGear(12, 1.0, 0x89E900);
  g1.position.set(0, 0, 0);
  g.add(g1);

  const g2 = makeGear(8, 0.65, 0xe8e8e8);
  g2.position.set(1.75, 0, 0);
  g.add(g2);

  const g3 = makeGear(6, 0.5, 0xaaf033);
  g3.position.set(-1.55, 0, 0);
  g.add(g3);

  // Store refs for animation
  (g as any)._gears = [
    { mesh: g1, spd: 0.4 },
    { mesh: g2, spd: -0.6 },
    { mesh: g3, spd: -0.8 },
  ];

  return g;
}

// ─── 4. Shield with Circuit Lines ────────────────────────────────────────────
export function buildShield(): THREE.Group {
  const g = new THREE.Group();

  // Shield body
  const shape = new THREE.Shape();
  shape.moveTo(0, 2);
  shape.bezierCurveTo(1.5, 2, 1.8, 1, 1.8, 0);
  shape.bezierCurveTo(1.8, -1.2, 0.8, -2, 0, -2.5);
  shape.bezierCurveTo(-0.8, -2, -1.8, -1.2, -1.8, 0);
  shape.bezierCurveTo(-1.8, 1, -1.5, 2, 0, 2);

  const shieldGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
  g.add(new THREE.Mesh(shieldGeo, mat(0x5a9900, 0x2e5200)));

  // Circuit lines on shield face
  const circuitPts = [
    [[-0.8, 0.5], [-0.3, 0.5], [-0.3, 1.0], [0.3, 1.0]],
    [[0.8, 0.5], [0.3, 0.5], [0.3, -0.2], [-0.5, -0.2]],
    [[-0.5, -0.2], [-0.5, -0.8], [0.2, -0.8]],
    [[0, 0.5], [0, -0.5]],
  ];
  circuitPts.forEach(pts => {
    const v3 = pts.map(p => new THREE.Vector3(p[0], p[1], 0.32));
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(v3), lineMat(0x89E900, 0.8)));
    // Node dots
    v3.forEach(p => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), mat(0x89E900, 0x5a9900));
      dot.position.copy(p);
      g.add(dot);
    });
  });

  // Center emblem
  const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), mat(0x89E900, 0x5a9900));
  emblem.position.set(0, 0, 0.5);
  g.add(emblem);

  return g;
}

// ─── 5. Globe with Orbit Rings ────────────────────────────────────────────────
export function buildGlobe(): THREE.Group {
  const g = new THREE.Group();

  // Globe sphere
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.7, emissive: 0x0a1f44, emissiveIntensity: 0.4 })
  );
  g.add(globe);

  // Wireframe latitude/longitude lines
  g.add(new THREE.Mesh(new THREE.SphereGeometry(1.22, 16, 16), wireMat(0x89E900, 0.15)));

  // Orbit rings at different inclinations
  [[0, 0, 0], [Math.PI / 3, 0, 0], [Math.PI / 6, Math.PI / 4, 0]].forEach((rot, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.6 + i * 0.35, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0x89E900 : 0xe8e8e8, transparent: true, opacity: 0.35 - i * 0.08 })
    );
    ring.rotation.set(rot[0], rot[1], rot[2]);
    g.add(ring);

    // Satellite on each ring
    const sat = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.18), mat(0xe8e8e8, 0x6db800));
    sat.position.set(1.6 + i * 0.35, 0, 0);
    ring.add(sat);
  });

  // Location dots
  const dotGeo = new THREE.SphereGeometry(0.045, 6, 6);
  const dotMat = mat(0x89E900, 0x5a9900);
  [[0.3, 0.8, 0.9], [-0.7, 0.5, 0.85], [0.9, -0.3, 0.7], [-0.4, -0.7, 0.8], [0.6, 0.6, 0.75]].forEach(p => {
    const v = new THREE.Vector3(p[0], p[1], p[2]).normalize().multiplyScalar(1.25);
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(v);
    g.add(dot);
    // Pulse ring
    const pulse = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.008, 6, 24), new THREE.MeshBasicMaterial({ color: 0x89E900, transparent: true, opacity: 0.5 }));
    pulse.position.copy(v);
    pulse.lookAt(0, 0, 0);
    g.add(pulse);
  });

  return g;
}

// ─── 6. Layered Pyramid (About) ───────────────────────────────────────────────
export function buildPyramid(): THREE.Group {
  const g = new THREE.Group();
  const layers = 5;
  const colors = [0x89E900, 0x6db800, 0xaaf033, 0x5a9900, 0xe8e8e8];

  for (let i = 0; i < layers; i++) {
    const scale = 1 - i * 0.16;
    const y = i * 0.55 - (layers * 0.55) / 2;
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(scale * 1.4, scale * 1.5, 0.18, 6),
      mat(colors[i], 0x5a9900)
    );
    platform.position.y = y;
    g.add(platform);

    // Edge glow
    const edge = new THREE.Mesh(
      new THREE.TorusGeometry(scale * 1.45, 0.015, 6, 6),
      new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.6 })
    );
    edge.position.y = y;
    edge.rotation.x = Math.PI / 2;
    g.add(edge);
  }

  // Apex crystal
  const apex = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), mat(0xe8e8e8, 0x89E900));
  apex.position.y = layers * 0.55 / 2 + 0.3;
  g.add(apex);

  return g;
}

// ─── 7. 8 Orbiting Satellites (Services) ─────────────────────────────────────
export function buildSatellites(): THREE.Group {
  const g = new THREE.Group();

  // Core
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), mat(0x89E900, 0x5a9900));
  g.add(core);

  // Orbit ring
  g.add(new THREE.Mesh(
    new THREE.TorusGeometry(2.2, 0.008, 6, 80),
    new THREE.MeshBasicMaterial({ color: 0x89E900, transparent: true, opacity: 0.2 })
  ));

  const satColors = [0x89E900, 0xe8e8e8, 0xaaf033, 0x89E900, 0x89E900, 0x89E900, 0xaaf033, 0x6db800];
  const satGeos = [
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.OctahedronGeometry(0.15, 0),
    new THREE.TetrahedronGeometry(0.18, 0),
    new THREE.SphereGeometry(0.13, 8, 8),
    new THREE.ConeGeometry(0.12, 0.28, 5),
    new THREE.DodecahedronGeometry(0.14, 0),
    new THREE.BoxGeometry(0.18, 0.1, 0.28),
    new THREE.IcosahedronGeometry(0.14, 0),
  ];

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const sat = new THREE.Mesh(satGeos[i], mat(satColors[i], 0x5a9900));
    sat.position.set(Math.cos(angle) * 2.2, Math.sin(angle * 0.5) * 0.4, Math.sin(angle) * 2.2);
    (sat as any)._angle = angle;
    (sat as any)._idx = i;
    g.add(sat);
  }

  return g;
}

// ─── 8. Floating Grid Panels (Portfolio) ─────────────────────────────────────
export function buildGridPanels(): THREE.Group {
  const g = new THREE.Group();
  const cols = 4, rows = 3;
  const colors = [0x89E900, 0xe8e8e8, 0xaaf033, 0x89E900, 0x89E900, 0x89E900, 0xaaf033, 0x6db800, 0x89E900, 0xe8e8e8, 0xaaf033, 0x89E900];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 0.5),
        new THREE.MeshStandardMaterial({
          color: colors[idx % colors.length],
          metalness: 0.5, roughness: 0.3,
          emissive: colors[idx % colors.length],
          emissiveIntensity: 0.15,
          transparent: true, opacity: 0.7,
          side: THREE.DoubleSide,
        })
      );
      panel.position.set(
        (c - (cols - 1) / 2) * 0.9,
        (r - (rows - 1) / 2) * 0.7,
        (Math.random() - 0.5) * 0.8
      );
      panel.rotation.set(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        0
      );
      (panel as any)._floatOffset = Math.random() * Math.PI * 2;
      (panel as any)._floatSpeed  = 0.5 + Math.random() * 0.5;
      g.add(panel);

      // Border
      const border = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.7, 0.5)),
        new THREE.LineBasicMaterial({ color: colors[idx % colors.length], transparent: true, opacity: 0.8 })
      );
      border.position.copy(panel.position);
      border.rotation.copy(panel.rotation);
      g.add(border);
    }
  }

  return g;
}

// ─── 9. Crystal Lattice (Values) ─────────────────────────────────────────────
export function buildCrystal(): THREE.Group {
  const g = new THREE.Group();

  // Central large crystal
  const mainCrystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.MeshStandardMaterial({ color: 0x89E900, metalness: 0.9, roughness: 0.05, emissive: 0x5a9900, emissiveIntensity: 0.6, transparent: true, opacity: 0.85 })
  );
  g.add(mainCrystal);

  // Wireframe overlay
  g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.92, 0), wireMat(0xaaf033, 0.3)));

  // 6 satellite crystals
  const dirs = [
    [1.8, 0, 0], [-1.8, 0, 0],
    [0, 1.8, 0], [0, -1.8, 0],
    [0, 0, 1.8], [0, 0, -1.8],
  ];
  const satColors = [0x89E900, 0xaaf033, 0x89E900, 0xe8e8e8, 0x89E900, 0x89E900];
  dirs.forEach((d, i) => {
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.MeshStandardMaterial({ color: satColors[i], metalness: 0.9, roughness: 0.05, emissive: satColors[i], emissiveIntensity: 0.4, transparent: true, opacity: 0.8 })
    );
    crystal.position.set(d[0], d[1], d[2]);
    g.add(crystal);

    // Connecting beam
    const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(d[0], d[1], d[2])];
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(satColors[i], 0.4)));
  });

  return g;
}

// ─── 10. Wave Ribbon (Testimonials) ──────────────────────────────────────────
export function buildWaveRibbon(): THREE.Group {
  const g = new THREE.Group();
  const segments = 80, width = 5, amplitude = 0.6;

  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = (t - 0.5) * width;
    const y = Math.sin(t * Math.PI * 3) * amplitude;
    const z = Math.cos(t * Math.PI * 2) * 0.4;
    pts.push(new THREE.Vector3(x, y, z));
  }

  // Multiple ribbon layers
  [0x89E900, 0x89E900, 0xe8e8e8].forEach((color, li) => {
    const offsetPts = pts.map(p => new THREE.Vector3(p.x, p.y + li * 0.3 - 0.3, p.z + li * 0.2));
    const curve = new THREE.CatmullRomCurve3(offsetPts);
    const tube = new THREE.TubeGeometry(curve, 80, 0.04 - li * 0.01, 6, false);
    g.add(new THREE.Mesh(tube, mat(color, 0x5a9900, 0.85)));
  });

  // Floating nodes along the wave
  const nodeGeo = new THREE.SphereGeometry(0.07, 8, 8);
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const x = (t - 0.5) * width;
    const y = Math.sin(t * Math.PI * 3) * amplitude;
    const z = Math.cos(t * Math.PI * 2) * 0.4;
    const node = new THREE.Mesh(nodeGeo, mat(0x89E900, 0x5a9900));
    node.position.set(x, y, z);
    g.add(node);
  }

  return g;
}

// ─── 11. Signal Tower (Contact) ──────────────────────────────────────────────
export function buildSignalTower(): THREE.Group {
  const g = new THREE.Group();

  // Tower base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.4, 2.5, 8),
    mat(0xe8e8e8, 0x89E900)
  );
  g.add(base);

  // Tower top antenna
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.08, 1.2, 6),
    mat(0x89E900, 0x5a9900)
  );
  antenna.position.y = 1.85;
  g.add(antenna);

  // Signal rings (expanding outward)
  [0.6, 1.1, 1.7, 2.4].forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.018, 6, 48),
      new THREE.MeshBasicMaterial({ color: 0x89E900, transparent: true, opacity: 0.5 - i * 0.1 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.2;
    (ring as any)._pulseOffset = i * 0.5;
    g.add(ring);
  });

  // Base platform
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.08, 8),
    mat(0x89E900, 0x5a9900)
  );
  platform.position.y = -1.3;
  g.add(platform);

  // Support struts
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const strut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.4, 4),
      mat(0xe8e8e8, 0x6db800, 0.7)
    );
    strut.position.set(Math.cos(angle) * 0.35, -0.6, Math.sin(angle) * 0.35);
    strut.rotation.z = Math.cos(angle) * 0.4;
    strut.rotation.x = Math.sin(angle) * 0.4;
    g.add(strut);
  }

  return g;
}
