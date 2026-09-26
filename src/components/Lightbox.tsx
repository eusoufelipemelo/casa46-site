"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/fotos";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";

/**
 * Visualizador de fotos em tela cheia: setas, teclado (← → Esc), arraste no celular.
 * Para a rolagem suave enquanto está aberto e devolve o foco ao fechar.
 */
export function Lightbox({ photos, index, title, onClose }: { photos: Photo[]; index: number; title: string; onClose: () => void }) {
  const [i, setI] = useState(index);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      previous?.focus();
    };
  }, [go, onClose]);

  const p = photos[i];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: foto ${i + 1} de ${n}`}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex flex-col bg-black/96 text-white"
      style={{ animation: "rise-in 0.35s ease both" }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-[0.95rem] text-white/80">
          <span className="text-white">{title}</span>
          <span className="ml-3 tabular-nums text-white/55">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-white/10" aria-label="Fechar">
          <CloseIcon width={24} height={24} />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image key={p.src} src={p.src} alt={p.alt} fill sizes="100vw" className="object-contain" style={{ animation: "rise-in 0.4s ease both" }} />
      </div>
      <p className="px-4 pb-2 pt-3 text-center text-[0.9rem] text-white/60 sm:px-6">{p.alt}</p>
      <div className="flex justify-center gap-3 pb-5">
        <button type="button" onClick={() => go(-1)} className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 hover:bg-white hover:text-black" aria-label="Foto anterior">
          <ArrowLeftIcon />
        </button>
        <button type="button" onClick={() => go(1)} className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 hover:bg-white hover:text-black" aria-label="Próxima foto">
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
