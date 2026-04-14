# Especificação: Implementação do Drizzle ORM

## Overview

Implementação do Drizzle ORM com PostgreSQL via Docker Compose para o DevRoast.

---

## Tech Stack

- **ORM**: Drizzle ORM
- **Banco**: PostgreSQL (via Docker Compose)
- **Driver**: `postgres` (drizzle-orm) + `drizzle-kit` (migrations)

---

## Arquitetura

```
src/
├── db/
│   ├── index.ts      # Conexão com banco
│   ├── schema.ts    # Definição das tabelas
│   └── migrations/  # Migrations do Drizzle
├── lib/
│   └── db.ts        # Helper para queries
```

---

## Tabelas

### 1. `code_submissions`

Tabela principal que armazena todos os códigos enviados.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | ID único da submissão |
| `code` | `text` | Código enviado pelo usuário |
| `language` | `varchar(50)` | Linguagem detectada/selecionada |
| `score` | `decimal(3,1)` | Score de roast (0.0 - 10.0) |
| `feedback` | `text` | Feedback gerado pela IA |
| `roast_mode` | `enum` | Modo usado (honesto/roast) |
| `created_at` | `timestamptz` | Data de criação |

---

## Enums

### `roast_mode`

```typescript
export const roastModeEnum = pgEnum('roast_mode', ['honesto', 'roast']);
```

Valores possíveis:
- `honesto` - Feedback honesto
- `roast` - Modo roast total

---

## To-Dos de Implementação

### Fase 1: Setup Docker Compose
- [ ] Criar `docker-compose.yml` com PostgreSQL
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Testar conexão com banco

### Fase 2: Configuração Drizzle
- [ ] Instalar dependências: `drizzle-orm`, `drizzle-kit`, `postgres`
- [ ] Criar `src/db/schema.ts` com definições de tabelas
- [ ] Criar `src/db/index.ts` com conexão
- [ ] Configurar `drizzle.config.ts`

### Fase 3: Migrations
- [ ] Criar arquivo de migration inicial
- [ ] Executar migrations no banco local

### Fase 4: Integração Next.js
- [ ] Criar helpers para CRUD em `src/lib/db.ts`
- [ ] Criar Server Actions para submissões
- [ ] Atualizar página principal para buscar dados do banco

### Fase 5: Leaderboard
- [ ] Implementar query de leaderboard (ordenar por score ASC para "pior código")
- [ ] Adicionar contagem dinâmica de códigos roastados

---

## Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast123
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL=postgresql://devroast:devroast123@localhost:5432/devroast
```

---

## Queries Comuns

```typescript
// Criar nova submissão
await db.insert(codeSubmissions).values({
  code: '...',
  language: 'javascript',
  score: 2.5,
  feedback: '...',
  roast_mode: 'roast'
});

// Leaderboard - piores códigos (score menor = mais roastado)
await db.select()
  .from(codeSubmissions)
  .orderBy(sql`${codeSubmissions.score} ASC`)
  .limit(50);

// Contagem total
await db.select({ count: sql`count(*)` }).from(codeSubmissions);
```

---

## Perguntas em Aberto

1. **Feedback da IA**: Como será gerado? API externa ou mock?
2. **Detecção de linguagem**: Usar `highlight.js` conforme spec anterior?
3. **Score inicial**: Range de 0-10 com casa decimal?
