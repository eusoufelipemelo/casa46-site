import { ChevronDownIcon } from "./icons";
import { JsonLd } from "./JsonLd";

/** Perguntas em sanfona (<details>) + FAQPage em JSON-LD. */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.question} className="faq-item group">
            <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left text-[1.1rem] font-medium text-ink sm:text-[1.2rem]">
              {f.question}
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-open:border-black group-open:bg-black group-open:text-white">
                <ChevronDownIcon width={18} height={18} className="faq-icon" />
              </span>
            </summary>
            <p className="max-w-[62ch] pb-6 pr-10 leading-relaxed text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
    </>
  );
}
