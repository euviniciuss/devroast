import { clsx } from 'clsx';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const diffLineVariants = tv({
  base: 'flex gap-2 px-4 py-2 font-mono text-[13px]',
  variants: {
    type: {
      removed: 'bg-[#1A0A0A] text-text-secondary',
      added: 'bg-[#0A1A0F] text-foreground',
      context: 'text-text-secondary',
    },
  },
  defaultVariants: {
    type: 'context',
  },
});

export interface DiffLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  prefix?: string;
}

function DiffLine({
  className,
  type,
  prefix,
  children,
  ...props
}: DiffLineProps) {
  return (
    <div className={cn(diffLineVariants({ type, className }))} {...props}>
      <span
        className={clsx('w-4 flex-shrink-0', {
          'text-accent-red': type === 'removed',
          'text-accent-green': type === 'added',
          'text-text-tertiary': type === 'context',
        })}
      >
        {prefix}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export { DiffLine, diffLineVariants };
