import { photos, type Photo } from "./fotos";

/**
 * Projetos do site anterior (Home e página /clientes), na mesma ordem.
 * O título é o escritório de arquitetura parceiro (ou o nome do restaurante), como no original.
 */
export type Project = {
  slug: string;
  title: string;
  /** Texto de apoio curto, só com o que o site anterior informa. */
  credits?: string;
  photos: Photo[];
  /** Foto de capa (índice em photos). */
  cover: number;
  /** Aparece na Home (o Song Qi só aparecia na página de projetos). */
  home: boolean;
};

export const projects: Project[] = [
  { slug: "atelier-peclat", title: "Atelier Peclat", photos: photos["atelier-peclat"], cover: 1, home: true },
  { slug: "athie-wohnrath", title: "Athie Wohnrath", photos: photos["athie-wohnrath"], cover: 1, home: true },
  { slug: "luis-renato-machado", title: "Arq. Luís Renato Machado", photos: photos["luis-renato-machado"], cover: 1, home: true },
  { slug: "bossa-arquitetura", title: "Bossa Arquitetura", photos: photos["bossa-arquitetura"], cover: 1, home: true },
  {
    slug: "restaurante-song-qi",
    title: "Restaurante Song Qi",
    credits: "Escritórios de arquitetura: Humbert & Poyet (Mônaco), Georgia Massa e Maria Clara Spyer.",
    photos: photos["restaurante-song-qi"],
    cover: 0,
    home: false,
  },
];

/** Fotos a partir da capa (o carrossel abre na foto mais forte de cada projeto). */
export function fromCover(p: Project): Photo[] {
  return [...p.photos.slice(p.cover), ...p.photos.slice(0, p.cover)];
}

/** As quatro especialidades da Home ("O encontro perfeito entre arte e marcenaria"). */
export const specialties = [
  { title: "Lâmina de madeira natural", photos: photos["lamina-madeira-natural"] },
  { title: "Revestimento de teto", photos: photos["revestimento-de-teto"] },
  { title: "Curvos", photos: photos["curvos"] },
  { title: "Portas de ambientes", photos: photos["portas-de-ambientes"] },
];

/** Empresas que confiam no trabalho da Casa 46 (bloco "Colaboração de marcas"). */
export const companies = [
  { name: "Tools", logo: { src: "/empresas/tools-logo.png", width: 362, height: 108 }, photo: { src: "/empresas/tools.jpg", width: 1200, height: 800 }, alt: "Escritório da Tools com marcenaria da Casa 46" },
  { name: "Urbic", logo: { src: "/empresas/urbic-logo.png", width: 289, height: 85 }, photo: { src: "/empresas/urbic.jpg", width: 1200, height: 800 }, alt: "Área de convivência de empreendimento Urbic" },
  { name: "Tishman Speyer", logo: { src: "/empresas/tishman-speyer-logo.png", width: 850, height: 500 }, photo: { src: "/empresas/tishman-speyer.jpg", width: 1103, height: 652 }, alt: "Lobby de empreendimento Tishman Speyer com painel de madeira" },
  { name: "Gamaro", logo: { src: "/empresas/gamaro-logo.png", width: 1440, height: 550 }, photo: { src: "/empresas/gamaro.jpg", width: 576, height: 720 }, alt: "Fachada de edifício residencial Gamaro" },
];
