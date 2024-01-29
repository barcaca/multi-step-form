import { cn } from '@/lib/utils'
import Link from 'next/link'

interface IconLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  compact?: boolean
  large?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export function IconLink({
  children,
  className,
  compact = false,
  large = false,
  icon: Icon, // Ícone opcional
  ...props
}: IconLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        'hover:text-gray-70 group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium transition-colors dark:text-white/30 dark:hover:text-sky-300',
        compact ? 'gap-x-2' : 'gap-x-3',
      )}
    >
      {/* Efeito de fundo ao passar o mouse sobre o link */}
      <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-sky-500/30 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-white/5" />
      {/* Renderizar o ícone se fornecido */}
      {Icon && (
        <Icon className={cn('flex-none', large ? 'h-6 w-6' : 'h-4 w-4')} />
      )}
      {/* Conteúdo do link */}
      <span className="self-baseline text-black dark:text-white">
        {children}
      </span>
    </Link>
  )
}
