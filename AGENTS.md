<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-development -->
# Local Development

## Build & Test locally (antes de dar deploy)

```powershell
# 1. Generate Prisma client (needed even if unused)
npx prisma generate

# 2. Build with webpack (Turbopack is default in Next.js 16)
npx next build --webpack

# 3. Start production server locally
npx next start
```

## Environment

- `.env` — valores reais (Supabase creds, session secret). Git-ignored.
- `.env.local` — gerado pelo `vercel link` (NÃO editar sobrescreve)

Se `.env.local` tiver `SUPABASE_URL=""` etc, o build falha porque sobrescreve `.env`.
Solução: remover manualmente as linhas com valores vazios do `.env.local`.

## Vercel

```powershell
# Deploy (apenas quando build local passar)
git add -A && git commit -m "msg"
git push origin main
vercel deploy --prod
```
<!-- END:local-development -->
