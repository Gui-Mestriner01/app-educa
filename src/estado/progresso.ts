import { create } from 'zustand';
import { Trilha } from '../conteudo';

/**
 * Progresso da criança: estrelas por fase.
 * Por enquanto fica só na memória — some ao fechar o app.
 * Próximo passo: salvar no SQLite do aparelho (expo-sqlite).
 */
type EstadoProgresso = {
  estrelasPorFase: Record<string, number>;
  registrar: (faseId: string, estrelas: number) => void;
};

export const useProgresso = create<EstadoProgresso>((set) => ({
  estrelasPorFase: {},
  registrar: (faseId, estrelas) =>
    set((s) => ({
      // guarda sempre a melhor nota da fase
      estrelasPorFase: { ...s.estrelasPorFase, [faseId]: Math.max(estrelas, s.estrelasPorFase[faseId] ?? 0) },
    })),
}));

export function totalEstrelas(estrelas: Record<string, number>) {
  return Object.values(estrelas).reduce((a, b) => a + b, 0);
}

export type SituacaoFase = 'feita' | 'atual' | 'bloqueada';

/** A primeira fase sem estrela é a atual; as depois dela ficam bloqueadas. */
export function situacoesDaTrilha(trilha: Trilha, estrelas: Record<string, number>): SituacaoFase[] {
  let achouAtual = false;
  return trilha.fases.map((f) => {
    if ((estrelas[f.id] ?? 0) > 0) return 'feita';
    if (!achouAtual) {
      achouAtual = true;
      return 'atual';
    }
    return 'bloqueada';
  });
}

/** 3 estrelas: tudo certo de primeira. 2: pelo menos 60%. 1: terminou. */
export function calcularEstrelas(acertosDePrimeira: number, total: number) {
  if (total === 0) return 0;
  const taxa = acertosDePrimeira / total;
  if (taxa >= 1) return 3;
  if (taxa >= 0.6) return 2;
  return 1;
}
