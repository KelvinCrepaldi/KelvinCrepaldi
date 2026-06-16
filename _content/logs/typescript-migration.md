## Resumo

Migrar um monorepo grande de JavaScript para TypeScript **de forma gradual** é possível — desde que você aceite conviver com `any` temporário e priorize fronteiras (API, IPC, models) antes de componentes visuais.

## Contexto

Dashboard Next.js, API routes, shell Electron e apps Vite. Tudo em JS com tipos "na cabeça". Débito crescente em refactors e integrações com Supabase.

## Estratégia

1. `strict: false` no início; ligar regras por pasta.
2. Tipar **contratos de API** e payloads de sync primeiro.
3. Converter apps Vite um fluxo por sprint.
4. ESLint `@typescript-eslint` só onde já havia TS.

## Ganhos reais

- Menos regressão em payloads de totem → servidor.
- Autocomplete em rotas Supabase após gerar tipos do schema.
- Onboarding de devs mais rápido (menos "pergunta no Slack").

## Lição

TypeScript não é religião — é documentação que o compilador verifica. O erro é tentar converter 100% antes de entregar valor.
