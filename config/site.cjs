/**
 * Configuração única para domínio próprio e site de projeto do GitHub Pages.
 * @param {Record<string, string | undefined>} env
 */
function resolveSiteSettings(env = process.env) {
  const url = new URL(env.NINC_SITE_URL?.trim() || 'https://ninc.digital/');
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash
    || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')
    || host === '[::1]' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    throw new Error('NINC_SITE_URL deve ser uma URL pública HTTPS sem credenciais, query ou fragmento.');
  }
  const basePath = url.pathname.replace(/\/+$/, '');
  url.pathname = `${basePath}/`;
  if (env.NEXT_PUBLIC_BASE_PATH !== undefined && env.NEXT_PUBLIC_BASE_PATH !== basePath) {
    throw new Error('NEXT_PUBLIC_BASE_PATH precisa corresponder ao caminho de NINC_SITE_URL.');
  }
  return { url: url.href, basePath, customDomain: host.endsWith('.github.io') ? null : host };
}
module.exports = { resolveSiteSettings };
