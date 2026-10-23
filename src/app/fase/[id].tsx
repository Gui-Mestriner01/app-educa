import { router, useLocalSearchParams } from 'expo-router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BarraProgresso } from '../../componentes/BarraProgresso';
import { Botao3D } from '../../componentes/Botao3D';
import { Palco } from '../../componentes/Palco';
import { Texto } from '../../componentes/Texto';
import { useEntrada } from '../../componentes/useFlutuar';
import { descrever, Visual } from '../../componentes/Visual';
import { calar, falar } from '../../componentes/voz';
import { buscarFase, ExercicioEscolher, ExercicioTocarTodos } from '../../conteudo';
import { Visual as TipoVisual } from '../../conteudo/schema';
import { calcularEstrelas, useProgresso } from '../../estado/progresso';
import { Pipo } from '../../mascote/Pipo';
import { cores, driverNativo, estiloDa, EstiloTrilha } from '../../tema';

function Alto() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M4 9.5h3.6L12 5.5v13l-4.4-4H4z" fill="#FFFFFF" />
      <Path d="M15.5 9a4.2 4.2 0 0 1 0 6" stroke="#FFFFFF" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <Path d="M18 6.5a7.6 7.6 0 0 1 0 11" stroke="#FFFFFF" strokeWidth={2.2} fill="none" strokeLinecap="round" />
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

function Certinho() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M5 12.5l4.5 4.5L19 7.5" stroke="#FFFFFF" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Treme de um lado para o outro sempre que `vezes` aumenta. */
function useTremer(vezes: number) {
  const deslocar = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (vezes === 0) return;
    deslocar.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((v) => Animated.timing(deslocar, { toValue: v, duration: 55, easing: Easing.linear, useNativeDriver: driverNativo })),
    ).start();
  }, [vezes, deslocar]);
  return deslocar;
}

type Retornos = { faixa: ReactNode; travado: boolean; onErro: () => void; onCerto: () => void; estilo: EstiloTrilha };

/* ---------------------------------------------------------------- escolher uma resposta */

function Opcao({
  v,
  indice,
  errada,
  certaRevelada,
  tremer,
  altura,
  onPress,
}: {
  v: TipoVisual;
  indice: number;
  errada: boolean;
  certaRevelada: boolean;
  tremer: number;
  altura: number;
  onPress: () => void;
}) {
  const entrada = useEntrada(350 + indice * 90);
  const deslocar = useTremer(tremer);
  const tamanho = v.tipo === 'grupo' ? altura * 0.86 : Math.min(altura * 0.74, 84);

  return (
    <Animated.View style={[{ flexGrow: 1, flexBasis: 0 }, entrada, { transform: [...entrada.transform, { translateX: deslocar }] }]}>
      <View style={{ opacity: errada ? 0.35 : 1 }}>
        <Botao3D
          cor={certaRevelada ? cores.verdeClaro : '#FFFFFF'}
          corBorda={certaRevelada ? cores.verde : cores.bordaCartao}
          raio={24}
          altura={altura}
          profundidade={6}
          desativado={errada}
          rotulo={`Resposta ${descrever(v)}`}
          onPress={onPress}
          conteudoStyle={{ borderWidth: 3, borderColor: certaRevelada ? cores.verde : '#F1E7D3', overflow: 'hidden' }}
        >
          <Visual v={v} tamanho={tamanho} indice={indice} />
        </Botao3D>
      </View>
    </Animated.View>
  );
}

function ExEscolher({ ex, faixa, travado, onErro, onCerto, estilo }: Retornos & { ex: ExercicioEscolher }) {
  const [erradas, setErradas] = useState<number[]>([]);
  const [tremores, setTremores] = useState<Record<number, number>>({});
  const [acertou, setAcertou] = useState(false);

  function responder(j: number) {
    if (travado || acertou) return;
    if (ex.opcoes[j].correta) {
      setAcertou(true);
      onCerto();
    } else {
      setErradas((e) => (e.includes(j) ? e : [...e, j]));
      setTremores((t) => ({ ...t, [j]: (t[j] ?? 0) + 1 }));
      onErro();
    }
  }

  const quatro = ex.opcoes.length === 4;
  const temImagem = ex.opcoes.some((o) => o.tipo === 'figura' || o.tipo === 'grupo');
  const altura = quatro ? 92 : temImagem ? 118 : 108;
  const linhas = quatro ? [ex.opcoes.slice(0, 2), ex.opcoes.slice(2)] : [ex.opcoes];

  return (
    <>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 }}>
        <Palco mostrar={ex.mostrar} estilo={estilo} />
      </View>
      <Bandeja>
        {faixa ?? <Dica texto="TOQUE NA RESPOSTA CERTA" />}
        <View style={{ gap: 12, marginTop: 10 }}>
          {linhas.map((linha, l) => (
            <View key={l} style={{ flexDirection: 'row', gap: 12 }}>
              {linha.map((o, k) => {
                const j = l * 2 + k;
                return (
                  <Opcao
                    key={j}
                    v={o}
                    indice={j}
                    altura={altura}
                    errada={erradas.includes(j)}
                    certaRevelada={acertou && o.correta}
                    tremer={tremores[j] ?? 0}
                    onPress={() => responder(j)}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </Bandeja>
    </>
  );
}

/* ---------------------------------------------------------------- achar e tocar em todos */

function ItemCaca({
  v,
  indice,
  tamanho,
  achado,
  tremer,
  onPress,
}: {
  v: TipoVisual;
  indice: number;
  tamanho: number;
  achado: boolean;
  tremer: number;
  onPress: () => void;
}) {
  const entrada = useEntrada(200 + indice * 80);
  const deslocar = useTremer(tremer);
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!achado) return;
    pop.setValue(0.75);
    Animated.spring(pop, { toValue: 1, friction: 4, tension: 160, useNativeDriver: driverNativo }).start();
  }, [achado, pop]);

  return (
    <Animated.View style={[entrada, { transform: [...entrada.transform, { translateX: deslocar }, { scale: pop }] }]}>
      <Pressable
        onPress={onPress}
        disabled={achado}
        accessibilityRole="button"
        accessibilityLabel={`Item ${descrever(v)}${achado ? ', achado' : ''}`}
        style={{ width: tamanho, height: tamanho + 6, borderRadius: 22, backgroundColor: achado ? cores.verde : '#E8DCC2' }}
      >
        <View
          style={{
            width: tamanho,
            height: tamanho,
            borderRadius: 22,
            backgroundColor: achado ? cores.verdeClaro : '#FFFFFF',
            borderWidth: 3,
            borderColor: achado ? cores.verde : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Visual v={v} tamanho={tamanho * 0.7} indice={indice} bolinhas={false} />
        </View>
        {achado && (
          <View style={{ position: 'absolute', right: -6, top: -6, width: 28, height: 28, borderRadius: 14, backgroundColor: cores.verde, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' }}>
            <Certinho />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

function ExTocarTodos({ ex, faixa, travado, onErro, onCerto, estilo }: Retornos & { ex: ExercicioTocarTodos }) {
  const { width } = useWindowDimensions();
  const [achados, setAchados] = useState<number[]>([]);
  const [tremores, setTremores] = useState<Record<number, number>>({});
  const total = ex.itens.filter((i) => i.alvo).length;
  const colunas = 3;
  const tamanho = Math.min(104, (Math.min(width, 520) - 32 - 28 - (colunas - 1) * 14) / colunas);

  function tocar(j: number) {
    if (travado || achados.includes(j) || achados.length === total) return;
    if (ex.itens[j].alvo) {
      const novos = [...achados, j];
      setAchados(novos);
      if (novos.length === total) onCerto();
    } else {
      setTremores((t) => ({ ...t, [j]: (t[j] ?? 0) + 1 }));
      onErro();
    }
  }

  return (
    <>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 }}>
        <View style={{ flex: 1, borderRadius: 28, backgroundColor: estilo.palco, alignItems: 'center', justifyContent: 'center', padding: 14 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 14, maxWidth: colunas * tamanho + (colunas - 1) * 14 }}>
            {ex.itens.map((item, j) => (
              <ItemCaca
                key={j}
                v={item}
                indice={j}
                tamanho={tamanho}
                achado={achados.includes(j)}
                tremer={tremores[j] ?? 0}
                onPress={() => tocar(j)}
              />
            ))}
          </View>
        </View>
      </View>
      <Bandeja>
        {faixa ?? <Dica texto="ACHE TODOS E TOQUE NELES" />}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10, height: 60 }}>
          {Array.from({ length: total }, (_, i) => (
            <View
              key={i}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: i < achados.length ? cores.verde : '#F1E7D3',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i < achados.length && <Certinho />}
            </View>
          ))}
          <Texto peso="semi" tamanho={16} cor={cores.textoSuave} style={{ marginLeft: 6 }}>
            {achados.length} de {total}
          </Texto>
        </View>
      </Bandeja>
    </>
  );
}

/* ---------------------------------------------------------------- tela */

function Bandeja({ children }: { children: ReactNode }) {
  return <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 }}>{children}</View>;
}

function Dica({ texto }: { texto: string }) {
  return (
    <Texto peso="semi" tamanho={13} cor={cores.textoSuave} centro style={{ letterSpacing: 0.6, height: 50, lineHeight: 50 }}>
      {texto}
    </Texto>
  );
}

export default function TelaFase() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const achado = buscarFase(String(id));
  const registrar = useProgresso((s) => s.registrar);

  const [indice, setIndice] = useState(0);
  const [acertosPrimeira, setAcertosPrimeira] = useState(0);
  const [errouNesta, setErrouNesta] = useState(false);
  const [feedback, setFeedback] = useState<null | 'certo' | 'errado'>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ex = achado?.fase.exercicios[indice];

  // o Pipo lê a pergunta sozinho a cada exercício novo
  useEffect(() => {
    if (ex) falar(ex.fala ?? ex.enunciado);
  }, [ex]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      calar();
    },
    [],
  );

  if (!achado || !ex) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Texto>Fase não encontrada.</Texto>
      </SafeAreaView>
    );
  }

  const { fase, trilha } = achado;
  const estilo = estiloDa(trilha.id);
  const total = fase.exercicios.length;

  function onErro() {
    if (timer.current) clearTimeout(timer.current);
    setErrouNesta(true);
    setFeedback('errado');
    timer.current = setTimeout(() => setFeedback(null), 1400);
  }

  function onCerto() {
    if (timer.current) clearTimeout(timer.current);
    const novosAcertos = acertosPrimeira + (errouNesta ? 0 : 1);
    setAcertosPrimeira(novosAcertos);
    setFeedback('certo');
    falar('Muito bem!');
    timer.current = setTimeout(() => {
      if (indice + 1 >= total) {
        const estrelas = calcularEstrelas(novosAcertos, total);
        registrar(fase.id, estrelas);
        router.replace(`/conquista?fase=${fase.id}&estrelas=${estrelas}&acertos=${novosAcertos}&total=${total}`);
      } else {
        setIndice(indice + 1);
        setErrouNesta(false);
        setFeedback(null);
      }
    }, 1200);
  }

  const retornos: Retornos = {
    faixa: feedback ? <Faixa tipo={feedback} /> : null,
    travado: feedback === 'certo',
    onErro,
    onCerto,
    estilo,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: estilo.fundoFase }} edges={['top']}>
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

      {/* enunciado: tocar no alto-falante repete a pergunta */}
      <View style={{ alignItems: 'center', marginTop: 14, paddingHorizontal: 16 }}>
        <Pressable
          onPress={() => falar(ex.fala ?? ex.enunciado)}
          accessibilityRole="button"
          accessibilityLabel={`Ouvir de novo: ${ex.enunciado}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 8, paddingLeft: 8, paddingRight: 18 }}
        >
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: estilo.cor, alignItems: 'center', justifyContent: 'center' }}>
            <Alto />
          </View>
          <Texto peso="semi" tamanho={17} style={{ flexShrink: 1 }}>
            {ex.enunciado}
          </Texto>
        </Pressable>
      </View>

      {/* key troca a cada pergunta: o exercício começa do zero e refaz as animações */}
      {ex.formato === 'escolher' ? <ExEscolher key={ex.id} ex={ex} {...retornos} /> : <ExTocarTodos key={ex.id} ex={ex} {...retornos} />}
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
