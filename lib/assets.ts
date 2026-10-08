/** Next adiciona basePath aos chunks, mas arquivos de public precisam do prefixo. */
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!basePath || !path.startsWith('/') || path.startsWith('//')
    || path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
