"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/content/fotos";
import { ArrowLeftIcon, ArrowRightIcon, ExpandIcon } from "./icons";
import { Lightbox } from "./Lightbox";

/**
 * Carrossel de fotos com encaixe nativo (arraste no celular, setas no computador) e contador.
 * Tocar na foto abre o visualizador em tela cheia. Sem troca automática: quem manda é a pessoa.
 *
 * `variant`:
 * - "card": cartão alto das especialidades (setas pequenas sobre a foto);
 * - "wide": foto larga com contador e setas embaixo (projetos, showroom);
 * - "bleed": ocupa o painel inteiro, com legenda por cima (projetos empilhados da Home).
 */
export function Carousel({
  photos,
  title,
  variant = "wide",
  sizes = "100vw",
  className = "",
  caption,
  eager = false,
}: {
  photos: Photo[];
  title: string;
  variant?: "card" | "wide" | "bleed";
  sizes?: string;
  className?: string;
  caption?: ReactNode;
  eager?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;

  // qual foto está visível: a mais próxima da borda esquerda do trilho
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = useCallback(
    (d: number) => {
      const el = track.current;
      if (!el) return;
      const next = (index + d + n) % n;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [index, n],
  );

  const close = useCallback(() => setOpen(null), []);
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  const arrow =
    "grid cursor-pointer place-items-center rounded-full transition-colors duration-300 disabled:opacity-30";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={title}
      className={`relative ${className}`}
      onKeyDown={(e) => {
        if (open !== null) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div ref={track} className={`snap-row flex overflow-x-auto ${variant === "bleed" ? "absolute inset-0" : "size-full"}`}>
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="group/slide relative h-full w-full shrink-0 cursor-zoom-in overflow-hidden"
            aria-label={`Ampliar foto ${i + 1} de ${n}: ${p.alt}`}
            tabIndex={i === index ? 0 : -1}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={sizes}
              loading={eager && i === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.2,0.75,0.15,1)] group-hover/slide:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {variant === "card" ? (
        <>
          <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
            <button type="button" onClick={() => go(-1)} className={`${arrow} pointer-events-auto size-9 bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-black`} aria-label="Foto anterior">
              <ArrowLeftIcon width={16} height={16} />
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrow} pointer-events-auto size-9 bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-black`} aria-label="Próxima foto">
              <ArrowRightIcon width={16} height={16} />
            </button>
          </div>
          {/* barrinhas de progresso, uma por foto */}
          <div aria-hidden className="pointer-events-none absolute inset-x-3 bottom-3 flex gap-1">
            {photos.map((p, i) => (
              <span key={`${p.src}-bar-${i}`} className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i === index ? "bg-white" : "bg-white/35"}`} />
            ))}
          </div>
        </>
      ) : null}

      {variant === "bleed" ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pb-6 pt-28 sm:pb-9">
          <div className="wrap flex items-end justify-between gap-6 text-white">
            <div className="min-w-0">{caption}</div>
            <div className="pointer-events-auto flex shrink-0 items-center gap-3">
              <span className="hidden text-[0.9rem] tabular-nums text-white/70 sm:inline">{counter}</span>
              <button type="button" onClick={() => go(-1)} className={`${arrow} size-11 border border-white/40 hover:bg-white hover:text-black`} aria-label="Foto anterior">
                <ArrowLeftIcon />
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrow} size-11 border border-white/40 hover:bg-white hover:text-black`} aria-label="Próxima foto">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {variant === "wide" ? (
        <>
          <span aria-hidden className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm">
            <ExpandIcon width={16} height={16} />
          </span>
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between sm:inset-x-5 sm:bottom-5">
            <span className="rounded-full bg-black/45 px-3 py-1 text-[0.85rem] tabular-nums text-white backdrop-blur-sm">{counter}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className={`${arrow} size-11 bg-white/90 text-black hover:bg-white`} aria-label="Foto anterior">
                <ArrowLeftIcon />
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrow} size-11 bg-white/90 text-black hover:bg-white`} aria-label="Próxima foto">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Foto {index + 1} de {n}
      </p>

      {open !== null ? <Lightbox photos={photos} index={open} title={title} onClose={close} /> : null}
    </div>
  );
}
