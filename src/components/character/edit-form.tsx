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
import { DotsInput } from "./dots-input";
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
    sire: string | null;
    ambition: string | null;
    desire: string | null;
    predatorType: string | null;
    age: number | null;
    apparentAge: number | null;
    appearance: string | null;
    personality: string | null;
    history: string | null;
    goals: string | null;
    weakness: string | null;
    touchstones: string | null;
    convictions: string | null;
    alliesContacts: string | null;
    possessions: string | null;
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
  const [generation, setGeneration] = useState(character.generation?.toString() ?? "");
  const [sire, setSire] = useState(character.sire ?? "");
  const [ambition, setAmbition] = useState(character.ambition ?? "");
  const [desire, setDesire] = useState(character.desire ?? "");
  const [predatorType, setPredatorType] = useState(character.predatorType ?? "");
  const [age, setAge] = useState(character.age?.toString() ?? "");
  const [apparentAge, setApparentAge] = useState(character.apparentAge?.toString() ?? "");
  const [appearance, setAppearance] = useState(character.appearance ?? "");
  const [personality, setPersonality] = useState(character.personality ?? "");
  const [history, setHistory] = useState(character.history ?? "");
  const [goals, setGoals] = useState(character.goals ?? "");
  const [weakness, setWeakness] = useState(character.weakness ?? "");
  const [touchstones, setTouchstones] = useState(character.touchstones ?? "");
  const [convictions, setConvictions] = useState(character.convictions ?? "");
  const [alliesContacts, setAlliesContacts] = useState(character.alliesContacts ?? "");
  const [possessions, setPossessions] = useState(character.possessions ?? "");
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
      sire: sire || null,
      ambition: ambition || null,
      desire: desire || null,
      predatorType: predatorType || null,
      age: age ? parseInt(age) : null,
      apparentAge: apparentAge ? parseInt(apparentAge) : null,
      appearance: appearance || null,
      personality: personality || null,
      history: history || null,
      goals: goals || null,
      weakness: weakness || null,
      touchstones: touchstones || null,
      convictions: convictions || null,
      alliesContacts: alliesContacts || null,
      possessions: possessions || null,
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

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Informações Vampíricas</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input id="sire" label="Criador (Sire)" value={sire} onChange={(e) => setSire(e.target.value)} placeholder="Quem te criou?" />
          {isV5 && (
            <>
              <Input id="ambition" label="Ambição" value={ambition} onChange={(e) => setAmbition(e.target.value)} placeholder="Curto prazo" />
              <Input id="desire" label="Desejo" value={desire} onChange={(e) => setDesire(e.target.value)} placeholder="Longo prazo" />
              <Input id="predatorType" label="Tipo de Predador" value={predatorType} onChange={(e) => setPredatorType(e.target.value)} placeholder="Alleycat, Bagger..." />
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Aparência Física</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <Input id="age" label="Idade Real" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input id="apparentAge" label="Aparenta" type="number" value={apparentAge} onChange={(e) => setApparentAge(e.target.value)} />
        </div>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={4} value={appearance} onChange={(e) => setAppearance(e.target.value)} placeholder="Descrição física do personagem..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Personalidade</h3>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={4} value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Traços de personalidade, maneirismos, medos..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">História e Background</h3>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={6} value={history} onChange={(e) => setHistory(e.target.value)} placeholder="História do personagem antes e depois da morte..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Objetivos e Fraquezas</h3>
        <div className="space-y-3">
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="Objetivos do personagem..." />
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={weakness} onChange={(e) => setWeakness(e.target.value)} placeholder="Fraquezas e vulnerabilidades..." />
        </div>
      </div>

      {isV5 && (
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-semibold">Convicções e Touchstones (V5)</h3>
          <div className="space-y-3">
            <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={touchstones} onChange={(e) => setTouchstones(e.target.value)} placeholder="Pontos de contato humano..." />
            <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={convictions} onChange={(e) => setConvictions(e.target.value)} placeholder="Convicções pessoais..." />
          </div>
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Aliados, Posses e Contatos</h3>
        <div className="space-y-3">
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={alliesContacts} onChange={(e) => setAlliesContacts(e.target.value)} placeholder="Aliados, contatos, recursos..." />
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={possessions} onChange={(e) => setPossessions(e.target.value)} placeholder="Posses e equipamentos..." />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-4">
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

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Habilidades</h3>
        <div className="grid gap-6 sm:grid-cols-3">
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

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Disciplinas / Poderes</h3>
        {Object.entries(powers).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-2">
            <span className="text-xs capitalize flex-1">{k}</span>
            <div className="flex items-center gap-2">
              <DotsInput
                value={v}
                min={0}
                onChange={(val) => setPowers((prev) => ({ ...prev, [k]: val }))}
                size="sm"
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

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Antecedentes</h3>
        {Object.entries(backgrounds).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-2">
            <span className="text-xs capitalize flex-1">{k}</span>
            <div className="flex items-center gap-2">
              <DotsInput
                value={v}
                min={0}
                onChange={(val) => setBackgrounds((prev) => ({ ...prev, [k]: val }))}
                size="sm"
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

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-2">
        <h3 className="text-sm font-semibold">Notas</h3>
        <textarea
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
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
