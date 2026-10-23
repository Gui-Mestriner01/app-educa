import { View } from 'react-native';
import { Visual as TipoVisual } from '../conteudo/schema';
import { FIGURAS, NOME_FIGURA } from '../figuras';
import { Forma, NOME_FORMA } from './Forma';
import { Texto } from './Texto';

export const CORES_NUMERO = ['#7A5AE6', '#D6417F', '#2E86C8', '#22702F'];
const CORES_BOLINHA = ['#D7CCF8', '#F9C6DB', '#C6E2F7', '#C9E8CF'];

/** Bolinhas embaixo do número: a criança que ainda não lê o algarismo conta as bolinhas. */
function Bolinhas({ quantidade, cor }: { quantidade: number; cor: string }) {
  if (!Number.isFinite(quantidade) || quantidade <= 0) return null;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 64 }}>
      {Array.from({ length: Math.min(quantidade, 10) }, (_, i) => (
        <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cor }} />
      ))}
    </View>
  );
}

type Props = {
  v: TipoVisual;
  /** Tamanho de referência, em pixels. */
  tamanho: number;
  /** Escolhe a cor do número/texto, para cada cartão ter a sua. */
  indice?: number;
  bolinhas?: boolean;
};

/** Desenha qualquer "coisa" do conteúdo: número, texto, bichinho, forma ou grupinho. */
export function Visual({ v, tamanho, indice = 0, bolinhas = true }: Props) {
  const cor = CORES_NUMERO[indice % CORES_NUMERO.length];
  switch (v.tipo) {
    case 'numero':
      return (
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Texto peso="negrito" tamanho={tamanho * 0.62} cor={cor} style={{ lineHeight: tamanho * 0.7 }}>
            {v.valor}
          </Texto>
          {bolinhas && <Bolinhas quantidade={Number(v.valor)} cor={CORES_BOLINHA[indice % CORES_BOLINHA.length]} />}
        </View>
      );
    case 'texto': {
      const curto = v.valor.length <= 2;
      return (
        <Texto peso="negrito" tamanho={curto ? tamanho * 0.62 : Math.min(tamanho * 0.3, 26)} cor={cor} style={{ lineHeight: curto ? tamanho * 0.72 : undefined }}>
          {v.valor}
        </Texto>
      );
    }
    case 'figura': {
      const Figura = FIGURAS[v.figura];
      return <Figura tamanho={tamanho} />;
    }
    case 'forma':
      return <Forma forma={v.forma} cor={v.cor} tamanho={tamanho * 0.86} />;
    case 'grupo': {
      const Figura = FIGURAS[v.figura];
      const t = v.quantidade <= 2 ? tamanho * 0.42 : v.quantidade <= 4 ? tamanho * 0.34 : tamanho * 0.28;
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', maxWidth: tamanho * 1.05 }}>
          {Array.from({ length: v.quantidade }, (_, i) => (
            <Figura key={i} tamanho={t} />
          ))}
        </View>
      );
    }
  }
}

/** Descrição em palavras, para leitor de tela e testes. */
export function descrever(v: TipoVisual): string {
  switch (v.tipo) {
    case 'numero':
    case 'texto':
      return v.valor;
    case 'figura':
      return NOME_FIGURA[v.figura];
    case 'forma':
      return `${NOME_FORMA[v.forma]} ${v.cor}`;
    case 'grupo':
      return `${v.quantidade} ${NOME_FIGURA[v.figura]}`;
  }
}
