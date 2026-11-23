/**
 * SEO local e regional da Casa 46: um lugar só para a sede e a região atendida.
 *
 * A Casa 46 recebe clientes no showroom do Jardim Paulista (endereço visível no Perfil da
 * Empresa no Google) e atende todo o Brasil em obras corporativas, de construtoras e hotelaria.
 * A lista abaixo não limita o atendimento: ela existe para quem busca "marcenaria em Moema",
 * "marcenaria no Itaim" etc. encontrar a Casa 46.
 *
 * Termos do Google Trends (estado de SP, 12 meses, nov/2026):
 * - "marcenaria são paulo" 42 x "móveis planejados são paulo" 5 x "móveis sob medida são paulo" 0;
 * - "marcenaria" 84 (com muito "curso de marcenaria"), "móveis planejados" 18, "painel ripado" 43;
 * - "alto padrão" quase não é buscado (0 a 2): fica no texto, não no título.
 * Os 3 primeiros do mapa em "marcenaria são paulo" usam a categoria "Marceneiro".
 *
 * Bairros: os de alto padrão mais próximos do showroom; cidades: Grande SP com esse público.
 * São as mesmas 20 áreas de atendimento do Perfil da Empresa (23/11/2026): estas 19 + a cidade de São Paulo,
 * que entra em areaServedJsonLd. Editar aqui muda o site; mudar no Perfil também.
 */

export const SEDE = { bairro: "Jardim Paulista", cidade: "São Paulo", uf: "SP", estado: "São Paulo" } as const;

/** Termo principal (Trends) e rota da página regional. */
export const TERMO_PRINCIPAL = "Marcenaria";
export const ROTA_REGIAO = "/marcenaria-sao-paulo";

export type Area = { nome: string; grupo: "Sede" | "Vizinhança" | "Zona Oeste e Zona Sul" | "Grande São Paulo"; tipo: "bairro" | "cidade" };

/** Áreas atendidas, da mais próxima do showroom para a mais distante. */
export const AREAS: Area[] = [
  { nome: "Jardim Paulista", grupo: "Sede", tipo: "bairro" },
  { nome: "Jardins", grupo: "Vizinhança", tipo: "bairro" },
  { nome: "Paraíso", grupo: "Vizinhança", tipo: "bairro" },
  { nome: "Vila Mariana", grupo: "Vizinhança", tipo: "bairro" },
  { nome: "Higienópolis", grupo: "Vizinhança", tipo: "bairro" },
  { nome: "Vila Nova Conceição", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Itaim Bibi", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Moema", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Vila Olímpia", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Pinheiros", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Perdizes", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Alto de Pinheiros", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Brooklin", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Campo Belo", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Morumbi", grupo: "Zona Oeste e Zona Sul", tipo: "bairro" },
  { nome: "Barueri (Alphaville)", grupo: "Grande São Paulo", tipo: "cidade" },
  { nome: "Santana de Parnaíba", grupo: "Grande São Paulo", tipo: "cidade" },
  { nome: "São Caetano do Sul", grupo: "Grande São Paulo", tipo: "cidade" },
  { nome: "Guarulhos", grupo: "Grande São Paulo", tipo: "cidade" },
];

/** Os bairros que cabem numa frase (descrição, rodapé). */
export const AREAS_PRINCIPAIS = ["Jardins", "Itaim Bibi", "Moema", "Pinheiros"] as const;

/** "Marcenaria" vira "Marcenaria em São Paulo (SP)". */
export function tituloLocal(titulo: string) {
  return `${titulo} em ${SEDE.cidade} (${SEDE.uf})`;
}

/** Acrescenta a região atendida ao fim da descrição. */
export function descricaoLocal(descricao: string) {
  return `${descricao} Showroom no ${SEDE.bairro}, atendendo ${AREAS_PRINCIPAIS.join(", ")} e todo o Brasil.`;
}

/** areaServed do schema.org: bairros da capital, cidades da Grande SP, o estado e o Brasil. */
export function areaServedJsonLd() {
  const capital = { "@type": "City", name: SEDE.cidade, containedInPlace: { "@type": "State", name: SEDE.estado } };
  return [
    capital,
    ...AREAS.filter((a) => a.tipo === "bairro").map((a) => ({ "@type": "Place", name: `${a.nome}, ${SEDE.cidade}`, containedInPlace: capital })),
    ...AREAS.filter((a) => a.tipo === "cidade").map((a) => ({ "@type": "City", name: a.nome.replace(/ \(.*\)$/, ""), containedInPlace: { "@type": "State", name: SEDE.estado } })),
    { "@type": "State", name: SEDE.estado },
    { "@type": "Country", name: "Brasil" },
  ];
}
