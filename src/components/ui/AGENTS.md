# Padrões de Componentes UI

## Estrutura de Arquivos

```
src/components/ui/
├── button.tsx
└── AGENTS.md
```

## Regras de Implementação

### 1. Estilos baseados no Pencil
- Sempre verificar o componente no Pencil antes de criar
- Copiar exatamente: padding, font-size, font-weight, gap, border-radius
- Usar valores literais quando necessário (ex: `py-[10px]`, `text-[13px]`)

### 2. Dependências obrigatórias
- `clsx` - para conditional classes
- `tailwind-merge` - para merger classes corretamente
- `tailwind-variants` - para variantes de componentes
- `@base-ui-components/react` - para componentes com comportamento (Toggle, etc)
- `shiki` - para syntax highlighting (server component)

```bash
pnpm add clsx tailwind-merge tailwind-variants @base-ui-components/react shiki
```

### 3. Estrutura do componente

```tsx
import { type ClassValue, clsx } from 'clsx';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = tv({
  base: 'classes base sempre aplicadas',
  variants: {
    variant: {
      primary: '...',
      secondary: '...',
    },
    size: {
      sm: '...',
      md: '...',
      lg: '...',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants, cn };
```

### 4. Regras de export

- **SEMPRE** usar name exports, nunca default exports
- Exportar: componente principal, variants function, e helper cn

### 5. Propriedades

- Estender propriedades nativas do elemento HTML (ex: `ButtonHTMLAttributes<HTMLButtonElement>`)
- Usar `VariantProps` do tailwind-variants para tipar variant e size

### 6. Estilos globais

- Usar variáveis CSS definidas em `src/app/globals.css`
- Cores: `bg-primary`, `text-primary-foreground`, etc.
- Fonte: `font-mono` (já configurado no tailwind.config.ts)

### 7. Exemplos no `/examples`

Todo novo componente deve ser importado e demonstrado em `src/app/examples/page.tsx` com todas as suas variações.

Estrutura recomendada:
```tsx
import { Button } from '@/components/ui/button';
// import { NovoComponente } from '@/components/ui/novo-componente';

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-8 space-y-12">
      {/* Button */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Button</h2>
        {/* variações */}
      </section>

      {/* NovoComponente */}
      <section>
        <h2 className="text-lg font-semibold mb-4">NovoComponente</h2>
        {/* variações */}
      </section>
    </main>
  );
}
```

### 8. Server Components

Para componentes que usam shiki ou outras libs que só funcionam no servidor:
- Criar como server component (sem `'use client'`)
- Para testar no `/examples`, criar uma versão client com `useEffect`

```tsx
// Server component (code-block.tsx)
import { codeToHtml } from 'shiki';

export async function CodeBlock({ code, lang = 'javascript' }) {
  const html = await codeToHtml(code, { lang, theme: 'vesper' });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// Client version for examples (code-block-client.tsx)
'use client';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export function CodeBlock({ code, lang = 'javascript' }) {
  const [html, setHtml] = useState('');
  useEffect(() => {
    codeToHtml(code, { lang, theme: 'vesper' }).then(setHtml);
  }, [code, lang]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### 9. Pattern de Composição

Para componentes que possuem partes内部 (como title, description, etc), usar o padrão de composição ao invés de props:

```tsx
// Ao invés de:
<AnalysisCard severity="critical" title="..." description="..." />

// Usar:
<AnalysisCard.Root severity="critical">
  <AnalysisCard.Severity>critical</AnalysisCard.Severity>
  <AnalysisCard.Title>...</AnalysisCard.Title>
  <AnalysisCard.Description>...</AnalysisCard.Description>
</AnalysisCard.Root>
```

**Estrutura do componente composto:**

```tsx
function CardRoot({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('base classes', className)} {...props}>{children}</div>;
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('title classes', className)} {...props}>{children}</h3>;
}

export const Card = {
  Root: CardRoot,
  Title: CardTitle,
  // ...outros sub-componentes
};
```

**Utilitário cn:**
- O helper `cn` está disponível em `@/lib/utils
