import type { CSSProperties } from "react";
import { CountUp } from "./CountUp";

export type Stat = { value: string; label: string };

/**
 * Faixa de números no pé do topo, como no site anterior: quatro colunas com uma linha fina
 * entre o número e a legenda. A linha se desenha e o número conta até o valor.
 */
export function Stats({ items, delay = 0 }: { items: Stat[]; delay?: number }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4" data-reveal="fade" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {items.map((s, i) => (
        <div key={s.label} className="flex flex-col-reverse justify-end">
          <dt className="mt-3 max-w-[22ch] text-[0.95rem] leading-snug text-white/75">{s.label}</dt>
          <dd className="relative pb-3 text-[2rem] font-normal tabular-nums tracking-[-0.03em] text-white sm:text-[2.4rem]">
            <CountUp value={s.value} delay={delay + 350 + i * 120} />
            <span aria-hidden className="stat-line absolute inset-x-0 bottom-0 h-px bg-white/55" style={{ "--d": `${delay + 200 + i * 120}ms` } as CSSProperties} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
