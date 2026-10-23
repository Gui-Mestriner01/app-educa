import { ComponentType } from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

type PropsFigura = { tamanho?: number; piscando?: boolean };

function Olho({ cx, cy, rx, ry, piscando, cor = '#3A2718' }: { cx: number; cy: number; rx: number; ry: number; piscando?: boolean; cor?: string }) {
  if (piscando) return <Path d={`M${cx - rx} ${cy} H${cx + rx}`} stroke={cor} strokeWidth={ry * 0.6} strokeLinecap="round" />;
  return (
    <G>
      <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={cor} />
      <Circle cx={cx + rx * 0.35} cy={cy - ry * 0.4} r={rx * 0.4} fill="#FFFFFF" />
    </G>
  );
}

export function Ovelha({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * (100 / 120)} viewBox="0 0 120 100">
      <Ellipse cx={66} cy={94} rx={36} ry={5} fill="#3F7F33" opacity={0.25} />
      <Rect x={44} y={68} width={9} height={24} rx={4.5} fill="#5B4636" />
      <Rect x={58} y={70} width={9} height={22} rx={4.5} fill="#4A382B" />
      <Rect x={78} y={70} width={9} height={22} rx={4.5} fill="#4A382B" />
      <Rect x={92} y={68} width={9} height={24} rx={4.5} fill="#5B4636" />
      <G fill="#E9E3D8">
        <Circle cx={54} cy={58} r={18} />
        <Circle cx={74} cy={52} r={20} />
        <Circle cx={94} cy={58} r={17} />
        <Circle cx={66} cy={70} r={17} />
        <Circle cx={86} cy={70} r={16} />
        <Circle cx={106} cy={64} r={11} />
      </G>
      <G fill="#FFFFFF">
        <Circle cx={54} cy={54} r={18} />
        <Circle cx={74} cy={47} r={20} />
        <Circle cx={94} cy={53} r={17} />
        <Circle cx={66} cy={65} r={16} />
        <Circle cx={86} cy={65} r={15} />
        <Circle cx={106} cy={59} r={10} />
      </G>
      <Ellipse cx={26} cy={40} rx={8} ry={4.5} fill="#F0BFA3" transform="rotate(-25 26 40)" />
      <Ellipse cx={54} cy={38} rx={8} ry={4.5} fill="#F0BFA3" transform="rotate(25 54 38)" />
      <Ellipse cx={40} cy={50} rx={16} ry={18} fill="#FCE3CF" />
      <Circle cx={34} cy={33} r={7} fill="#FFFFFF" />
      <Circle cx={42} cy={31} r={7.5} fill="#FFFFFF" />
      <Circle cx={49} cy={35} r={6} fill="#FFFFFF" />
      <Olho cx={34} cy={49} rx={2.8} ry={3.3} piscando={piscando} />
      <Olho cx={46} cy={49} rx={2.8} ry={3.3} piscando={piscando} />
      <Ellipse cx={29} cy={57} rx={4} ry={2.4} fill="#F59A8B" opacity={0.7} />
      <Ellipse cx={51} cy={57} rx={4} ry={2.4} fill="#F59A8B" opacity={0.7} />
      <Path d="M36 58 q4 4 8 0" stroke="#B5705A" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Patinho({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={50} cy={90} rx={26} ry={5} fill="#2E86B0" opacity={0.25} />
      <Path d="M14 56 l-12 -8 l4 17z" fill="#FFCE4D" />
      <Ellipse cx={44} cy={62} rx={30} ry={21} fill="#FFD75E" />
      <Path d="M26 58 q18 -13 36 2 q-18 13 -36 -2z" fill="#F4B92B" />
      <Circle cx={70} cy={34} r={18} fill="#FFD75E" />
      <Ellipse cx={62} cy={48} rx={5} ry={3} fill="#FF8B6F" opacity={0.55} />
      <Path d="M86 30 q15 3 15 7 q0 4 -15 6z" fill="#FF9A2E" />
      <Path d="M86 37 q15 2 15 0 q0 4 -15 6z" fill="#E8821F" />
      <Olho cx={74} cy={30} rx={3.2} ry={3.8} piscando={piscando} />
    </Svg>
  );
}

export function Laranja({ tamanho = 100 }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={50} cy={92} rx={26} ry={5} fill="#3F7F33" opacity={0.22} />
      <Circle cx={50} cy={54} r={34} fill="#F28A1E" />
      <Circle cx={50} cy={52} r={32} fill="#FF9F2E" />
      <Ellipse cx={38} cy={40} rx={10} ry={7} fill="#FFC06E" opacity={0.85} />
      <Path d="M50 22 q-2 -10 4 -14" stroke="#7A4A28" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M54 16 q14 -10 24 0 q-12 8 -24 0z" fill="#5FB86F" />
      <Circle cx={60} cy={62} r={1.6} fill="#E07B12" />
      <Circle cx={44} cy={68} r={1.6} fill="#E07B12" />
      <Circle cx={66} cy={48} r={1.6} fill="#E07B12" />
    </Svg>
  );
}

export function Sapo({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * 0.9} viewBox="0 0 100 90">
      <Ellipse cx={50} cy={86} rx={30} ry={4} fill="#000000" opacity={0.1} />
      <Ellipse cx={20} cy={72} rx={14} ry={9} fill="#4DAF4F" />
      <Ellipse cx={80} cy={72} rx={14} ry={9} fill="#4DAF4F" />
      <Ellipse cx={50} cy={62} rx={30} ry={23} fill="#6BCB5B" />
      <Ellipse cx={50} cy={68} rx={18} ry={14} fill="#FFF1B8" />
      <Ellipse cx={50} cy={44} rx={34} ry={20} fill="#6BCB5B" />
      <Circle cx={31} cy={28} r={13} fill="#6BCB5B" />
      <Circle cx={69} cy={28} r={13} fill="#6BCB5B" />
      <Circle cx={31} cy={28} r={9} fill="#FFFFFF" />
      <Circle cx={69} cy={28} r={9} fill="#FFFFFF" />
      <Olho cx={33} cy={29} rx={5} ry={5.6} piscando={piscando} cor="#24321A" />
      <Olho cx={67} cy={29} rx={5} ry={5.6} piscando={piscando} cor="#24321A" />
      <Ellipse cx={26} cy={48} rx={6} ry={3.4} fill="#FF8B9E" opacity={0.55} />
      <Ellipse cx={74} cy={48} rx={6} ry={3.4} fill="#FF8B9E" opacity={0.55} />
      <Path d="M36 46 Q50 62 64 46 Q50 53 36 46 Z" fill="#A8323A" />
      <Ellipse cx={50} cy={52.5} rx={5} ry={2.2} fill="#FF7A8C" />
      <Ellipse cx={36} cy={84} rx={7} ry={4} fill="#4DAF4F" />
      <Ellipse cx={64} cy={84} rx={7} ry={4} fill="#4DAF4F" />
    </Svg>
  );
}

export function Pintinho({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * 0.9} viewBox="0 0 100 90">
      <Path d="M40 80 l-4 6 M40 80 l0 7 M40 80 l4 6 M60 80 l-4 6 M60 80 l0 7 M60 80 l4 6" stroke="#F08A24" strokeWidth={2.6} strokeLinecap="round" />
      <Ellipse cx={50} cy={54} rx={30} ry={28} fill="#FFD84D" />
      <Ellipse cx={50} cy={64} rx={18} ry={14} fill="#FFE68A" />
      <Ellipse cx={22} cy={58} rx={8} ry={13} fill="#F5C232" transform="rotate(22 22 58)" />
      <Ellipse cx={78} cy={58} rx={8} ry={13} fill="#F5C232" transform="rotate(-22 78 58)" />
      <Path d="M46 28 q-2 -9 3 -12 q-1 6 2 10 q2 -7 7 -8 q-4 5 -3 11 z" fill="#FFD84D" />
      <Olho cx={40} cy={46} rx={4} ry={4.6} piscando={piscando} />
      <Olho cx={60} cy={46} rx={4} ry={4.6} piscando={piscando} />
      <Ellipse cx={32} cy={56} rx={5.5} ry={3.2} fill="#FF8B6F" opacity={0.55} />
      <Ellipse cx={68} cy={56} rx={5.5} ry={3.2} fill="#FF8B6F" opacity={0.55} />
      <Path d="M43 53 L50 49 L57 53 L50 58 Z" fill="#FF9A2E" />
      <Path d="M43 53 L57 53 L50 58 Z" fill="#E87A18" />
    </Svg>
  );
}

/** Catálogo: o nome usado no JSON de conteúdo aponta para o desenho. */
export const FIGURAS = {
  ovelha: Ovelha,
  patinho: Patinho,
  laranja: Laranja,
  sapo: Sapo,
  pintinho: Pintinho,
} satisfies Record<string, ComponentType<PropsFigura>>;

export type NomeFigura = keyof typeof FIGURAS;
