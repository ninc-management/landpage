const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { resolveSiteSettings } = require('../config/site.cjs');
const out = path.resolve(__dirname, '../out');
const site = resolveSiteSettings();
const html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
for (const file of ['404.html','robots.txt','sitemap.xml','.nojekyll','brand/ninc-erp-logotipo-positivo.png','brand/ninc-erp-logotipo-negativo.png','brand/ninc-erp-logotipo-descritor-positivo.png','brand/ninc-erp-logotipo-descritor-negativo.png','brand/ninc-erp-simbolo-azul-256.png','brand/ninc-erp-favicon-32.png','brand/ninc-erp-favicon-64.png','brand/ninc-erp-icone-180.png','brand/ninc-erp-icone-512.png','brand/ninc-erp-social-preview.png']) {
  assert.ok(fs.existsSync(path.join(out,file)), `Falta ${file}`);
}
assert.equal((html.match(/<h1\b/g)||[]).length,1,'A landing deve ter um único H1');
assert.ok(html.includes('NINC ERP | ERP para engenharia e projetos'));
assert.ok(html.includes('Ingrid Vitória'));
assert.ok(!html.includes('href="/login"')&&!html.includes('href="/signup"'));
assert.ok(!fs.existsSync(path.join(out,'api')),'Não há backend no Pages');
const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
assert.equal(new URL(canonical).href,site.url,'Canonical incorreto');
const sitemap = fs.readFileSync(path.join(out,'sitemap.xml'),'utf8');
const robots = fs.readFileSync(path.join(out,'robots.txt'),'utf8');
if (process.env.NINC_SEO_INDEXABLE !== 'false') {
  assert.ok(sitemap.includes(`<loc>${site.url}</loc>`),'Sitemap incoerente');
  assert.ok(robots.includes(`Sitemap: ${site.url}sitemap.xml`));
}
if (site.customDomain) assert.equal(fs.readFileSync(path.join(out,'CNAME'),'utf8').trim(),site.customDomain);
else assert.ok(!fs.existsSync(path.join(out,'CNAME')),'Site github.io não pode conter CNAME do domínio próprio');
let checked=0;
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)[^"\s]*"/g)) {
  const url=match[1]; if(url.startsWith('//')) continue;
  assert.ok(!site.basePath||url.startsWith(`${site.basePath}/`),`Asset sem basePath: ${url}`);
  const relative=decodeURIComponent(url.slice(site.basePath.length)).replace(/^\//,'');
  const file=path.join(out,relative||'index.html');
  assert.ok(fs.existsSync(file),`Asset inexistente: ${url}`); checked++;
}
for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) JSON.parse(match[1]);
console.log(`Exportação validada: ${site.url}; ${checked} referências locais; SEO, imagens e artefato Pages presentes.`);
