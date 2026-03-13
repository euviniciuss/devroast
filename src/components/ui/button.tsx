import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 font-mono text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:bg-transparent',
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:enabled:bg-primary/90 focus-visible:ring-primary',
      secondary:
        'bg-secondary text-secondary-foreground hover:enabled:bg-secondary/80 focus-visible:ring-secondary',
      outline:
        'border-2 border-border bg-transparent text-foreground hover:enabled:bg-muted focus-visible:ring-ring',
      ghost:
        'bg-transparent text-foreground hover:enabled:bg-muted focus-visible:ring-ring',
      destructive:
        'bg-destructive text-destructive-foreground hover:enabled:bg-destructive/90 focus-visible:ring-destructive',
    },
    size: {
      sm: 'px-4 py-[10px] text-xs',
      md: 'px-6 py-[10px] text-[13px]',
      lg: 'px-8 py-[10px] text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
