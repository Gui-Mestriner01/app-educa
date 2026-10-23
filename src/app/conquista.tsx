import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Botao3D } from '../componentes/Botao3D';
import { Estrela } from '../componentes/Estrela';
import { Texto } from '../componentes/Texto';
import { useEntrada } from '../componentes/useFlutuar';
import { buscarFase } from '../conteudo';
import { Pipo } from '../mascote/Pipo';
import { cores, driverNativo } from '../tema';

const CORES_CONFETE = ['#E85A4F', '#6A4FD0', '#4FA8E8', '#FFC93C', '#43B05C', '#FF8FAD'];

function Confete({ indice, largura }: { indice: number; largura: number }) {
  const cair = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(cair, { toValue: 1, duration: 3800 + (indice % 5) * 300, easing: Easing.linear, useNativeDriver: driverNativo }),
    );
    const t = setTimeout(() => loop.start(), indice * 230);
    return () => {
      clearTimeout(t);
      loop.stop();
    };
  }, [cair, indice]);
  const tam = 9 + (indice % 3) * 2;
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: -20,
        left: ((indice * 53) % 100) / 100 * largura,
        width: tam,
        height: indice % 2 ? tam * 1.4 : tam,
        borderRadius: indice % 3 === 0 ? tam : 3,
        backgroundColor: CORES_CONFETE[indice % CORES_CONFETE.length],
        transform: [
          { translateY: cair.interpolate({ inputRange: [0, 1], outputRange: [0, 900] }) },
          { rotate: cair.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${360 + indice * 40}deg`] }) },
        ],
      }}
    />
  );
}

function EstrelaGrande({ cheia, atraso, tamanho }: { cheia: boolean; atraso: number; tamanho: number }) {
  const entrada = useEntrada(atraso);
  return (
    <Animated.View style={entrada}>
      <Estrela tamanho={tamanho} cheia={cheia} />
    </Animated.View>
  );
}

function Recompensa({ titulo, valor, fundo, corValor, atraso }: { titulo: string; valor: string; fundo: string; corValor: string; atraso: number }) {
  const entrada = useEntrada(atraso);
  return (
    <Animated.View style={[{ flex: 1, backgroundColor: fundo, borderRadius: 18, paddingVertical: 12, alignItems: 'center' }, entrada]}>
      <Texto peso="negrito" tamanho={22} cor={corValor}>
        {valor}
      </Texto>
      <Texto tamanho={12} cor={cores.textoSuave}>
        {titulo}
      </Texto>
    </Animated.View>
  );
}

function Seta() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d="M5 12h13M13 6l6 6-6 6" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function Conquista() {
  const p = useLocalSearchParams<{ fase: string; estrelas: string; acertos: string; total: string }>();
  const { width } = useWindowDimensions();
  const estrelas = Number(p.estrelas ?? 0);
  const acertos = Number(p.acertos ?? 0);
  const total = Number(p.total ?? 0);
  const achado = buscarFase(String(p.fase));
  const titulo = estrelas === 3 ? 'Perfeito!' : estrelas === 2 ? 'Muito bem!' : 'Você conseguiu!';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }}>
      {Array.from({ length: 16 }, (_, i) => (
        <Confete key={i} indice={i} largura={width} />
      ))}

      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 24 }}>
        <View style={{ backgroundColor: cores.vermelho, borderRadius: 14, paddingHorizontal: 26, paddingVertical: 10, borderBottomWidth: 5, borderBottomColor: '#B83A30' }}>
          <Texto peso="negrito" tamanho={26} cor="#FFFFFF">
            Fase completa!
          </Texto>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 22 }}>
          <EstrelaGrande cheia={estrelas >= 1} atraso={300} tamanho={58} />
          <EstrelaGrande cheia={estrelas >= 2} atraso={480} tamanho={78} />
          <EstrelaGrande cheia={estrelas >= 3} atraso={660} tamanho={58} />
        </View>

        <View style={{ marginTop: 6 }}>
          <Pipo expressao="comemorando" tamanho={220} />
        </View>

        <Texto peso="semi" tamanho={22} centro style={{ marginTop: 4 }}>
          {titulo}
        </Texto>
        {achado && (
          <Texto tamanho={14} cor={cores.textoSuave} centro>
            {achado.fase.titulo}
          </Texto>
        )}

        <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'stretch', marginTop: 18 }}>
          <Recompensa titulo="estrelas" valor={`+${estrelas}`} fundo="#FFF1D0" corValor="#8A5A06" atraso={800} />
          <Recompensa titulo="de primeira" valor={`${acertos} de ${total}`} fundo={cores.verdeClaro} corValor={cores.verdeBorda} atraso={900} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: 24 }}>
        <Botao3D cor="#FFFFFF" corBorda={cores.bordaCartao} raio={20} altura={60} rotulo="Jogar de novo" onPress={() => router.replace(`/fase/${p.fase}`)} style={{ width: 120 }}>
          <Texto peso="semi" tamanho={15} cor={cores.textoSuave}>
            De novo
          </Texto>
        </Botao3D>
        <Botao3D
          cor={cores.verde}
          corBorda={cores.verdeBorda}
          raio={20}
          altura={60}
          rotulo="Continuar"
          onPress={() => router.dismissTo(achado ? `/trilha/${achado.trilha.id}` : '/')}
          style={{ flex: 1 }}
          conteudoStyle={{ flexDirection: 'row', gap: 8 }}
        >
          <Texto peso="semi" tamanho={19} cor="#FFFFFF">
            Continuar
          </Texto>
          <Seta />
        </Botao3D>
      </View>
    </SafeAreaView>
  );
}
