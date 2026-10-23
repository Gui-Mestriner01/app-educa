import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BarraProgresso } from '../../componentes/BarraProgresso';
import { Botao3D } from '../../componentes/Botao3D';
import { Cena } from '../../componentes/Cena';
import { Texto } from '../../componentes/Texto';
import { useEntrada } from '../../componentes/useFlutuar';
import { buscarFase } from '../../conteudo';
import { calcularEstrelas, useProgresso } from '../../estado/progresso';
import { Pipo } from '../../mascote/Pipo';
import { cores, driverNativo } from '../../tema';

const CORES_NUMERO = ['#7A5AE6', '#D6417F', '#2E86C8', '#22702F'];
const CORES_BOLINHA = ['#D7CCF8', '#F9C6DB', '#C6E2F7', '#C9E8CF'];

function Alto() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M4 9.5h3.6L12 5.5v13l-4.4-4H4z" fill="#FFFFFF" />
      <Path d="M15.5 9a4.2 4.2 0 0 1 0 6" stroke="#FFFFFF" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

function Fechar() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M6 6l12 12M18 6L6 18" stroke="#8A7A62" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

/** Bolinhas embaixo do número: a criança que ainda não lê o algarismo conta as bolinhas. */
function Bolinhas({ quantidade, cor }: { quantidade: number; cor: string }) {
  if (!Number.isFinite(quantidade) || quantidade <= 0) return null;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 64 }}>
      {Array.from({ length: Math.min(quantidade, 10) }, (_, i) => (
        <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cor }} />
      ))}
    </View>
  );
}

function Opcao({
  valor,
  indice,
  errada,
  certaRevelada,
  tremer,
  onPress,
}: {
  valor: string;
  indice: number;
  errada: boolean;
  certaRevelada: boolean;
  tremer: number;
  onPress: () => void;
}) {
  const entrada = useEntrada(350 + indice * 90);
  const deslocar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tremer === 0) return;
    deslocar.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((v) =>
        Animated.timing(deslocar, { toValue: v, duration: 55, easing: Easing.linear, useNativeDriver: driverNativo }),
      ),
    ).start();
  }, [tremer, deslocar]);

  const cor = CORES_NUMERO[indice % CORES_NUMERO.length];
  return (
    <Animated.View style={[{ flex: 1 }, entrada, { transform: [...entrada.transform, { translateX: deslocar }] }]}>
      <View style={{ opacity: errada ? 0.35 : 1 }}>
      <Botao3D
        cor={certaRevelada ? cores.verdeClaro : '#FFFFFF'}
        corBorda={certaRevelada ? cores.verde : cores.bordaCartao}
        raio={24}
        altura={108}
        profundidade={6}
        desativado={errada}
        rotulo={`Resposta ${valor}`}
        onPress={onPress}
        conteudoStyle={{ gap: 6, borderWidth: 3, borderColor: certaRevelada ? cores.verde : '#F1E7D3' }}
      >
        <Texto peso="negrito" tamanho={50} cor={cor} style={{ lineHeight: 56 }}>
          {valor}
        </Texto>
        <Bolinhas quantidade={Number(valor)} cor={CORES_BOLINHA[indice % CORES_BOLINHA.length]} />
      </Botao3D>
      </View>
    </Animated.View>
  );
}

export default function TelaFase() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const achado = buscarFase(String(id));
  const registrar = useProgresso((s) => s.registrar);

  const [indice, setIndice] = useState(0);
  const [acertosPrimeira, setAcertosPrimeira] = useState(0);
  const [erradas, setErradas] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<null | 'certo' | 'errado'>(null);
  const [tremores, setTremores] = useState<Record<number, number>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  if (!achado) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Texto>Fase não encontrada.</Texto>
      </SafeAreaView>
    );
  }

  const { fase } = achado;
  const ex = fase.exercicios[indice];
  const total = fase.exercicios.length;

  function responder(j: number) {
    if (feedback === 'certo') return;
    if (timer.current) clearTimeout(timer.current);

    if (ex.opcoes[j].correta) {
      const acertou = erradas.length === 0;
      const novosAcertos = acertosPrimeira + (acertou ? 1 : 0);
      setAcertosPrimeira(novosAcertos);
      setFeedback('certo');
      timer.current = setTimeout(() => {
        if (indice + 1 >= total) {
          const estrelas = calcularEstrelas(novosAcertos, total);
          registrar(fase.id, estrelas);
          router.replace(`/conquista?fase=${fase.id}&estrelas=${estrelas}&acertos=${novosAcertos}&total=${total}`);
        } else {
          setIndice(indice + 1);
          setErradas([]);
          setFeedback(null);
          setTremores({});
        }
      }, 1100);
    } else {
      setErradas((e) => (e.includes(j) ? e : [...e, j]));
      setTremores((t) => ({ ...t, [j]: (t[j] ?? 0) + 1 }));
      setFeedback('errado');
      timer.current = setTimeout(() => setFeedback(null), 1400);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.grama }} edges={['top']}>
      {/* topo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 8 }}>
        <Botao3D cor="#FFFFFF" corBorda="rgba(0,0,0,0.15)" raio={23} altura={46} profundidade={4} rotulo="Sair da fase" onPress={() => router.back()} style={{ width: 46 }}>
          <Fechar />
        </Botao3D>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 5, paddingLeft: 5, paddingRight: 12 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF1D0', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
            <Pipo soCabeca tamanho={34} />
          </View>
          <View style={{ flex: 1 }}>
            <BarraProgresso valor={(indice + (feedback === 'certo' ? 1 : 0)) / total} />
          </View>
          <Texto peso="semi" tamanho={13} cor="#6B5B43">
            {indice + 1}/{total}
          </Texto>
        </View>
      </View>

      {/* enunciado */}
      <View style={{ alignItems: 'center', marginTop: 14, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 8, paddingLeft: 8, paddingRight: 18 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: cores.roxo, alignItems: 'center', justifyContent: 'center' }}>
            <Alto />
          </View>
          <Texto peso="semi" tamanho={17} style={{ flexShrink: 1 }}>
            {ex.enunciado}
          </Texto>
        </View>
      </View>

      {/* cena: key troca a cada pergunta para refazer a animação de entrada */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 }}>
        <Cena key={ex.id} cenario={ex.cena.cenario} figura={ex.cena.figura} quantidade={ex.cena.quantidade} altura={undefined} />
      </View>

      {/* bandeja de respostas */}
      <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 }}>
        {feedback ? (
          <Faixa tipo={feedback} />
        ) : (
          <Texto peso="semi" tamanho={13} cor={cores.textoSuave} centro style={{ letterSpacing: 0.6, height: 50, lineHeight: 50 }}>
            TOQUE NA RESPOSTA CERTA
          </Texto>
        )}
        <View key={ex.id} style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
          {ex.opcoes.map((o, j) => (
            <Opcao
              key={j}
              valor={o.valor}
              indice={j}
              errada={erradas.includes(j)}
              certaRevelada={feedback === 'certo' && o.correta}
              tremer={tremores[j] ?? 0}
              onPress={() => responder(j)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Faixa({ tipo }: { tipo: 'certo' | 'errado' }) {
  const entrada = useEntrada(0);
  const certo = tipo === 'certo';
  return (
    <Animated.View
      style={[
        {
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          borderRadius: 16,
          paddingHorizontal: 10,
          backgroundColor: certo ? cores.verdeClaro : '#FFF0D9',
        },
        entrada,
      ]}
      accessibilityLiveRegion="polite"
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#FFFFFF' }}>
        <Pipo soCabeca tamanho={38} expressao={certo ? 'feliz' : 'opa'} animado={false} />
      </View>
      <Texto peso="semi" tamanho={16} cor={certo ? cores.verdeBorda : cores.laranjaTexto}>
        {certo ? 'Muito bem!' : 'Opa, quase! Tenta de novo'}
      </Texto>
    </Animated.View>
  );
}
