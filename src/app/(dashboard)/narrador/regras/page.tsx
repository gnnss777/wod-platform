export default function RegrasPage() {
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">Regras Rápidas - WoD</h1>

      <Section title="Mecânica Básica (d10)">
        <p>Role um pool de dados d10 (Atributo + Habilidade). Cada dado que atinge ou supera a dificuldade conta como sucesso.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dificuldade padrão (V20):</strong> 6</li>
          <li><strong>Dificuldade V5:</strong> Fixa em 6</li>
          <li><strong>10:</strong> Conta como 2 sucessos</li>
          <li><strong>1:</strong> Se nenhum sucesso for rolado, é uma falha crítica (Botch)</li>
        </ul>
      </Section>

      <Section title="Tabela de Dificuldade (V20)">
        <div className="grid grid-cols-2 gap-1 text-sm">
          {[["3", "Muito fácil (quase automático)"],["4", "Fácil"],["5", "Moderada"],["6", "Padrão"],["7", "Desafiadora"],["8", "Difícil"],["9", "Muito difícil"],["10", "Quase impossível"]].map(([num, desc]) => (
            <div key={num} className="flex gap-2 border-b border-zinc-100 py-1 dark:border-zinc-800">
              <span className="font-bold w-6">{num}</span>
              <span className="text-zinc-600 dark:text-zinc-400">{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Níveis de Sucesso (V20)">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>1 sucesso:</strong> Sucesso marginal</li>
          <li><strong>2 sucessos:</strong> Sucesso completo</li>
          <li><strong>3 sucessos:</strong> Sucesso notável</li>
          <li><strong>4 sucessos:</strong> Sucesso excepcional</li>
          <li><strong>5+ sucessos:</strong> Sucesso fenomenal</li>
        </ul>
      </Section>

      <Section title="V5 - Críticos e Falhas Bestiais">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Crítico:</strong> 2 ou mais dezenas no pool total + pelo menos 2 sucessos</li>
          <li><strong>Crítico Sangrento:</strong> Crítico + pelo menos 1 dado de fome com 10</li>
          <li><strong>Falha Bestial:</strong> Nenhum sucesso + pelo menos 1 dado de fome com resultado 1</li>
        </ul>
      </Section>

      <Section title="Tipos de Dano">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Contusão (Bashing):</strong> Socos, porretes. Cura-se em 1 hora por nível</li>
          <li><strong>Letal:</strong> Facas, balas. Cura-se em 1 dia por nível</li>
          <li><strong>Agravado:</strong> Fogo, luz solar, garras. Cura-se em 1 semana por nível</li>
        </ul>
      </Section>

      <Section title="Níveis de Saúde">
        <div className="grid grid-cols-2 gap-1 text-sm">
          {[
            ["Machucado (-0)", "Pequenos arranhões"],
            ["Arranhado (-1)", "Levemente ferido"],
            ["Ferido (-1)", "Machucado"],
            ["Machucado (-2)", "Seriamente ferido"],
            ["Espancado (-2)", "Muito ferido"],
            ["Aleijado (-5)", "Mal conseguindo se mover"],
            ["Incapacitado", "Inconsciente / Fora de combate"],
          ].map(([level, desc]) => (
            <div key={level} className="flex gap-2 border-b border-zinc-100 py-1 dark:border-zinc-800">
              <span className="font-bold text-xs w-28">{level}</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Força de Vontade">
        <ul className="list-disc pl-5 space-y-1">
          <li>Gaste 1 ponto para adicionar 3 dados a uma rolagem (antes de rolar)</li>
          <li>Gaste 1 ponto para ativar certos poderes</li>
          <li>Recuperação: 1 ponto por dia de descanso, ou a critério do Mestre</li>
          <li>Natureza/Comportamento: role sua natureza para recuperar todos os pontos</li>
        </ul>
      </Section>

      <Section title="Sistema de Rolagem (V20)">
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded p-3 text-sm font-mono">
          <p>Rolagem: Atributo + Habilidade vs Dificuldade</p>
          <p className="text-zinc-500 mt-1">Ex: Força 3 + Briga 4 = 7 dados vs dificuldade 6</p>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold border-b border-zinc-200 pb-1 dark:border-zinc-800">
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </section>
  );
}
