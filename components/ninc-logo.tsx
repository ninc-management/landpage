import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import { assetPath } from '@/lib/assets';

/** Logo oficial com fundo transparente; variantes mantidas do layout aprovado. */
export function NincLogo({ size = 'md', variant = 'white', className }: {
  size?: 'sm' | 'md'; variant?: 'white' | 'blue'; className?: string;
}) {
  const width = size === 'sm' ? 'w-36 sm:w-40' : 'w-56';
  if (variant === 'blue') return (
    <span role="img" aria-label="NINC ERP — Serviços de Engenharia e Projetos"
      style={{ maskImage: `url("${assetPath('/landing/ninc-erp.png')}")` }}
      className={cn('inline-block aspect-[1302/518] shrink-0 bg-ninc-700 [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]', width, className)} />
  );
  return <img src={assetPath('/landing/ninc-erp.png')} alt="NINC ERP — Serviços de Engenharia e Projetos"
    width={1302} height={518} className={cn('h-auto shrink-0 object-contain brightness-0 invert', width, className)} />;
}

export function NincMonogram({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 156 156" fill="none" aria-hidden="true" {...props}>
    <path d="M0 52V28C0 12.5 12.5 0 28 0H88C125.6 0 156 30.4 156 68V156H104V52H0Z" fill="currentColor" />
  </svg>;
}
