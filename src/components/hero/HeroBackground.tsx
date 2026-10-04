"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { noise3D } from "./simplex";

const LEVELS = [-0.55, -0.4, -0.25, -0.1, 0.05, 0.2, 0.35, 0.5, 0.65];
const CELL = 14; // px por celda de la malla
const FPS = 30;

type Pt = [number, number];

/**
 * Modo A: curvas de nivel topográficas (ruido simplex + marching squares) en tinta-2 sobre tinta.
 * 30 fps máx; se pausa fuera de pantalla, con document.hidden y con el botón de pausa (WCAG 2.2.2).
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const drawRef = useRef<((t: number) => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) drawRef.current?.(performance.now());
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let raf = 0;
    let last = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = (now: number) => {
      const time = ((now - t0) / 1000) * 0.035; // muy lento
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          field[y * cols + x] =
            noise3D(x * 0.045, y * 0.06, time) * 0.75 +
            noise3D(x * 0.11, y * 0.13, time * 1.6) * 0.25;
        }
      }
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(37, 58, 112, 0.9)"; // tinta-2 con un punto más de luz para que se lea
      ctx.lineWidth = 1;
      ctx.beginPath();
      const seg = (p: Pt, q: Pt) => {
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
      };
      for (const lv of LEVELS) {
        for (let y = 0; y < rows - 1; y++) {
          for (let x = 0; x < cols - 1; x++) {
            const a = field[y * cols + x];
            const b = field[y * cols + x + 1];
            const c = field[(y + 1) * cols + x + 1];
            const d = field[(y + 1) * cols + x];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const px = x * CELL;
            const py = y * CELL;
            const lerp = (v1: number, v2: number) => (lv - v1) / (v2 - v1);
            const top: Pt = [px + lerp(a, b) * CELL, py];
            const right: Pt = [px + CELL, py + lerp(b, c) * CELL];
            const bottom: Pt = [px + lerp(d, c) * CELL, py + CELL];
            const left: Pt = [px, py + lerp(a, d) * CELL];
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 5: seg(top, left); seg(bottom, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(top, left); break;
              case 10: seg(top, right); seg(left, bottom); break;
            }
          }
        }
      }
      ctx.stroke();
    };
    drawRef.current = draw;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (pausedRef.current || !visibleRef.current || document.hidden) return;
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };

    resize();
    draw(performance.now());
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting;
    });
    io.observe(canvas);

    if (prefersReducedMotion()) {
      pausedRef.current = true;
      queueMicrotask(() => setPaused(true));
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      drawRef.current = null;
    };
  }, []);

  return (
    <>
      <div data-hero="fondo" className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Atardecer en el desierto: brillo ámbar muy tenue, abajo a la derecha */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 100% 100%, rgba(242,165,65,0.16) 0%, rgba(242,165,65,0.05) 45%, transparent 75%)",
          }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Reanudar animación de fondo" : "Pausar animación de fondo"}
        className="absolute bottom-5 left-[var(--gutter)] z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-boton border border-claro/25 bg-tinta/60 text-claro transition-colors duration-150 hover:bg-tinta-2"
      >
        {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </>
  );
}
