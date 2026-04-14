# Especificação: Editor com Syntax Highlighting

## Overview

Editor de código com syntax highlighting automático e manual para a homepage do DevRoast.

## Requisitos

1. **Syntax Highlighting**: Aplicar cores ao código conforme a linguagem
2. **Detecção Automática**: Identificar a linguagem do código automaticamente ao colar
3. **Seleção Manual**: Permitir que o usuário selecione a linguagem pelo editor
4. **Integração com Next.js 16**: Funcionar com React 19 e App Router

---

## Stack Implementada: CodeMirror 6 + highlight.js

### Componentes:

1. **CodeMirror 6** (`@uiw/react-codemirror`)
   - Editor editável moderno e leve
   - Syntax highlighting nativo
   - Suporte a múltiplas linguagens

2. **highlight.js**
   - Detecção automática de linguagem
   - ~90% de precisão

3. **Linguagens suportadas** (nativas do CodeMirror):
   - JavaScript/TypeScript
   - Python
   - Rust
   - Go
   - Java
   - C/C++/C#
   - PHP
   - HTML
   - CSS
   - JSON
   - Markdown
   - SQL

---

## Arquitetura Implementada

```
src/
├── components/ui/
│   ├── code-input.tsx           # Editor CodeMirror com syntax highlighting
│   └── language-selector.tsx    # Dropdown de seleção de linguagem
└── lib/
    └── useLanguageDetection.ts   # Hook para detectar linguagem
```

### Como funciona:

1. **CodeMirror 6** gerencia a edição de texto com syntax highlighting nativo
2. **highlight.js** detecta linguagem automaticamente ao digitar/colar
3. **LanguageSelector** permite seleção manual de linguagem

---

## To-Dos

- [x] Definir tipo de editor: Editável
- [x] Definir linguagens: CodeMirror nativas
- [x] Instalar dependências: `@uiw/react-codemirror` + `highlight.js`
- [x] Configurar CodeMirror 6 no projeto
- [x] Configurar highlight.js para detecção automática
- [x] Criar componente LanguageSelector com dropdown de linguagens
- [x] Implementar hook useLanguageDetection para auto-detecção
- [x] Integrar com homepage existente

---

## Decisões Técnicas

### Por que CodeMirror em vez de Shiki para highlighting?

Shiki é excelente para rendering estático (SSR), mas para um editor **editável** em tempo real, CodeMirror 6 oferece:
- Melhor performance em edições frequentes
- Integração nativa com o editor
- Menor complexidade de configuração

### O Shiki continua sendo usado no projeto?

Sim, Shiki está disponível para componentes de visualização de código (como `CodeBlock`).

---

## Próximos Passos (Futuro)

1. Adicionar mais linguagens via `@codemirror/language-data`
2. Melhorar tema para suportar dark/light mode
3. Adicionar Shiki para visualização de código destacado em outras páginas
