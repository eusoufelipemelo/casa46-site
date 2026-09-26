import { permanentRedirect } from "next/navigation";

// O site da Casa 46 não tem página "Sobre": a história fica na Home e na página do fundador.
export default function SobrePage() {
  permanentRedirect("/jp");
}
