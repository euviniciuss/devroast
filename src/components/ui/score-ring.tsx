import { clsx } from 'clsx';
import { cn } from '@/lib/utils';

export interface ScoreRingProps extends React.SVGProps<SVGSVGElement> {
  score: number;
  maxScore?: number;
}

function ScoreRing({
  className,
  score,
  maxScore = 10,
  ...props
}: ScoreRingProps) {
  const percentage = (score / maxScore) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (score < 3) return 'text-accent-red';
    if (score < 6) return 'text-accent-amber';
    return 'text-accent-green';
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center w-[180px] h-[180px]',
        className,
      )}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        className="absolute"
        aria-hidden="true"
        {...props}
      >
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-border"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          className={getScoreColor()}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={clsx(
            'text-5xl font-bold font-mono leading-none',
            getScoreColor(),
          )}
        >
          {score.toFixed(1)}
        </span>
        <span className="text-base font-mono text-text-tertiary leading-none mt-1">
          /{maxScore}
        </span>
      </div>
    </div>
  );
}

export { ScoreRing };
