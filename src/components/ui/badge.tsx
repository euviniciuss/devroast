import { clsx } from 'clsx';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const badgeVariants = tv({
  base: 'inline-flex items-center gap-2 font-mono text-xs font-normal',
  variants: {
    variant: {
      critical: 'text-accent-red',
      warning: 'text-accent-amber',
      good: 'text-accent-green',
      verdict: 'text-accent-red',
    },
    size: {
      sm: 'text-[12px]',
      md: 'text-[13px]',
    },
  },
  defaultVariants: {
    variant: 'critical',
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({
  className,
  variant,
  size,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className={clsx('h-2 w-2 rounded-full', {
            'bg-accent-red': variant === 'critical' || variant === 'verdict',
            'bg-accent-amber': variant === 'warning',
            'bg-accent-green': variant === 'good',
          })}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
