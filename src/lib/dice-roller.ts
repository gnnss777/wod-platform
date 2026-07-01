export type DieResult = {
  value: number;
  isHunger: boolean;
  success: boolean;
  critical: boolean;
};

export type RollResult = {
  pool: number;
  difficulty: number;
  hungerDice: number;
  dice: DieResult[];
  successes: number;
  tens: number;
  ones: number;
  botch: boolean;
  critical: boolean;
  messyCritical: boolean;
  bestialFailure: boolean;
  label: string;
};

function rng() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return (buf[0] & 0x7fffffff) / 0x7fffffff;
}

function d10() {
  return Math.floor(rng() * 10) + 1;
}

function isSuccess(val: number, difficulty: number) {
  return val >= difficulty;
}

export function rollV20(pool: number, difficulty = 6): RollResult {
  const dice: DieResult[] = Array.from({ length: pool }, () => ({
    value: d10(),
    isHunger: false,
    success: false,
    critical: false,
  }));

  let successes = 0;
  let tens = 0;
  let ones = 0;

  for (const d of dice) {
    d.success = isSuccess(d.value, difficulty);
    if (d.value === 10) {
      d.critical = true;
      successes += 2;
      tens++;
    } else if (d.success) {
      successes++;
    }
    if (d.value === 1) ones++;
  }

  const botch = successes === 0 && ones > 0;
  const critical = successes >= 5;

  return {
    pool,
    difficulty,
    hungerDice: 0,
    dice,
    successes,
    tens,
    ones,
    botch,
    critical,
    messyCritical: false,
    bestialFailure: false,
    label: botch ? "Falha Crítica (Botch)!" : successes === 0 ? "Falha" : successes < 3 ? "Sucesso" : successes < 5 ? "Sucesso Notável" : "Sucesso Excepcional!",
  };
}

export function rollV5(pool: number, hunger: number): RollResult {
  const normalDice = pool - hunger;
  const dice: DieResult[] = [];

  for (let i = 0; i < normalDice; i++) {
    dice.push({ value: d10(), isHunger: false, success: false, critical: false });
  }
  for (let i = 0; i < hunger; i++) {
    dice.push({ value: d10(), isHunger: true, success: false, critical: false });
  }

  let successes = 0;
  let tens = 0;
  let ones = 0;
  let hungerTens = 0;
  let hungerOnes = 0;

  for (const d of dice) {
    d.success = isSuccess(d.value, 6);
    if (d.value === 10) {
      d.critical = true;
      successes += 2;
      tens++;
      if (d.isHunger) hungerTens++;
    } else if (d.success) {
      successes++;
    }
    if (d.value === 1) {
      ones++;
      if (d.isHunger) hungerOnes++;
    }
  }

  const crit = successes >= 2 && tens >= 2;
  const messyCritical = crit && hungerTens > 0;
  const bestialFailure = successes === 0 && hungerOnes > 0;
  const botch = successes === 0 && ones > 0;
  const critical = crit;

  return {
    pool,
    difficulty: 6,
    hungerDice: hunger,
    dice,
    successes,
    tens,
    ones,
    botch,
    critical,
    messyCritical,
    bestialFailure,
    label: bestialFailure ? "Falha Bestial!" : botch ? "Falha Crítica (Botch)!" : successes === 0 ? "Falha" : messyCritical ? "Crítico Sangrento!" : critical ? "Crítico!" : successes < 3 ? "Sucesso" : successes < 5 ? "Sucesso Notável" : "Sucesso Excepcional!",
  };
}
