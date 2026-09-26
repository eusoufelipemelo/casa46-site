import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { FounderSection } from "@/components/FounderSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SplitTitle } from "@/components/SplitTitle";
import { photos } from "@/content/fotos";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inspirações de marcenaria fina e móveis sob medida",
  description:
    "Galeria de inspirações da Casa 46: painéis em lâmina de madeira natural, forros de madeira, portas embutidas e móveis sob medida em projetos reais.",
  path: "/inspiracoes",
  image: "/og/inspiracoes.jpg",
});

export default function InspiracoesPage() {
  const list = photos.inspiracoes;
  const hero = list[0];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Inspirações Casa 46",
          url: absoluteUrl("/inspiracoes"),
          author: { "@id": organizationId() },
          image: list.map((p) => ({ "@type": "ImageObject", contentUrl: absoluteUrl(p.src), caption: p.alt, width: p.width, height: p.height })),
        }}
      />
      <PageHeader
        tall
        title="Inspirações CASA46"
        image={{ src: hero.src, alt: hero.alt }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Inspirações", path: "/inspiracoes" },
        ]}
      />
      <section aria-labelledby="galeria-titulo" className="bg-white py-20 sm:py-28">
        <div className="wrap">
          <SplitTitle id="galeria-titulo" text="Inspire-se com tudo o que fazemos." className="display max-w-[20ch] text-[2.4rem] text-ink sm:text-[3.3rem]" />
          <div className="mt-12">
            <PhotoGrid photos={list} title="Inspirações Casa 46" />
          </div>
        </div>
      </section>
      <FounderSection variant="quote" />
      <ContactSection />
    </>
  );
}
