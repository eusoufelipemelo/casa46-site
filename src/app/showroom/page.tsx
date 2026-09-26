import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Carousel } from "@/components/Carousel";
import { ContactSection } from "@/components/ContactSection";
import { FounderSection } from "@/components/FounderSection";
import { JsonLd } from "@/components/JsonLd";
import { SplitTitle } from "@/components/SplitTitle";
import { photos } from "@/content/fotos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Showroom de marcenaria fina em São Paulo",
  description:
    "Veja o showroom da Casa 46: cozinhas em madeira natural, ilhas de mármore, móveis curvos e o banco escultural de ripas, executados em marcenaria fina.",
  path: "/showroom",
  image: "/og/showroom.jpg",
});

export default function ShowroomPage() {
  const list = photos.showroom;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Showroom Casa 46",
          url: absoluteUrl("/showroom"),
          author: { "@id": organizationId() },
          image: list.map((p) => ({ "@type": "ImageObject", contentUrl: absoluteUrl(p.src), caption: p.alt, width: p.width, height: p.height })),
        }}
      />
      {/* Topo claro, como no site anterior: a pergunta e o carrossel grande logo abaixo */}
      <section aria-labelledby="showroom-titulo" className="bg-surface-alt pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="wrap">
          <div data-reveal="fade" className="flex justify-center">
            <Breadcrumbs
              items={[
                { name: "Início", path: "/" },
                { name: "Showroom", path: "/showroom" },
              ]}
            />
          </div>
          <SplitTitle as="h1" id="showroom-titulo" text="Por que imaginar quando você pode enxergar?" className="display mx-auto mt-6 max-w-[16ch] text-center text-[2.7rem] text-ink sm:text-[4rem] lg:text-[4.8rem]" />
          <p data-reveal="fade" className="mx-auto mt-6 max-w-[46ch] text-center text-[1.1rem] leading-relaxed text-muted">
            Veja nossas obras-primas criativas ganharem vida nessas fotos incríveis do nosso Showroom.
          </p>
          <div data-reveal="image" className="mt-12 sm:mt-16">
            <Carousel photos={list} title="Showroom Casa 46" variant="wide" eager sizes="(min-width: 1140px) 1140px, 100vw" className="aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-[16/9]" />
          </div>
        </div>
      </section>
      <FounderSection variant="quote" />
      <ContactSection />
    </>
  );
}
