"use client";

import { useEffect, useRef } from "react";

// Fixed full-screen canvas: drifting, twinkling particles that react slightly to the mouse.
export default function ParticleField({ density = 9000 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, dpr, particles = [], raf;
    const mouse = { x: 0, y: 0 };

    const make = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -Math.random() * 0.18 - 0.03,
      depth: Math.random() * 0.9 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      warm: Math.random() < 0.12,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.round((w * h) / density) }, make);
    };

    const onMove = (e) => {
      mouse.x = (e.clientX / w - 0.5) * 2;
      mouse.y = (e.clientY / h - 0.5) * 2;
    };

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        const px = p.x + mouse.x * 14 * p.depth;
        const py = p.y + mouse.y * 14 * p.depth;
        const a = (0.35 + 0.65 * Math.abs(Math.sin(p.phase + t * p.speed))) * p.depth;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? `rgba(255,104,69,${a})` : `rgba(255,255,255,${a * 0.9})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} className="particle-canvas" aria-hidden="true" />;
}