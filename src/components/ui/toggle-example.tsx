'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  variant?: 'primary' | 'secondary';
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onToggle?: (pressed: boolean) => void;
}

export function Toggle({
  variant = 'primary',
  pressed,
  onPressedChange,
  onToggle,
}: ToggleProps) {
  const [isOn, setIsOn] = useState(pressed ?? false);

  const handleClick = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onPressedChange?.(newValue);
    onToggle?.(newValue);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        className={cn(
          'relative inline-flex h-[22px] w-[40px] cursor-pointer items-center rounded-full p-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          isOn ? 'bg-primary' : 'bg-border',
        )}
        onClick={handleClick}
      >
        <span
          className={clsx(
            'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            isOn ? 'translate-x-[18px]' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}
