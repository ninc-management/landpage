import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { assetPath } from '@/lib/assets';

/** Arquivos oficiais: positivo em fundos claros, negativo em fundos escuros. */
export function NincLogo({ size = 'md', variant = 'white', className }: {
  size?: 'sm' | 'md'; variant?: 'white' | 'blue'; className?: string;
}) {
  const width = size === 'sm' ? 'w-36 sm:w-40' : 'w-56';
  const descriptor = size === 'md' ? '-descritor' : '';
  const tone = variant === 'blue' ? 'positivo' : 'negativo';
  return <img src={assetPath(`/brand/ninc-erp-logotipo${descriptor}-${tone}.png`)} alt="NINC ERP — Serviços de Engenharia e Projetos"
    width={1755} height={size === 'md' ? 873 : 696} className={cn('h-auto shrink-0 object-contain', width, className)} />;
}

export function NincMonogram({ size = 24, style, ...props }: HTMLAttributes<HTMLSpanElement> & { size?: number }) {
  const mask = `url("${assetPath('/brand/ninc-erp-simbolo-azul-256.png')}")`;
  return <span aria-hidden="true" {...props} style={{
    display: 'inline-block', width: size, height: size, flexShrink: 0,
    backgroundColor: 'currentColor', maskImage: mask, WebkitMaskImage: mask,
    maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat', ...style,
  }} />;
}
