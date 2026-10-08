const { resolveSiteSettings } = require('./config/site.cjs');
const site = resolveSiteSettings();

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  basePath: site.basePath,
  env: { NEXT_PUBLIC_BASE_PATH: site.basePath },
  images: { unoptimized: true },
  poweredByHeader: false,
};
