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
  const [clan, setClan] = useState("");
  const [nature, setNature] = useState("");
  const [demeanor, setDemeanor] = useState("");
  const [sire, setSire] = useState("");
  const [generation, setGeneration] = useState("");
  const [ambition, setAmbition] = useState("");
  const [desire, setDesire] = useState("");
  const [predatorType, setPredatorType] = useState("");
  const [age, setAge] = useState("");
  const [apparentAge, setApparentAge] = useState("");
  const [appearance, setAppearance] = useState("");
  const [personality, setPersonality] = useState("");
  const [history, setHistory] = useState("");
  const [goals, setGoals] = useState("");
  const [weakness, setWeakness] = useState("");
  const [touchstones, setTouchstones] = useState("");
  const [convictions, setConvictions] = useState("");
  const [alliesContacts, setAlliesContacts] = useState("");
  const [possessions, setPossessions] = useState("");
  const [notes, setNotes] = useState("");
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

  const isV5 = edition === "V5";

  function switchEdition(ed: "V5" | "V20") {
    setEdition(ed);
    setAttributes(buildDefaultAttributes(ed));
    setAbilities(buildDefaultAbilities(ed));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await createCharacter({
      name, concept, edition, clan, nature, demeanor, sire,
      generation: generation ? parseInt(generation) : undefined,
      ambition: ambition || undefined,
      desire: desire || undefined,
      predatorType: predatorType || undefined,
      age: age ? parseInt(age) : undefined,
      apparentAge: apparentAge ? parseInt(apparentAge) : undefined,
      appearance: appearance || undefined,
      personality: personality || undefined,
      history: history || undefined,
      goals: goals || undefined,
      weakness: weakness || undefined,
      touchstones: touchstones || undefined,
      convictions: convictions || undefined,
      alliesContacts: alliesContacts || undefined,
      possessions: possessions || undefined,
      notes: notes || undefined,
    });
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

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Identificação</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input id="name" label="Nome do Personagem" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Marcus Blackwood" required />
          <Input id="concept" label="Conceito" value={concept} onChange={(e) => setConcept(e.target.value)} placeholder="Ex: Detetive das ruas" />
          {!isV5 && (
            <>
              <Input id="nature" label="Natureza" value={nature} onChange={(e) => setNature(e.target.value)} />
              <Input id="demeanor" label="Comportamento" value={demeanor} onChange={(e) => setDemeanor(e.target.value)} />
            </>
          )}
          <Input id="clan" label={isV5 ? "Clã" : "Clã / Tradição / Tribo"} value={clan} onChange={(e) => setClan(e.target.value)} />
          <Input id="sire" label="Criador (Sire)" value={sire} onChange={(e) => setSire(e.target.value)} placeholder="Quem te criou?" />
          <Input id="generation" label="Geração" type="number" value={generation} onChange={(e) => setGeneration(e.target.value)} />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Informações Vampíricas</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {isV5 && (
            <>
              <Input id="ambition" label="Ambição" value={ambition} onChange={(e) => setAmbition(e.target.value)} placeholder="Curto prazo" />
              <Input id="desire" label="Desejo" value={desire} onChange={(e) => setDesire(e.target.value)} placeholder="Longo prazo" />
              <Input id="predatorType" label="Tipo de Predador" value={predatorType} onChange={(e) => setPredatorType(e.target.value)} placeholder="Alleycat, Bagger..." />
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-semibold">Aparência Física</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <Input id="age" label="Idade Real" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input id="apparentAge" label="Aparenta" type="number" value={apparentAge} onChange={(e) => setApparentAge(e.target.value)} />
        </div>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={4} value={appearance} onChange={(e) => setAppearance(e.target.value)} placeholder="Descrição física do personagem..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Personalidade</h3>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={4} value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Traços de personalidade, maneirismos, medos..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">História e Background</h3>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={6} value={history} onChange={(e) => setHistory(e.target.value)} placeholder="História do personagem antes e depois da morte..." />
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Objetivos e Fraquezas</h3>
        <div className="space-y-3">
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="Objetivos do personagem..." />
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={weakness} onChange={(e) => setWeakness(e.target.value)} placeholder="Fraquezas e vulnerabilidades..." />
        </div>
      </div>

      {isV5 && (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-semibold">Convicções e Touchstones (V5)</h3>
          <div className="space-y-3">
            <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={touchstones} onChange={(e) => setTouchstones(e.target.value)} placeholder="Pontos de contato humano..." />
            <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={convictions} onChange={(e) => setConvictions(e.target.value)} placeholder="Convicções pessoais..." />
          </div>
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Aliados, Posses e Contatos</h3>
        <div className="space-y-3">
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={alliesContacts} onChange={(e) => setAlliesContacts(e.target.value)} placeholder="Aliados, contatos, recursos..." />
          <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={3} value={possessions} onChange={(e) => setPossessions(e.target.value)} placeholder="Posses e equipamentos..." />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Notas</h3>
        <textarea className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas do jogador sobre o personagem..." />
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
