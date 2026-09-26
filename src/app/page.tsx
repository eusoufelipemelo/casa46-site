import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Carousel } from "@/components/Carousel";
import { ContactSection } from "@/components/ContactSection";
import { Faq } from "@/components/Faq";
import { FounderSection } from "@/components/FounderSection";
import { HeroPicture } from "@/components/HeroPicture";
import { BarsIcon, CompassIcon, EyeIcon, GridIcon, ImageIcon, StarIcon, ChevronDownIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { SplitTitle } from "@/components/SplitTitle";
import { Stats } from "@/components/Stats";
import { ChipLink, Tag } from "@/components/ui";
import { faq } from "@/content/faq";
import { photos } from "@/content/fotos";
import { companies, fromCover, projects, specialties } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { links, siteConfig } from "@/site.config";

// A Home mostra os últimos artigos do CMS: revalida junto com o blog.
export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Marcenaria fina e móveis sob medida em São Paulo",
    description: siteConfig.description,
    path: "/",
    image: "/og/casa46.jpg",
  }),
  title: { absolute: `Marcenaria fina e móveis sob medida em São Paulo | ${siteConfig.name}` },
};

const DIFFERENTIALS = [
  {
    title: "Produto",
    text: "Na Casa 46, cada móvel carrega mais do que técnica, carrega história. Móveis que se encaixam na rotina, no estilo e nos sonhos de quem os recebe. Aqui, o detalhe importa. A experiência também, afinal são os desafios que nos movem.",
  },
  { title: "Processos", text: "Cada etapa é feita com cuidado e transparência, do início ao fim." },
  {
    title: "Tecnologia",
    text: "A tecnologia permite total rastreio de todas as etapas on-line. Assinatura de documentos, conversas e avaliações geram segurança para os clientes e parceiros.",
  },
  { title: "Pessoas", text: "Nosso time é formado por pessoas comprometidas, que cuidam de cada projeto como se fosse único, porque é." },
];

export default async function HomePage() {
  const { posts } = await getPosts({ page: 1, perPage: 3 });
  const hero = photos["topo-home"][0];
  const homeProjects = projects.filter((p) => p.home);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl("/")}#webpage`,
          url: absoluteUrl("/"),
          name: `Marcenaria fina e móveis sob medida em São Paulo | ${siteConfig.name}`,
          about: { "@id": organizationId() },
          primaryImageOfPage: absoluteUrl(hero.src),
          mainEntity: {
            "@type": "ItemList",
            name: "Projetos da Casa 46",
            itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: absoluteUrl(`/clientes#${p.slug}`) })),
          },
        }}
      />

      {/* ------------------------------------------------------------------ Topo: a luz acende */}
      <section aria-labelledby="topo-titulo" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
        <div className="light-on absolute inset-0 -z-10">
          <HeroPicture desktop={hero} mobile={{ src: "/fotos/topo-home-celular.jpg", width: 576, height: 800 }} alt={hero.alt} high />
        </div>
        {/* brilho do disco de latão, que chega depois da luz */}
        <div aria-hidden className="light-glow pointer-events-none absolute left-1/2 top-[6%] -z-10 size-[42vmin] -translate-x-1/2 rounded-full md:top-[4%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.45)_0%,rgb(0_0_0/0.05)_30%,rgb(0_0_0/0.35)_62%,#000_100%)]" />

        <div className="wrap flex flex-1 flex-col pb-10 pt-36">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <SplitTitle as="h1" id="topo-titulo" text={siteConfig.home.heroTitle} delay={1300} className="display w-full max-w-[16ch] text-[2.6rem] sm:text-[4.4rem] lg:text-[5.4rem]" />
            <div data-reveal="fade" style={{ "--d": "1900ms" } as CSSProperties} className="mt-10">
              <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost-light min-w-44">
                Contato
              </a>
            </div>
          </div>
          <div className="mt-16">
            <Stats items={siteConfig.about.facts} delay={2100} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ O encontro perfeito entre arte e marcenaria */}
      <section id="especialidades" aria-labelledby="especialidades-titulo" className="bg-black pb-20 pt-16 text-white sm:pb-28 sm:pt-20">
        <div className="wrap">
          <div className="grid gap-6 border-b border-white/15 pb-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Tag icon={GridIcon} tone="light">
                Nossos serviços
              </Tag>
              <SplitTitle id="especialidades-titulo" text="O encontro perfeito entre arte e marcenaria." className="display mt-6 text-[2.3rem] sm:text-[3.2rem]" />
            </div>
            <p data-reveal="fade" className="max-w-[40ch] text-white/65 md:col-span-4 md:col-start-9">
              Quatro especialidades da nossa marcenaria fina. Arraste as fotos ou use as setas para ver cada uma.
            </p>
          </div>
        </div>
        <ul className="wrap snap-row mt-10 flex gap-4 overflow-x-auto [scroll-padding-inline:1rem] sm:[scroll-padding-inline:1.5rem] md:grid md:grid-cols-4 md:overflow-visible">
          {specialties.map((s, i) => (
            <li key={s.title} className="w-[78%] shrink-0 sm:w-[46%] md:w-auto" data-reveal="fade" style={{ "--d": `${i * 110}ms` } as CSSProperties}>
              <Carousel photos={s.photos} title={s.title} variant="card" sizes="(min-width: 768px) 25vw, 80vw" className="aspect-[3/4] overflow-hidden rounded-[16px]" />
              <h3 className="mt-5 text-[1.05rem] font-medium">{s.title}</h3>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-white/60">{siteConfig.services[i].description}</p>
            </li>
          ))}
        </ul>
        <div className="wrap mt-14">
          <div className="border-t border-white/15" />
        </div>
      </section>

      {/* -------------------------------------------------------------- Projetos empilhados (C46) */}
      <section id="c46" aria-labelledby="projetos-titulo" className="scroll-mt-0 bg-mist">
        <div className="wrap pb-14 pt-20 text-center sm:pt-28">
          <Tag icon={StarIcon}>Nossos melhores projetos</Tag>
          <SplitTitle id="projetos-titulo" text="A alta performance unida a marcenaria fina e desafios, tornam a sua experiência única" className="display mx-auto mt-6 max-w-[22ch] text-[2.2rem] text-ink sm:text-[3.1rem]" />
        </div>
        <div className="relative">
          {homeProjects.map((p, i) => (
            <article key={p.slug} aria-label={p.title} className="stack-panel h-[88svh] min-h-[30rem] bg-mist sm:h-[100svh]" style={{ zIndex: i + 1 }}>
              <div className="stack-inner relative size-full overflow-hidden bg-black">
                <Carousel
                  photos={fromCover(p)}
                  title={p.title}
                  variant="bleed"
                  className="size-full"
                  caption={
                    <>
                      <p className="text-[0.85rem] tabular-nums text-white/65">
                        {String(i + 1).padStart(2, "0")} / {String(homeProjects.length).padStart(2, "0")}
                      </p>
                      <h3 className="display mt-1 text-[2rem] sm:text-[3rem]">{p.title}</h3>
                    </>
                  }
                />
              </div>
            </article>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 bg-mist px-4 py-14 sm:flex-row sm:justify-center">
          <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-primary min-w-44">
            Contato
          </a>
          <Link href="/clientes" className="btn btn-secondary">
            Ver todos os projetos
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- Excelência e experiências únicas */}
      <section aria-labelledby="excelencia-titulo" className="relative overflow-hidden bg-white pb-6 pt-20 sm:pt-28">
        <div className="wrap text-center">
          <h2 id="excelencia-titulo" data-reveal="fade" className="display mx-auto max-w-[20ch] text-[2.2rem] text-ink sm:text-[3.1rem]">
            Excelência e <span className="text-[#747474]">experiências únicas</span>, <span className="text-[#747474]">para quem</span> exige o melhor
          </h2>
          <div data-reveal="fade" style={{ "--d": "200ms" } as CSSProperties} className="mt-8">
            <a href="#proposito" className="btn btn-primary">
              Conhecer a Casa 46
            </a>
          </div>
        </div>
        {/* o croqui se desenha da esquerda para a direita, como um traço de projeto */}
        <div className="mx-auto mt-4 max-w-[1100px] px-4" data-reveal="fade">
          <div className="sketch-draw relative aspect-[1920/669]">
            <Image src={photos["croqui-cozinha"][0].src} alt={photos["croqui-cozinha"][0].alt} fill sizes="(min-width: 1100px) 1100px, 100vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ O que nos torna diferentes? */}
      <section aria-labelledby="diferenciais-titulo" className="relative isolate overflow-hidden bg-black py-16 sm:py-24 lg:min-h-[56rem] lg:py-0">
        <div className="absolute inset-0 -z-10" data-reveal="image">
          <Image src={photos.diferenciais[0].src} alt={photos.diferenciais[0].alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="wrap flex lg:min-h-[56rem] lg:items-center lg:justify-end">
          <div data-reveal="fade" className="w-full max-w-[29rem] rounded-[18px] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-9">
            <Tag icon={EyeIcon}>Nossos diferenciais</Tag>
            <h2 id="diferenciais-titulo" className="mt-5 text-[1.8rem] font-semibold leading-tight tracking-[-0.025em] text-black">
              O que nos torna diferentes?
            </h2>
            <div className="mt-6 divide-y divide-line border-t border-line">
              {DIFFERENTIALS.map((d, i) => (
                <details key={d.title} className="faq-item group" open={i === 0}>
                  <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-[1rem] font-semibold text-steel group-open:text-black">
                    <span>
                      <span className="mr-2 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {d.title}
                    </span>
                    <ChevronDownIcon width={18} height={18} className="faq-icon shrink-0" />
                  </summary>
                  <p className="pb-5 text-[0.95rem] leading-relaxed text-ink/85">{d.text}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------- Galeria */}
      <section aria-labelledby="galeria-titulo" className="overflow-hidden bg-surface-alt py-20 sm:py-28">
        <div className="wrap grid items-center gap-14 md:grid-cols-12">
          <div className="relative md:col-span-6" aria-hidden={false}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[560/427] overflow-hidden rounded-[14px]" data-reveal="image">
                <Image src={photos.galeria[2].src} alt={photos.galeria[2].alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative row-span-2 overflow-hidden rounded-[14px]" data-reveal="image" style={{ "--d": "150ms" } as CSSProperties}>
                <Image src={photos["lamina-madeira-natural"][2].src} alt={photos["lamina-madeira-natural"][2].alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[376/352] overflow-hidden rounded-[14px]" data-reveal="image" style={{ "--d": "300ms" } as CSSProperties}>
                <Image src={photos.galeria[0].src} alt={photos.galeria[0].alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Tag icon={ImageIcon}>Galeria</Tag>
            <SplitTitle id="galeria-titulo" text="A beleza está nos detalhes e nossa galeria mostra exatamente isso." className="display mt-6 text-[2.1rem] text-ink sm:text-[2.7rem]" />
            <p data-reveal="fade" className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed text-muted">
              Inspire-se nos projetos que já ganharam forma com a Casa 46.
            </p>
            <div className="mt-8" data-reveal="fade">
              <ChipLink href="/inspiracoes" dark>
                Navegar pela galeria
              </ChipLink>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- O propósito por trás de cada projeto */}
      <section id="proposito" aria-labelledby="proposito-titulo" className="relative isolate scroll-mt-16 overflow-hidden bg-black text-white">
        {/* o "46" do logo em traço, como marca d'água */}
        <div aria-hidden className="pointer-events-none absolute -left-8 top-10 -z-10 select-none text-[22rem] font-extralight leading-none tracking-[-0.06em] text-white/[0.035] sm:text-[34rem]">
          46
        </div>
        <div className="wrap grid items-center gap-12 py-20 sm:py-28 md:grid-cols-12">
          <div className="md:col-span-6">
            <Tag icon={CompassIcon} tone="light">
              Propósito
            </Tag>
            <SplitTitle id="proposito-titulo" text="O propósito por trás de cada projeto" className="display mt-6 text-[2.2rem] sm:text-[3rem]" />
            <div className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-white/75 [&_strong]:font-semibold [&_strong]:text-white">
              <p data-reveal="fade">
                O nome <strong>Casa 46</strong> carrega um significado profundo, que reflete nossa essência, nosso compromisso com a <strong>alta performance</strong> e o <strong>detalhismo</strong>.
              </p>
              <p data-reveal="fade">
                O número <strong>46</strong> está diretamente ligado a <strong>Valentino Rossi</strong>, o maior piloto da história, conhecido como <strong>Il Dottore</strong> (em italiano) e <strong>The Doctor</strong> (em inglês). Um verdadeiro ícone de <strong>precisão</strong> e{" "}
                <strong>excelência</strong>. Assim como ele, buscamos o mais alto nível de desempenho em cada projeto.
              </p>
              <p data-reveal="fade">
                A conexão com a <strong>Itália</strong>, berço do <strong>design</strong> e da <strong>sofisticação</strong>, reforça nossa identidade, valorizando os <strong>detalhes</strong> e a <strong>exclusividade</strong>.
              </p>
              <p data-reveal="fade">
                Somos conhecidos como os <strong>Doutores da Marcenaria</strong> porque dominamos a arte da <strong>marcenaria fina</strong>, unindo <strong>conhecimento técnico</strong>, <strong>materiais nobres</strong> e <strong>processos rigorosos</strong> para entregar{" "}
                <strong>resultados impecáveis</strong>.
              </p>
              <p data-reveal="fade">
                Aqui, não apenas criamos móveis. Criamos <strong>experiências</strong> e entregamos <strong>exclusividade</strong>.
              </p>
            </div>
            <p data-reveal="fade" className="mt-8 text-[0.95rem] font-semibold tracking-[0.02em] text-white">
              Doutores da Marcenaria
            </p>
          </div>
          <div className="relative mx-auto aspect-[729/950] w-full max-w-[26rem] md:col-span-5 md:col-start-8" data-reveal="image">
            <Image src={photos["valentino-rossi-46"][0].src} alt={photos["valentino-rossi-46"][0].alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Doutores da marcenaria */}
      <section aria-labelledby="visao-titulo" className="bg-graphite pb-20 sm:pb-28">
        <div className="relative h-[62svh] min-h-[22rem] overflow-hidden sm:h-[80svh]" data-reveal="image">
          <Image src={photos["doutores-da-marcenaria"][0].src} alt={photos["doutores-da-marcenaria"][0].alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="wrap -mt-20 sm:-mt-24">
          <div data-reveal="fade" className="relative grid gap-6 rounded-[14px] bg-surface p-7 sm:p-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <Tag icon={EyeIcon}>Nossa visão</Tag>
              <h2 id="visao-titulo" className="mt-4 text-[1.6rem] font-semibold tracking-[-0.025em] text-black">
                Doutores da marcenaria
              </h2>
            </div>
            <div className="space-y-3 text-[1.02rem] font-medium leading-relaxed text-ink md:col-span-7">
              <p>Nos consideramos doutores da marcenaria, pois dominamos a arte da marcenaria fina, valorizando cada detalhe e a exclusividade que ela proporciona.</p>
              <p className="text-muted">Do papel à execução, garantimos que cada detalhe seja perfeito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Algumas empresas que confiam no nosso trabalho */}
      <section aria-labelledby="empresas-titulo" className="relative isolate overflow-hidden bg-surface pb-20 sm:pb-28">
        {/* mosaico em preto e branco que se dissolve no papel, como no site anterior */}
        <div aria-hidden className="grid grid-cols-5 gap-1 bg-graphite [mask-image:linear-gradient(180deg,#000_30%,transparent)]">
          {photos.mosaico.map((m) => (
            <div key={m.src} className="mono relative aspect-square overflow-hidden opacity-45 max-sm:[&:nth-child(n+6)]:hidden">
              <Image src={m.src} alt="" fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="wrap -mt-10 sm:-mt-24">
          <Tag icon={BarsIcon}>Colaboração de marcas</Tag>
          <SplitTitle id="empresas-titulo" text="Algumas empresas que confiam no nosso trabalho." className="display mt-6 max-w-[20ch] text-[2.1rem] text-ink sm:text-[2.7rem]" />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {companies.map((c, i) => (
              <li key={c.name} data-reveal="fade" style={{ "--d": `${i * 100}ms` } as CSSProperties} className="zoom-media flex flex-col rounded-[12px] bg-surface-alt p-2.5 sm:p-3">
                <div className="flex h-16 items-center justify-center rounded-[8px] bg-white px-4 sm:h-20">
                  <Image src={c.logo.src} alt={c.name} width={c.logo.width} height={c.logo.height} className="max-h-10 w-auto max-w-[80%] object-contain sm:max-h-12" />
                </div>
                <div className="relative mt-2.5 aspect-[4/5] overflow-hidden rounded-[8px] sm:mt-3">
                  <Image src={c.photo.src} alt={c.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------- O idealizador */}
      <FounderSection variant="full" />

      {/* ------------------------------------------------------------------ Perguntas frequentes */}
      <section aria-labelledby="faq-titulo" className="bg-white py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SplitTitle id="faq-titulo" text="Perguntas frequentes" className="display text-[2.2rem] text-ink sm:text-[2.8rem]" />
            <p data-reveal="fade" className="mt-4 max-w-[34ch] text-muted">
              O essencial sobre a Casa 46, a marcenaria e o atendimento. Se a sua dúvida não estiver aqui, fale com a gente pelo WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal="fade">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------- Blog */}
      {posts.length ? (
        <section aria-labelledby="blog-titulo" className="border-t border-line bg-surface py-20 sm:py-28">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitTitle id="blog-titulo" text="Do nosso blog" className="display text-[2.2rem] text-ink sm:text-[2.8rem]" />
              <Link href="/blog" className="btn btn-secondary">
                Ver todos os artigos
              </Link>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactSection />
    </>
  );
}
