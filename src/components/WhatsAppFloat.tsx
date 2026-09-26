import { links } from "@/site.config";
import { WhatsAppIcon } from "./icons";

/** Botão fixo de WhatsApp (canto inferior direito), com o mesmo link dos botões "Contato". */
export function WhatsAppFloat() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a Casa 46 pelo WhatsApp"
      className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-[#1FAF38] text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.55)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
