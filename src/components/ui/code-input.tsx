'use client';

import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import {
  type SupportedLanguage,
  useLanguageDetection,
} from '@/lib/useLanguageDetection';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './language-selector';

const languageExtensions: Record<
  string,
  () => LanguageSupport | ReturnType<typeof StreamLanguage.define>
> = {
  javascript: () => javascript({ jsx: true, typescript: false }),
  typescript: () => javascript({ jsx: true, typescript: true }),
  python: () => python(),
  rust: () => rust(),
  go: () => go(),
  java: () => java(),
  cpp: () => cpp(),
  c: () => cpp(),
  csharp: () => cpp(),
  php: () => php(),
  html: () => html(),
  css: () => css(),
  json: () => json(),
  markdown: () => markdown(),
  sql: () => sql(),
};

export interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  language?: SupportedLanguage | null;
  onLanguageChange?: (language: SupportedLanguage | null) => void;
  className?: string;
  placeholder?: string;
}

function getLanguageExtension(
  lang: SupportedLanguage | null,
): LanguageSupport[] {
  if (!lang) return [];
  const ext = languageExtensions[lang];
  if (!ext) return [];
  const result = ext();
  if (!result) return [];
  return [result as LanguageSupport];
}

export function CodeInput({
  value,
  onChange,
  language,
  onLanguageChange,
  className,
  placeholder = '// paste your code here...',
}: CodeInputProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage | null>(language || null);
  const { detectedLanguage, isDetecting, detect } = useLanguageDetection();

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
      detect(val);
    },
    [onChange, detect],
  );

  const handleLanguageChange = useCallback(
    (lang: SupportedLanguage | null) => {
      setSelectedLanguage(lang);
      onLanguageChange?.(lang);
    },
    [onLanguageChange],
  );

  useEffect(() => {
    if (language !== undefined) {
      setSelectedLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (!selectedLanguage && detectedLanguage) {
      onLanguageChange?.(detectedLanguage);
    }
  }, [detectedLanguage, selectedLanguage, onLanguageChange]);

  const extensions = [
    oneDark,
    EditorView.lineWrapping,
    EditorView.theme({
      '&': {
        fontSize: '12px',
        fontFamily: 'JetBrains Mono, monospace',
        backgroundColor: 'var(--bg-input)',
      },
      '.cm-content': {
        caretColor: 'var(--foreground)',
        fontFamily: 'JetBrains Mono, monospace',
        backgroundColor: 'var(--bg-input)',
        userSelect: 'text',
        WebkitUserSelect: 'text',
      },
      '.cm-scroller': {
        backgroundColor: 'var(--bg-input)',
        overflow: 'auto',
      },
      '.cm-line': {
        userSelect: 'text',
        WebkitUserSelect: 'text',
      },
      '.cm-cursor': {
        borderLeftColor: 'var(--foreground)',
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
        backgroundColor: 'rgba(59, 130, 246, 0.5) !important',
      },
      '.cm-content ::selection': {
        backgroundColor: 'rgba(59, 130, 246, 0.5) !important',
      },
      '.cm-selectionBackground': {
        backgroundColor: 'rgba(59, 130, 246, 0.5) !important',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-tertiary)',
        borderRight: '1px solid var(--border)',
        userSelect: 'none',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'var(--bg-surface)',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
      },
    }),
    ...getLanguageExtension(selectedLanguage || detectedLanguage),
  ];

  const effectiveLanguage = selectedLanguage || detectedLanguage;

  return (
    <div
      className={cn(
        'w-full rounded-md border border-border overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-bg-input">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-accent-red" />
            <span className="h-3 w-3 rounded-full bg-accent-amber" />
            <span className="h-3 w-3 rounded-full bg-accent-green" />
          </span>
          <LanguageSelector
            value={effectiveLanguage}
            onChange={handleLanguageChange}
            isDetecting={isDetecting}
            detectedLanguage={detectedLanguage}
          />
        </div>
        <span className="text-xs text-text-tertiary font-mono">
          {effectiveLanguage || 'code'}
        </span>
      </div>
      <div className="bg-bg-input min-h-[320px]">
        <CodeMirror
          value={value}
          onChange={handleChange}
          extensions={extensions}
          placeholder={placeholder}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: false,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
            rectangularSelection: true,
            crosshairCursor: false,
            highlightSelectionMatches: true,
          }}
          className="font-mono text-xs"
        />
      </div>
    </div>
  );
}
