import Svg, { Path } from 'react-native-svg';

const FORMA = 'M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.6L12 17.6 6.2 20.7l1.1-6.6L2.6 9.5l6.5-.9z';

type Props = { tamanho?: number; cheia?: boolean };

export function Estrela({ tamanho = 20, cheia = true }: Props) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24">
      <Path
        d={FORMA}
        fill={cheia ? '#FFC23A' : '#FFFFFF'}
        stroke={cheia ? '#E09A12' : '#D8C49A'}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LinhaEstrelas({ total = 3, cheias, tamanho = 18 }: { total?: number; cheias: number; tamanho?: number }) {
  return (
    <Svg width={tamanho * total + 4 * (total - 1)} height={tamanho} viewBox={`0 0 ${24 * total + 4 * (total - 1)} 24`}>
      {Array.from({ length: total }, (_, i) => (
        <Path
          key={i}
          d={FORMA}
          transform={`translate(${i * 28} 0)`}
          fill={i < cheias ? '#FFC23A' : '#FFFFFF'}
          stroke={i < cheias ? '#E09A12' : '#D8C49A'}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
