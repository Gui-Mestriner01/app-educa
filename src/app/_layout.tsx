import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts,
} from '@expo-google-fonts/fredoka';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { cores } from '../tema';

SplashScreen.preventAutoHideAsync();

/**
 * O app é sempre claro. Sem isto, o "modo escuro automático" de alguns navegadores
 * (Chrome, Samsung Internet) inverte as cores sozinho e deixa o Pipo com olhos brancos.
 * No celular instalado, quem trava o modo claro é o "userInterfaceStyle": "light" do app.json.
 */
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.style.colorScheme = 'only light';
  const meta = document.createElement('meta');
  meta.name = 'color-scheme';
  meta.content = 'only light';
  document.head.appendChild(meta);
}

export default function Layout() {
  const [carregou, erro] = useFonts({ Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold });

  useEffect(() => {
    if (carregou || erro) SplashScreen.hideAsync();
  }, [carregou, erro]);

  if (!carregou && !erro) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: cores.fundo }, animation: 'slide_from_right' }} />
    </>
  );
}
