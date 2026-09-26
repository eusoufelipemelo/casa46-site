import type { ReactNode } from "react";

/** Coluna do site: o conteúdo nunca passa de 1140px de largura (o recuo lateral fica por fora). */
export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return <div className={`wrap ${narrow ? "wrap-narrow" : ""} ${className}`}>{children}</div>;
}
