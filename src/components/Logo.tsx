import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Logo original da Casa 46 (SVG do site anterior, sem redesenho).
 * Duas versões sobrepostas que trocam com transição: clara (CASA branco) sobre fundo escuro
 * e escura (CASA preto) sobre fundo claro. O "46" é cinza nas duas.
 */
export function Logo({ light = true, className = "h-8 w-auto sm:h-9" }: { light?: boolean; className?: string }) {
  const { name, logo, logoLight } = siteConfig;
  return (
    <Link href="/" className="relative inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
      <Image src={logo.src} alt="" width={logo.width} height={logo.height} unoptimized loading="eager" className={`${className} transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} />
      <Image
        src={logoLight.src}
        alt=""
        width={logoLight.width}
        height={logoLight.height}
        unoptimized
        loading="eager"
        className={`absolute inset-0 ${className} transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
}

/** Logo escuro fixo (áreas claras, como o bloco de contato). */
export function LogoDark({ className = "h-12 w-auto" }: { className?: string }) {
  const { name, logo } = siteConfig;
  return <Image src={logo.src} alt={name} width={logo.width} height={logo.height} unoptimized className={className} />;
}
