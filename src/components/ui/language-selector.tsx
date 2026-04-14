'use client';

import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/lib/useLanguageDetection';
import { cn } from '@/lib/utils';

export interface LanguageSelectorProps {
  value: SupportedLanguage | null;
  onChange: (language: SupportedLanguage) => void;
  isDetecting?: boolean;
  detectedLanguage?: SupportedLanguage | null;
}

export function LanguageSelector({
  value,
  onChange,
  isDetecting,
  detectedLanguage,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value as SupportedLanguage)}
        className={cn(
          'h-7 px-2 text-xs font-mono rounded border bg-transparent outline-none',
          'border-border text-foreground',
          'hover:border-primary/50 transition-colors',
          'focus:border-primary focus:ring-1 focus:ring-primary',
        )}
      >
        <option value="">auto</option>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      {isDetecting && (
        <span className="text-xs text-text-tertiary font-mono">
          detecting...
        </span>
      )}
      {!value && detectedLanguage && !isDetecting && (
        <span className="text-xs text-accent-green font-mono">
          {SUPPORTED_LANGUAGES.find((l) => l.value === detectedLanguage)
            ?.label || detectedLanguage}
        </span>
      )}
    </div>
  );
}
