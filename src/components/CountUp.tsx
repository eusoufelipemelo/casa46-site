"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que conta do zero até o valor quando entra na tela ("1.000+" conta até mil e volta a
 * ter o ponto de milhar). `delay` segura o início para o número já estar visível quando a
 * contagem começa (no topo, a faixa de números aparece depois do título).
 * No servidor e sem JS, o valor final aparece direto. Respeita prefers-reduced-motion.
 */
export function CountUp({ value, duration = 2200, delay = 0, className = "" }: { value: string; duration?: number; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = requestAnimationFrame(() => setProgress(0));
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setProgress(1 - Math.pow(1 - t, 3)); // desacelera no fim
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [duration, delay]);

  const text = value.replace(/\d{1,3}(?:\.\d{3})+|\d+/g, (n) => {
    const v = Math.round(Number(n.replace(/\./g, "")) * progress);
    return n.includes(".") ? v.toLocaleString("pt-BR") : String(v);
  });
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
