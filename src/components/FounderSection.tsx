import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/content/fotos";
import { links, siteConfig } from "@/site.config";
import { HeroPicture } from "./HeroPicture";
import { PenIcon } from "./icons";
import { SplitTitle } from "./SplitTitle";
import { ChipLink, Tag } from "./ui";

const QUOTE = "Cada peça que criamos é única, pensada para proporcionar sofisticação e funcionalidade.";

/**
 * "O idealizador": bloco escuro com o retrato de Jônas Pastore e a assinatura.
 * - `full` (Home): o texto institucional inteiro e o botão para a página do Jônas;
 * - `quote` (páginas internas): a frase entre aspas e o botão de WhatsApp, como no site anterior.
 */
export function FounderSection({ variant = "quote" }: { variant?: "full" | "quote" }) {
  const wide = photos["jonas-pastore-idealizador"][0];
  const tall = photos["jonas-pastore-retrato"][1];
  return (
    <section id={variant === "full" ? "sobre" : undefined} aria-labelledby="idealizador-titulo" className="relative isolate overflow-hidden bg-black text-white">
      {/* computador: a foto larga original (retrato à direita, "46" em marca d'água à esquerda) */}
      <div className="absolute inset-0 -z-10 hidden md:block" data-reveal="image">
        <HeroPicture desktop={wide} mobile={tall} alt={wide.alt} eager={false} className="object-[70%_50%]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,#000_0%,rgb(0_0_0/0.85)_38%,transparent_62%)] md:block" />

      <div className="wrap grid md:min-h-[46rem] md:grid-cols-12 md:items-center">
        <div className="py-20 md:col-span-6 md:py-28 lg:col-span-5">
          <Tag icon={PenIcon} tone="light">
            O idealizador
          </Tag>
          {variant === "full" ? (
            <>
              <SplitTitle id="idealizador-titulo" text={siteConfig.about.headline} className="display mt-6 text-[2.2rem] sm:text-[2.8rem]" />
              <div className="mt-7 space-y-4 text-[1rem] leading-relaxed text-white/78">
                {siteConfig.about.paragraphs.map((p, i) => (
                  <p key={i} data-reveal="fade" style={{ "--d": `${i * 70}ms` } as CSSProperties}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-9" data-reveal="fade">
                <ChipLink href="/jp">Quero saber mais</ChipLink>
              </div>
            </>
          ) : (
            <>
              <h2 id="idealizador-titulo" className="sr-only">
                Jônas Pastore, o idealizador da Casa 46
              </h2>
              <blockquote data-reveal="fade" className="mt-7">
                <p className="display text-[2rem] leading-[1.15] sm:text-[2.6rem]">“{QUOTE}”</p>
                <footer className="mt-5 text-[0.95rem] text-white/60">Jônas Pastore, fundador da Casa 46</footer>
              </blockquote>
              <div className="mt-9" data-reveal="fade">
                <ChipLink href={links.whatsapp}>Quero saber mais</ChipLink>
              </div>
            </>
          )}
        </div>

        {/* celular: retrato em pé, com a assinatura, abaixo do texto */}
        <div className="relative -mx-4 aspect-[420/900] max-h-[80svh] sm:-mx-6 md:hidden" data-reveal="image">
          <Image src={tall.src} alt={tall.alt} fill sizes="100vw" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
}
