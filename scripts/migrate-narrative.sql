-- Adicionar textos narrativos a Chronicle e Scene
ALTER TABLE "Chronicle" ADD COLUMN IF NOT EXISTS "narrativeText" TEXT;
ALTER TABLE "Scene" ADD COLUMN IF NOT EXISTS "narrativeText" TEXT;