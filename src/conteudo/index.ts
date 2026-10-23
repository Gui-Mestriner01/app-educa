import numerosBruto from './numeros.json';
import { Fase, Trilha, TrilhaSchema } from './schema';

/**
 * Carrega e valida o conteúdo. Se algum arquivo estiver errado,
 * o app quebra já na abertura, em desenvolvimento, com a mensagem do erro —
 * nunca no meio de uma fase na mão de uma criança.
 */
function carregar(bruto: unknown, nomeArquivo: string): Trilha {
  const r = TrilhaSchema.safeParse(bruto);
  if (!r.success) {
    const lista = r.error.issues.map((i) => `• ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Conteúdo inválido em ${nomeArquivo}:\n${lista}`);
  }
  return r.data;
}

export const TRILHAS: Trilha[] = [carregar(numerosBruto, 'numeros.json')];

export function buscarTrilha(id: string): Trilha | undefined {
  return TRILHAS.find((t) => t.id === id);
}

export function buscarFase(faseId: string): { trilha: Trilha; fase: Fase } | undefined {
  for (const trilha of TRILHAS) {
    const fase = trilha.fases.find((f) => f.id === faseId);
    if (fase) return { trilha, fase };
  }
  return undefined;
}

export { TrilhaSchema };
export type { Exercicio, Fase, Trilha } from './schema';
