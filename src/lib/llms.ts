import "server-only";
import { absoluteUrl } from "@/lib/env";
import type { PostSummary } from "@/lib/outbox";
import { siteConfig } from "@/site.config";
import { faq } from "@/content/faq";
import { projects } from "@/content/projetos";

/** llms.txt de reserva (quando o CMS não responde), montado com o site.config.ts. */
export function fallbackLlms(posts: PostSummary[], full: boolean): string {
  const c = siteConfig.contact;
  const a = c.address;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    siteConfig.tagline,
    "",
    "## Contato",
    "",
    c.phone ? `- Telefone: ${c.phone}` : "",
    c.whatsapp ? `- WhatsApp: https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
    c.email ? `- E-mail: ${c.email}` : "",
    a.street ? `- Endereço: ${a.street}, ${a.neighborhood ? `${a.neighborhood}, ` : ""}${a.city}/${a.state}` : "",
    c.hours ? `- Horário: ${c.hours}` : "",
    c.areaServed ? `- Região atendida: ${c.areaServed}` : "",
    "",
    "## Páginas",
    "",
    `- [Início](${absoluteUrl("/")}): ${siteConfig.tagline}`,
    `- [Serviços](${absoluteUrl("/servicos")}): ${siteConfig.services.map((s) => s.title).join(", ")}`,
    `- [Sobre](${absoluteUrl("/sobre")}): ${siteConfig.about.headline}`,
    `- [Contato](${absoluteUrl("/contato")}): canais de atendimento`,
    `- [Blog](${absoluteUrl("/blog")}): ${siteConfig.blog.description}`,
  ];
  // Casa 46: páginas próprias, projetos e perguntas frequentes (acréscimo ao modelo).
  lines.push(
    `- [Projetos](${absoluteUrl("/clientes")}): ${projects.map((p) => p.title).join(", ")}`,
    `- [Jônas Pastore](${absoluteUrl("/jp")}): fundador da Casa 46`,
    `- [Showroom](${absoluteUrl("/showroom")}): fotos do showroom da Casa 46`,
    `- [Inspirações](${absoluteUrl("/inspiracoes")}): galeria de projetos`,
    "",
    "## Perguntas frequentes",
    "",
    ...faq.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  );
  if (full) {
    lines.push("", "## Projetos", "");
    for (const p of projects) lines.push(`- ${p.title}${p.credits ? `. ${p.credits}` : ""}`);
    lines.push("", "## Serviços", "");
    for (const s of siteConfig.services) lines.push(`### ${s.title}`, "", s.description, "");
    lines.push("## Sobre", "", ...siteConfig.about.paragraphs.flatMap((p) => [p, ""]));
  }
  if (posts.length) {
    lines.push("", "## Artigos", "");
    for (const p of posts) {
      const summary = (full ? (p.answerSummary ?? p.excerpt) : p.excerpt).replace(/\s+/g, " ").trim();
      lines.push(`- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${summary ? `: ${summary}` : ""}`);
    }
  }
  return `${lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim()}\n`;
}
