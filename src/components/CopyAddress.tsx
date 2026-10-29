"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

/** Copia o endereço completo (para colar no aplicativo de transporte) e confirma na tela. */
export function CopyAddress({ address, className = "" }: { address: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // sem permissão de área de transferência: seleciona o texto para copiar manualmente
      window.prompt("Copie o endereço:", address);
    }
  }
  return (
    <button type="button" onClick={copy} className={className} aria-live="polite">
      {copied ? (
        <>
          <CheckIcon width={18} height={18} /> Endereço copiado
        </>
      ) : (
        "Copiar endereço"
      )}
    </button>
  );
}
