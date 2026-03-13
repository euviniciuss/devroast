import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

const analysisCardVariants = tv({
  base: 'flex flex-col gap-3 p-5 rounded-md border border-border',
  variants: {
    severity: {
      critical: '',
      warning: '',
      good: '',
    },
  },
});

function AnalysisCardRoot({
  className,
  severity = 'critical',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof analysisCardVariants>) {
  return (
    <div
      className={cn(analysisCardVariants({ severity, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

function AnalysisCardSeverity({
  className,
  severity = 'critical',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  severity?: 'critical' | 'warning' | 'good';
}) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Badge variant={severity} dot size="sm">
        {children || severity}
      </Badge>
    </div>
  );
}

function AnalysisCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('font-mono text-[13px] text-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function AnalysisCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'font-mono text-xs text-text-secondary leading-relaxed',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export const AnalysisCard = {
  Root: AnalysisCardRoot,
  Severity: AnalysisCardSeverity,
  Title: AnalysisCardTitle,
  Description: AnalysisCardDescription,
};
