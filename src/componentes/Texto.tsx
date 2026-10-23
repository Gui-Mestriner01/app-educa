import { Text, TextProps } from 'react-native';
import { cores, fontes } from '../tema';

type Peso = keyof typeof fontes;

type Props = TextProps & {
  peso?: Peso;
  tamanho?: number;
  cor?: string;
  centro?: boolean;
};

/** Texto padrão do app, sempre na fonte Fredoka. */
export function Texto({ peso = 'media', tamanho = 16, cor = cores.texto, centro, style, ...resto }: Props) {
  return (
    <Text
      {...resto}
      style={[
        { fontFamily: fontes[peso], fontSize: tamanho, color: cor, textAlign: centro ? 'center' : undefined },
        style,
      ]}
    />
  );
}
