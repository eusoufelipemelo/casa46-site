import { Inter } from "next/font/google";

/**
 * IDENTIDADE DA CASA 46 — o único arquivo de configuração do site.
 *
 * Textos, contatos e links foram trazidos do site anterior (casa46.com.br, GreatPages),
 * sem acrescentar números nem promessas. Fonte, cores e logos também são os do site anterior.
 */

// Inter é a fonte do site anterior (Home). Uma família só, em pesos diferentes.
export const brandFont = Inter({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export type NavLink = { label: string; href: string };
export type Service = { title: string; description: string };

/** Link dos botões "Contato" (wa.link do site anterior): um WhatsApp só, (11) 99435-1023. */
export const links = {
  whatsapp: "https://wa.link/qxy2no",
};

export const siteConfig = {
  name: "Casa 46",
  legalName: "Casa 46 Design Ltda.",
  cnpj: "23.891.152/0001-27",
  tagline: "Desafios nos movem, segurança nos define.",
  description:
    "Marcenaria fina e móveis sob medida em São Paulo para residências, escritórios, hotelaria e construtoras. Fundada por Jônas Pastore, os Doutores da Marcenaria.",
  /** Domínio de produção, sem barra no fim. A variável SITE_URL tem prioridade. */
  url: "https://www.casa46.com.br",
  locale: "pt_BR",
  language: "pt-BR",

  /** Logos originais. Escuro: CASA preto + 46 cinza. Claro: CASA branco + 46 cinza. */
  logo: { src: "/marca/casa46-escuro.svg", width: 247, height: 52 },
  logoLight: { src: "/marca/casa46-claro.svg", width: 173, height: 37 },
  ogImage: "/og/casa46.jpg",

  schemaType: "HomeAndConstructionBusiness",

  nav: [
    { label: "Home", href: "/" },
    { label: "C46", href: "/#c46" },
    { label: "Jônas Pastore", href: "/jp" },
    { label: "Showroom", href: "/showroom" },
    { label: "Inspirações", href: "/inspiracoes" },
    { label: "Projetos", href: "/clientes" },
    { label: "Blog", href: "/blog" },
  ] satisfies NavLink[],

  contact: {
    whatsapp: "5511994351023",
    whatsappMessage: "Olá, vim através do site da Casa46 e gostaria de mais informações...",
    phone: "(11) 9 9435-1023",
    phoneHref: "+5511994351023",
    email: "contato@casa46.com.br",
    address: {
      street: "Av. Brigadeiro Luís Antônio, 2543, conjunto 52",
      neighborhood: "Jardim Paulista",
      city: "São Paulo",
      state: "SP",
      postalCode: "01401-000",
      country: "BR",
    },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Brigadeiro+Lu%C3%ADs+Ant%C3%B4nio%2C+2543%2C+S%C3%A3o+Paulo+-+SP",
    /** O site anterior não informa horário: fica vazio e some da tela. */
    hours: "",
    openingHoursSpec: [] as string[],
    areaServed: "São Paulo e todo o Brasil",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/casa46oficial/" },
    { label: "Facebook", href: "https://www.facebook.com/casa46oficial" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/casa46/" },
    { label: "YouTube", href: "https://www.youtube.com/@casa46oficial" },
  ] satisfies NavLink[],

  /** Especialidades mostradas na Home (as quatro categorias do site anterior). */
  services: [
    { title: "Lâmina de madeira natural", description: "Painéis, portas e revestimentos em lâmina de madeira natural, do living ao quarto." },
    { title: "Revestimento de teto", description: "Forros em madeira com iluminação embutida, que aquecem e organizam o ambiente." },
    { title: "Curvos", description: "Paredes, portais e móveis curvos executados sob medida em marcenaria fina." },
    { title: "Portas de ambientes", description: "Portas embutidas, de correr e pivotantes, integradas ao revestimento da parede." },
  ] satisfies Service[],

  about: {
    headline: "Muito além de marcenaria, entregamos excelência.",
    paragraphs: [
      "Na Casa 46, transformamos madeira em arte, criando experiências únicas para quem exige o melhor.",
      "Nossa especialidade está nos detalhes, na precisão e no design refinado. Com mais de 20 anos de experiência no segmento moveleiro, a Casa 46 foi fundada por Jônas Pastore, executivo do grupo Unicasa por mais de uma década e mentor da Escola de Planejados, onde treinou centenas de empresários do setor entre Brasil, México e Estados Unidos.",
      "Com uma ampla experiência em projetos Corporativos, Construção Civil e Hotelaria (B to B). Nosso principal asset é ser ancorado por um pool de fabricantes, o que nos credencia com a maior flexibilidade do mercado nacional e capacidade produtiva.",
      "Permitindo assim produzir móveis sob medida e planejados, com marcenaria State of Art. Tudo com o máximo de segurança para os clientes.",
      "Cada peça que criamos é única, pensada para proporcionar sofisticação e funcionalidade.",
    ],
    /** Números do site anterior (Home). */
    facts: [
      { value: "20+", label: "Anos de experiência no mercado" },
      { value: "93%", label: "Índice de satisfação máxima" },
      { value: "1.000+", label: "Clientes felizes, espaços transformados" },
      { value: "100+", label: "Arquitetos, incorporadores e construtoras" },
    ],
    expert: {
      name: "Jônas Pastore",
      credentials: "Fundador da Casa 46 e mentor da Escola de Planejados",
      bio: "Executivo do grupo Unicasa por mais de uma década e mentor da Escola de Planejados, onde treinou centenas de empresários do setor moveleiro entre Brasil, México e Estados Unidos.",
    },
  },

  home: {
    heroTitle: "Desafios nos movem, segurança nos define.",
    heroText: "",
    primaryCta: "Contato",
    secondaryCta: "Conhecer a Casa 46",
    heroImage: "/fotos/topo-home-01.jpg",
    heroImageAlt: "Prateleira de pedra bruta com luz embutida e disco de latão iluminado",
  },

  blog: {
    title: "Blog",
    description: "Marcenaria fina, móveis sob medida e bastidores dos projetos da Casa 46.",
    perPage: 12,
  },

  cta: {
    title: "Um projeto único especial merece uma entrega à altura.",
    text: "Afinal, na Casa 46 são os desafios que nos movem.",
    button: "Falar no WhatsApp",
  },

  /**
   * CORES do site anterior. Preto e creme dominam; o laranja #FF833B aparece só no marcador
   * dos botões, como no original.
   */
  theme: {
    brand: "#000000",
    brandContrast: "#FFFFFF",
    brandSoft: "#F7F2E9",
    ink: "#242424",
    muted: "#5E6C7B",
    surface: "#FFFBF5",
    surfaceAlt: "#F7F2E9",
    line: "#E3DCCF",
    radius: "10px",
    graphite: "#101010",
    mist: "#EEEEEE",
    steel: "#40545F",
    signal: "#FF833B",
  },
};

export type SiteConfig = typeof siteConfig;
