import { Animated, View } from 'react-native';
import Svg, { Ellipse, Path, Rect } from 'react-native-svg';
import { FIGURAS, NomeFigura } from '../figuras';
import { cores } from '../tema';
import { useEntrada, useFlutuar } from './useFlutuar';

export type Cenario = 'pasto' | 'lagoa' | 'pomar';

type Props = {
  cenario: Cenario;
  figura: NomeFigura;
  quantidade: number;
  altura?: number;
};

function Fundo({ cenario }: { cenario: Cenario }) {
  // viewBox esticável: o fundo se adapta a qualquer largura de tela
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute' }}>
      <Rect x={0} y={0} width={100} height={100} fill={cores.ceu} />
      {cenario === 'lagoa' ? (
        <>
          <Path d="M0 34 C 30 26, 70 28, 100 33 L100 100 L0 100 Z" fill={cores.grama} />
          <Ellipse cx={50} cy={70} rx={56} ry={30} fill="#5FB4DA" />
          <Ellipse cx={50} cy={68} rx={52} ry={27} fill={cores.agua} />
          <Ellipse cx={28} cy={60} rx={9} ry={1.6} fill="#FFFFFF" opacity={0.6} />
          <Ellipse cx={72} cy={80} rx={8} ry={1.4} fill="#FFFFFF" opacity={0.6} />
        </>
      ) : (
        <>
          <Path d="M0 46 C 25 36, 55 40, 75 45 C 88 48, 95 44, 100 42 L100 100 L0 100 Z" fill="#BFE8A6" />
          <Path d="M0 58 C 35 52, 70 54, 100 58 L100 100 L0 100 Z" fill={cores.grama} />
          {cenario === 'pomar' && (
            <>
              <Rect x={8} y={30} width={3} height={18} fill="#9A6B45" />
              <Ellipse cx={9.5} cy={28} rx={9} ry={11} fill="#5DB35E" />
              <Rect x={88} y={28} width={3} height={18} fill="#9A6B45" />
              <Ellipse cx={89.5} cy={26} rx={9} ry={11} fill="#5DB35E" />
            </>
          )}
        </>
      )}
    </Svg>
  );
}

function FiguraAnimada({ nome, tamanho, indice }: { nome: NomeFigura; tamanho: number; indice: number }) {
  const Figura = FIGURAS[nome];
  const flutuar = useFlutuar(4, 1400 + (indice % 3) * 220, indice * 180);
  const entrada = useEntrada(250 + indice * 110);
  return (
    <Animated.View style={entrada}>
      <Animated.View style={flutuar}>
        <Figura tamanho={tamanho} />
      </Animated.View>
    </Animated.View>
  );
}

/** Cena ilustrada do exercício: fundo + N figuras animadas. */
export function Cena({ cenario, figura, quantidade, altura }: Props) {
  const tamanho = quantidade <= 3 ? 96 : quantidade <= 6 ? 80 : 64;
  return (
    <View
      style={{ height: altura, flex: altura ? undefined : 1, borderRadius: 28, overflow: 'hidden', backgroundColor: cores.ceu }}
      accessible
      accessibilityLabel={`Cena com ${quantidade} ${figura}${quantidade === 1 ? '' : 's'}`}
    >
      <Fundo cenario={cenario} />
      <View style={{ position: 'absolute', right: 18, top: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFD84D' }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
          paddingHorizontal: 14,
          paddingTop: 30,
          gap: 4,
        }}
      >
        {Array.from({ length: quantidade }, (_, i) => (
          <FiguraAnimada key={i} nome={figura} tamanho={tamanho} indice={i} />
        ))}
      </View>
    </View>
  );
}
