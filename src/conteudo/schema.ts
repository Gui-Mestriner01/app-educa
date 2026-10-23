import { z } from 'zod';

/**
 * O formato de todo exercício do app.
 * Exercício novo = arquivo de dados novo, sem programar nada.
 * Se um arquivo vier errado, o Zod recusa antes de a criança ver.
 */

export const NOMES_FIGURA = [
  'ovelha',
  'patinho',
  'laranja',
  'sapo',
  'pintinho',
  'abelha',
  'banana',
  'cachorro',
  'gato',
  'vaca',
  'porco',
  'peixe',
  'uva',
  'elefante',
  'ioio',
] as const;
export const CENARIOS = ['pasto', 'lagoa', 'pomar'] as const;
export const NOMES_FORMA = ['circulo', 'quadrado', 'triangulo', 'retangulo', 'estrela', 'coracao', 'losango'] as const;
export const NOMES_COR = ['vermelho', 'azul', 'amarelo', 'verde', 'roxo', 'laranja', 'rosa'] as const;

/** Uma coisa que aparece na tela: número, texto, bichinho, forma ou um grupinho de bichinhos. */
export const VisualSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('numero'), valor: z.string().min(1) }),
  z.object({ tipo: z.literal('texto'), valor: z.string().min(1) }),
  z.object({ tipo: z.literal('figura'), figura: z.enum(NOMES_FIGURA) }),
  z.object({ tipo: z.literal('forma'), forma: z.enum(NOMES_FORMA), cor: z.enum(NOMES_COR) }),
  z.object({ tipo: z.literal('grupo'), figura: z.enum(NOMES_FIGURA), quantidade: z.number().int().min(1).max(9) }),
]);

/** O que fica no palco, no meio da tela, enquanto a criança pensa. */
export const MostrarSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('cena'),
    cenario: z.enum(CENARIOS),
    figura: z.enum(NOMES_FIGURA),
    quantidade: z.number().int().min(0).max(10),
  }),
  /** Bichinho grande. `palavra` aparece embaixo; "_" vira um quadradinho com "?". */
  z.object({ tipo: z.literal('figura'), figura: z.enum(NOMES_FIGURA), palavra: z.string().optional() }),
  z.object({ tipo: z.literal('letra'), letra: z.string().min(1).max(2) }),
  z.object({ tipo: z.literal('forma'), forma: z.enum(NOMES_FORMA), cor: z.enum(NOMES_COR) }),
  /** Fileira de coisas terminando num "?" — o que vem depois? */
  z.object({ tipo: z.literal('sequencia'), itens: z.array(VisualSchema).min(2).max(6) }),
  /** Balão com um som, tipo "MUUU!". */
  z.object({ tipo: z.literal('som'), texto: z.string().min(1) }),
  /** O Pipo esperando, quando a pergunta já diz tudo (ex.: "Toque no círculo"). */
  z.object({ tipo: z.literal('pipo'), fala: z.string().optional() }),
]);

const Comum = {
  id: z.string().min(1),
  habilidade: z.string().min(1),
  enunciado: z.string().min(1),
  /** O que o Pipo fala em voz alta. Se faltar, ele lê o enunciado. */
  fala: z.string().optional(),
};

/** Escolher uma resposta entre 2 e 4. */
const EscolherSchema = z.object({
  ...Comum,
  formato: z.literal('escolher'),
  mostrar: MostrarSchema,
  opcoes: z.array(z.intersection(VisualSchema, z.object({ correta: z.boolean() }))).min(2).max(4),
});

/** Achar e tocar em todos os itens certos no meio dos outros. */
const TocarTodosSchema = z.object({
  ...Comum,
  formato: z.literal('tocar-todos'),
  itens: z.array(z.intersection(VisualSchema, z.object({ alvo: z.boolean() }))).min(3).max(9),
});

export const ExercicioSchema = z.discriminatedUnion('formato', [EscolherSchema, TocarTodosSchema]).superRefine((ex, ctx) => {
  if (ex.formato === 'tocar-todos') {
    const alvos = ex.itens.filter((i) => i.alvo).length;
    if (alvos === 0 || alvos === ex.itens.length) {
      ctx.addIssue({ code: 'custom', message: `${ex.id}: precisa ter itens certos e itens errados misturados` });
    }
    return;
  }
  const corretas = ex.opcoes.filter((o) => o.correta);
  if (corretas.length !== 1) {
    ctx.addIssue({ code: 'custom', message: `${ex.id}: precisa ter exatamente uma opção correta (tem ${corretas.length})` });
    return;
  }
  // em exercício de contagem, a resposta certa tem que bater com o que está desenhado
  const certa = corretas[0];
  if (ex.habilidade.startsWith('contar') && ex.mostrar.tipo === 'cena' && (certa.tipo !== 'numero' || certa.valor !== String(ex.mostrar.quantidade))) {
    ctx.addIssue({
      code: 'custom',
      message: `${ex.id}: a cena tem ${ex.mostrar.quantidade}, mas a resposta marcada como certa é outra`,
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

export type Visual = z.infer<typeof VisualSchema>;
export type Mostrar = z.infer<typeof MostrarSchema>;
export type Exercicio = z.infer<typeof ExercicioSchema>;
export type ExercicioEscolher = Extract<Exercicio, { formato: 'escolher' }>;
export type ExercicioTocarTodos = Extract<Exercicio, { formato: 'tocar-todos' }>;
export type Fase = z.infer<typeof FaseSchema>;
export type Trilha = z.infer<typeof TrilhaSchema>;
export type NomeForma = (typeof NOMES_FORMA)[number];
export type NomeCor = (typeof NOMES_COR)[number];
