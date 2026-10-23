import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Animated, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { Botao3D } from '../../componentes/Botao3D';
import { Estrela, LinhaEstrelas } from '../../componentes/Estrela';
import { Texto } from '../../componentes/Texto';
import { useEntrada, useFlutuar } from '../../componentes/useFlutuar';
import { buscarTrilha } from '../../conteudo';
import { SituacaoFase, situacoesDaTrilha, totalEstrelas, useProgresso } from '../../estado/progresso';
import { Pipo } from '../../mascote/Pipo';
import { cores, estiloDa } from '../../tema';

const ALTURA_LINHA = 132;
const TOPO = 64;

function Seta({ cor = cores.verde }: { cor?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M15 5l-7 7 7 7" stroke={cor} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function Cadeado() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Rect x={5} y={10.5} width={14} height={10} rx={3} fill="#8DA77D" />
      <Path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" stroke="#8DA77D" strokeWidth={2.4} fill="none" />
    </Svg>
  );
}

function No({
  numero,
  situacao,
  estrelas,
  selecionado,
  onPress,
  indice,
  corFeita,
}: {
  corFeita: string;
  numero: number;
  situacao: SituacaoFase;
  estrelas: number;
  selecionado: boolean;
  onPress: () => void;
  indice: number;
}) {
  const entrada = useEntrada(100 + indice * 90);
  const pulo = useFlutuar(situacao === 'atual' ? 8 : 0, 700);
  const atual = situacao === 'atual';
  const tam = atual ? 78 : 62;
  const face = atual ? cores.amarelo : situacao === 'feita' ? '#FFFFFF' : '#D6EBC9';
  const borda = atual ? cores.amareloBorda : situacao === 'feita' ? '#D9CBA8' : '#B3CFA2';

  return (
    <Animated.View style={[{ alignItems: 'center' }, entrada]}>
      <Animated.View style={pulo}>
        <Pressable
          onPress={onPress}
          disabled={situacao === 'bloqueada'}
          accessibilityRole="button"
          accessibilityLabel={situacao === 'bloqueada' ? `Fase ${numero}, bloqueada` : `Fase ${numero}`}
          style={{ width: tam, height: tam + 6, borderRadius: tam / 2, backgroundColor: borda }}
        >
          <View
            style={{
              width: tam,
              height: tam,
              borderRadius: tam / 2,
              backgroundColor: face,
              borderWidth: selecionado || atual ? 5 : 0,
              borderColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {situacao === 'bloqueada' ? (
              <Cadeado />
            ) : (
              <Texto peso="negrito" tamanho={atual ? 28 : 24} cor={atual ? cores.amareloTexto : corFeita}>
                {numero}
              </Texto>
            )}
          </View>
        </Pressable>
      </Animated.View>
      {situacao === 'feita' && (
        <View style={{ marginTop: 6 }}>
          <LinhaEstrelas cheias={estrelas} tamanho={16} />
        </View>
      )}
    </Animated.View>
  );
}

export default function Mapa() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trilha = buscarTrilha(String(id));
  const estrelas = useProgresso((s) => s.estrelasPorFase);
  const { width } = useWindowDimensions();
  const [selecionada, setSelecionada] = useState<string | null>(null);

  if (!trilha) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Texto>Trilha não encontrada.</Texto>
      </SafeAreaView>
    );
  }

  const estilo = estiloDa(trilha.id);
  const situacoes = situacoesDaTrilha(trilha, estrelas);
  const indiceAtual = Math.max(0, situacoes.indexOf('atual'));
  const faseEscolhida = trilha.fases.find((f) => f.id === selecionada) ?? trilha.fases[indiceAtual];
  const largura = Math.min(width, 520);
  const pontos = trilha.fases.map((_, i) => ({ x: i % 2 === 0 ? largura * 0.3 : largura * 0.7, y: TOPO + i * ALTURA_LINHA }));
  const alturaMapa = TOPO + trilha.fases.length * ALTURA_LINHA;

  // estrada sinuosa ligando as fases
  let caminho = `M${pontos[0].x} ${pontos[0].y}`;
  for (let i = 1; i < pontos.length; i++) {
    const a = pontos[i - 1];
    const b = pontos[i];
    const meio = (a.y + b.y) / 2;
    caminho += ` C${a.x} ${meio}, ${b.x} ${meio}, ${b.x} ${b.y}`;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: estilo.fundoMapa }} edges={['top']}>
      {/* topo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10 }}>
        <Botao3D cor="#FFFFFF" corBorda={estilo.bordaMapa} raio={24} altura={48} profundidade={4} rotulo="Voltar" onPress={() => router.back()} style={{ width: 48 }}>
          <Seta cor={estilo.cor} />
        </Botao3D>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 4, borderBottomColor: estilo.bordaMapa }}>
          <Texto peso="semi" tamanho={16}>
            {estilo.tituloMapa}
          </Texto>
          <Texto tamanho={12} cor={cores.textoSuave}>
            {trilha.descricao}
          </Texto>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 4, borderBottomColor: estilo.bordaMapa }}>
          <Estrela tamanho={17} />
          <Texto peso="semi" tamanho={15}>
            {totalEstrelas(estrelas)}
          </Texto>
        </View>
      </View>

      {/* mapa */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 260 }}>
        <View style={{ width: largura, height: alturaMapa }}>
          <Svg width={largura} height={alturaMapa} style={{ position: 'absolute' }}>
            <Path d={caminho} stroke="#DDBB78" strokeWidth={50} fill="none" strokeLinecap="round" />
            <Path d={caminho} stroke="#F6DFA6" strokeWidth={40} fill="none" strokeLinecap="round" />
            <Path d={caminho} stroke="#FFFFFF" strokeOpacity={0.75} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="2 16" />
          </Svg>

          {trilha.fases.map((f, i) => (
            <View key={f.id} style={{ position: 'absolute', left: pontos[i].x - 39, top: pontos[i].y - 39, width: 78, alignItems: 'center' }}>
              <No
                numero={f.numero}
                situacao={situacoes[i]}
                estrelas={estrelas[f.id] ?? 0}
                selecionado={faseEscolhida.id === f.id}
                onPress={() => setSelecionada(f.id)}
                indice={i}
                corFeita={estilo.cor}
              />
            </View>
          ))}

          {/* Pipo esperando ao lado da fase atual */}
          <View
            style={{
              position: 'absolute',
              left: indiceAtual % 2 === 0 ? pontos[indiceAtual].x + 46 : pontos[indiceAtual].x - 136,
              top: pontos[indiceAtual].y - 56,
            }}
            pointerEvents="none"
          >
            <Pipo tamanho={92} />
          </View>
        </View>
      </ScrollView>

      {/* cartão da fase escolhida */}
      <View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          padding: 16,
          borderBottomWidth: 6,
          borderBottomColor: estilo.bordaMapa,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 54, height: 54, borderRadius: 18, backgroundColor: cores.amarelo, alignItems: 'center', justifyContent: 'center' }}>
            <Texto peso="negrito" tamanho={24} cor={cores.amareloTexto}>
              {faseEscolhida.numero}
            </Texto>
          </View>
          <View style={{ flex: 1 }}>
            <Texto peso="semi" tamanho={18}>
              {faseEscolhida.titulo}
            </Texto>
            <Texto tamanho={13} cor={cores.textoSuave}>
              {faseEscolhida.exercicios.length} perguntas
            </Texto>
          </View>
          <LinhaEstrelas cheias={estrelas[faseEscolhida.id] ?? 0} tamanho={18} />
        </View>
        <Botao3D
          cor={estilo.cor}
          corBorda={estilo.corBorda}
          altura={56}
          rotulo={`Começar a fase ${faseEscolhida.numero}`}
          onPress={() => router.push(`/fase/${faseEscolhida.id}`)}
          style={{ marginTop: 14 }}
        >
          <Texto peso="semi" tamanho={19} cor="#FFFFFF">
            {(estrelas[faseEscolhida.id] ?? 0) > 0 ? 'Jogar de novo' : 'Começar'}
          </Texto>
        </Botao3D>
      </View>
    </SafeAreaView>
  );
}
