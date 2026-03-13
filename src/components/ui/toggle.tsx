import type { Toggle as BaseToggle } from '@base-ui-components/react/toggle';
import { type ClassValue, clsx } from 'clsx';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toggleVariants = tv({
  base: 'relative inline-flex h-[22px] w-[40px] cursor-pointer items-center rounded-full p-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-border',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ToggleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseToggle>,
      'pressed' | 'className'
    >,
    VariantProps<typeof toggleVariants> {
  className?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = ({
  className,
  variant,
  pressed,
  onPressedChange,
  ...props
}: ToggleProps) => {
  const [isOn, setIsOn] = useState(pressed ?? false);

  const handleClick = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onPressedChange?.(newValue);
  };

  const variantClass = toggleVariants({ variant });

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        className={clsx(variantClass, className)}
        onClick={handleClick}
        {...props}
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
};

export { cn, Toggle, toggleVariants };
