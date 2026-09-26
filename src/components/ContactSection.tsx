import type { CSSProperties } from "react";
import { siteConfig } from "@/site.config";
import { FacebookIcon, InstagramIcon, LinkedinIcon, PhoneIcon, YoutubeIcon } from "./icons";
import { LeadForm } from "./LeadForm";
import { LogoDark } from "./Logo";
import { SplitTitle } from "./SplitTitle";
import { Tag } from "./ui";

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = { Instagram: InstagramIcon, Facebook: FacebookIcon, LinkedIn: LinkedinIcon, YouTube: YoutubeIcon };

/**
 * "Contato-nos": a frase do site anterior, os canais em lista com linhas finas e o
 * formulário ao lado. Fundo papel (#FFFBF5), como no original.
 */
export function ContactSection() {
  const c = siteConfig.contact;
  const a = c.address;
  const item = "border-b border-line pb-5";
  const dt = "text-[0.8rem] text-muted";
  const dd = "mt-1 text-[1.02rem] font-semibold text-ink";
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Tag icon={PhoneIcon}>Contato</Tag>
          <SplitTitle id="contato-titulo" text="Um projeto único especial merece uma entrega à altura, afinal na Casa 46 são os desafios que nos movem." className="display mt-6 max-w-[20ch] text-[2rem] text-ink sm:text-[2.5rem]" />

          <dl className="mt-10 max-w-sm space-y-5" data-reveal="fade">
            <div className={item}>
              <dt className={dt}>Contato</dt>
              <dd className={dd}>
                <a href={`tel:${c.phoneHref}`} className="hover:underline">
                  {c.phone}
                </a>
              </dd>
            </div>
            <div className={item}>
              <dt className={dt}>E-mail</dt>
              <dd className={dd}>
                <a href={`mailto:${c.email}`} className="hover:underline">
                  {c.email}
                </a>
              </dd>
            </div>
            <div className={item}>
              <dt className={dt}>Endereço</dt>
              <dd className={dd}>
                <a href={c.mapsUrl} target="_blank" rel="noopener" className="hover:underline">
                  {a.street}, {a.neighborhood}, {a.city} - {a.state}, {a.postalCode}
                </a>
              </dd>
            </div>
            <div>
              <dt className={dt}>Redes sociais</dt>
              <dd className="mt-2 flex gap-1">
                {siteConfig.social.map((s) => {
                  const Icon = SOCIAL_ICONS[s.label];
                  return (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={`${siteConfig.name} no ${s.label}`} className="-ml-2 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-black hover:text-white">
                      {Icon ? <Icon width={20} height={20} /> : s.label}
                    </a>
                  );
                })}
              </dd>
            </div>
          </dl>
          <div className="mt-12 hidden lg:block" data-reveal="fade">
            <LogoDark className="h-12 w-auto" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal="fade" style={{ "--d": "150ms" } as CSSProperties}>
          <LeadForm whatsapp={c.whatsapp} />
        </div>
      </div>
    </section>
  );
}
