"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCharacter } from "@/app/actions/character";
import {
  V20_ATTRIBUTES,
  V20_TALENTS,
  V20_SKILLS,
  V20_KNOWLEDGES,
  V5_ATTRIBUTES,
  V5_PHYSICAL_SKILLS,
  V5_SOCIAL_SKILLS,
  V5_MENTAL_SKILLS,
  buildDefaultAttributes,
  buildDefaultAbilities,
} from "@/lib/character-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttrGroup } from "./attr-row";
import { AbilityCol } from "./ability-col";

export function CharacterForm() {
  const router = useRouter();
  const [edition, setEdition] = useState<"V5" | "V20">("V20");
  const [attributes, setAttributes] = useState(
    buildDefaultAttributes("V20"),
  );
  const [abilities, setAbilities] = useState(buildDefaultAbilities("V20"));
  const [name, setName] = useState("");
  const [concept, setConcept] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const attrStructure =
    edition === "V5" ? V5_ATTRIBUTES : V20_ATTRIBUTES;
  const abilityGroups =
    edition === "V5"
      ? [
          { title: "Físicos", keys: V5_PHYSICAL_SKILLS },
          { title: "Sociais", keys: V5_SOCIAL_SKILLS },
          { title: "Mentais", keys: V5_MENTAL_SKILLS },
        ]
      : [
          { title: "Talentos", keys: V20_TALENTS },
          { title: "Perícias", keys: V20_SKILLS },
          { title: "Conhecimentos", keys: V20_KNOWLEDGES },
        ];

  function switchEdition(ed: "V5" | "V20") {
    setEdition(ed);
    setAttributes(buildDefaultAttributes(ed));
    setAbilities(buildDefaultAbilities(ed));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await createCharacter({ name, concept, edition });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => switchEdition("V20")}
          className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
            edition === "V20"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-700"
          }`}
        >
          V20
        </button>
        <button
          type="button"
          onClick={() => switchEdition("V5")}
          className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
            edition === "V5"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-700"
          }`}
        >
          V5
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="name"
          label="Nome do Personagem"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Marcus Blackwood"
          required
        />
        <Input
          id="concept"
          label="Conceito"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Ex: Detective das ruas"
        />
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Atributos</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(attrStructure).map(([group, keys]) => (
            <AttrGroup
              key={group}
              title={group === "physical" ? "Físicos" : group === "social" ? "Sociais" : "Mentais"}
              keys={keys}
              values={attributes}
              onChange={(k, v) =>
                setAttributes((prev) => ({ ...prev, [k]: v }))
              }
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Habilidades</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {abilityGroups.map((g) => (
            <AbilityCol
              key={g.title}
              title={g.title}
              keys={g.keys}
              values={abilities}
              onChange={(k, v) =>
                setAbilities((prev) => ({ ...prev, [k]: v }))
              }
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Criando..." : "Criar Personagem"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
