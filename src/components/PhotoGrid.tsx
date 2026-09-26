"use client";

import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import type { Photo } from "@/content/fotos";
import { Lightbox } from "./Lightbox";

/**
 * Galeria em colunas (alvenaria), como no site anterior, com fotos em pé e deitadas
 * convivendo sem corte. Cada foto abre o visualizador em tela cheia.
 */
export function PhotoGrid({ photos, title }: { photos: Photo[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4" data-reveal="image" style={{ "--d": `${(i % 4) * 90}ms` } as CSSProperties}>
            <button type="button" onClick={() => setOpen(i)} className="zoom-media relative block w-full cursor-zoom-in overflow-hidden rounded-[10px]" aria-label={`Ampliar: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 33vw, 50vw" className="h-auto w-full" />
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? <Lightbox photos={photos} index={open} title={title} onClose={close} /> : null}
    </>
  );
}
