"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  buildDNA, buildNeuralNet, buildGear, buildShield, buildGlobe,
  buildPyramid, buildSatellites, buildGridPanels, buildCrystal,
  buildWaveRibbon, buildSignalTower,
} from "../lib/buildObjects";

gsap.registerPlugin(ScrollTrigger);

const CONFIGS = [
  { cam: [0,0,7],    rot:[0,0],       col:0x89E900, em:0x5a9900, fog:0.030, objIdx:0  }, // Hero1 — DNA
  { cam: [2,1.2,5],  rot:[0.25,1.26], col:0xaaf033, em:0x4a7700, fog:0.028, objIdx:1  }, // Hero2 — Neural
  { cam:[-2,-1,5.5], rot:[-0.2,2.51], col:0x6db800, em:0x3d6600, fog:0.032, objIdx:2  }, // Hero3 — Gear
  { cam:[0,1.8,8],   rot:[0.45,3.77], col:0x5a9900, em:0x2e5200, fog:0.025, objIdx:3  }, // Hero4 — Shield
  { cam:[0,0,6],     rot:[0,5.65],    col:0x89E900, em:0x5a9900, fog:0.030, objIdx:4  }, // Hero5 — Globe
  { cam:[3,0.5,6],   rot:[0.1,6.8],   col:0x89E900, em:0x3d6600, fog:0.022, objIdx:5  }, // About — Pyramid
  { cam:[-3,-0.5,5], rot:[-0.15,8.2], col:0x6db800, em:0x2a0faa, fog:0.028, objIdx:6  }, // Services — Satellites
  { cam:[0,-1.5,7],  rot:[0.3,9.4],   col:0x89E900, em:0x5a9900, fog:0.020, objIdx:7  }, // Portfolio — Panels
  { cam:[2,1,5.5],   rot:[-0.2,10.8], col:0x89E900, em:0x5a9900, fog:0.026, objIdx:8  }, // Values — Crystal
  { cam:[-1,0.5,6],  rot:[0.1,12.0],  col:0x89E900, em:0x5a9900, fog:0.024, objIdx:9  }, // Testimonials — Wave
  { cam:[0,0,5.5],   rot:[0,13.2],    col:0xe8e8e8, em:0x89E900, fog:0.030, objIdx:10 }, // Contact — Tower
];

export default function WorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ─────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x222222, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const fog    = new THREE.FogExp2(0x222222, 0.030);
    scene.fog    = fog;
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    camera.position.set(0, 0, 7);

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Lights ───────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xe8e8e8, 0.4));
    const dir = new THREE.DirectionalLight(0x89E900, 2);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    const pt1 = new THREE.PointLight(0x89E900, 5, 30);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0xe8e8e8, 3, 25);
    pt2.position.set(4, -3, -4);
    scene.add(pt2);

    /* ── Groups ───────────────────────────────────────────────────── */
    const mouseGroup = new THREE.Group();
    const gsapGroup  = new THREE.Group();
    mouseGroup.add(gsapGroup);
    scene.add(mouseGroup);

    /* ── Build all custom objects ─────────────────────────────────── */
    const OBJECTS = [
      buildDNA(),          // 0
      buildNeuralNet(),    // 1
      buildGear(),         // 2
      buildShield(),       // 3
      buildGlobe(),        // 4
      buildPyramid(),      // 5
      buildSatellites(),   // 6
      buildGridPanels(),   // 7
      buildCrystal(),      // 8
      buildWaveRibbon(),   // 9
      buildSignalTower(),  // 10
    ];

    // Add all to gsapGroup but hide all except first
    OBJECTS.forEach((obj, i) => {
      obj.visible = i === 0;
      gsapGroup.add(obj);
    });

    /* ── Particles ────────────────────────────────────────────────── */
    const pPos = new Float32Array(2500 * 3);
    for (let i = 0; i < pPos.length; i++) pPos[i] = (Math.random() - 0.5) * 45;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: 0xe8e8e8, size: 0.022, transparent: true, opacity: 0.25 }));
    scene.add(particles);

    /* ── Grid floor ───────────────────────────────────────────────── */
    const grid = new THREE.GridHelper(60, 60, 0x89E900, 0x89E900);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.04;
    grid.position.y = -6;
    scene.add(grid);

    /* ── Mouse parallax ───────────────────────────────────────────── */
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("mousemove", e => {
      mx = (e.clientX / innerWidth  - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    });

    /* ── Section transition ───────────────────────────────────────── */
    let curSection = -1;
    let curObjIdx  = 0;

    const goSection = (sectionIdx: number) => {
      if (curSection === sectionIdx) return;
      curSection = sectionIdx;
      const cfg = CONFIGS[sectionIdx] || CONFIGS[0];

      // Camera
      gsap.to(camera.position, {
        x: cfg.cam[0], y: cfg.cam[1], z: cfg.cam[2],
        duration: 1.6, ease: "power3.inOut",
      });

      // Group rotation
      gsap.to(gsapGroup.rotation, {
        x: cfg.rot[0], y: cfg.rot[1],
        duration: 2.0, ease: "power3.inOut",
      });

      // Fog
      gsap.to(fog, { density: cfg.fog, duration: 1.5 });

      // Light color
      gsap.to(pt1.color, {
        r: ((cfg.col >> 16) & 255) / 255,
        g: ((cfg.col >> 8)  & 255) / 255,
        b: ( cfg.col        & 255) / 255,
        duration: 1.2,
      });

      // Object swap
      const nextIdx = cfg.objIdx;
      if (nextIdx !== curObjIdx) {
        const outObj = OBJECTS[curObjIdx];
        const inObj  = OBJECTS[nextIdx];

        // Scale out current
        gsap.to(outObj.scale, {
          x: 0, y: 0, z: 0, duration: 0.45, ease: "power2.in",
          onComplete: () => { outObj.visible = false; },
        });

        // Scale in next
        inObj.visible = true;
        inObj.scale.set(0, 0, 0);
        gsap.to(inObj.scale, {
          x: 1, y: 1, z: 1,
          duration: 0.7, delay: 0.3, ease: "back.out(1.5)",
        });

        curObjIdx = nextIdx;
      }
    };

    /* ── ScrollTrigger — hero sections ───────────────────────────── */
    for (let i = 0; i < 5; i++) {
      ScrollTrigger.create({
        trigger: `#ss-${i}`,
        start: "top 55%", end: "bottom 45%",
        onEnter:     () => goSection(i),
        onEnterBack: () => goSection(i),
      });
    }

    /* ── ScrollTrigger — content sections ────────────────────────── */
    [
      { id: "#about",        idx: 5  },
      { id: "#services",     idx: 6  },
      { id: "#portfolio",    idx: 7  },
      { id: "#values-sec",   idx: 8  },
      { id: "#testimonials", idx: 9  },
      { id: "#contact",      idx: 10 },
    ].forEach(({ id, idx }) => {
      const el = document.querySelector(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%", end: "bottom 40%",
        onEnter:     () => goSection(idx),
        onEnterBack: () => goSection(idx),
      });
    });

    /* ── Render loop ──────────────────────────────────────────────── */
    let raf: number;
    let elapsed = 0;
    let last = performance.now();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;

      // Animate current object
      const obj = OBJECTS[curObjIdx];

      // DNA — rotate whole group
      if (curObjIdx === 0) obj.rotation.y = elapsed * 0.4;

      // Neural net — pulse nodes
      if (curObjIdx === 1) obj.rotation.y = elapsed * 0.25;

      // Gear — rotate individual gears
      if (curObjIdx === 2 && (obj as any)._gears) {
        (obj as any)._gears.forEach((g: any) => {
          g.mesh.rotation.z += g.spd * 0.016;
        });
      }

      // Shield — slow rotation
      if (curObjIdx === 3) { obj.rotation.y = elapsed * 0.3; obj.rotation.x = Math.sin(elapsed * 0.5) * 0.15; }

      // Globe — rotate + orbit rings
      if (curObjIdx === 4) {
        obj.children.forEach((c, i) => {
          if (c instanceof THREE.Mesh && c.geometry instanceof THREE.TorusGeometry) {
            c.rotation.z = elapsed * (0.3 + i * 0.1);
          }
        });
        obj.rotation.y = elapsed * 0.15;
      }

      // Pyramid — float up/down
      if (curObjIdx === 5) obj.position.y = Math.sin(elapsed * 0.8) * 0.15;

      // Satellites — orbit
      if (curObjIdx === 6) {
        obj.children.forEach(c => {
          if ((c as any)._angle !== undefined) {
            (c as any)._angle += 0.008;
            const a = (c as any)._angle;
            c.position.set(Math.cos(a) * 2.2, Math.sin(a * 0.5) * 0.4, Math.sin(a) * 2.2);
          }
        });
        obj.rotation.y = elapsed * 0.1;
      }

      // Grid panels — float individually
      if (curObjIdx === 7) {
        obj.children.forEach(c => {
          if ((c as any)._floatOffset !== undefined) {
            c.position.z = Math.sin(elapsed * (c as any)._floatSpeed + (c as any)._floatOffset) * 0.3;
          }
        });
      }

      // Crystal — rotate + pulse
      if (curObjIdx === 8) {
        obj.rotation.y = elapsed * 0.35;
        obj.rotation.x = Math.sin(elapsed * 0.6) * 0.2;
      }

      // Wave ribbon — animate wave
      if (curObjIdx === 9) obj.rotation.y = elapsed * 0.2;

      // Signal tower — pulse rings
      if (curObjIdx === 10) {
        obj.children.forEach(c => {
          if ((c as any)._pulseOffset !== undefined) {
            const s = 1 + Math.sin(elapsed * 2 + (c as any)._pulseOffset) * 0.15;
            c.scale.set(s, s, s);
            ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
              0.4 + Math.sin(elapsed * 2 + (c as any)._pulseOffset) * 0.2;
          }
        });
      }

      // Particles drift
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.007;

      // Mouse parallax
      tmx += (mx - tmx) * 0.055;
      tmy += (my - tmy) * 0.055;
      mouseGroup.rotation.y = tmx * 0.20;
      mouseGroup.rotation.x = -tmy * 0.13;

      // Orbiting lights
      pt1.position.x = Math.sin(elapsed * 0.55) * 6;
      pt1.position.z = Math.cos(elapsed * 0.55) * 6;
      pt1.position.y = Math.sin(elapsed * 0.3) * 3;
      pt2.position.x = Math.cos(elapsed * 0.38) * 5;
      pt2.position.z = Math.sin(elapsed * 0.38) * 5;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
  );
}
