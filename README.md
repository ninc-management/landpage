# NINC ERP — landing page

Landing independente da aplicação NINC, preparada para GitHub Pages. Mantém o visual azul e branco aprovado, a logo oficial, capturas da plataforma, depoimentos com fotos e a apresentação hospedada no YouTube. O endereço atual é **https://ninc.digital/**.

## Desenvolvimento e validação

Use Node.js 22 ou superior:

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
npm run check:export
npm run preview
```

`npm run preview` abre um servidor local em `http://127.0.0.1:3002/` que entrega apenas os arquivos de `out`. Este é o teste da versão que vai para o GitHub Pages. A pasta `out` não precisa ser commitada.

Não são necessários banco, Prisma, NextAuth, middleware, APIs ou variáveis da aplicação. A fonte Inter é empacotada localmente: o build não precisa consultar o Google Fonts. O vídeo carrega o player do YouTube somente depois do clique.

## Publicação

O workflow `.github/workflows/pages.yml` valida testes, TypeScript e exportação. PRs apenas validam o build. Pushes para `main` e execução manual em `main` publicam exclusivamente `out`.

Antes da primeira publicação desta versão:

1. Em **Settings → Pages → Build and deployment → Source**, selecionar **GitHub Actions**. O repositório ainda usava publicação Jekyll pela branch quando esta migração foi preparada.
2. Manter o domínio personalizado **ninc.digital**. O `CNAME` atual foi preservado e o artefato de produção também o inclui. A configuração remota de domínio e DNS não é alterada por esta migração.
3. Após revisar e integrar a branch de migração em `main`, acompanhar o workflow **Landing — GitHub Pages** em **Actions**. Comprovar a versão pública antes de solicitar indexação no Search Console.
4. Conferir a disponibilidade de **Enforce HTTPS** em Settings → Pages. No início da migração, essa opção estava desativada; os metadados usam a URL HTTPS oficial.

O workflow lê a URL real configurada no GitHub Pages e calcula o `basePath`. Por isso também suporta `https://ninc-management.github.io/landpage/` caso deixem de usar domínio próprio, sem duplicar `/landpage` nos caminhos das imagens. O artefato github.io não inclui CNAME.

## Testar o caminho do projeto localmente

PowerShell:

```powershell
$env:NINC_SITE_URL='https://ninc-management.github.io/landpage/'
npm run build
npm run check:export
npm run preview
# Prévia: http://127.0.0.1:3002/landpage/
```

Para voltar ao domínio próprio, remova a variável antes de reconstruir:

```powershell
Remove-Item Env:NINC_SITE_URL
npm run build
```

Copie `.env.example` para `.env.local` somente se precisar personalizar a URL no desenvolvimento. `NINC_SEO_INDEXABLE=false` gera uma versão sem indexação para homologação; o desenvolvimento já recebe `noindex` por padrão. `GOOGLE_SITE_VERIFICATION` aceita apenas o token real do Search Console e também pode ser definido como variável do repositório no GitHub Actions.

## Estrutura

- `app/`: página inicial, layout e robots/sitemap gerados no build.
- `components/landing/`: seções e interações da página aprovada.
- `components/ui/`: somente os componentes usados pela landing.
- `public/landing/`: logo, fotos, favicon e imagem de compartilhamento.
- `public/ai-providers/`: ícones dos assistentes usados na seção de IA.
- `public/suporte/guias/`: capturas estáticas da plataforma.
- `config/site.cjs` e `lib/assets.ts`: resolução consistente de domínio e caminhos.
- `scripts/`: preparação, validação e prévia do artefato estático.
- `legacy-jekyll/`: tema anterior preservado como referência. Não é compilado, testado nem publicado; seus workflows também ficam inativos nesta pasta. A licença original permanece na raiz.

O SEO mantém canonical, Open Graph, Twitter, identificação da marca e do produto em JSON-LD e as perguntas reais do FAQ. Sitemap e dados estruturados usam o mesmo domínio de publicação. Posição e indexação no Google não são garantidas; a confirmação de domínio e o envio de sitemap ao Search Console são feitos após publicar.

Referências: [exportação estática no Next.js](https://nextjs.org/docs/14/app/building-your-application/deploying/static-exports), [workflows oficiais do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
