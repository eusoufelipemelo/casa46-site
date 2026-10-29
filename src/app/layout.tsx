import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { CookieNotice } from "@/components/CookieNotice";
import { JsonLd } from "@/components/JsonLd";
import { LocationSection } from "@/components/LocationSection";
import { SiteEffects } from "@/components/SiteEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteUrl } from "@/lib/env";
import { siteGraph } from "@/lib/jsonld";
import { defaultOgImage } from "@/lib/seo";
import { brandFont, siteConfig } from "@/site.config";
import "./globals.css";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `Marcenaria fina e móveis sob medida em São Paulo | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: ["Casa 46", "marcenaria fina", "móveis sob medida", "móveis planejados", "marcenaria em São Paulo", "lâmina de madeira natural", "Jônas Pastore", "Doutores da Marcenaria"],
    // canonical fica em cada página (herdar "/" daqui faria todas apontarem para a Home)
    alternates: {
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.name}: blog` }] },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: "/",
      images: [{ url: defaultOgImage(), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

/** Cores do site.config.ts como variáveis CSS (ver globals.css). */
const t = siteConfig.theme;
const themeVars = {
  "--brand": t.brand,
  "--brand-contrast": t.brandContrast,
  "--brand-soft": t.brandSoft,
  "--ink": t.ink,
  "--muted": t.muted,
  "--surface": t.surface,
  "--surface-alt": t.surfaceAlt,
  "--line": t.line,
  "--radius": t.radius,
  "--graphite": t.graphite,
  "--mist": t.mist,
  "--steel": t.steel,
  "--signal": t.signal,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.language} style={themeVars} className={`${brandFont.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Marca que o JS está ativo antes da pintura: as animações de entrada só escondem conteúdo com JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#conteudo" className="sr-only z-50 rounded-[4px] bg-black px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <LocationSection />
        <SiteFooter />
        <WhatsAppFloat />
        <CookieNotice />
        <SiteEffects />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
