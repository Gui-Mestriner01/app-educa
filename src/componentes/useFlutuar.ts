import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { driverNativo } from '../tema';

/**
 * Sobe e desce em loop. Devolve um estilo pronto para um Animated.View.
 * `atraso` em milissegundos desencontra vários elementos na mesma tela.
 */
export function useFlutuar(altura = 6, duracao = 1600, atraso = 0) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: duracao, easing: Easing.inOut(Easing.sin), useNativeDriver: driverNativo }),
        Animated.timing(v, { toValue: 0, duration: duracao, easing: Easing.inOut(Easing.sin), useNativeDriver: driverNativo }),
      ]),
    );
    const t = setTimeout(() => loop.start(), atraso);
    return () => {
      clearTimeout(t);
      loop.stop();
    };
  }, [v, duracao, atraso]);

  return { transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -altura] }) }] };
}

/** Entrada com "pop": começa pequeno e cresce passando um pouco do tamanho. */
export function useEntrada(atraso = 0) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(v, { toValue: 1, delay: atraso, friction: 5, tension: 120, useNativeDriver: driverNativo }).start();
  }, [v, atraso]);

  return {
    opacity: v.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] }),
    transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
  };
}
