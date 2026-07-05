-- Scheduled delivery for documents
ALTER TABLE "StoryDocument" ADD COLUMN scheduled_for TIMESTAMPTZ;

-- Private notes between narrator and player
CREATE TABLE "PrivateNote" (
    id TEXT PRIMARY KEY,
    narrator_id TEXT NOT NULL REFERENCES "User"(id),
    player_id TEXT NOT NULL REFERENCES "User"(id),
    chronicle_id TEXT REFERENCES "Chronicle"(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
