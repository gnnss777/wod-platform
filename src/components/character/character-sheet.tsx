import Link from "next/link";
import {
  V20_ATTRIBUTES,
  V20_TALENTS,
  V20_SKILLS,
  V20_KNOWLEDGES,
  V5_ATTRIBUTES,
  V5_PHYSICAL_SKILLS,
  V5_SOCIAL_SKILLS,
  V5_MENTAL_SKILLS,
  LABELS,
} from "@/lib/character-utils";
import { DotsInput } from "./dots-input";
import { AttrGroup } from "./attr-row";
import { AbilityCol } from "./ability-col";

export type CharacterData = {
  id: string;
  name: string;
  edition: string;
  status?: string;
  concept: string | null;
  nature: string | null;
  demeanor: string | null;
  clan: string | null;
  generation: number | null;
  sect: string | null;
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
  player: { name: string };
  chronicle: { name: string } | null;
  attributes: Record<string, number>;
  abilities: Record<string, number>;
  powers: Record<string, number>;
  backgrounds: Record<string, number>;
  willpower: Record<string, number>;
  health: Record<string, number>;
  morality: Record<string, unknown>;
  pool: Record<string, unknown>;
  experience: Record<string, number>;
  notes: string | null;
};

export function CharacterSheet({
  char,
  isOwner,
  canEdit,
}: {
  char: CharacterData;
  isOwner: boolean;
  canEdit?: boolean;
}) {
  const attrStructure = char.edition === "V5" ? V5_ATTRIBUTES : V20_ATTRIBUTES;
  const abilityGroups =
    char.edition === "V5"
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

  const hp = char.health as { max: number; bashing: number; lethal: number; aggravated: number };
  const wp = char.willpower as { rating: number; current: number };
  const xp = char.experience as { total: number; spent: number };
  const mor = char.morality as { type: string; rating: number };
  const pool = char.pool as { type: string; rating: number; current: number };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{char.name}</h1>
          <p className="text-sm text-zinc-500">
            {char.concept && `${char.concept} · `}
            {char.player.name}
            {char.chronicle && ` · ${char.chronicle.name}`}
            {char.clan && ` · ${char.clan}`}
            {char.generation && ` · Geração ${char.generation}`}
          </p>
          <div className="flex gap-1.5 mt-1">
            <span className="rounded bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase dark:bg-zinc-800">
              {char.edition}
            </span>
            {char.status && (
              <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                char.status === "APROVADO" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                char.status === "PENDENTE" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
              }`}>
                {char.status === "APROVADO" ? "Aprovado" : char.status === "PENDENTE" ? "Pendente" : "Rascunho"}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && char.status !== "PENDENTE" && (
            <form action={async () => {
              "use server";
              const { submitCharacterForApproval } = await import("@/app/actions/jogadores");
              await submitCharacterForApproval(char.id);
            }}>
              <button
                type="submit"
                className="rounded-lg border border-yellow-300 px-3 py-1.5 text-xs text-yellow-700 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
              >
                Solicitar Aprovação
              </button>
            </form>
          )}
          {(isOwner || canEdit) && (
            <Link
              href={`/jogador/fichas/${char.id}/editar`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Editar
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-semibold">Informações Vampíricas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {char.sire ? <div><span className="text-zinc-500">Sire:</span> {char.sire}</div> : <div className="text-zinc-400 italic">Sire não informado</div>}
          {char.ambition ? <div><span className="text-zinc-500">Ambição:</span> {char.ambition}</div> : <div className="text-zinc-400 italic">Ambição não informada</div>}
          {char.desire ? <div><span className="text-zinc-500">Desejo:</span> {char.desire}</div> : <div className="text-zinc-400 italic">Desejo não informado</div>}
          {char.predatorType ? <div><span className="text-zinc-500">Predador:</span> {char.predatorType}</div> : <div className="text-zinc-400 italic">Tipo não informado</div>}
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">Aparência</h3>
          {char.appearance ? (
            <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.appearance}</p>
          ) : (
            <p className="text-sm text-zinc-400 italic">Nenhuma descrição física adicionada.</p>
          )}
        </div>
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">Personalidade</h3>
          {char.personality ? (
            <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.personality}</p>
          ) : (
            <p className="text-sm text-zinc-400 italic">Nenhuma descrição de personalidade adicionada.</p>
          )}
        </div>
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
          <h3 className="text-sm font-semibold mb-2">História</h3>
          {char.history ? (
            <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.history}</p>
          ) : (
            <p className="text-sm text-zinc-400 italic">Nenhuma história adicionada.</p>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="text-sm font-semibold mb-2">Objetivos</h3>
            {char.goals ? (
              <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.goals}</p>
            ) : (
              <p className="text-sm text-zinc-400 italic">Nenhum objetivo adicionado.</p>
            )}
          </div>
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="text-sm font-semibold mb-2">Fraquezas</h3>
            {char.weakness ? (
              <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.weakness}</p>
            ) : (
              <p className="text-sm text-zinc-400 italic">Nenhuma fraqueza adicionada.</p>
            )}
          </div>
        </div>
        {char.edition === "V5" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
              <h3 className="text-sm font-semibold mb-2">Touchstones</h3>
              {char.touchstones ? (
                <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.touchstones}</p>
              ) : (
                <p className="text-sm text-zinc-400 italic">Nenhum touchstone adicionado.</p>
              )}
            </div>
            <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
              <h3 className="text-sm font-semibold mb-2">Convicções</h3>
              {char.convictions ? (
                <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.convictions}</p>
              ) : (
                <p className="text-sm text-zinc-400 italic">Nenhuma convicção adicionada.</p>
              )}
            </div>
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="text-sm font-semibold mb-2">Aliados e Contatos</h3>
            {char.alliesContacts ? (
              <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.alliesContacts}</p>
            ) : (
              <p className="text-sm text-zinc-400 italic">Nenhum aliado ou contato adicionado.</p>
            )}
          </div>
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="text-sm font-semibold mb-2">Posses</h3>
            {char.possessions ? (
              <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">{char.possessions}</p>
            ) : (
              <p className="text-sm text-zinc-400 italic">Nenhuma posse adicionada.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-semibold">Atributos</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {Object.entries(attrStructure).map(([group, keys]) => (
              <AttrGroup
                key={group}
                title={
                  group === "physical"
                    ? "Físicos"
                    : group === "social"
                      ? "Sociais"
                      : "Mentais"
                }
                keys={keys}
                values={char.attributes}
                readonly
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-semibold">Habilidades</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {abilityGroups.map((g) => (
              <AbilityCol
                key={g.title}
                title={g.title}
                keys={g.keys}
                values={char.abilities}
                readonly
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MiniCard title="Saúde" value={`${hp.bashing}/${hp.lethal}/${hp.aggravated}`} subtitle={`Máx ${hp.max}`} />
        <MiniCard title="Força de Vontade" value={`${wp.current}/${wp.rating}`} />
        <MiniCard title={mor.type as string} value={`${mor.rating}`} />
        <MiniCard title={pool.type as string} value={`${pool.current}/${pool.rating}`} />
        <MiniCard title="Experiência" value={`${xp.spent}/${xp.total}`} subtitle="Gasto/Total" />
      </div>

      {Object.keys(char.powers).length > 0 && (
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-semibold">Poderes / Disciplinas</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(char.powers).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-xs capitalize">{k}</span>
                <DotsInput value={v as number} readonly size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(char.backgrounds).length > 0 && (
        <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-semibold">Antecedentes</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(char.backgrounds).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-xs capitalize">{LABELS[k] ?? k}</span>
                <DotsInput value={v as number} readonly size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 space-y-2">
        <h3 className="text-sm font-semibold">Notas</h3>
        {char.notes ? (
          <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {char.notes}
          </p>
        ) : (
          <p className="text-sm text-zinc-400 italic">Nenhuma nota adicionada.</p>
        )}
      </div>
    </div>
  );
}

function MiniCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
        {title}
      </p>
      <p className="text-lg font-bold mt-0.5">{value}</p>
      {subtitle && (
        <p className="text-[10px] text-zinc-500">{subtitle}</p>
      )}
    </div>
  );
}
