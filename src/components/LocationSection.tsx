import { organizationId } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";
import { CopyAddress } from "./CopyAddress";
import { PinIcon } from "./icons";
import { JsonLd } from "./JsonLd";
import { LocationMap } from "./LocationMap";
import { SplitTitle } from "./SplitTitle";
import { Tag } from "./ui";

/**
 * "Como chegar": mapa em tela larga logo antes do rodapé, em todas as páginas, com o cartão
 * do endereço e atalhos de rota para Google Maps, Waze e Apple Maps (cada um abre o app no
 * celular, já com o destino preenchido) e um botão para copiar o endereço.
 */
export function LocationSection() {
  const c = siteConfig.contact;
  const a = c.address;
  const { lat, lng } = c.geo;
  const full = `${a.street}, ${a.neighborhood}, ${a.city} - ${a.state}, ${a.postalCode}`;
  const dest = encodeURIComponent(`Av. Brigadeiro Luís Antônio, 2543, ${a.city} - ${a.state}, ${a.postalCode}`);
  const routes = [
    { label: "Google Maps", href: `https://www.google.com/maps/dir/?api=1&destination=${dest}` },
    { label: "Waze", href: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes` },
    { label: "Apple Maps", href: `https://maps.apple.com/?daddr=${dest}&dirflg=d` },
  ];
  const btn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] px-4 text-[0.95rem] font-medium transition-colors duration-300";

  return (
    <section id="localizacao" aria-labelledby="localizacao-titulo" className="relative isolate scroll-mt-16 bg-black text-white">
      <JsonLd data={{ "@context": "https://schema.org", "@id": organizationId(), geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng }, hasMap: c.mapsUrl }} />
      <div className="relative h-[60svh] min-h-[22rem] md:h-[40rem]">
        <LocationMap lat={lat} lng={lng} label={`Casa 46: ${full}`} />
        {/* véu à esquerda no computador, para o cartão respirar sobre o mapa */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-black/70 to-transparent md:block" />
      </div>

      <div className="wrap relative md:pointer-events-none md:absolute md:inset-0 md:flex md:items-center">
        <div data-reveal="fade" className="pointer-events-auto relative z-10 -mt-16 w-full rounded-[14px] bg-surface p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:p-8 md:mt-0 md:max-w-[26rem]">
          <Tag icon={PinIcon}>Localização</Tag>
          <SplitTitle id="localizacao-titulo" text="Venha conhecer a Casa 46" className="display mt-5 text-[1.9rem] sm:text-[2.2rem]" />
          <address className="mt-4 not-italic leading-relaxed text-muted">
            {a.street}
            <br />
            {a.neighborhood}, {a.city} - {a.state}
            <br />
            CEP {a.postalCode}
          </address>

          <p className="mt-6 text-[0.85rem] font-medium text-ink">Traçar rota pelo</p>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {routes.map((r, i) => (
              <li key={r.label} className={i === 0 ? "col-span-2" : undefined}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Traçar rota até a Casa 46 pelo ${r.label}`}
                  className={`${btn} w-full whitespace-nowrap ${i === 0 ? "bg-black text-white hover:bg-steel" : "border border-black/15 text-ink hover:border-black hover:bg-black hover:text-white"}`}
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
          <CopyAddress address={full} className={`${btn} mt-2 w-full cursor-pointer border border-dashed border-black/20 text-muted hover:border-black hover:text-ink`} />
        </div>
      </div>
      <div className="h-12 md:hidden" />
    </section>
  );
}
