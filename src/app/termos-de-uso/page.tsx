import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Termos de Uso",
  description: "As condições para usar o site da Casa 46: conteúdo informativo, orçamentos, fotos, marca e links externos.",
  path: "/termos-de-uso",
});

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" path="/termos-de-uso" intro="As condições para usar o site da Casa 46. Ao navegar por aqui, você concorda com estes termos.">
      <h2>1. Sobre o site</h2>
      <p>
        Este site apresenta o trabalho da {siteConfig.legalName} ({siteConfig.name}), CNPJ {siteConfig.cnpj}, marcenaria fina e móveis sob medida em São Paulo, os projetos realizados e artigos
        informativos. O uso é gratuito e não exige cadastro.
      </p>

      <h2>2. Conteúdo informativo</h2>
      <p>
        Os textos do site e do blog têm caráter informativo. Medidas, materiais, acabamentos e prazos de cada projeto só são definidos no orçamento e no contrato, depois da análise do ambiente.
      </p>

      <h2>3. Orçamentos</h2>
      <p>
        O formulário do site apenas prepara uma mensagem para o WhatsApp da Casa 46. Enviar a mensagem não gera orçamento, reserva de produção nem obrigação para nenhuma das partes. Orçamentos
        enviados pela equipe não são vinculantes até a assinatura do contrato.
      </p>

      <h2>4. Fotos, marca e propriedade intelectual</h2>
      <p>
        As fotos mostram projetos executados pela Casa 46, com os créditos dos escritórios de arquitetura parceiros. A marca, o logotipo, os textos, as fotos e o desenho do site são protegidos por lei
        e não podem ser copiados, reproduzidos ou usados comercialmente sem autorização por escrito. Você pode compartilhar links para as páginas.
      </p>

      <h2>5. Uso adequado</h2>
      <p>
        Não é permitido usar o site para fins ilícitos, tentar acessar áreas restritas, interferir no funcionamento dos servidores ou coletar conteúdo de forma automatizada para uso comercial.
      </p>

      <h2>6. Links externos</h2>
      <p>
        O site tem links para serviços de terceiros, como WhatsApp, Google Maps, Instagram, Facebook, LinkedIn e YouTube. Esses serviços têm termos e políticas próprios, e a Casa 46 não responde
        pelo conteúdo deles.
      </p>

      <h2>7. Disponibilidade</h2>
      <p>O site é mantido no ar e com informações atualizadas, mas podem ocorrer interrupções para manutenção ou por falhas técnicas. O conteúdo pode ser alterado a qualquer momento.</p>

      <h2>8. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a <Link href="/politica-de-privacidade">Política de Privacidade</Link> e a <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>9. Legislação e foro</h2>
      <p>Estes termos seguem a legislação brasileira. Fica eleito o foro da comarca de São Paulo (SP) para resolver eventuais questões, ressalvados os direitos do consumidor previstos em lei.</p>
    </LegalPage>
  );
}
