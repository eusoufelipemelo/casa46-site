import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SplitTitle } from "./SplitTitle";

export type HeaderImage = { src: string; alt: string; position?: string };

/** Foto padrão do topo das páginas internas (blog, documentos legais). */
const DEFAULT_IMAGE: HeaderImage = { src: "/fotos/showroom-04.jpg", alt: "Banco escultural de ripas curvas em madeira no showroom da Casa 46" };

/**
 * Topo das páginas internas, como no site anterior: foto em tela cheia escurecida, título
 * grande em branco. Aqui o título fica alinhado à esquerda, na base, com a trilha de navegação
 * acima, e a foto aproxima devagar uma vez.
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image = DEFAULT_IMAGE,
  tall = false,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  image?: HeaderImage;
  /** Altura da tela inteira (páginas principais). Sem ele, 70% da tela. */
  tall?: boolean;
}) {
  return (
    <header className={`relative isolate flex overflow-hidden bg-black text-white ${tall ? "min-h-[100svh]" : "min-h-[72svh]"}`}>
      <div className="hero-media absolute inset-0 -z-10">
        <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" style={image.position ? { objectPosition: image.position } : undefined} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0.25)_40%,rgb(0_0_0/0.8)_100%)]" />
      <div className="wrap flex flex-col justify-end pb-14 pt-32 sm:pb-20">
        <div data-reveal="fade">
          <Breadcrumbs items={crumbs} light />
        </div>
        <SplitTitle as="h1" text={title} className="display mt-5 max-w-[18ch] text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem]" />
        {intro ? (
          <p data-reveal="fade" style={{ "--d": "250ms" } as CSSProperties} className="mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed text-white/80">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
