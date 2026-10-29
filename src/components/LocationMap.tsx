"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

/**
 * Mapa interativo com o marcador da Casa 46 (MapLibre + OpenFreeMap: sem chave e sem cookies).
 * A biblioteca só é baixada quando a seção chega perto da tela. A roda do mouse continua
 * rolando a página (zoom pelos botões ou com dois dedos no celular).
 */
export function LocationMap({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !box.current) return;
        maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const touch = window.matchMedia("(pointer: coarse)").matches;
        const map = new maplibregl.Map({
          container: box.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: [lng, lat],
          zoom: 15.6,
          minZoom: 10,
          maxZoom: 18,
          scrollZoom: false,
          cooperativeGestures: touch,
          attributionControl: false,
          locale: {
            "CooperativeGesturesHandler.WindowsHelpText": "Use Ctrl + rolagem para aproximar o mapa",
            "CooperativeGesturesHandler.MacHelpText": "Use ⌘ + rolagem para aproximar o mapa",
            "CooperativeGesturesHandler.MobileHelpText": "Use dois dedos para mover o mapa",
            "NavigationControl.ZoomIn": "Aproximar",
            "NavigationControl.ZoomOut": "Afastar",
          },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        // créditos do mapa (exigidos pela licença) no alto, onde o cartão do endereço não cobre
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "top-left");

        // marcador: o "46" do logo num quadrado preto, com um halo laranja que pulsa devagar
        const pin = document.createElement("div");
        pin.className = "c46-pin";
        pin.setAttribute("role", "img");
        pin.setAttribute("aria-label", label);
        pin.innerHTML = '<span class="c46-pin-halo"></span><img src="/icon.svg" alt="" width="44" height="44" />';
        new maplibregl.Marker({ element: pin, anchor: "center" }).setLngLat([lng, lat]).addTo(map);

        map.once("load", () => !cancelled && setReady(true));
        destroy = () => map.remove();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      destroy?.();
    };
  }, [lat, lng, label]);

  return (
    <div className="map-canvas absolute inset-0">
      {/* posição inline: o CSS do MapLibre põe "position: relative" no contêiner e o mapa ficaria com altura zero */}
      <div ref={box} style={{ position: "absolute", inset: 0 }} />
      {/* enquanto o mapa não chega: fundo neutro, sem texto de "carregando" */}
      <div aria-hidden className={`pointer-events-none absolute inset-0 bg-[#1b1b1b] transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`} />
    </div>
  );
}
