import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactSection } from "@/components/ContactSection";
import { FounderSection } from "@/components/FounderSection";
import { UserIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { SplitTitle } from "@/components/SplitTitle";
import { Stats } from "@/components/Stats";
import { ChipLink, Tag } from "@/components/ui";
import { photos } from "@/content/fotos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { links, siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Jônas Pastore, fundador da Casa 46",
  description:
    "De frentista a fundador da Casa 46: Jônas Pastore tem mais de 20 anos no setor moveleiro, foi executivo do grupo Unicasa e é mentor da Escola de Planejados.",
  path: "/jp",
  image: "/og/jp.jpg",
});

/** Números da página do Jônas no site anterior (diferentes dos da Home: ver pendências). */
const JP_STATS = [
  { value: "20+", label: "Anos de experiência no mercado" },
  { value: "93%", label: "Índice de satisfação máxima" },
  { value: "716+", label: "Clientes felizes, espaços transformados" },
  { value: "11+", label: "Arquitetos, incorporadores e construtoras" },
];

export default function JpPage() {
  const top = photos["jp-topo"][0];
  const events = photos["jp-eventos"][0];
  const [posto, retrato, evento, palestra] = photos["jonas-pastore-trajetoria"];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl("/jp"),
          name: "Jônas Pastore, fundador da Casa 46",
          mainEntity: {
            "@type": "Person",
            "@id": `${absoluteUrl("/jp")}#pessoa`,
            name: "Jônas Pastore",
            jobTitle: "Fundador da Casa 46",
            description: siteConfig.about.expert.bio,
            image: absoluteUrl(photos["jonas-pastore-retrato"][1].src),
            worksFor: { "@id": organizationId() },
            knowsAbout: ["Marcenaria fina", "Móveis planejados", "Gestão de lojas de móveis planejados", "Treinamento de empresários do setor moveleiro"],
            affiliation: [{ "@type": "Organization", name: "Escola de Planejados" }],
          },
        }}
      />

      {/* Topo: título e números, sobre a foto escura das peças de madeira */}
      <section aria-labelledby="jp-titulo" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
        <div className="hero-media absolute inset-0 -z-10">
          <Image src={top.src} alt={top.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-[30%_50%]" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.5),rgb(0_0_0/0.15)_40%,#000_100%)]" />
        <div className="wrap flex flex-1 flex-col pb-10 pt-32">
          <div data-reveal="fade">
            <Breadcrumbs
              light
              items={[
                { name: "Início", path: "/" },
                { name: "Jônas Pastore", path: "/jp" },
              ]}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <SplitTitle as="h1" id="jp-titulo" text="Como revolucionar seus resultados seguindo princípios." className="display max-w-[17ch] text-[2.8rem] sm:text-[4.2rem] lg:text-[5.2rem]" />
            <div data-reveal="fade" style={{ "--d": "500ms" } as CSSProperties} className="mt-10">
              <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost-light min-w-44">
                Contato
              </a>
            </div>
          </div>
          <div className="mt-16">
            <Stats items={JP_STATS} delay={600} />
          </div>
        </div>
      </section>

      {/* Nós ouvimos, planejamos e construímos */}
      <section aria-labelledby="ouvimos-titulo" className="relative isolate overflow-hidden bg-graphite text-white">
        <div className="absolute inset-0 -z-10" data-reveal="image">
          <Image src={events.src} alt={events.alt} fill sizes="100vw" className="object-cover object-right" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#101010_0%,rgb(16_16_16/0.88)_45%,rgb(16_16_16/0.2)_100%)]" />
        <div className="wrap py-24 sm:py-32">
          <div className="max-w-xl">
            <SplitTitle id="ouvimos-titulo" text="Nós ouvimos, planejamos e construímos, sempre mantendo seus objetivos no centro de tudo o que fazemos." className="display text-[2.1rem] sm:text-[2.8rem]" />
            <p data-reveal="fade" className="mt-7 max-w-[52ch] leading-relaxed text-white/75">
              Com mais de 20 anos de experiência no segmento moveleiro, a Casa 46 foi fundada por Jônas Pastore, executivo do grupo Unicasa por mais de uma década e mentor da Escola de Planejados, onde treinou centenas de empresários do setor entre Brasil, México e Estados Unidos.
            </p>
            <div className="mt-9" data-reveal="fade">
              <ChipLink href={links.whatsapp}>Quero saber mais</ChipLink>
            </div>
          </div>
        </div>
      </section>

      {/* Carreira: de frentista a fundador */}
      <section aria-labelledby="carreira-titulo" className="overflow-hidden bg-surface-alt py-20 sm:py-28">
        <div className="wrap grid items-center gap-14 md:grid-cols-12">
          {/* trajetória em quatro fotos, do posto de combustível ao palco */}
          <ol className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-6" aria-label="Trajetória de Jônas Pastore em fotos">
            {[posto, retrato, evento, palestra].map((p, i) => (
              <li key={p.src} className={`relative overflow-hidden rounded-[14px] ${i % 2 ? "mt-10 aspect-[4/5]" : "aspect-[4/5]"}`} data-reveal="image" style={{ "--d": `${i * 120}ms` } as CSSProperties}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ol>
          <div className="md:col-span-5 md:col-start-8">
            <Tag icon={UserIcon}>Carreira</Tag>
            <SplitTitle
              id="carreira-titulo"
              text="De frentista de posto de combustível a fundador da Casa 46, marca de móveis planejados que atingiu importantes resultados como 93% de índice de satisfação de clientes."
              className="display mt-6 text-[1.9rem] text-ink sm:text-[2.35rem]"
            />
            <p data-reveal="fade" className="mt-6 max-w-[48ch] leading-relaxed text-muted">
              Em sua carreira de relevante ascensão, auxiliou centenas de empresários no Brasil todo, com treinamentos e gestão, impactando milhares de profissionais do segmento moveleiro.
            </p>
          </div>
        </div>
      </section>

      <FounderSection variant="quote" />
      <ContactSection />
    </>
  );
}
