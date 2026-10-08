// Prévia dos arquivos exportados. Não usa next dev, APIs nem renderização de servidor.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { resolveSiteSettings } = require('../config/site.cjs');
const out = path.resolve(__dirname, '../out');
const { basePath } = resolveSiteSettings();
const port = Number(process.env.PORT || 3002);
const mime={ '.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.xml':'application/xml','.txt':'text/plain' };
http.createServer(async(req,res)=>{
  try {
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(basePath&&pathname==='/') { res.writeHead(302,{Location:`${basePath}/`}); return res.end(); }
    if(basePath&&!pathname.startsWith(`${basePath}/`)) { res.writeHead(404); return res.end('Not found'); }
    pathname=pathname.slice(basePath.length);
    if(pathname.endsWith('/')) pathname+='index.html';
    const file=path.resolve(out,`.${pathname}`);
    if(!file.startsWith(out+path.sep)) { res.writeHead(403); return res.end(); }
    const data=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  } catch { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); res.end(await fs.readFile(path.join(out,'404.html')).catch(()=>Buffer.from('Not found'))); }
}).listen(port,'127.0.0.1',()=>console.log(`Prévia estática: http://127.0.0.1:${port}${basePath}/`));
