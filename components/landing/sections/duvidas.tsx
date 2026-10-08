import { ArrowRight, LifeBuoy } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Container, FOCUS, Section, SectionHeading } from "../primitives";
import { Reveal } from "../reveal";
import { serializeJsonLd } from "@/lib/landing-seo";

const EMAIL = "suporte@ninc.digital";

/** Respostas em texto puro (também viram JSON-LD). `link` destaca um trecho literal de `a`. */
const FAQ: Array<{ q: string; a: string; link?: { text: string; href: string } }> = [
  {
    q: "Para que tipo de empresa o NINC foi feito?",
    a: "Para micro e pequenas empresas de serviços de engenharia e projetos: escritórios de engenharia e arquitetura, projetos complementares, consultorias técnicas e empresas que vendem por proposta e recebem por contrato.",
  },
  {
    q: "O que é um ERP para empresas de engenharia?",
    a: "ERP é um sistema de gestão integrada que reúne informações e processos da empresa. No NINC ERP, clientes, propostas comerciais, contratos e gestão financeira ficam conectados para acompanhar a operação do orçamento ao fechamento do mês.",
  },
  {
    q: "Posso usar só para propostas comerciais?",
    a: "Pode. Você pode organizar as propostas comerciais, o cadastro de clientes, o catálogo de itens e os PDFs com a sua marca, e conectar esse fluxo aos contratos e ao financeiro.",
  },
  {
    q: "A proposta sai com a identidade da minha empresa?",
    a: "Sim. O logotipo enviado na identidade visual aparece no topo do sistema e nos PDFs de propostas e contratos. As cores do PDF e a ordem e a visibilidade das seções são definidas no layout de proposta.",
  },
  {
    q: "O que acontece quando o cliente aprova a proposta?",
    a: "Ao marcar a proposta como aprovada, o NINC gera o contrato automaticamente e bloqueia a proposta para edição. A partir daí, mudanças são feitas por aditivo, na página do contrato.",
  },
  {
    q: "Como funciona a conciliação bancária?",
    a: "Você importa o extrato por arquivo OFX ou conecta a conta via Open Finance. O sistema separa equivalências exatas, equivalências similares e movimentos novos, e você vincula, cria ou confirma os lançamentos em lote.",
  },
  {
    q: "Dá para saber o resultado de cada projeto?",
    a: "Sim. Com centros de custo, unidades de negócio e rateio de custos você distribui receitas e despesas e acompanha o resultado em relatórios por contrato e por centro de custo.",
  },
  {
    q: "Posso controlar o que cada pessoa da equipe vê?",
    a: "Sim. Cada colaborador tem o próprio acesso e um nível de permissão que define o que ele vê e edita em cada módulo.",
  },
  {
    q: "Como o acesso ao sistema é protegido?",
    a: "Cada colaborador tem o próprio login e pode entrar de três formas: senha, código de uso único enviado por e-mail ou código do aplicativo autenticador.",
  },
  {
    q: "O que dá para fazer com o Claude ou o ChatGPT conectados?",
    a: "Pelo servidor MCP da NINC, o assistente consulta clientes, propostas, contratos e relatórios financeiros como DRE e fluxo de caixa, cria e ajusta propostas, cadastros e contratos pedindo a sua confirmação antes de gravar e baixa os PDFs oficiais. O acesso segue as permissões de cada usuário e pode ser revogado a qualquer momento.",
    link: { text: "servidor MCP da NINC", href: "#ia" },
  },
  {
    q: "Preciso instalar alguma coisa?",
    a: "Não. O NINC ERP funciona direto no navegador. Você acessa a plataforma pelo computador ou pelo celular.",
  },
  {
    q: "Onde encontro ajuda para configurar tudo?",
    a: `Na Central de Suporte, dentro do sistema, com guias passo a passo, perguntas frequentes e um canal de feedback. E pelo e-mail ${EMAIL} você fala direto com o nosso time.`,
    link: { text: EMAIL, href: `mailto:${EMAIL}` },
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function Answer({ a, link }: (typeof FAQ)[number]) {
  const at = link ? a.indexOf(link.text) : -1;
  if (!link || at < 0) return <>{a}</>;
  return (
    <>
      {a.slice(0, at)}
      <a
        href={link.href}
        className={cn(
          "rounded-sm font-medium text-ninc-700 underline underline-offset-4 hover:text-ninc-800 dark:text-ninc-300 dark:hover:text-ninc-200",
          FOCUS
        )}
      >
        {link.text}
      </a>
      {a.slice(at + link.text.length)}
    </>
  );
}

/** FL. 11 — Dúvidas: objeções finais de compra, só com fatos, + JSON-LD FAQPage. */
export function FaqSection() {
  return (
    <Section
      id="duvidas"
      // Papel branco: a seção de planos, logo acima, já é tingida.
      className="bg-white dark:bg-ninc-950"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Mobile: `contents` deixa título (1) → perguntas (2) → card de suporte (3). lg: coluna fixa. */}
          <div className="contents lg:sticky lg:top-24 lg:col-span-4 lg:block lg:self-start">
            <SectionHeading
              id="duvidas-titulo"
              eyebrow="FL. 11 — Dúvidas"
              title="Perguntas frequentes"
              description="O que as empresas de engenharia e projetos costumam perguntar antes de começar."
              className="order-1"
            />

            <div className="order-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-ninc-950/60 lg:mt-10">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ninc-700 text-white shadow-lg shadow-ninc-700/25"
                >
                  <LifeBuoy className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                    Ainda com dúvida?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75">
                    Fale com o nosso time pelo e-mail. Respondemos por lá.
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className={cn(
                      "group mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-ninc-700 underline-offset-4 hover:underline dark:text-ninc-300",
                      FOCUS
                    )}
                  >
                    {EMAIL}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Reveal className="order-2 lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              defaultValue="q1"
              className="rounded-3xl border border-slate-200 bg-white px-4 shadow-[0_1px_2px_rgba(6,13,61,0.04),0_32px_64px_-40px_rgba(6,13,61,0.22)] dark:border-white/10 dark:bg-ninc-950/60 dark:shadow-none sm:px-6"
            >
              {FAQ.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`q${i + 1}`}
                  className="border-slate-200 last:border-b-0 dark:border-white/10"
                >
                  <AccordionTrigger
                    className={cn(
                      "gap-4 rounded-lg py-5 text-left text-base font-semibold text-slate-950 transition-colors hover:text-ninc-700 hover:no-underline data-[state=open]:text-ninc-700 dark:text-white dark:hover:text-ninc-300 dark:data-[state=open]:text-ninc-300 [&>svg]:text-slate-400 dark:[&>svg]:text-ninc-100/50",
                      FOCUS
                    )}
                  >
                    <span className="flex items-baseline">
                      <span
                        aria-hidden="true"
                        className="hidden w-12 shrink-0 font-mono text-[11px] font-medium tabular-nums text-slate-500 dark:text-ninc-100/60 sm:inline-block"
                      >
                        Q.{String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75 sm:pl-12 sm:text-base">
                    <Answer {...item} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
