"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/site.config";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Rotas cujo topo é claro (texto e logo escuros enquanto a barra está transparente). */
const LIGHT_TOP = ["/showroom"];

/** Rotas sem foto no topo (artigo do blog): barra sempre sólida e no fluxo da página. */
function hasSolidTop(pathname: string) {
  return /^\/blog\/[^/]+/.test(pathname);
}

/**
 * Cabeçalho como no site anterior: logo à esquerda, menu no centro e "Contato" num botão
 * à direita, transparente sobre a foto do topo. Ao rolar, vira uma barra preta translúcida.
 * No celular, abre um menu de tela cheia em preto.
 */
export function SiteNav({ links, contactHref }: { links: NavLink[]; contactHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  const solidRoute = hasSolidTop(pathname);
  const solid = solidRoute || scrolled || open;
  // barra transparente sobre topo claro: logo e texto escuros
  const dark = !solid && LIGHT_TOP.includes(pathname);

  return (
    <>
      <header className={`${solidRoute ? "sticky" : "fixed"} inset-x-0 top-0 z-40`}>
        <div
          className={`transition-[background-color,border-color] duration-500 ${
            solid ? "border-b border-white/10 bg-black/82 backdrop-blur-md" : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
            <Logo light={!dark} className="h-7 w-auto sm:h-8" />

            <nav aria-label="Principal" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {links.map((l) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={`group relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[0.95rem] transition-colors duration-300 ${
                          dark ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"
                        } ${active ? (dark ? "!text-black" : "!text-white") : ""}`}
                      >
                        {l.label}
                        {/* traço fino sob o item: cresce no hover e fica no item atual */}
                        <span
                          aria-hidden
                          className={`absolute inset-x-3 bottom-2 h-px origin-left bg-current transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={contactHref}
                target="_blank"
                rel="noopener"
                className={`btn hidden min-h-10 px-5 text-[0.95rem] sm:inline-flex ${dark ? "btn-primary" : "btn-inverse"}`}
              >
                Contato
              </a>
              <button
                type="button"
                className={`inline-grid size-11 cursor-pointer place-items-center xl:hidden ${dark ? "text-black" : "text-white"}`}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fora do <header> de propósito: o backdrop-filter da barra criaria um bloco de contenção
          e este menu, que é "fixed", ficaria com a altura do cabeçalho. */}
      <div id="menu-mobile" hidden={!open} data-lenis-prevent className="fixed inset-0 z-30 overflow-y-auto bg-black text-white xl:hidden">
        <nav aria-label="Principal (celular)" className="mx-auto flex min-h-full max-w-[1140px] flex-col px-5 pb-8 pt-28 sm:px-8">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-white/12" style={{ animation: `rise-in 0.6s ${i * 45}ms cubic-bezier(0.2,0.75,0.15,1) both` }}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className="display flex min-h-[4rem] items-center justify-between text-[2rem] text-white/85 aria-[current=page]:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={contactHref} target="_blank" rel="noopener" className="btn btn-inverse mt-10 w-full">
            Contato
          </a>
        </nav>
      </div>
    </>
  );
}
