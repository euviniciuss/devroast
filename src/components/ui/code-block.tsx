import { codeToHtml } from 'shiki';

export interface CodeBlockProps {
  code: string;
  lang?: string;
}

async function CodeBlock({ code, lang = 'javascript' }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'vesper',
  });

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
      <div
        className="bg-bg-input font-mono text-[13px] leading-6 overflow-x-auto p-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export { CodeBlock };
