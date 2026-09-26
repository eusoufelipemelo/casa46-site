import { links, siteConfig } from "@/site.config";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return <SiteNav links={siteConfig.nav} contactHref={links.whatsapp} />;
}
