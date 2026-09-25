# Plano: Página de Login (apps/web)

## Context
`apps/web` ainda é o starter do Vite (sem Tailwind, router ou testes). Vamos construir a primeira tela real — Login — seguindo as convenções do CLAUDE.md (Atomic Design, Tailwind, teste obrigatório por componente). A página de Cadastro virá depois com o **mesmo layout base** (banner à esquerda + card de conteúdo à direita), banner diferente e formulário diferente, então o layout e as peças compartilhadas precisam ser parametrizáveis desde já.

Decisões do usuário: **Vitest + RTL**, **React Router já agora**, **só UI + callbacks** (sem integração com API).

Assets existentes em `apps/web/public/`: `banner-login.png` (o logo CodeConnect já vem embutido na imagem), `Github.png`, `Google.png`.

## 1. Tooling (apps/web)
- **Tailwind v4**: `tailwindcss` + `@tailwindcss/vite`; adicionar plugin em `vite.config.ts`.
- **Testes**: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` (confirmar versão do vitest compatível com Vite 8 na instalação).
  - Bloco `test` em `vite.config.ts` (`/// <reference types="vitest/config" />`): `environment: 'jsdom'`, `setupFiles: './src/test/setup.ts'`.
  - `src/test/setup.ts`: `import '@testing-library/jest-dom/vitest'` + `afterEach(cleanup)` (sem globals; testes importam de `vitest`).
  - Scripts em `apps/web/package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`. Na raiz: `"web:test": "pnpm --filter web test"`.
- **Router**: `react-router` (v7). `main.tsx` envolve em `<BrowserRouter>`; `App.tsx` vira as rotas: `/` → `<Navigate to="/login" />`, `/login` → `LoginPage` (`/cadastro` entra depois).
- **Fonte / tema**: carregar a fonte *Prompt* (Google Fonts) no `index.html` (também `lang="pt-BR"`, título `CodeConnect`). `src/index.css` substituído por `@import "tailwindcss";` + `@theme` com tokens:
  - `--color-primary: #81FE88` (botão/links verdes), `--color-graphite: #171D1F` (card), `--color-dark: #01080E` (fundo da página), `--color-gray-medium: #888888` (inputs), `--color-offwhite: #E1E1E1` (textos), `--font-sans: "Prompt", system-ui, sans-serif`.
- **Remover o cruft do starter**: `src/App.css`, `src/assets/{hero.png,react.svg,vite.svg}`, `public/icons.svg`.

## 2. Componentes (Atomic Design em `src/components/` + `src/pages/`)
Cada componente fica em sua própria pasta com `Nome.tsx` + `Nome.test.tsx` (e `index.ts` de re-export).

**atoms/**
- `Button` — variante primária verde, largura total, aceita `icon` opcional à direita e props nativas de `<button>`.
- `Input` — fundo cinza, texto claro, forwarda props nativas (`type`, `placeholder`, `required`, `id`…).
- `Label` — rótulo `<label>` estilizado.
- `Checkbox` — checkbox customizado (borda/check verde) com texto ("Lembrar-me").
- `TextLink` — wrapper de `Link` do router com variantes `underline` ("Esqueci a senha") e `primary` (verde, "Crie seu cadastro!").
- `Heading` — título (`Login`) e subtítulo.
- `Divider` — linha com texto centralizado ("ou entre com outras contas").
- `icons/ArrowRightIcon`, `icons/ClipboardIcon` — SVGs inline, `aria-hidden`.

**molecules/**
- `FormField` — `Label` + `Input`, liga os dois via `useId()` (acessível por `getByLabelText`). Reutilizado no cadastro.
- `SocialLoginButton` — imagem do provedor + nome ("Github", "Gmail"), `onClick`.
- `AuthPrompt` — texto + `TextLink` + ícone ("Ainda não tem conta? / Crie seu cadastro!"); props `question`, `linkLabel`, `to`, `icon` → no cadastro vira "Já tem conta? Faça seu login!".

**organisms/**
- `LoginForm` — estado controlado (`email`, `senha`, `lembrar`), campos com `required`, linha Lembrar-me + Esqueci a senha, botão "Login →". Prop `onSubmit({ email, senha, lembrar })`.
- `SocialLoginOptions` — `Divider` + lista de `SocialLoginButton` (github/google). Prop `onSocialLogin(provider: 'github' | 'google')`. Reutilizável no cadastro.

**templates/**
- `AuthTemplate` — fundo escuro, card `graphite` arredondado com duas colunas: banner à esquerda (`bannerSrc`, `bannerAlt`; oculto em telas pequenas via `md:block`) e à direita `title`, `subtitle` e `children`. É o ponto de reuso do cadastro: só troca banner, textos e o formulário.

**pages/**
- `LoginPage` — `AuthTemplate` com `/banner-login.png`, título "Login", subtítulo "Boas-vindas! Faça seu login." e filhos `LoginForm`, `SocialLoginOptions`, `AuthPrompt` (to `/cadastro`). Handlers por enquanto só fazem `console.info` (sem API).

## 3. Testes (uso essencial de cada componente)
Exemplos do que cada teste cobre:
- Atoms: `Button` renderiza o texto e dispara `onClick`; `Input` aceita digitação; `Checkbox` alterna marcado/desmarcado; `TextLink` renderiza com o `href` certo (dentro de `MemoryRouter`); `Divider`/`Heading` renderizam o texto; ícones renderizam com `aria-hidden`.
- `FormField`: o input é encontrado por `getByLabelText`.
- `SocialLoginButton`: mostra imagem com alt + label, dispara `onClick`.
- `AuthPrompt`: pergunta + link apontando para `to`.
- `LoginForm`: preencher e enviar chama `onSubmit` com `{ email, senha, lembrar }`; enviar com campos vazios não chama.
- `SocialLoginOptions`: clicar em Github/Gmail chama `onSocialLogin('github' | 'google')`.
- `AuthTemplate`: renderiza banner (alt), título, subtítulo e children.
- `LoginPage`: renderiza em `MemoryRouter`, com título, formulário, opções sociais e link para `/cadastro`.

## Arquivos críticos
- Modificados: `apps/web/package.json`, `apps/web/vite.config.ts`, `apps/web/index.html`, `apps/web/src/main.tsx`, `apps/web/src/App.tsx`, `apps/web/src/index.css`, `package.json` (raiz, script `web:test`), `pnpm-lock.yaml`.
- Novos: `apps/web/src/test/setup.ts`, `apps/web/src/components/{atoms,molecules,organisms,templates}/**`, `apps/web/src/pages/LoginPage/**`.

## Verificação
1. `pnpm web:test` — todos os testes passam.
2. `pnpm web:lint` e `pnpm web:build` (inclui `tsc -b`) sem erros.
3. `pnpm web:dev` → abrir `http://localhost:5173/`: redireciona para `/login` e bate com o mockup (card escuro, banner à esquerda, inputs cinza, botão verde, logos sociais, link de cadastro). Checar também largura de celular (banner oculto, formulário sem scroll horizontal). O MCP do Playwright estava sem conexão nesta sessão; se continuar assim, a checagem visual fica manual.
4. Commits só se o usuário pedir, em Conventional Commits (ex.: `chore(web): setup tailwind, vitest and react-router`, `feat(web): add login page`).
