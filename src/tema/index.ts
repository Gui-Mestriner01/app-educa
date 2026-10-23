import { Platform } from 'react-native';

/** Paleta oficial do app. Uma cor por função — nunca use hex solto nas telas. */
export const cores = {
  fundo: '#FFF4D6',
  creme: '#FFF7E3',
  branco: '#FFFFFF',
  texto: '#3B2E1E',
  textoSuave: '#6E6049',
  borda: '#EED9A8',
  bordaCartao: '#E3D6BA',

  verde: '#2F8F45',
  verdeBorda: '#22702F',
  verdeClaro: '#E3F4E1',
  azul: '#1D74B8',
  azulBorda: '#165A90',
  roxo: '#6A4FD0',
  roxoBorda: '#543CAC',
  roxoClaro: '#EEE9FC',
  amarelo: '#FFC93C',
  amareloBorda: '#E0A91B',
  amareloTexto: '#5C3D06',
  laranja: '#FF9F43',
  laranjaTexto: '#B85A12',
  vermelho: '#E85A4F',
  rosa: '#D6417F',

  ceu: '#A5DEF6',
  grama: '#8FD46F',
  gramaEscura: '#7CC45C',
  agua: '#86CCEC',
  bloqueado: '#D6CFC0',
  bloqueadoBorda: '#BDB4A2',
};

/** Cores das formas geométricas: [face, borda/sombra]. */
export const coresForma = {
  vermelho: ['#EF5B4F', '#C23F35'],
  azul: ['#3D8FE0', '#2A6DB3'],
  amarelo: ['#FFCB3C', '#DDA415'],
  verde: ['#4CB861', '#33914A'],
  roxo: ['#8A6BE8', '#6649C4'],
  laranja: ['#FF9A3D', '#D97A1E'],
  rosa: ['#FF7FAE', '#DB5A8C'],
} as const;

/** Cada trilha tem seu "mundo": cor do botão, do mapa e do fundo das fases. */
export type EstiloTrilha = {
  cor: string;
  corBorda: string;
  fundoMapa: string;
  bordaMapa: string;
  fundoFase: string;
  palco: string;
  tituloMapa: string;
};

export const estilosTrilha: Record<string, EstiloTrilha> = {
  numeros: { cor: cores.verde, corBorda: cores.verdeBorda, fundoMapa: '#A4DB86', bordaMapa: '#7FB866', fundoFase: cores.grama, palco: '#F1FAE9', tituloMapa: 'Fazendinha dos Números' },
  letras: { cor: cores.azul, corBorda: cores.azulBorda, fundoMapa: '#9ED3F3', bordaMapa: '#5FA4D4', fundoFase: '#8BCBF0', palco: '#EEF8FF', tituloMapa: 'Jardim das Letras' },
  formas: { cor: cores.roxo, corBorda: cores.roxoBorda, fundoMapa: '#C6B7F5', bordaMapa: '#8E78DE', fundoFase: '#B7A5F1', palco: '#F6F2FF', tituloMapa: 'Parque das Formas' },
  animais: { cor: '#E07A22', corBorda: '#B45E14', fundoMapa: '#F6D27E', bordaMapa: '#D3A43C', fundoFase: '#F4C860', palco: '#FFF8E6', tituloMapa: 'Floresta dos Animais' },
};

export function estiloDa(trilhaId: string | undefined): EstiloTrilha {
  return estilosTrilha[trilhaId ?? ''] ?? estilosTrilha.numeros;
}

export const fontes = {
  regular: 'Fredoka_400Regular',
  media: 'Fredoka_500Medium',
  semi: 'Fredoka_600SemiBold',
  negrito: 'Fredoka_700Bold',
};

/** O driver nativo de animação não existe na web; lá o Animated roda em JavaScript. */
export const driverNativo = Platform.OS !== 'web';
