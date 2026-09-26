import { permanentRedirect } from "next/navigation";

// O site da Casa 46 não tem página "Serviços": os trabalhos ficam na página de projetos.
export default function ServicosPage() {
  permanentRedirect("/clientes");
}
