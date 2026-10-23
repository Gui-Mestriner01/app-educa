import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { cores } from '../tema';

type Props = { valor: number; cor?: string; fundo?: string; altura?: number };

/** Barra que enche suavemente quando o valor (0 a 1) muda. */
export function BarraProgresso({ valor, cor = cores.amarelo, fundo = '#EDE5D3', altura = 14 }: Props) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // largura em porcentagem não roda no driver nativo
    Animated.timing(anim, { toValue: Math.max(0, Math.min(1, valor)), duration: 500, useNativeDriver: false }).start();
  }, [valor, anim]);

  const largura = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={{ height: altura, borderRadius: 999, backgroundColor: fundo, overflow: 'hidden' }}>
      <Animated.View style={{ width: largura, height: altura, borderRadius: 999, backgroundColor: cor }}>
        <View
          style={{
            position: 'absolute',
            left: 6,
            right: 6,
            top: 3,
            height: 3,
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.45)',
          }}
        />
      </Animated.View>
    </View>
  );
}
