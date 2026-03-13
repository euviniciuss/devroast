'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';

export interface CodeBlockProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  lang = 'javascript',
  showLineNumbers = true,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    codeToHtml(code, { lang, theme: 'vesper' }).then(setHtml);
  }, [code, lang]);

  const lines = code.split('\n');

  return (
    <div className="w-full rounded-md border border-border overflow-hidden">
      <div className="flex items-center gap-3 h-10 px-4 border-b border-border bg-bg-input">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        </span>
        <span className="text-xs text-text-tertiary font-mono ml-auto">
          {lang}
        </span>
      </div>
      <div className="flex bg-bg-input">
        {showLineNumbers && (
          <div className="flex flex-col py-3 pl-3 pr-2 text-right border-r border-border bg-bg-surface text-text-tertiary font-mono text-[13px] leading-6 select-none">
            {lines.map((_, i) => (
              <span key={`line-${i + 1}`} className="min-w-[1.5rem]">
                {i + 1}
              </span>
            ))}
          </div>
        )}
        <div
          className={cn(
            'flex-1 font-mono text-[13px] leading-6 overflow-x-auto p-3',
            '[&_pre]:!bg-transparent [&_code]:!bg-transparent',
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki generates safe HTML
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
