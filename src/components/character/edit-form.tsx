"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCharacter } from "@/app/actions/character";
import {
  V20_ATTRIBUTES,
  V20_TALENTS,
  V20_SKILLS,
  V20_KNOWLEDGES,
  V5_ATTRIBUTES,
  V5_PHYSICAL_SKILLS,
  V5_SOCIAL_SKILLS,
  V5_MENTAL_SKILLS,
} from "@/lib/character-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttrGroup } from "./attr-row";
import { AbilityCol } from "./ability-col";

type Props = {
  character: {
    id: string;
    name: string;
    edition: string;
    concept: string | null;
    nature: string | null;
    demeanor: string | null;
    clan: string | null;
    generation: number | null;
    attributes: Record<string, number>;
    abilities: Record<string, number>;
    powers: Record<string, number>;
    backgrounds: Record<string, number>;
    willpower: Record<string, number>;
    health: Record<string, number>;
    pool: Record<string, unknown>;
    morality: Record<string, unknown>;
    experience: Record<string, number>;
    notes: string | null;
  };
};

export function EditCharacterForm({ character }: Props) {
  const router = useRouter();
  const [name, setName] = useState(character.name);
  const [concept, setConcept] = useState(character.concept ?? "");
  const [nature, setNature] = useState(character.nature ?? "");
  const [demeanor, setDemeanor] = useState(character.demeanor ?? "");
  const [clan, setClan] = useState(character.clan ?? "");
  const [generation, setGeneration] = useState(
    character.generation?.toString() ?? "",
  );
  const [attributes, setAttributes] = useState(character.attributes);
  const [abilities, setAbilities] = useState(character.abilities);
  const [powers, setPowers] = useState(character.powers);
  const [backgrounds, setBackgrounds] = useState(character.backgrounds);
  const [newPowerName, setNewPowerName] = useState("");
  const [newBgName, setNewBgName] = useState("");
  const [notes, setNotes] = useState(character.notes ?? "");
  const [submitting, setSubmitting] = useState(false);

  const isV5 = character.edition === "V5";
  const attrStructure = isV5 ? V5_ATTRIBUTES : V20_ATTRIBUTES;
  const abilityGroups = isV5
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);

    await updateCharacter(character.id, {
      name,
      concept: concept || null,
      nature: nature || null,
      demeanor: demeanor || null,
      clan: clan || null,
      generation: generation ? parseInt(generation) : null,
      attributes,
      abilities,
      powers,
      backgrounds,
      notes: notes || null,
    });

    router.push(`/jogador/fichas/${character.id}`);
    router.refresh();
  }

  function addPower() {
    if (!newPowerName.trim()) return;
    setPowers((prev) => ({ ...prev, [newPowerName.trim().toLowerCase()]: 1 }));
    setNewPowerName("");
  }

  function addBackground() {
    if (!newBgName.trim()) return;
    setBackgrounds((prev) => ({ ...prev, [newBgName.trim().toLowerCase()]: 1 }));
    setNewBgName("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="name"
          label="Nome do Personagem"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="concept"
          label="Conceito"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
        />
        {!isV5 && (
          <>
            <Input
              id="nature"
              label="Natureza"
              value={nature}
              onChange={(e) => setNature(e.target.value)}
            />
            <Input
              id="demeanor"
              label="Comportamento"
              value={demeanor}
              onChange={(e) => setDemeanor(e.target.value)}
            />
          </>
        )}
        <Input
          id="clan"
          label={isV5 ? "Clã" : "Clã / Tradição / Tribo"}
          value={clan}
          onChange={(e) => setClan(e.target.value)}
        />
        <Input
          id="generation"
          label="Geração"
          type="number"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Atributos</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(attrStructure).map(([group, keys]) => (
            <AttrGroup
              key={group}
              title={
                group === "physical" ? "Físicos" : group === "social" ? "Sociais" : "Mentais"
              }
              keys={keys}
              values={attributes}
              onChange={(k, v) => setAttributes((prev) => ({ ...prev, [k]: v }))}
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
              onChange={(k, v) => setAbilities((prev) => ({ ...prev, [k]: v }))}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Disciplinas / Poderes</h3>
        {Object.entries(powers).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="text-xs capitalize flex-1">{k}</span>
            <AttrGroup
              title=""
              keys={[k]}
              values={powers}
              onChange={(key, val) =>
                setPowers((prev) => ({ ...prev, [key]: val }))
              }
            />
            <button
              type="button"
              onClick={() => {
                const next = { ...powers };
                delete next[k];
                setPowers(next);
              }}
              className="text-xs text-red-500"
            >
              remover
            </button>
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <input
            className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Nome do poder..."
            value={newPowerName}
            onChange={(e) => setNewPowerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPower())}
          />
          <button type="button" onClick={addPower} className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            + Adicionar
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Antecedentes</h3>
        {Object.entries(backgrounds).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="text-xs capitalize flex-1">{k}</span>
            <AttrGroup
              title=""
              keys={[k]}
              values={backgrounds}
              onChange={(key, val) =>
                setBackgrounds((prev) => ({ ...prev, [key]: val }))
              }
            />
            <button
              type="button"
              onClick={() => {
                const next = { ...backgrounds };
                delete next[k];
                setBackgrounds(next);
              }}
              className="text-xs text-red-500"
            >
              remover
            </button>
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <input
            className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Nome do antecedente..."
            value={newBgName}
            onChange={(e) => setNewBgName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBackground())}
          />
          <button type="button" onClick={addBackground} className="text-xs font-medium">
            + Adicionar
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-2">
        <h3 className="text-sm font-semibold">Notas</h3>
        <textarea
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar"}
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
