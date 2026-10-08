# Migração da landing NINC para GitHub Pages

**Objetivo:** portar a landing aprovada em `C:/workspace/ninc` para `ninc-management/landpage`, funcionando como site estático no domínio existente `https://ninc.digital/`.

**Arquitetura:** manter React, Next.js App Router e Tailwind, com `output: export`. A página inicial renderiza diretamente os componentes públicos. Nenhuma sessão, Prisma, API, middleware ou segredo da aplicação entra no novo projeto. Os arquivos do tema Jekyll anterior são removidos do repositório.

**Execução:** implementação local nesta sessão, autorizada pelo pedido de adaptação. Branch `codex/github-pages-landing`; publicação e mudanças na configuração remota do Pages não fazem parte desta etapa.

- [x] Extrair componentes ativos, UI mínima, capturas, fotos e logos oficiais. Preservar conteúdo, modo claro, azul, depoimentos e vídeo.
- [x] Centralizar domínio/basePath; adaptar imagens, máscaras CSS, ícones e metadados. Testar raiz e `/landpage` antes de implementar o resolvedor.
- [x] Gerar `out`, robots/sitemap, `.nojekyll` e CNAME apropriado; preparar workflow com validação de PR sem publicação e deploy somente de main.
- [x] Validar testes, TypeScript, build e arquivos exportados em ambos os caminhos; verificar interações em navegador servindo apenas os arquivos estáticos. Documentar ativação do GitHub Actions em Settings → Pages e a URL da prévia.

**Decisões confirmadas:** domínio `ninc.digital`, conforme resposta do usuário; domínio da aplicação não será usado como canonical. Remover os arquivos Jekyll antigos, conforme orientação do Ícaro transmitida pelo usuário. Dependências ficam limitadas à landing. Nenhuma alteração será feita nas mudanças já existentes no repositório NINC.

**Verificação realizada:** 3 testes de configuração e 43 testes Jest, distribuídos em 20 suites; TypeScript sem erros; exportação de produção na raiz e em `/landpage`. Em ambos os builds, 54 referências locais do HTML apontaram para arquivos existentes. Conferidos canonical, sitemap, robots, CNAME e ausência de backend e tema antigo em `out`. YAML e comando de configuração do workflow validados localmente. No navegador, a prévia estática carregou fotos e máscaras de logo com basePath, sem erros de console ou rolagem horizontal no celular de 390 px; ampliação de captura, FAQ e carregamento do YouTube após clique funcionaram.

**Publicação pendente:** a integração em `main` e a escolha de GitHub Actions como origem do Pages exigem revisão do responsável pelo repositório. A configuração de domínio/DNS permanece como estava.
