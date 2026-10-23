import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { NomeCor, NomeForma } from '../conteudo/schema';
import { coresForma } from '../tema';

function estrela(cx: number, cy: number, externo: number, interno: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? externo : interno;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
}

/** Desenha a forma; `dy` desloca para baixo (usado na sombra 3D). */
function Corpo({ forma, cor, dy = 0 }: { forma: NomeForma; cor: string; dy?: number }) {
  const t = `translate(0 ${dy})`;
  switch (forma) {
    case 'circulo':
      return <Circle cx={50} cy={50 + dy} r={40} fill={cor} />;
    case 'quadrado':
      return <Rect x={12} y={12 + dy} width={76} height={76} rx={12} fill={cor} />;
    case 'retangulo':
      return <Rect x={4} y={24 + dy} width={92} height={54} rx={11} fill={cor} />;
    case 'triangulo':
      return <Path d="M50 12 L90 86 L10 86 Z" fill={cor} stroke={cor} strokeWidth={8} strokeLinejoin="round" transform={t} />;
    case 'estrela':
      return <Path d={estrela(50, 53, 46, 21)} fill={cor} stroke={cor} strokeWidth={5} strokeLinejoin="round" transform={t} />;
    case 'coracao':
      return (
        <Path
          d="M50 88 C 20 68, 6 48, 16 30 C 26 14, 46 18, 50 34 C 54 18, 74 14, 84 30 C 94 48, 80 68, 50 88 Z"
          fill={cor}
          transform={t}
        />
      );
    case 'losango':
      return <Path d="M50 6 L90 50 L50 94 L10 50 Z" fill={cor} stroke={cor} strokeWidth={6} strokeLinejoin="round" transform={t} />;
  }
}

/** Onde fica o rostinho em cada forma. */
const ROSTO: Record<NomeForma, number> = {
  circulo: 52,
  quadrado: 52,
  retangulo: 52,
  triangulo: 66,
  estrela: 58,
  coracao: 50,
  losango: 52,
};

/** Forma geométrica com volume e rostinho — o jeitinho cartoon do app. */
export function Forma({ forma, cor, tamanho = 80, rosto = true }: { forma: NomeForma; cor: NomeCor; tamanho?: number; rosto?: boolean }) {
  const [face, borda] = coresForma[cor];
  const y = ROSTO[forma];
  return (
    <Svg width={tamanho} height={tamanho} viewBox="-4 -4 108 112">
      <Corpo forma={forma} cor={borda} dy={5} />
      <Corpo forma={forma} cor={face} />
      <Ellipse cx={34} cy={forma === 'triangulo' ? 50 : 30} rx={9} ry={5} fill="#FFFFFF" opacity={0.35} transform={`rotate(-30 34 ${forma === 'triangulo' ? 50 : 30})`} />
      {rosto && (
        <G>
          <Circle cx={42} cy={y} r={3.6} fill="#2E2418" />
          <Circle cx={58} cy={y} r={3.6} fill="#2E2418" />
          <Circle cx={43.2} cy={y - 1.3} r={1.3} fill="#FFFFFF" />
          <Circle cx={59.2} cy={y - 1.3} r={1.3} fill="#FFFFFF" />
          <Path d={`M44 ${y + 7} q6 5 12 0`} stroke="#2E2418" strokeWidth={2.6} fill="none" strokeLinecap="round" />
        </G>
      )}
    </Svg>
  );
}

export const NOME_FORMA: Record<NomeForma, string> = {
  circulo: 'círculo',
  quadrado: 'quadrado',
  retangulo: 'retângulo',
  triangulo: 'triângulo',
  estrela: 'estrela',
  coracao: 'coração',
  losango: 'losango',
};
