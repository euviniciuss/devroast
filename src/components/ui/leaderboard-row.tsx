import { clsx } from 'clsx';
import { cn } from '@/lib/utils';

function LeaderboardRowRoot({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-6 px-5 py-4 border-b border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function LeaderboardRowRank({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('w-10 text-[13px] text-text-tertiary font-mono', className)}
      {...props}
    >
      {children}
    </span>
  );
}

function LeaderboardRowScore({
  className,
  score,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { score?: number }) {
  const getScoreColor = (score: number) => {
    if (score < 3) return 'text-accent-red';
    if (score < 6) return 'text-accent-amber';
    return 'text-accent-green';
  };

  return (
    <span
      className={clsx(
        'w-[60px] text-[13px] font-bold font-mono',
        score ? getScoreColor(score) : 'text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function LeaderboardRowCode({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'flex-1 text-xs text-text-secondary font-mono truncate',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function LeaderboardRowLanguage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'w-[100px] text-xs text-text-tertiary font-mono',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export const LeaderboardRow = {
  Root: LeaderboardRowRoot,
  Rank: LeaderboardRowRank,
  Score: LeaderboardRowScore,
  Code: LeaderboardRowCode,
  Language: LeaderboardRowLanguage,
};
