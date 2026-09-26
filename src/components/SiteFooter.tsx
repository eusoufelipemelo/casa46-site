"use client";

import Link from "next/link";
import { siteConfig } from "@/site.config";
import { ArrowUpIcon } from "./icons";

const legal = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD: seus direitos", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

/**
 * Rodapé do site anterior (barra preta com "Desenvolvido por", CNPJ e "Topo do site"),
 * acrescido do menu e dos documentos legais.
 */
export function SiteFooter() {
  function toTop() {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <footer className="bg-black text-white">
      <div className="wrap">
        <div className="grid gap-8 border-b border-white/12 py-10 md:grid-cols-2">
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-white/75">
              {siteConfig.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contato" className="inline-flex min-h-10 items-center hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem] text-white/60 md:justify-end">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid items-center gap-4 py-6 text-[0.88rem] text-white/80 sm:grid-cols-3">
          <p>
            <strong className="font-semibold text-white">Desenvolvido por:</strong>{" "}
            <a href="https://www.outboxgroup.com.br" target="_blank" rel="noopener" className="hover:underline">
              OutBox Soluções Digitais
            </a>
          </p>
          <p className="sm:text-center">
            <strong className="font-semibold text-white">CNPJ:</strong> {siteConfig.cnpj}
            <span className="block text-white/55">{siteConfig.legalName}</span>
          </p>
          <p className="sm:text-right">
            <button type="button" onClick={toTop} className="inline-flex min-h-11 cursor-pointer flex-col items-center text-white/80 hover:text-white sm:items-end">
              <ArrowUpIcon width={18} height={18} />
              Topo do site
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
