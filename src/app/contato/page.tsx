import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { photos } from "@/content/fotos";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Fale com a Casa 46: WhatsApp (11) 9 9435-0664, contato@casa46.com.br, Av. Brigadeiro Luís Antônio, 2543, Jardim Paulista, São Paulo.",
  path: "/contato",
});

export default function ContatoPage() {
  const img = photos.showroom[0];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contato"), name: "Contato Casa 46", about: { "@id": organizationId() } }} />
      <PageHeader
        title="Fale com a Casa 46"
        intro="Conte o que você quer construir. A mensagem sai pronta no WhatsApp da nossa equipe."
        image={{ src: img.src, alt: img.alt }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />
      <ContactSection />
    </>
  );
}
