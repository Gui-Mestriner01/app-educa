import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Botao3D } from '../componentes/Botao3D';
import { Estrela } from '../componentes/Estrela';
import { BarraProgresso } from '../componentes/BarraProgresso';
import { Texto } from '../componentes/Texto';
import { useEntrada } from '../componentes/useFlutuar';
import { TRILHAS } from '../conteudo';
import { situacoesDaTrilha, totalEstrelas, useProgresso } from '../estado/progresso';
import { Pipo } from '../mascote/Pipo';
import { cores } from '../tema';

type CartaoTrilha = {
  id: string;
  nome: string;
  cor: string;
  corBorda: string;
  icone: ReactNode;
  disponivel: boolean;
  detalhe: string;
};

function Cadeado() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Rect x={5} y={10.5} width={14} height={10} rx={3} fill="#FFFFFF" />
      <Path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" stroke="#FFFFFF" strokeWidth={2.4} fill="none" />
    </Svg>
  );
}

function IconeForma() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M12 3 L21 19 H3 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

function IconePata() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M12 11c3.3 0 5.6 2.6 5.6 4.9 0 1.8-1.6 2.9-3.4 2.6-1.5-.3-2.9-.3-4.4 0-1.8.3-3.4-.8-3.4-2.6C6.4 13.6 8.7 11 12 11z" fill="#FFFFFF" />
      <Circle cx={7} cy={9.5} r={2.2} fill="#FFFFFF" />
      <Circle cx={12} cy={7} r={2.3} fill="#FFFFFF" />
      <Circle cx={17} cy={9.5} r={2.2} fill="#FFFFFF" />
    </Svg>
  );
}

function Cartao({ c, indice }: { c: CartaoTrilha; indice: number }) {
  const entrada = useEntrada(150 + indice * 80);
  return (
    <Animated.View style={[{ width: '48%' }, entrada]}>
      <Botao3D
        cor={c.disponivel ? c.cor : cores.bloqueado}
        corBorda={c.disponivel ? c.corBorda : cores.bloqueadoBorda}
        raio={24}
        altura={128}
        rotulo={c.disponivel ? `Trilha ${c.nome}` : `Trilha ${c.nome}, em breve`}
        desativado={!c.disponivel}
        onPress={() => router.push(`/trilha/${c.id}`)}
        conteudoStyle={{ alignItems: 'flex-start', justifyContent: 'space-between', padding: 14 }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.25)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {c.disponivel ? c.icone : <Cadeado />}
        </View>
        <View>
          <Texto peso="semi" tamanho={18} cor="#FFFFFF">
            {c.nome}
          </Texto>
          <Texto peso="media" tamanho={12} cor="#FFFFFF">
            {c.detalhe}
          </Texto>
        </View>
      </Botao3D>
    </Animated.View>
  );
}

export default function Inicio() {
  const estrelas = useProgresso((s) => s.estrelasPorFase);
  const numeros = TRILHAS[0];
  const situacoes = situacoesDaTrilha(numeros, estrelas);
  const feitas = situacoes.filter((s) => s === 'feita').length;
  const missao = Math.min(feitas, 3);

  const cartoes: CartaoTrilha[] = [
    {
      id: 'numeros',
      nome: 'Números',
      cor: cores.verde,
      corBorda: cores.verdeBorda,
      icone: <Texto peso="negrito" tamanho={15} cor="#FFFFFF">123</Texto>,
      disponivel: true,
      detalhe: `Fase ${Math.min(feitas + 1, numeros.fases.length)} de ${numeros.fases.length}`,
    },
    { id: 'letras', nome: 'Letras', cor: cores.azul, corBorda: cores.azulBorda, icone: <Texto peso="negrito" tamanho={16} cor="#FFFFFF">Aa</Texto>, disponivel: false, detalhe: 'Em breve' },
    { id: 'formas', nome: 'Formas', cor: cores.roxo, corBorda: cores.roxoBorda, icone: <IconeForma />, disponivel: false, detalhe: 'Em breve' },
    { id: 'animais', nome: 'Animais', cor: cores.amarelo, corBorda: cores.amareloBorda, icone: <IconePata />, disponivel: false, detalhe: 'Em breve' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.fundo }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Cena do topo com o Pipo */}
        <View style={{ backgroundColor: '#8FD3F4', borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden' }}>
          <Svg width="100%" height={110} viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
            <Path d="M0 14 C 25 4, 55 8, 75 12 C 88 15, 95 10, 100 9 L100 30 L0 30 Z" fill="#B4E59B" />
            <Path d="M0 22 C 30 16, 65 18, 100 20 L100 30 L0 30 Z" fill="#7FCF6E" />
          </Svg>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, gap: 10 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
              <Pipo soCabeca tamanho={44} />
            </View>
            <View style={{ flex: 1 }}>
              <Texto peso="semi" tamanho={20} cor="#0E3A52">
                Oi, amiguinho!
              </Texto>
              <Texto tamanho={13} cor="#1B4F69">
                Vamos aprender brincando?
              </Texto>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 }}>
              <Estrela tamanho={17} />
              <Texto peso="semi" tamanho={15}>
                {totalEstrelas(estrelas)}
              </Texto>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 12, paddingTop: 8, height: 190 }}>
            <Pipo expressao="acenando" tamanho={170} />
            <View style={{ flex: 1, marginBottom: 86, marginLeft: -6, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 12 }}>
              <Texto peso="semi" tamanho={15}>
                Tem ovelhinha na fazenda! Bora contar?
              </Texto>
            </View>
          </View>
        </View>

        {/* Missão do dia */}
        <View style={{ marginHorizontal: 20, marginTop: -18, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, borderBottomWidth: 6, borderBottomColor: cores.borda }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Texto peso="semi" tamanho={16}>
                Missão de hoje
              </Texto>
              <Texto tamanho={12} cor={cores.textoSuave}>
                Complete 3 fases
              </Texto>
            </View>
            <Texto peso="negrito" tamanho={16} cor={cores.laranjaTexto}>
              {missao}/3
            </Texto>
          </View>
          <BarraProgresso valor={missao / 3} cor={cores.laranja} fundo="#FFF0D9" />
        </View>

        {/* Trilhas */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 24, marginBottom: 12 }}>
          <View style={{ width: 5, height: 20, borderRadius: 3, backgroundColor: '#4FA8E8' }} />
          <Texto peso="semi" tamanho={19}>
            Trilhas
          </Texto>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14, marginHorizontal: 20 }}>
          {cartoes.map((c, i) => (
            <Cartao key={c.id} c={c} indice={i} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
