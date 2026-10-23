# App Educa

App educativo infantil com o Pipo, a capivara. Feito em **React Native + Expo**, com **TypeScript**.

## Como rodar no seu Windows

1. **Instale o Node.js LTS**, se ainda não tiver: https://nodejs.org (versão "LTS").
   Para conferir, abra o terminal e rode `node -v`.
2. **Instale o Expo Go no celular** (Play Store ou App Store).
3. No terminal, dentro desta pasta:

   ```bash
   npm install
   npx expo start
   ```

4. Vai aparecer um QR code. No Android, abra o Expo Go e escaneie. No iPhone, use a câmera.
   O celular e o computador precisam estar **na mesma rede Wi‑Fi**.

Para ver no navegador do computador: `npx expo start --web`.

> Os pacotes (`node_modules`) não vieram junto de propósito: eles precisam ser instalados no próprio Windows pelo `npm install`.

## O que já funciona

- **Início**: Pipo acenando, missão do dia, total de estrelas e as quatro trilhas (só Números liberada).
- **Mapa da trilha**: estrada com as fases, estrelas de cada fase, fase atual pulando, Pipo ao lado e fases seguintes bloqueadas.
- **Fase**: cena ilustrada com os bichinhos animados, pergunta, três respostas com bolinhas para contar.
  Errou → o cartão treme, apaga e o Pipo diz "Opa, quase!". Acertou → "Muito bem!" e próxima pergunta.
- **Fase completa**: 1 a 3 estrelas conforme os acertos de primeira, confete, Pipo comemorando.
- **Conteúdo**: 5 fases de Números, 16 exercícios, em `src/conteudo/numeros.json`.

## Como o projeto está organizado

```
src/
├─ app/                 Telas (cada arquivo é uma rota do Expo Router)
│  ├─ index.tsx         Início
│  ├─ trilha/[id].tsx   Mapa da trilha
│  ├─ fase/[id].tsx     Os exercícios de uma fase
│  └─ conquista.tsx     Tela de fase completa
├─ conteudo/
│  ├─ schema.ts         Formato de um exercício (validado com Zod)
│  └─ numeros.json      Os exercícios da trilha Números
├─ estado/progresso.ts  Estrelas por fase (Zustand)
├─ mascote/Pipo.tsx     O Pipo: pisca, flutua e muda de expressão
├─ figuras/             Ovelha, patinho, laranja, sapo, pintinho
├─ componentes/         Botão 3D, cena, barra, estrelas, texto, animações
└─ tema/                Cores e fontes oficiais
```

## Como criar um exercício novo

Não precisa programar: abra `src/conteudo/numeros.json` e copie um exercício existente, mudando o texto, a figura e a quantidade.

```json
{
  "id": "num-1-5",
  "formato": "escolher",
  "habilidade": "contar-ate-3",
  "enunciado": "Quantos pintinhos tem aqui?",
  "cena": { "cenario": "pasto", "figura": "pintinho", "quantidade": 2 },
  "opcoes": [
    { "valor": "1", "correta": false },
    { "valor": "2", "correta": true },
    { "valor": "3", "correta": false }
  ]
}
```

- `figura`: `ovelha`, `patinho`, `laranja`, `sapo` ou `pintinho`
- `cenario`: `pasto`, `lagoa` ou `pomar`

Se você errar alguma coisa, o app avisa ao abrir. Por exemplo: duas respostas marcadas como certas, ou a resposta certa não bater com a quantidade desenhada.

## Comandos úteis

| Comando | O que faz |
| --- | --- |
| `npx expo start` | Abre o servidor para testar no celular |
| `npm run typecheck` | Confere os tipos do TypeScript |
| `npx expo install <pacote>` | Instala uma biblioteca na versão certa para esta versão do Expo |

## Próximos passos

1. Salvar o progresso no aparelho (`expo-sqlite`) — hoje as estrelas somem ao fechar o app
2. Narração em áudio dos enunciados
3. Trilhas de Letras, Formas e Animais
4. Área dos responsáveis
