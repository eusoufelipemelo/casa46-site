import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

/**
 * Etiqueta de seção do site anterior: um quadrado com ícone e o nome da seção ao lado.
 * `tone="dark"` para fundo claro (etiqueta preta) e `tone="light"` para fundo escuro.
 */
export function Tag({ icon: Icon, children, tone = "dark", className = "" }: { icon: ComponentType<SVGProps<SVGSVGElement>>; children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  return (
    <span className={`tag ${dark ? "bg-black text-white" : "bg-white/10 text-white ring-1 ring-white/15"} ${className}`}>
      <span className={`tag-icon ${dark ? "bg-white text-black" : "bg-white text-black"}`}>
        <Icon width={14} height={14} strokeWidth={2} />
      </span>
      {children}
    </span>
  );
}

/** "»" em traço fino, o marcador laranja dos botões. */
function Chevrons() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path d="m3 4 4 4-4 4M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Botão com o marcador laranja (assinatura dos botões do site anterior). Aceita link interno
 * ou externo (WhatsApp). `dark` para usar sobre fundo claro.
 */
export function ChipLink({ href, children, dark = false, external = false, className = "" }: { href: string; children: ReactNode; dark?: boolean; external?: boolean; className?: string }) {
  const content = (
    <>
      <span className="chip-mark">
        <Chevrons />
      </span>
      <span className="chip-label">{children}</span>
    </>
  );
  const cls = `chip-btn ${dark ? "chip-dark" : ""} ${className}`;
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
