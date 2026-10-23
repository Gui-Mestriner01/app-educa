import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import Svg, { Ellipse, G, Path, Rect, Circle } from 'react-native-svg';
import { useFlutuar } from '../componentes/useFlutuar';

export type Expressao = 'neutro' | 'acenando' | 'feliz' | 'opa' | 'comemorando';

type Props = {
  expressao?: Expressao;
  tamanho?: number;
  /** Mostra só a cabeça — para avatares pequenos. */
  soCabeca?: boolean;
  animado?: boolean;
  corSombra?: string;
};

const PELO = '#D29760';
const PELO_CORPO = '#C68755';
const MEMBRO = '#BF8150';
const ORELHA = '#AF743C';
const ORELHA_IN = '#8F5A2E';
const OLHO = '#3A2718';
const FOCINHO = '#EBC9A2';
const NARIZ = '#7A4A28';
const BARRIGA = '#E0AC7C';

/**
 * Pipo, a capivara — versão "bobinha" das telas.
 * Pisca sozinho, flutua de leve e muda de expressão por prop.
 */
export function Pipo({ expressao = 'neutro', tamanho = 120, soCabeca = false, animado = true, corSombra = '#000000' }: Props) {
  const [piscando, setPiscando] = useState(false);
  const [bracoAlto, setBracoAlto] = useState(false);
  const flutuar = useFlutuar(soCabeca ? 2 : 5, 1600);

  // piscada: a cada ~4s fecha os olhos por 150ms
  useEffect(() => {
    if (!animado) return;
    let fechar: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      setPiscando(true);
      fechar = setTimeout(() => setPiscando(false), 150);
    }, 3800 + Math.round(Math.random() * 800));
    return () => {
      clearInterval(id);
      if (fechar) clearTimeout(fechar);
    };
  }, [animado]);

  // aceno: o braço alterna entre duas posições, como desenho animado
  useEffect(() => {
    if (!animado || expressao !== 'acenando') return;
    const id = setInterval(() => setBracoAlto((b) => !b), 320);
    return () => clearInterval(id);
  }, [animado, expressao]);

  const olhosArco = expressao === 'feliz' || expressao === 'comemorando';
  const bocaAberta = expressao === 'feliz' || expressao === 'comemorando' || expressao === 'acenando';

  const viewBox = soCabeca ? '6 4 88 74' : '-8 -2 116 102';
  const proporcao = soCabeca ? 74 / 88 : 102 / 116;

  const cabeca = (
    <G>
      <Ellipse cx={20} cy={19} rx={10.5} ry={9} fill={ORELHA} />
      <Ellipse cx={20} cy={20} rx={5} ry={4} fill={ORELHA_IN} />
      <Ellipse cx={80} cy={19} rx={10.5} ry={9} fill={ORELHA} />
      <Ellipse cx={80} cy={20} rx={5} ry={4} fill={ORELHA_IN} />
      <Rect x={13} y={12} width={74} height={60} rx={27} fill={PELO} />
      <Ellipse cx={23} cy={52} rx={7} ry={4.3} fill="#ED8A78" opacity={olhosArco ? 0.7 : 0.5} />
      <Ellipse cx={77} cy={52} rx={7} ry={4.3} fill="#ED8A78" opacity={olhosArco ? 0.7 : 0.5} />

      {olhosArco ? (
        <G>
          <Path d="M29 41 C 32 34, 38 34, 41 41" stroke={OLHO} strokeWidth={4} fill="none" strokeLinecap="round" />
          <Path d="M59 41 C 62 34, 68 34, 71 41" stroke={OLHO} strokeWidth={4} fill="none" strokeLinecap="round" />
        </G>
      ) : piscando ? (
        <G>
          <Path d="M29 40 H41" stroke={OLHO} strokeWidth={3.2} strokeLinecap="round" />
          <Path d="M59 40 H71" stroke={OLHO} strokeWidth={3.2} strokeLinecap="round" />
        </G>
      ) : (
        <G>
          <Ellipse cx={35} cy={39} rx={6.4} ry={7.4} fill={OLHO} />
          <Ellipse cx={65} cy={39} rx={6.4} ry={7.4} fill={OLHO} />
          <Circle cx={37.3} cy={36} r={2.2} fill="#FFFFFF" />
          <Circle cx={67.3} cy={36} r={2.2} fill="#FFFFFF" />
        </G>
      )}

      {expressao === 'opa' && (
        <G>
          <Path d="M27 28 C 31 25, 38 26, 41 29" stroke="#A5703F" strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M73 28 C 69 25, 62 26, 59 29" stroke="#A5703F" strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      )}

      <Ellipse cx={50} cy={57} rx={18} ry={13} fill={FOCINHO} />
      <Ellipse cx={50} cy={51} rx={6} ry={4} fill={NARIZ} />

      {expressao === 'opa' ? (
        <Ellipse cx={50} cy={63} rx={3.4} ry={4.4} fill={NARIZ} />
      ) : bocaAberta ? (
        <G>
          <Path d="M40 57 C 43 69, 57 69, 60 57 C 54 61, 46 61, 40 57 Z" fill={NARIZ} />
          <Path d="M45 64.5 C 47 67.5, 53 67.5, 55 64.5 C 52 63, 48 63, 45 64.5 Z" fill="#E8798C" />
        </G>
      ) : (
        <Path d="M43 59 C 46 63, 54 63, 57 59" stroke={NARIZ} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      )}

      {expressao === 'opa' && <Path d="M90 22 C 90 22, 86 28, 86 31 a4 4 0 0 0 8 0 C 94 28, 90 22, 90 22 Z" fill="#8ECBE8" />}
    </G>
  );

  return (
    <Animated.View style={animado ? flutuar : undefined}>
      <Svg width={tamanho} height={tamanho * proporcao} viewBox={viewBox} accessibilityLabel="Pipo, a capivara">
        {!soCabeca && (
          <G>
            <Ellipse cx={50} cy={96} rx={26} ry={4} fill={corSombra} opacity={0.12} />

            {expressao === 'comemorando' ? (
              <G>
                <Ellipse cx={8} cy={46} rx={7.5} ry={12} fill={MEMBRO} transform="rotate(32 8 46)" />
                <Ellipse cx={92} cy={46} rx={7.5} ry={12} fill={MEMBRO} transform="rotate(-32 92 46)" />
              </G>
            ) : (
              <Ellipse cx={18} cy={76} rx={8} ry={10} fill={MEMBRO} />
            )}
            {expressao === 'acenando' && (
              <Ellipse
                cx={92}
                cy={50}
                rx={7.5}
                ry={12.5}
                fill={MEMBRO}
                transform={`rotate(${bracoAlto ? -48 : -24} 88 62)`}
              />
            )}
            {expressao !== 'comemorando' && expressao !== 'acenando' && (
              <Ellipse cx={82} cy={76} rx={8} ry={10} fill={MEMBRO} />
            )}

            <Rect x={24} y={60} width={52} height={34} rx={17} fill={PELO_CORPO} />
            <Ellipse cx={50} cy={84} rx={16} ry={10} fill={BARRIGA} />
          </G>
        )}
        {cabeca}
      </Svg>
    </Animated.View>
  );
}
