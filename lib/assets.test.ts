import { assetPath } from './assets';

describe('static public assets', () => {
  const initial = process.env.NEXT_PUBLIC_BASE_PATH;
  afterEach(() => {
    if (initial === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = initial;
  });
  it('keeps root-domain assets unchanged', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '';
    expect(assetPath('/landing/ninc-erp.png')).toBe('/landing/ninc-erp.png');
  });
  it('prefixes project assets exactly once', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/landpage';
    expect(assetPath('/landing/ninc-erp.png')).toBe('/landpage/landing/ninc-erp.png');
    expect(assetPath('/landpage/landing/ninc-erp.png')).toBe('/landpage/landing/ninc-erp.png');
    expect(assetPath('/suporte/guias/primeiros-passos/01-painel.avif')).toBe('/landpage/suporte/guias/primeiros-passos/01-painel.avif');
    expect(assetPath('https://www.youtube-nocookie.com/embed/video')).toBe('https://www.youtube-nocookie.com/embed/video');
    expect(assetPath('//cdn.example.com/image.png')).toBe('//cdn.example.com/image.png');
  });
});
