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

export const fontes = {
  regular: 'Fredoka_400Regular',
  media: 'Fredoka_500Medium',
  semi: 'Fredoka_600SemiBold',
  negrito: 'Fredoka_700Bold',
};

/** O driver nativo de animação não existe na web; lá o Animated roda em JavaScript. */
export const driverNativo = Platform.OS !== 'web';
