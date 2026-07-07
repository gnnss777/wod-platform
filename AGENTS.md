<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-development -->
# Local Development

## Workflow (obrigatório antes de todo commit)

```powershell
# 1. Gerar Prisma client
npx prisma generate

# 2. Build com webpack (verifica erros de TS e compilação)
npx next build --webpack

# 3. Se o build passar, pode commitar
```

## Dev server (para desenvolvimento)

```powershell
npx next dev --webpack
```

## Start production server

```powershell
npx next start
```

## Environment

- `.env` — valores reais (Supabase creds, session secret). Git-ignored.
- `.env.local` — gerado pelo `vercel link` (NÃO editar sobrescreve)

Se `.env.local` tiver `SUPABASE_URL=""` etc, o build falha porque sobrescreve `.env`.
Solução: remover manualmente as linhas com valores vazios do `.env.local`.

## Seed (dados de simulação)

```powershell
# Popula o banco com a crônica "Noites Sombrias em Curitiba"
# 14 jogadores, 14 fichas, 6 NPCs, 4 cenas, notas do narrador
npx tsx scripts/seed.ts
```

## Commandes Lint

```powershell
npm run lint
```

## Projeto: WoD Platform

Plataforma de RPG World of Darkness com duas áreas principais:
- **Jogador**: fichas, diário, crônica, notas, rolador (d10 e v5)
- **Narrador**: cenas, crônicas, NPCs, jogadores, sessões, regras, rolador

Stack:
- Next.js 16 (webpack)
- Prisma 7 + PostgreSQL (Supabase)
- Tailwind CSS v4
- TypeScript
- Supabase Auth + SSR
- Zod validação
## Vercel

```powershell
# Deploy (apenas quando build local passar)
git add -A && git commit -m "msg"
git push origin main
vercel deploy --prod
```
<!-- END:local-development -->
