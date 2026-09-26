import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";
import { getAllPosts } from "@/lib/outbox";
import { photos } from "@/content/fotos";
import { projects } from "@/content/projetos";

// Páginas fixas + todos os artigos do CMS. O webhook revalida na hora; 5 min de segurança.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latest = posts.reduce<string | undefined>((acc, p) => {
    const d = p.updatedAt ?? p.publishedAt ?? undefined;
    return d && (!acc || d > acc) ? d : acc;
  }, undefined);

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    // Páginas da Casa 46 (mesmos endereços do site anterior). /servicos e /sobre do modelo
    // redirecionam para /clientes e /jp, por isso não entram aqui.
    { url: absoluteUrl("/clientes"), changeFrequency: "monthly", priority: 0.9, images: projects.flatMap((p) => p.photos.slice(0, 3).map((f) => absoluteUrl(f.src))) },
    { url: absoluteUrl("/jp"), changeFrequency: "monthly", priority: 0.8, images: photos["jonas-pastore-trajetoria"].map((f) => absoluteUrl(f.src)) },
    { url: absoluteUrl("/showroom"), changeFrequency: "monthly", priority: 0.8, images: photos.showroom.map((f) => absoluteUrl(f.src)) },
    { url: absoluteUrl("/inspiracoes"), changeFrequency: "monthly", priority: 0.8, images: photos.inspiracoes.map((f) => absoluteUrl(f.src)) },
    { url: absoluteUrl("/contato"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/politica-de-privacidade"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/politica-de-cookies"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/lgpd"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/termos-de-uso"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.8, ...(latest ? { lastModified: latest } : {}) },
  ];

  return [
    ...pages,
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ?? p.publishedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(p.cover ? { images: [p.cover.url] } : {}),
    })),
  ];
}
