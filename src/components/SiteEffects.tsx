"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Efeitos do site inteiro:
 * - rolagem suave (Lenis), desligada para quem prefere menos movimento;
 * - revelação de títulos, textos e imagens marcados com data-reveal quando entram na tela.
 *   Títulos h1/h2 sem marcação (ex.: blog) ganham a revelação suave automaticamente.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // lerp (interpolação por quadro) é mais estável que duração fixa: sem trancos quando a
    // roda do mouse manda vários eventos seguidos. O toque no celular fica nativo.
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: false, anchors: { offset: -90 }, autoRaf: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    // página nova: recalcula até onde dá para rolar (o Lenis guarda o limite da página anterior)
    const frame = requestAnimationFrame(() => window.__lenis?.resize());
    const onLoad = () => window.__lenis?.resize();
    window.addEventListener("load", onLoad);
    document.querySelectorAll("main h1:not([data-reveal]), main h2:not([data-reveal])").forEach((el) => {
      if (!el.closest("[data-reveal]")) el.setAttribute("data-reveal", "fade");
    });
    const reveal = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-revealed", "");
        obs.unobserve(e.target);
      }
    };
    // títulos: só sobem quando já estão bem dentro da tela (18% acima da borda de baixo),
    // para o movimento acontecer onde a pessoa está olhando
    const words = new IntersectionObserver(reveal, { rootMargin: "0px 0px -18% 0px", threshold: 0 });
    const rest = new IntersectionObserver(reveal, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => (el.getAttribute("data-reveal") === "words" ? words : rest).observe(el));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      words.disconnect();
      rest.disconnect();
    };
  }, [pathname]);

  return null;
}
