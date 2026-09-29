import { Fragment, type CSSProperties } from "react";

/** Separa as palavras e marca as que estão entre {chaves} (saem em cinza). */
function splitWords(text: string) {
  const out: { text: string; muted: boolean }[] = [];
  let muted = false;
  for (const raw of text.split(" ")) {
    if (raw.startsWith("{")) muted = true;
    out.push({ text: raw.replace(/[{}]/g, ""), muted });
    if (raw.includes("}")) muted = false;
  }
  return out;
}

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Título que sobe palavra por palavra quando entra na tela (ver .split-word em globals.css).
 * Trechos entre {chaves} saem em cinza, como no título "Excelência e experiências únicas" do site anterior.
 */
export function SplitTitle({
  text,
  as: Tag = "h2",
  className = "",
  id,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  id?: string;
  /** Atraso inicial em ms. */
  delay?: number;
}) {
  const words = splitWords(text);
  return (
    <Tag id={id} className={className} data-reveal="words" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span style={{ "--i": i } as CSSProperties} className={w.muted ? "text-[#747474]" : undefined}>
              {w.text}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
