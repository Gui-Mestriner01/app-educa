import { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  cor: string;
  corBorda: string;
  children: ReactNode;
  onPress?: () => void;
  raio?: number;
  altura?: number;
  /** Espessura da borda de baixo que dá o efeito 3D. */
  profundidade?: number;
  rotulo?: string;
  desativado?: boolean;
  style?: StyleProp<ViewStyle>;
  conteudoStyle?: StyleProp<ViewStyle>;
};

/**
 * Botão com borda inferior mais escura, no padrão das referências.
 * Ao tocar, a face desce e "afunda" — a criança sente que apertou algo.
 */
export function Botao3D({
  cor,
  corBorda,
  children,
  onPress,
  raio = 20,
  altura,
  profundidade = 5,
  rotulo,
  desativado,
  style,
  conteudoStyle,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desativado}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ disabled: !!desativado }}
      style={[{ borderRadius: raio, backgroundColor: corBorda, paddingBottom: profundidade }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            {
              backgroundColor: cor,
              borderRadius: raio,
              height: altura,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ translateY: pressed ? profundidade - 1 : 0 }],
            },
            conteudoStyle,
          ]}
        >
          {children}
        </View>
      )}
    </Pressable>
  );
}
