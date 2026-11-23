import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactSection } from "@/components/ContactSection";
import { Faq } from "@/components/Faq";
import { GridIcon, PinIcon, StarIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { ChipLink, Tag } from "@/components/ui";
import { photos } from "@/content/fotos";
import { projects } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { AREAS, ROTA_REGIAO, SEDE, areaServedJsonLd, tituloLocal } from "@/lib/regiao";
import { pageMetadata } from "@/lib/seo";
import { links, siteConfig } from "@/site.config";

const TITULO = tituloLocal("Marcenaria");

export const metadata: Metadata = pageMetadata({
  title: `${TITULO}: móveis planejados sob medida`,
  description:
    "Marcenaria fina em São Paulo (SP) com showroom no Jardim Paulista: painel ripado, lâmina natural e móveis planejados para Jardins, Itaim Bibi, Moema e região.",
  path: ROTA_REGIAO,
  image: "/og/casa46.jpg",
});

/** Especialidades: as quatro do site e o painel ripado (termo forte no Trends, presente nos projetos). */
const ESPECIALIDADES = [
  { titulo: "Painel ripado", texto: "Painéis ripados em madeira para salas, cabeceiras e salas de jantar, com iluminação embutida.", foto: photos["atelier-peclat"][16] },
  { titulo: "Lâmina de madeira natural", texto: siteConfig.services[0].description, foto: photos["lamina-madeira-natural"][0] },
  { titulo: "Revestimento de teto", texto: siteConfig.services[1].description, foto: photos["revestimento-de-teto"][1] },
  { titulo: "Curvos", texto: siteConfig.services[2].description, foto: photos.curvos[2] },
  { titulo: "Portas de ambientes", texto: siteConfig.services[3].description, foto: photos["portas-de-ambientes"][0] },
];

const GRUPOS = ["Sede", "Vizinhança", "Zona Oeste e Zona Sul", "Grande São Paulo"] as const;

/** Perguntas de quem busca marcenaria em São Paulo, respondidas só com fatos do site e do Perfil. */
const FAQ_LOCAL = [
  {
    question: "Onde fica a marcenaria Casa 46 em São Paulo?",
    answer: `O showroom da Casa 46 fica na Av. Brigadeiro Luís Antônio, 2543, conjunto 52, ${SEDE.bairro}, São Paulo (SP), CEP 01401-000, perto da Avenida Paulista. O atendimento é de segunda a sexta, das 10h às 18h.`,
  },
  {
    question: "Quais bairros de São Paulo a Casa 46 atende?",
    answer: `A Casa 46 atende toda a capital paulista, com mais projetos em bairros como ${AREAS.filter((a) => a.tipo === "bairro")
      .slice(1, 9)
      .map((a) => a.nome)
      .join(", ")}, além de Alphaville, Santana de Parnaíba e outras cidades da Grande São Paulo. Obras corporativas, de construtoras e de hotelaria são atendidas em todo o Brasil.`,
  },
  {
    question: "A Casa 46 faz painel ripado e móveis planejados sob medida?",
    answer:
      "Sim. A Casa 46 é uma marcenaria fina que produz móveis planejados e sob medida, painéis ripados, revestimentos em lâmina de madeira natural, forros de madeira, peças curvas e portas embutidas, para residências, escritórios, hotelaria e construtoras.",
  },
  {
    question: "Como pedir um orçamento de marcenaria em São Paulo?",
    answer: `Pelo WhatsApp ${siteConfig.contact.phone}, pelo e-mail ${siteConfig.contact.email} ou pelo formulário desta página. Você também pode visitar o showroom no ${SEDE.bairro} para ver acabamentos e projetos de perto.`,
  },
  {
    question: "Como acompanho a produção dos meus móveis?",
    answer:
      "A Casa 46 usa tecnologia que permite rastrear todas as etapas on-line. Assinatura de documentos, conversas e avaliações ficam registradas, o que dá segurança para clientes, arquitetos e construtoras.",
  },
];

export default function MarcenariaSaoPauloPage() {
  const hero = photos.showroom[0];
  const destaque = projects.slice(0, 4);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(ROTA_REGIAO)}#servico`,
          name: TITULO,
          serviceType: "Marcenaria e móveis planejados sob medida",
          url: absoluteUrl(ROTA_REGIAO),
          provider: { "@id": organizationId() },
          areaServed: areaServedJsonLd(),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Especialidades da Casa 46",
            itemListElement: ESPECIALIDADES.map((e) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: e.titulo, description: e.texto } })),
          },
        }}
      />

      <PageHeader
        tall
        title={TITULO}
        intro="Marcenaria fina e móveis planejados sob medida, com showroom no Jardim Paulista e projetos para casas, escritórios, hotelaria e construtoras em toda a capital."
        image={{ src: hero.src, alt: hero.alt }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: TITULO, path: ROTA_REGIAO },
        ]}
      >
        <div data-reveal="fade" style={{ "--d": "400ms" } as CSSProperties} className="mt-9 flex flex-wrap gap-3">
          <ChipLink href={links.whatsapp}>Pedir orçamento</ChipLink>
          <a href="#bairros" className="btn btn-ghost-light min-h-11">
            Ver bairros atendidos
          </a>
        </div>
      </PageHeader>

      {/* Quem é a Casa 46, em poucas linhas */}
      <section aria-labelledby="sobre-titulo" className="bg-white py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Tag icon={StarIcon}>Doutores da Marcenaria</Tag>
            <SplitTitle id="sobre-titulo" text="Marcenaria fina em São Paulo, do projeto à instalação" className="display mt-6 text-[2.2rem] text-ink sm:text-[2.9rem]" />
          </div>
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-muted lg:col-span-6 lg:col-start-7" data-reveal="fade">
            <p>
              A Casa 46 é uma marcenaria fina com showroom no {SEDE.bairro}, na Av. Brigadeiro Luís Antônio, a poucos minutos da Avenida Paulista. Fundada por Jônas Pastore, com mais de 20 anos no segmento moveleiro, produz móveis planejados e sob medida com marcenaria State of Art.
            </p>
            <p>
              Atende residências em toda a cidade de São Paulo e tem ampla experiência em projetos corporativos, construção civil e hotelaria. A produção é ancorada por um pool de fabricantes, o que dá flexibilidade e capacidade produtiva para obras de qualquer porte.
            </p>
            <p>
              Já trabalhou com escritórios como Atelier Peclat, Athie Wohnrath, Bossa Arquitetura e Luís Renato Machado, e com empresas como Tools, Urbic, Tishman Speyer e Gamaro.
            </p>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section aria-labelledby="especialidades-sp-titulo" className="bg-surface-alt py-20 sm:py-28">
        <div className="wrap">
          <Tag icon={GridIcon}>Especialidades</Tag>
          <SplitTitle id="especialidades-sp-titulo" text="O que a nossa marcenaria faz" className="display mt-6 text-[2.2rem] text-ink sm:text-[2.9rem]" />
          <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {ESPECIALIDADES.map((e, i) => (
              <li key={e.titulo} data-reveal="fade" style={{ "--d": `${(i % 3) * 100}ms` } as CSSProperties} className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                <div className={`zoom-media relative overflow-hidden rounded-[14px] ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-[calc(100%-6.5rem)]" : "aspect-[4/3]"}`}>
                  <Image src={e.foto.src} alt={e.foto.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-5 text-[1.15rem] font-semibold text-ink">{e.titulo}</h3>
                <p className="mt-1.5 max-w-[42ch] text-[0.98rem] leading-relaxed text-muted">{e.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bairros e cidades atendidos */}
      <section id="bairros" aria-labelledby="bairros-titulo" className="scroll-mt-20 bg-black py-20 text-white sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Tag icon={PinIcon} tone="light">
              Onde atendemos
            </Tag>
            <SplitTitle id="bairros-titulo" text="Bairros e cidades atendidos" className="display mt-6 text-[2.2rem] sm:text-[2.9rem]" />
            <p data-reveal="fade" className="mt-5 max-w-[36ch] leading-relaxed text-white/70">
              Showroom no {SEDE.bairro} e atendimento em toda a capital paulista e na Grande São Paulo. Obras corporativas, de construtoras e de hotelaria em todo o Brasil.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6" data-reveal="fade">
            {GRUPOS.map((g) => (
              <div key={g}>
                <h3 className="border-b border-white/15 pb-3 text-[0.95rem] font-medium text-white/60">{g === "Sede" ? "Showroom" : g}</h3>
                <ul className="mt-4 space-y-2.5">
                  {AREAS.filter((a) => a.grupo === g).map((a) => (
                    <li key={a.nome} className="text-[1.08rem]">
                      {g === "Sede" ? `${a.nome}, Av. Brigadeiro Luís Antônio, 2543` : a.nome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section aria-labelledby="projetos-sp-titulo" className="bg-white py-20 sm:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SplitTitle id="projetos-sp-titulo" text="Projetos assinados pela Casa 46" className="display text-[2.2rem] text-ink sm:text-[2.9rem]" />
            <Link href="/clientes" className="btn btn-secondary">
              Ver todos os projetos
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {destaque.map((p, i) => {
              const f = p.photos[p.cover];
              return (
                <li key={p.slug} data-reveal="fade" style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                  <Link href={`/clientes#${p.slug}`} className="zoom-media group block">
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-[12px]">
                      <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                    </span>
                    <span className="mt-3 block text-[1rem] font-medium text-ink group-hover:underline">{p.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Perguntas frequentes locais */}
      <section aria-labelledby="faq-sp-titulo" className="border-t border-line bg-surface py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SplitTitle id="faq-sp-titulo" text="Perguntas sobre marcenaria em São Paulo" className="display text-[2.2rem] text-ink sm:text-[2.6rem]" />
          </div>
          <div className="lg:col-span-8" data-reveal="fade">
            <Faq items={FAQ_LOCAL} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
