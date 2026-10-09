import { assetPath } from "@/lib/assets";
import { Check, KeyRound, MailCheck, Palette, ShieldCheck, Smartphone, UserPlus, type LucideIcon } from "lucide-react";
import { NincMonogram } from "@/components/ninc-logo";
import {
  BlueprintGrid,
  Container,
  Eyebrow,
  GradientText,
  MASK,
  ScreenFrame,
  Section,
  SectionHeading,
} from "@/components/landing/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";

const IMG = "/suporte/guias/primeiros-passos";

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  facts: string[];
  src: string;
  alt: string;
  label: string;
};

// Fatos conferidos no guia "Primeiros Passos", em lib/permission-structure.ts e nas capturas.
const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Níveis de permissão por módulo",
    text: "Cada nível define o que a pessoa vê e edita em cada área do sistema. O nível Master tem acesso total e não pode ser editado, então a conta sempre mantém um administrador.",
    facts: ["Seis níveis prontos, do Master ao Colaborador", "Crie níveis próprios com “Novo Nível”"],
    src: `${IMG}/07-permissoes.avif`,
    alt: "Tela de níveis de permissão com o perfil Financeiro destacado",
    label: "NINC ERP · Permissões",
  },
  {
    icon: UserPlus,
    title: "Colaboradores com convite por e-mail",
    text: "Cadastre a equipe com cargo e contato, escolha o nível de permissão e envie o convite para que cada pessoa tenha o próprio acesso.",
    facts: ["Cargo, contato e organização (CNPJ) de cada pessoa", "Convite enviado direto da lista de colaboradores"],
    src: `${IMG}/06-novo-colaborador.avif`,
    alt: "Cadastro de novo colaborador com a escolha do nível de permissão",
    label: "NINC ERP · Colaboradores",
  },
  {
    icon: Palette,
    title: "Identidade visual da empresa",
    text: "Envie o logotipo e defina as cores da sua marca. O logotipo aparece no topo do sistema e nos PDFs de propostas e contratos.",
    facts: ["Cor primária e cor secundária", "Logotipo em PNG, JPG ou SVG de até 5 MB"],
    src: `${IMG}/03-identidade-visual.avif`,
    alt: "Configuração de identidade visual com logotipo e cores da empresa",
    label: "NINC ERP · Identidade visual",
  },
];

// As três credenciais são alternativas e abrem a mesma sessão (auth-login-domain.service):
// não chame o app autenticador nem o código por e-mail de "verificação em duas etapas".
const LOGIN: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: KeyRound,
    title: "Senha",
    text: "Acesso tradicional com e-mail e senha.",
  },
  {
    icon: MailCheck,
    title: "Código por e-mail",
    text: "Um código de uso único enviado para o seu e-mail, sem senha para lembrar.",
  },
  {
    icon: Smartphone,
    title: "App autenticador",
    text: "Ative nas configurações de segurança e entre com o código do aplicativo de sua preferência.",
  },
];

/** Equipe e segurança: permissões, convites, identidade visual e formas de login. */
export function TeamSecuritySection() {
  return (
    <Section
      id="equipe"
      className="isolate overflow-hidden bg-gradient-to-br from-ninc-950 via-ninc-900 to-ninc-800 text-white dark:border-y dark:border-white/5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <BlueprintGrid tone="dark" className={MASK.bottomLeft} />
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-ninc-500/30 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-400/[.15] blur-3xl" />
        <NincMonogram
          size={440}
          aria-hidden="true"
          className="absolute -right-24 -top-24 text-white/[0.04] motion-safe:animate-[spin_120s_linear_infinite] dark:text-white/[0.04]"
        />
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            id="equipe-titulo"
            tone="dark"
            align="center-lg"
            eyebrow="Equipe e segurança"
            title={
              <>
                Cada pessoa com o acesso certo. <GradientText>A sua marca em tudo.</GradientText>
              </>
            }
            description="Convide o time, defina o que cada nível pode ver e editar em cada módulo e escolha como cada pessoa entra: senha, código por e-mail ou app autenticador."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text, facts, src, alt, label }) => (
            <StaggerItem
              key={title}
              as="article"
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
              <ScreenFrame
                tone="dark"
                src={assetPath(src)}
                alt={alt}
                label={label}
                className="p-1 shadow-none transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5"
                // 4:3 recorta só as laterais vazias; em md (coluna única e larga) mostra a tela inteira.
                imgClassName="aspect-[4/3] object-center md:aspect-[16/10] lg:aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-sky-200 ring-1 ring-inset ring-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight [text-wrap:balance]">{title}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ninc-100/75">{text}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-xs leading-relaxed text-ninc-100/70">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-ninc-950/40 p-6 backdrop-blur sm:p-8 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-10">
          <div>
            <Eyebrow tone="dark">Acesso</Eyebrow>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">Três formas de entrar com segurança</h3>
            <p className="mt-2 text-sm leading-relaxed text-ninc-100/75 [text-wrap:pretty]">
              Cada colaborador tem o próprio login. Além da senha, dá para entrar com um código de uso único, enviado
              por e-mail ou gerado no app autenticador.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {LOGIN.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:flex-col"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-sky-200 ring-1 ring-inset ring-white/10"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ninc-100/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
