<p align="center">
  <img src="https://img.shields.io/badge/DevRoast-F97316?style=for-the-badge&logo=fire&logoColor=white" alt="DevRoast Logo" width="50%">
</p>

## 💡 DevRoast
Aplicação interativa para desenvolvedores enviarem seus códigos e receberem feedbacks (roasts) honestos e divertidos gerados por Inteligência Artificial.

## ℹ Sobre o projeto
O DevRoast é uma plataforma web onde o "code review" ganha um tom humorístico. Através de IA, a aplicação analisa trechos de código enviados e gera críticas ácidas ou feedbacks construtivos (dependendo do modo selecionado), expondo falhas de lógica, más práticas ou apenas "zoando" o estilo do desenvolvedor.

Desenvolvido durante a **NLW** da [Rocketseat](https://www.rocketseat.com.br), o projeto foca em uma experiência de usuário fluida com tecnologias de ponta, incluindo realce de sintaxe avançado e componentes de interface modernos.

## 🛠 Tecnologias
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shiki](https://img.shields.io/badge/Shiki-FF6B35?style=for-the-badge&logo=shiki&logoColor=white)
![CodeMirror](https://img.shields.io/badge/CodeMirror-212121?style=for-the-badge&logo=codemirror&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)

## 📋 Funcionalidades

- **Editor de Código**: Entrada de código com realce de sintaxe em tempo real via CodeMirror.
- **Suporte Multi-linguagem**: Suporte para diversas linguagens (JavaScript, TypeScript, Python, Rust, Go, etc.).
- **Roast Mode**: Toggle para alternar entre feedback "Honesto" e o modo "Roast Total".
- **Análise de IA**: Feedbacks gerados dinamicamente analisando a qualidade e estilo do código.
- **Shame Leaderboard**: Ranking dos códigos mais "vergonhosos" ou criticados pela comunidade.
- **Visualização de Pontuação**: Score visual (Score Ring) indicando o nível de qualidade do código enviado.
- **Design Moderno**: Interface responsiva, dark mode nativo e animações suaves.

### Componentes Principais

| Componente | Função | Tecnologia |
|------------|--------|------------|
| `CodeInput` | Editor de código interativo | `@uiw/react-codemirror` |
| `AnalysisCard` | Exibição do feedback da IA | React Client Components |
| `ScoreRing` | Gráfico circular de pontuação | SVG / Tailwind |
| `Shiki` | Realce de sintaxe estático e de alta fidelidade | `shiki` |
| `Toggle` | Alternância de modos (Roast/Honest) | `base-ui` |

## 🗄 Estrutura do projeto

```
src/
├── app/                          # Rotas (Home, Leaderboard, Exemplos)
├── components/                   # Componentes da aplicação
│   └── ui/                       # Componentes reutilizáveis (Button, Toggle, etc.)
├── hooks/                        # Hooks personalizados para lógica de estado
├── lib/                          # Utilitários e configurações (cn helper)
├── assets/                       # Arquivos estáticos e ícones
└── styles/                       # Estilos globais e tokens (Tailwind)
```

## ▶️ Como rodar

### Pré-requisitos
- **[Node.js](https://nodejs.org/en)** instalado globalmente
- **[pnpm](https://pnpm.io/)** instalado globalmente

### Versões utilizadas

| Tecnologia | Versão |
|------------|--------|
| Node.js | ^22 |
| Next.js | 16 |
| React | 19 |
| TypeScript | ^5 |
| Tailwind CSS | 3 |

### Passo a passo

1. Clone o repositório:
```sh
git clone https://github.com/euviniciuss/devroast
```

2. Instale as dependências:
```sh
pnpm install
```

3. Inicie o servidor em modo desenvolvimento:
```sh
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`.

## 🧪 Qualidade de Código

O projeto utiliza **Biome** para linting e formatação, garantindo consistência e performance no desenvolvimento.

```sh
# Rodar lint e format
pnpm biome check --write .
```

## 🚀 Contribuidores

<a href="https://github.com/euviniciuss/devroast/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=euviniciuss/devroast" alt="contribuitors image">
</a>
