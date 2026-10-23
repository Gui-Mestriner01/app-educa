import { z } from 'zod';

/**
 * O formato de todo exercício do app.
 * Exercício novo = arquivo de dados novo, sem programar nada.
 * Se um arquivo vier errado, o Zod recusa antes de a criança ver.
 */

export const NOMES_FIGURA = ['ovelha', 'patinho', 'laranja', 'sapo', 'pintinho'] as const;
export const CENARIOS = ['pasto', 'lagoa', 'pomar'] as const;

const Opcao = z.object({
  valor: z.string().min(1),
  correta: z.boolean(),
});

export const ExercicioSchema = z
  .object({
    id: z.string().min(1),
    formato: z.literal('escolher'),
    habilidade: z.string().min(1),
    enunciado: z.string().min(1),
    cena: z.object({
      cenario: z.enum(CENARIOS),
      figura: z.enum(NOMES_FIGURA),
      quantidade: z.number().int().min(0).max(10),
    }),
    opcoes: z.array(Opcao).min(2).max(4),
  })
  .superRefine((ex, ctx) => {
    const corretas = ex.opcoes.filter((o) => o.correta);
    if (corretas.length !== 1) {
      ctx.addIssue({ code: 'custom', message: `${ex.id}: precisa ter exatamente uma opção correta (tem ${corretas.length})` });
      return;
    }
    // em exercício de contagem, a resposta certa tem que bater com o que está desenhado
    if (ex.habilidade.startsWith('contar') && corretas[0].valor !== String(ex.cena.quantidade)) {
      ctx.addIssue({
        code: 'custom',
        message: `${ex.id}: a cena tem ${ex.cena.quantidade}, mas a resposta marcada como certa é ${corretas[0].valor}`,
      });
    }
  });

export const FaseSchema = z.object({
  id: z.string().min(1),
  numero: z.number().int().min(1),
  titulo: z.string().min(1),
  exercicios: z.array(ExercicioSchema).min(1),
});

export const TrilhaSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
  descricao: z.string(),
  fases: z.array(FaseSchema).min(1),
});

export type Exercicio = z.infer<typeof ExercicioSchema>;
export type Fase = z.infer<typeof FaseSchema>;
export type Trilha = z.infer<typeof TrilhaSchema>;
