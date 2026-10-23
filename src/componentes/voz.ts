import * as Speech from 'expo-speech';

/**
 * A voz do Pipo: lê a pergunta em português para quem ainda não sabe ler.
 * Usa a voz do próprio aparelho, então funciona sem internet.
 */
export function falar(texto: string) {
  try {
    Speech.stop();
    Speech.speak(texto, { language: 'pt-BR', rate: 0.92, pitch: 1.15 });
  } catch {
    // sem voz no aparelho: o texto continua na tela
  }
}

export function calar() {
  try {
    Speech.stop();
  } catch {
    // nada a fazer
  }
}
