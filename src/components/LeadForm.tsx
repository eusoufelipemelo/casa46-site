"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/format";

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TYPES = ["Residencial", "Corporativo", "Construção civil", "Hotelaria", "Restaurante ou comércio"];

/**
 * Formulário do site anterior (nome, WhatsApp, e-mail e mensagem), com tipo de projeto e o
 * aceite da Política de Privacidade. Ao enviar, monta a mensagem e abre o WhatsApp da Casa 46.
 * Os dados não ficam guardados no site.
 */
export function LeadForm({ whatsapp }: { whatsapp: string }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const field =
    "w-full min-h-[3.25rem] rounded-[4px] border border-transparent bg-[#F1ECE3] px-4 py-3 text-[1rem] text-ink outline-none transition-[border-color,background-color] duration-200 placeholder:text-muted/80 focus:border-black focus:bg-white";
  const label = "mb-2 block text-[0.9rem] text-muted";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("nome") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("mensagem") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    if (!name) return setError("Informe o seu nome.");
    if (digits.length < 10) return setError("Informe um WhatsApp com DDD, por exemplo (11) 99999-9999.");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setError("Informe um e-mail válido, por exemplo nome@empresa.com.br.");
    if (!message) return setError("Conte em poucas palavras qual é o seu projeto.");
    if (!f.get("consentimento")) return setError("Para enviar, confirme que leu a Política de Privacidade.");
    setError(null);
    const types = f.getAll("tipo").map(String);
    const lines = [
      "Olá, vim através do site da Casa46 e gostaria de mais informações.",
      "",
      `*Nome:* ${name}`,
      `*WhatsApp:* ${phone}`,
      `*E-mail:* ${email}`,
      types.length ? `*Projeto:* ${types.join(", ")}` : "",
      `*Mensagem:* ${message}`,
    ].filter((l, i) => l !== "" || i === 1);
    const url = whatsappUrl(whatsapp, lines.join("\n"));
    if (!url) return;
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div role="status" className="py-8">
        <p className="display text-[2.2rem] text-ink">Pronto, sua mensagem está no WhatsApp.</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Confira os dados e toque em enviar na conversa. Se o WhatsApp não abriu,{" "}
          <a href={sentUrl} target="_blank" rel="noopener" className="link font-semibold text-ink">
            abra a conversa por aqui
          </a>
          .
        </p>
        <button type="button" onClick={() => setSentUrl(null)} className="link mt-6 min-h-11 cursor-pointer text-[0.95rem] text-muted">
          Preencher de novo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className={label}>Nome *</span>
        <input name="nome" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>WhatsApp *</span>
        <input name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} className={field} placeholder="(11) 99999-9999" />
      </label>
      <label className="block">
        <span className={label}>E-mail *</span>
        <input name="email" required type="email" autoComplete="email" className={field} />
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Tipo de projeto</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="checkbox" name="tipo" value={t} className="chip-input sr-only" />
              <span className="inline-flex min-h-10 items-center rounded-[4px] border border-line bg-white px-3.5 text-[0.93rem] text-ink transition-colors duration-200 hover:border-black">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block sm:col-span-2">
        <span className={label}>Mensagem *</span>
        <textarea name="mensagem" rows={4} className={`${field} resize-none`} placeholder="Ambiente, metragem, prazo, arquiteto responsável..." />
      </label>

      <label className="flex gap-3 text-[0.93rem] leading-relaxed text-muted sm:col-span-2">
        <input type="checkbox" name="consentimento" className="mt-1 size-5 shrink-0 cursor-pointer accent-black" />
        <span>
          Li a{" "}
          <Link href="/politica-de-privacidade" className="link font-medium text-ink">
            Política de Privacidade
          </Link>{" "}
          e concordo em enviar estes dados pelo WhatsApp.
        </span>
      </label>

      {error ? (
        <p role="alert" className="rounded-[4px] bg-[#FDECE3] px-4 py-3 text-[0.95rem] text-[#8A3510] sm:col-span-2">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary min-h-[3.4rem] w-full sm:col-span-2">
        Enviar agora mesmo
      </button>
    </form>
  );
}
