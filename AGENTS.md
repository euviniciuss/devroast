# DevRoast

## Setup
```bash
pnpm install
pnpm dev
```

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 3
- shiki (syntax highlighting)
- base-ui (Toggle)

## Estrutura
```
src/
├── app/           # Rotas Next.js
├── components/ui/ # Componentes reutilizáveis
└── lib/utils.ts   # cn() helper
```

## Componentes UI
- Pattern de composição (shadcn/ui style)
- Usar `@/lib/utils` para `cn()`
- Variáveis CSS em `src/app/globals.css`

## icons
- Usar emoji ou texto quando possível (ex: `$`, `//`, `>`, etc)
- Fonte: JetBrains Mono

## Dados
- Por enquanto tudo estático (mock)
- Sem conexão com API
