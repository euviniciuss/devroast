import { cn } from '@/lib/utils';

export interface CodeInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function CodeInput({ className, ...props }: CodeInputProps) {
  return (
    <div className="w-full rounded-md border border-border overflow-hidden">
      <div className="flex items-center gap-3 h-10 px-4 border-b border-border bg-bg-input">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-accent-red" />
          <span className="h-3 w-3 rounded-full bg-accent-amber" />
          <span className="h-3 w-3 rounded-full bg-accent-green" />
        </span>
        <span className="text-xs text-text-tertiary font-mono ml-auto">
          code.js
        </span>
      </div>
      <div className="flex bg-bg-input min-h-[320px]">
        <div className="flex flex-col justify-between py-3 pl-3 pr-2 w-10 border-r border-border bg-bg-surface text-text-tertiary font-mono text-xs select-none">
          {Array.from({ length: 15 }, (_, i) => {
            const lineNumber = i + 1;
            return <span key={`ln-${lineNumber}`}>{lineNumber}</span>;
          })}
        </div>
        <textarea
          className={cn(
            'flex-1 bg-transparent font-mono text-xs leading-6 p-3 resize-none outline-none',
            className,
          )}
          placeholder="// paste your code here..."
          {...props}
        />
      </div>
    </div>
  );
}
