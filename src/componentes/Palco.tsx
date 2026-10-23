import { useEffect, useRef } from 'react';
import { Animated, Easing, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Mostrar } from '../conteudo/schema';
import { FIGURAS, NOME_FIGURA } from '../figuras';
import { Pipo } from '../mascote/Pipo';
import { EstiloTrilha, driverNativo } from '../tema';
import { Cena } from './Cena';
import { Forma, NOME_FORMA } from './Forma';
import { Texto } from './Texto';
import { useEntrada, useFlutuar } from './useFlutuar';
import { Visual } from './Visual';

/** Cresce e encolhe devagarinho, sem parar. */
function usePulsar(escala = 0.08, duracao = 700) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: duracao, easing: Easing.inOut(Easing.sin), useNativeDriver: driverNativo }),
        Animated.timing(v, { toValue: 0, duration: duracao, easing: Easing.inOut(Easing.sin), useNativeDriver: driverNativo }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, duracao]);
  return { transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1 + escala] }) }] };
}

function Nota({ x, y, atraso, cor }: { x: number; y: number; atraso: number; cor: string }) {
  const flutuar = useFlutuar(10, 900, atraso);
  return (
    <Animated.View style={[{ position: 'absolute', left: x, top: y }, flutuar]}>
      <Svg width={30} height={30} viewBox="0 0 24 24">
        <Path d="M9 18.5a3 3 0 1 1-2-2.8V5l11-2v12.5a3 3 0 1 1-2-2.8V7.2l-7 1.3z" fill={cor} />
      </Svg>
    </Animated.View>
  );
}

function Fundo({ cor, children }: { cor: string; children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, borderRadius: 28, overflow: 'hidden', backgroundColor: cor, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: 140, height: 140, borderRadius: 70, backgroundColor: '#FFFFFF', opacity: 0.55, left: -40, top: -36 }} />
      <View style={{ position: 'absolute', width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFFFFF', opacity: 0.55, right: -20, bottom: 24 }} />
      <View style={{ position: 'absolute', width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFFFFF', opacity: 0.7, right: 46, top: 30 }} />
      {children}
    </View>
  );
}

function Palavra({ palavra, cor }: { palavra: string; cor: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, marginTop: 14 }}>
      {palavra.split('').map((l, i) => {
        const vazia = l === '_';
        return (
          <View
            key={i}
            style={{
              minWidth: 38,
              height: 46,
              paddingHorizontal: 4,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: vazia ? '#FFFFFF' : cor,
              borderWidth: vazia ? 3 : 0,
              borderColor: cor,
              borderStyle: vazia ? 'dashed' : 'solid',
            }}
          >
            <Texto peso="negrito" tamanho={26} cor={vazia ? cor : '#FFFFFF'}>
              {vazia ? '?' : l}
            </Texto>
          </View>
        );
      })}
    </View>
  );
}

function Interrogacao({ tamanho, cor }: { tamanho: number; cor: string }) {
  const pulsar = usePulsar(0.12, 600);
  return (
    <Animated.View
      style={[
        { width: tamanho, height: tamanho, borderRadius: 16, borderWidth: 3, borderStyle: 'dashed', borderColor: cor, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
        pulsar,
      ]}
    >
      <Texto peso="negrito" tamanho={tamanho * 0.55} cor={cor}>
        ?
      </Texto>
    </Animated.View>
  );
}

function ItemSequencia({ children, indice, tamanho }: { children: React.ReactNode; indice: number; tamanho: number }) {
  const entrada = useEntrada(200 + indice * 160);
  return (
    <Animated.View style={[{ width: tamanho, height: tamanho, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, entrada]}>
      {children}
    </Animated.View>
  );
}

/** O meio da tela: o que a criança olha enquanto pensa na resposta. */
export function Palco({ mostrar, estilo }: { mostrar: Mostrar; estilo: EstiloTrilha }) {
  const { width } = useWindowDimensions();
  const flutuar = useFlutuar(8, 1300);
  const entrada = useEntrada(150);
  const pulsar = usePulsar(0.06, 650);

  switch (mostrar.tipo) {
    case 'cena':
      return <Cena cenario={mostrar.cenario} figura={mostrar.figura} quantidade={mostrar.quantidade} />;

    case 'figura': {
      const Figura = FIGURAS[mostrar.figura];
      return (
        <Fundo cor={estilo.palco}>
          <Animated.View style={[{ alignItems: 'center' }, entrada]} accessible accessibilityLabel={NOME_FIGURA[mostrar.figura]}>
            <Animated.View style={flutuar}>
              <Figura tamanho={170} />
            </Animated.View>
            {!!mostrar.palavra && <Palavra palavra={mostrar.palavra} cor={estilo.cor} />}
          </Animated.View>
        </Fundo>
      );
    }

    case 'letra':
      return (
        <Fundo cor={estilo.palco}>
          <Animated.View style={[entrada]} accessible accessibilityLabel={`Letra ${mostrar.letra}`}>
            <Animated.View
              style={[
                { width: 170, height: 170, borderRadius: 40, backgroundColor: estilo.cor, borderBottomWidth: 10, borderBottomColor: estilo.corBorda, alignItems: 'center', justifyContent: 'center' },
                flutuar,
              ]}
            >
              <Texto peso="negrito" tamanho={118} cor="#FFFFFF" style={{ lineHeight: 130 }}>
                {mostrar.letra}
              </Texto>
            </Animated.View>
          </Animated.View>
        </Fundo>
      );

    case 'forma':
      return (
        <Fundo cor={estilo.palco}>
          <Animated.View style={[entrada, flutuar]} accessible accessibilityLabel={NOME_FORMA[mostrar.forma]}>
            <Forma forma={mostrar.forma} cor={mostrar.cor} tamanho={190} />
          </Animated.View>
        </Fundo>
      );

    case 'sequencia': {
      const n = mostrar.itens.length + 1;
      const tam = Math.min(74, (Math.min(width, 520) - 32 - 28 - (n - 1) * 8) / n);
      return (
        <Fundo cor={estilo.palco}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {mostrar.itens.map((item, i) => (
              <ItemSequencia key={i} indice={i} tamanho={tam}>
                <Visual v={item} tamanho={tam * 0.84} indice={i} bolinhas={false} />
              </ItemSequencia>
            ))}
            <Interrogacao tamanho={tam} cor={estilo.cor} />
          </View>
        </Fundo>
      );
    }

    case 'som':
      return (
        <Fundo cor={estilo.palco}>
          <Nota x={36} y={40} atraso={0} cor={estilo.cor} />
          <Nota x={width - 120} y={70} atraso={400} cor="#D6417F" />
          <Nota x={60} y={180} atraso={800} cor="#2E86C8" />
          <Animated.View style={[{ alignItems: 'center' }, entrada]}>
            <Animated.View style={[{ backgroundColor: '#FFFFFF', borderRadius: 32, paddingHorizontal: 28, paddingVertical: 18, borderBottomWidth: 6, borderBottomColor: '#E8DCC2' }, pulsar]}>
              <Texto peso="negrito" tamanho={46} cor={estilo.cor}>
                {mostrar.texto}
              </Texto>
            </Animated.View>
            <Svg width={30} height={20} viewBox="0 0 30 20" style={{ marginTop: -2 }}>
              <Path d="M0 0 H30 L8 20 Z" fill="#FFFFFF" />
            </Svg>
            <View style={{ marginTop: 4 }}>
              <Pipo tamanho={110} />
            </View>
          </Animated.View>
        </Fundo>
      );

    case 'pipo':
      return (
        <Fundo cor={estilo.palco}>
          <Animated.View style={[{ alignItems: 'center' }, entrada]}>
            {!!mostrar.fala && (
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 22, paddingHorizontal: 18, paddingVertical: 10, marginBottom: 6, maxWidth: 280 }}>
                <Texto peso="semi" tamanho={17} centro>
                  {mostrar.fala}
                </Texto>
              </View>
            )}
            <Pipo expressao="acenando" tamanho={170} />
          </Animated.View>
        </Fundo>
      );
  }
}
