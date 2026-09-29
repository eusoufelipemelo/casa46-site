import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Carousel } from "@/components/Carousel";
import { ContactSection } from "@/components/ContactSection";
import { FounderSection } from "@/components/FounderSection";
import { StarIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { Tag } from "@/components/ui";
import { photos } from "@/content/fotos";
import { fromCover, projects } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { links } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Projetos de marcenaria fina com arquitetos parceiros",
  description:
    "Projetos da Casa 46 com Atelier Peclat, Athie Wohnrath, Luís Renato Machado, Bossa Arquitetura e o Restaurante Song Qi, em marcenaria fina sob medida.",
  path: "/clientes",
  image: "/og/projetos.jpg",
});

export default function ClientesPage() {
  const hero = photos["doutores-da-marcenaria"][0];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projetos Casa 46",
          url: absoluteUrl("/clientes"),
          about: { "@id": organizationId() },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                "@id": absoluteUrl(`/clientes#${p.slug}`),
                name: p.title,
                description: p.credits,
                creator: { "@id": organizationId() },
                image: p.photos.slice(0, 4).map((f) => absoluteUrl(f.src)),
              },
            })),
          },
        }}
      />
      <PageHeader
        tall
        title="A alta performance unida a marcenaria fina e desafios, tornam a sua experiência única"
        image={{ src: hero.src, alt: hero.alt, position: "70% 50%" }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/clientes" },
        ]}
      />

      <section aria-label="Nossos melhores projetos" className="bg-mist py-20 sm:py-28">
        <div className="wrap">
          <div className="text-center">
            <Tag icon={StarIcon}>Nossos melhores projetos</Tag>
          </div>

          {/* índice dos projetos: leva direto a cada um */}
          <nav aria-label="Projetos nesta página" className="mt-8" data-reveal="fade">
            <ul className="flex flex-wrap justify-center gap-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} className="inline-flex min-h-10 items-center rounded-[4px] border border-black/15 px-3.5 text-[0.93rem] text-ink transition-colors hover:border-black hover:bg-black hover:text-white">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
            {projects.map((p, i) => (
              <article key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-titulo`} className="scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-black/10 pb-5">
                  <div>
                    <p className="text-[0.85rem] tabular-nums text-muted" data-reveal="fade">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </p>
                    <SplitTitle id={`${p.slug}-titulo`} text={p.title} className="display mt-1 text-[2.2rem] text-ink sm:text-[3rem]" />
                  </div>
                  <p className="text-[0.95rem] text-muted" data-reveal="fade" style={{ "--d": "150ms" } as CSSProperties}>
                    {p.photos.length} fotos
                  </p>
                </div>
                {p.credits ? (
                  <p className="mt-4 max-w-[60ch] text-[0.98rem] text-muted" data-reveal="fade">
                    {p.credits}
                  </p>
                ) : null}
                <div className="mt-8" data-reveal="image">
                  <Carousel photos={fromCover(p)} title={p.title} variant="wide" eager={i === 0} sizes="(min-width: 1140px) 1140px, 100vw" className="aspect-[4/3] overflow-hidden rounded-[18px] sm:aspect-[16/9]" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-primary min-w-44">
              Contato
            </a>
          </div>
        </div>
      </section>

      <FounderSection variant="quote" />
      <ContactSection />
    </>
  );
}
