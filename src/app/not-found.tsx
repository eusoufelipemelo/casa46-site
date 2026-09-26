import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-black text-white">
      <div className="wrap pb-16 pt-36">
        <p className="text-[0.95rem] text-white/60">Erro 404</p>
        <h1 className="display mt-3 max-w-[16ch] text-[2.6rem] sm:text-[4rem]">Esta página não existe ou mudou de endereço</h1>
        <p className="mt-5 max-w-[48ch] text-white/70">Confira o endereço digitado ou siga por um dos caminhos abaixo.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-inverse">
            Ir para a Home
          </Link>
          <Link href="/clientes" className="btn btn-ghost-light">
            Ver os projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
