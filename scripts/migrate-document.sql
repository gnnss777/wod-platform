CREATE TABLE "StoryDocument" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'TEXT' CHECK (type IN ('TEXT', 'LINK', 'PDF', 'IMAGE')),
    content TEXT,
    file_url TEXT,
    chronicle_id TEXT REFERENCES "Chronicle"(id) ON DELETE SET NULL,
    scene_id TEXT REFERENCES "Scene"(id) ON DELETE SET NULL,
    narrator_id TEXT NOT NULL REFERENCES "User"(id),
    visible_to_players BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
