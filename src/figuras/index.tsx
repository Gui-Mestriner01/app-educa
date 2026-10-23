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

function Bochechas({ x1, x2, y, rx = 4.5, ry = 2.8 }: { x1: number; x2: number; y: number; rx?: number; ry?: number }) {
  return (
    <G>
      <Ellipse cx={x1} cy={y} rx={rx} ry={ry} fill="#FF8B6F" opacity={0.5} />
      <Ellipse cx={x2} cy={y} rx={rx} ry={ry} fill="#FF8B6F" opacity={0.5} />
    </G>
  );
}

export function Abelha({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={54} cy={90} rx={24} ry={4} fill="#000000" opacity={0.1} />
      <Ellipse cx={46} cy={30} rx={12} ry={17} fill="#E3F5FF" stroke="#A9D6EE" strokeWidth={2} transform="rotate(-22 46 30)" />
      <Ellipse cx={64} cy={30} rx={11} ry={15} fill="#E3F5FF" stroke="#A9D6EE" strokeWidth={2} transform="rotate(20 64 30)" />
      <Path d="M83 58 l11 -1 l-10 7z" fill="#3B2E1E" />
      <Ellipse cx={56} cy={58} rx={29} ry={22} fill="#FFD43B" />
      <Path d="M50 39 q-6 19 0 38" stroke="#3B2E1E" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Path d="M66 40 q-5 18 0 36" stroke="#3B2E1E" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Path d="M20 40 q-4 -10 -11 -12" stroke="#3B2E1E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Path d="M30 38 q2 -11 -2 -16" stroke="#3B2E1E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Circle cx={9} cy={28} r={3} fill="#3B2E1E" />
      <Circle cx={28} cy={22} r={3} fill="#3B2E1E" />
      <Circle cx={26} cy={54} r={17} fill="#FFDE5C" />
      <Olho cx={20} cy={51} rx={2.8} ry={3.4} piscando={piscando} />
      <Olho cx={32} cy={51} rx={2.8} ry={3.4} piscando={piscando} />
      <Bochechas x1={15} x2={37} y={59} rx={3.6} ry={2.2} />
      <Path d="M22 60 q4 4 8 0" stroke="#8A4A2A" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Banana({ tamanho = 100 }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={54} cy={90} rx={28} ry={4} fill="#3F7F33" opacity={0.2} />
      <Path d="M22 30 Q20 82 84 76 Q48 66 36 30 Z" fill="#E9B824" />
      <Path d="M22 30 Q22 76 82 72 Q46 62 34 30 Z" fill="#FFD84D" />
      <Path d="M27 38 Q30 62 56 68" stroke="#FFEA97" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M23 31 L24 19 L31 19 L34 31 Z" fill="#8A6A2E" />
      <Circle cx={83} cy={74} r={2.8} fill="#6B4A2A" />
    </Svg>
  );
}

export function Cachorro({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={50} cy={94} rx={28} ry={4} fill="#000000" opacity={0.1} />
      <Path d="M70 76 q18 -4 16 -22" stroke="#C48A50" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Ellipse cx={50} cy={74} rx={24} ry={18} fill="#D9A066" />
      <Ellipse cx={50} cy={78} rx={13} ry={12} fill="#F4D9B0" />
      <Ellipse cx={38} cy={90} rx={8} ry={5} fill="#E2AE74" />
      <Ellipse cx={62} cy={90} rx={8} ry={5} fill="#E2AE74" />
      <Ellipse cx={50} cy={40} rx={24} ry={21} fill="#E2AE74" />
      <Ellipse cx={61} cy={30} rx={8} ry={7} fill="#C48A50" />
      <Ellipse cx={27} cy={42} rx={8} ry={16} fill="#8E5A33" transform="rotate(15 27 42)" />
      <Ellipse cx={73} cy={42} rx={8} ry={16} fill="#8E5A33" transform="rotate(-15 73 42)" />
      <Ellipse cx={50} cy={51} rx={12} ry={9} fill="#F4D9B0" />
      <Path d="M47 56 q3 8 6 0z" fill="#FF7A8C" />
      <Path d="M50 49 v4 M44 53 q6 5 12 0" stroke="#5B3A22" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Ellipse cx={50} cy={47} rx={5} ry={3.6} fill="#3B2E1E" />
      <Olho cx={41} cy={37} rx={3.2} ry={3.8} piscando={piscando} />
      <Olho cx={59} cy={37} rx={3.2} ry={3.8} piscando={piscando} />
      <Bochechas x1={34} x2={66} y={48} />
    </Svg>
  );
}

export function Gato({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={50} cy={94} rx={26} ry={4} fill="#000000" opacity={0.1} />
      <Path d="M68 82 q24 -2 18 -28" stroke="#F2A65A" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Ellipse cx={50} cy={74} rx={22} ry={18} fill="#F6B26B" />
      <Ellipse cx={50} cy={78} rx={12} ry={12} fill="#FFE3C2" />
      <Ellipse cx={40} cy={90} rx={7.5} ry={5} fill="#F6B26B" />
      <Ellipse cx={60} cy={90} rx={7.5} ry={5} fill="#F6B26B" />
      <Path d="M28 32 L30 8 L48 22 Z" fill="#F6B26B" />
      <Path d="M72 32 L70 8 L52 22 Z" fill="#F6B26B" />
      <Path d="M32 27 L33 14 L43 22 Z" fill="#FFB3B3" />
      <Path d="M68 27 L67 14 L57 22 Z" fill="#FFB3B3" />
      <Ellipse cx={50} cy={38} rx={24} ry={20} fill="#F6B26B" />
      <Path d="M44 20 l2 6 M50 19 v7 M56 20 l-2 6" stroke="#E08A3C" strokeWidth={2.6} strokeLinecap="round" />
      <Olho cx={41} cy={37} rx={3.2} ry={3.8} piscando={piscando} />
      <Olho cx={59} cy={37} rx={3.2} ry={3.8} piscando={piscando} />
      <Path d="M47 44 h6 l-3 3.5z" fill="#FF7A8C" />
      <Path d="M50 47.5 q-3 4 -6 2 M50 47.5 q3 4 6 2" stroke="#8A4A2A" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <Path d="M31 45 h-11 M31 49 l-10 3 M69 45 h11 M69 49 l10 3" stroke="#8A6A4A" strokeWidth={1.5} strokeLinecap="round" />
      <Bochechas x1={35} x2={65} y={46} rx={3.6} ry={2.2} />
    </Svg>
  );
}

export function Vaca({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * (100 / 120)} viewBox="0 0 120 100">
      <Ellipse cx={70} cy={94} rx={38} ry={5} fill="#3F7F33" opacity={0.22} />
      <Rect x={42} y={64} width={9} height={28} rx={4.5} fill="#F2EEE8" />
      <Rect x={54} y={66} width={9} height={26} rx={4.5} fill="#E5DED3" />
      <Rect x={80} y={66} width={9} height={26} rx={4.5} fill="#E5DED3" />
      <Rect x={92} y={64} width={9} height={28} rx={4.5} fill="#F2EEE8" />
      <Rect x={42} y={86} width={9} height={6} rx={2} fill="#5B4636" />
      <Rect x={54} y={86} width={9} height={6} rx={2} fill="#5B4636" />
      <Rect x={80} y={86} width={9} height={6} rx={2} fill="#5B4636" />
      <Rect x={92} y={86} width={9} height={6} rx={2} fill="#5B4636" />
      <Path d="M106 48 q8 10 4 24" stroke="#D9D1C4" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Circle cx={110} cy={73} r={4} fill="#3B2E1E" />
      <Rect x={36} y={38} width={72} height={36} rx={18} fill="#FFFFFF" stroke="#E5DED3" strokeWidth={2} />
      <Ellipse cx={62} cy={50} rx={10} ry={8} fill="#3B2E1E" />
      <Ellipse cx={90} cy={62} rx={8} ry={6} fill="#3B2E1E" />
      <Ellipse cx={98} cy={45} rx={5} ry={4} fill="#3B2E1E" />
      <Ellipse cx={74} cy={76} rx={8} ry={4.5} fill="#FFB3C1" />
      <Path d="M18 30 q-5 -10 2 -13" stroke="#E8D29A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M42 30 q5 -10 -2 -13" stroke="#E8D29A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Ellipse cx={10} cy={38} rx={8} ry={4.5} fill="#F7C6CE" transform="rotate(-20 10 38)" />
      <Ellipse cx={50} cy={38} rx={8} ry={4.5} fill="#F7C6CE" transform="rotate(20 50 38)" />
      <Ellipse cx={30} cy={44} rx={19} ry={18} fill="#FFFFFF" stroke="#E5DED3" strokeWidth={2} />
      <Ellipse cx={40} cy={32} rx={6} ry={5} fill="#3B2E1E" />
      <Ellipse cx={30} cy={56} rx={14} ry={9} fill="#FFC2CC" />
      <Ellipse cx={25} cy={56} rx={2} ry={2.6} fill="#C46B7C" />
      <Ellipse cx={35} cy={56} rx={2} ry={2.6} fill="#C46B7C" />
      <Olho cx={23} cy={43} rx={3} ry={3.6} piscando={piscando} />
      <Olho cx={37} cy={43} rx={3} ry={3.6} piscando={piscando} />
    </Svg>
  );
}

export function Porco({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * (100 / 120)} viewBox="0 0 120 100">
      <Ellipse cx={70} cy={92} rx={38} ry={5} fill="#3F7F33" opacity={0.22} />
      <Rect x={44} y={64} width={10} height={26} rx={5} fill="#F59AB0" />
      <Rect x={56} y={66} width={10} height={24} rx={5} fill="#E8869E" />
      <Rect x={82} y={66} width={10} height={24} rx={5} fill="#E8869E" />
      <Rect x={94} y={64} width={10} height={26} rx={5} fill="#F59AB0" />
      <Path d="M108 52 q9 -3 5 -10 q-6 -2 -4 6" stroke="#F59AB0" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Ellipse cx={76} cy={56} rx={36} ry={24} fill="#FFB6C8" />
      <Path d="M20 36 L15 18 L33 28 Z" fill="#F59AB0" />
      <Path d="M50 32 L58 15 L58 36 Z" fill="#F59AB0" />
      <Circle cx={36} cy={50} r={22} fill="#FFC4D2" />
      <Ellipse cx={32} cy={58} rx={11} ry={8} fill="#F59AB0" />
      <Ellipse cx={28} cy={58} rx={2} ry={3} fill="#B8546E" />
      <Ellipse cx={36} cy={58} rx={2} ry={3} fill="#B8546E" />
      <Olho cx={28} cy={44} rx={3} ry={3.6} piscando={piscando} />
      <Olho cx={44} cy={44} rx={3} ry={3.6} piscando={piscando} />
      <Ellipse cx={49} cy={56} rx={4} ry={2.6} fill="#FF7A8C" opacity={0.5} />
      <Path d="M30 68 q4 3 8 0" stroke="#B8546E" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Peixe({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Circle cx={88} cy={22} r={4} fill="none" stroke="#7CC3E8" strokeWidth={2} />
      <Circle cx={80} cy={12} r={2.5} fill="none" stroke="#7CC3E8" strokeWidth={2} />
      <Path d="M68 52 L94 32 Q87 52 94 72 Z" fill="#FF8A3D" />
      <Path d="M34 33 Q46 14 62 32 Z" fill="#FF8A3D" />
      <Ellipse cx={46} cy={52} rx={30} ry={22} fill="#FFA94D" />
      <Path d="M58 33 q-7 19 0 38" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.75} strokeLinecap="round" />
      <Path d="M44 56 q11 2 13 13 q-11 -2 -13 -13z" fill="#FF8A3D" />
      <Circle cx={30} cy={46} r={7.5} fill="#FFFFFF" />
      <Olho cx={30} cy={46} rx={3.8} ry={4.4} piscando={piscando} />
      <Ellipse cx={27} cy={58} rx={4} ry={2.4} fill="#FF6F61" opacity={0.5} />
      <Path d="M17 56 q4 3 7 0" stroke="#A04A1A" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Uva({ tamanho = 100 }: PropsFigura) {
  const bagos: [number, number][] = [
    [34, 36], [46, 36], [58, 36], [70, 36],
    [40, 48], [52, 48], [64, 48],
    [46, 60], [58, 60],
    [52, 72],
  ];
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Ellipse cx={52} cy={92} rx={20} ry={4} fill="#3F7F33" opacity={0.2} />
      <Path d="M52 28 q0 -10 4 -15" stroke="#6B4A2A" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Path d="M56 16 q16 -10 27 2 q-15 8 -27 -2z" fill="#5FB86F" />
      {bagos.map(([x, y], i) => (
        <G key={i}>
          <Circle cx={x} cy={y + 1.5} r={8} fill="#6E3FB8" />
          <Circle cx={x} cy={y} r={7.6} fill="#8E5BD8" />
          <Circle cx={x - 2.5} cy={y - 2.5} r={2.2} fill="#FFFFFF" opacity={0.55} />
        </G>
      ))}
    </Svg>
  );
}

export function Elefante({ tamanho = 100, piscando }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho * (100 / 120)} viewBox="0 0 120 100">
      <Ellipse cx={72} cy={93} rx={40} ry={5} fill="#3F7F33" opacity={0.22} />
      <Rect x={46} y={60} width={12} height={30} rx={6} fill="#9DB1C6" />
      <Rect x={60} y={62} width={12} height={28} rx={6} fill="#8599AE" />
      <Rect x={84} y={62} width={12} height={28} rx={6} fill="#8599AE" />
      <Rect x={98} y={60} width={12} height={30} rx={6} fill="#9DB1C6" />
      <Path d="M108 50 q9 6 6 16" stroke="#8599AE" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Ellipse cx={78} cy={54} rx={32} ry={24} fill="#A9BCD0" />
      <Ellipse cx={56} cy={44} rx={18} ry={22} fill="#93A8BE" />
      <Ellipse cx={57} cy={45} rx={12} ry={16} fill="#F2B8C6" />
      <Path d="M32 58 Q28 78 20 82 Q14 84 14 78" stroke="#A9BCD0" strokeWidth={11} fill="none" strokeLinecap="round" />
      <Circle cx={36} cy={44} r={20} fill="#A9BCD0" />
      <Olho cx={29} cy={40} rx={3} ry={3.6} piscando={piscando} />
      <Olho cx={43} cy={40} rx={3} ry={3.6} piscando={piscando} />
      <Ellipse cx={24} cy={50} rx={4} ry={2.4} fill="#FF8B9E" opacity={0.5} />
      <Ellipse cx={48} cy={50} rx={4} ry={2.4} fill="#FF8B9E" opacity={0.5} />
    </Svg>
  );
}

export function Ioio({ tamanho = 100 }: PropsFigura) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
      <Circle cx={50} cy={9} r={4.5} fill="none" stroke="#8A6A4A" strokeWidth={2.5} />
      <Path d="M50 13 L50 52" stroke="#8A6A4A" strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx={50} cy={62} r={31} fill="#C23F35" />
      <Circle cx={50} cy={60} r={30} fill="#EF5B4F" />
      <Circle cx={50} cy={60} r={22} fill="#FF7A6E" />
      <Circle cx={50} cy={60} r={8} fill="#FFD84D" />
      <Path d="M30 46 a24 24 0 0 1 14 -10" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.6} />
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
  abelha: Abelha,
  banana: Banana,
  cachorro: Cachorro,
  gato: Gato,
  vaca: Vaca,
  porco: Porco,
  peixe: Peixe,
  uva: Uva,
  elefante: Elefante,
  ioio: Ioio,
} satisfies Record<string, ComponentType<PropsFigura>>;

/** Nome bonito para leitores de tela e para a voz do Pipo. */
export const NOME_FIGURA: Record<keyof typeof FIGURAS, string> = {
  ovelha: 'ovelha',
  patinho: 'patinho',
  laranja: 'laranja',
  sapo: 'sapo',
  pintinho: 'pintinho',
  abelha: 'abelha',
  banana: 'banana',
  cachorro: 'cachorro',
  gato: 'gato',
  vaca: 'vaca',
  porco: 'porco',
  peixe: 'peixe',
  uva: 'uva',
  elefante: 'elefante',
  ioio: 'ioiô',
};

export type NomeFigura = keyof typeof FIGURAS;
