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

Quatro trilhas liberadas, **22 fases e 88 exercícios**:

| Trilha | Fases | O que a criança faz |
| --- | --- | --- |
| **Números** | 7 | Contar bichinhos, achar onde tem mais/menos, que número vem depois, caçar números |
| **Letras** | 5 | Vogais, letra inicial (G_ATO), caça-letras, maiúscula e minúscula, primeiras palavras |
| **Formas** | 5 | Nomes das formas, cores, caça-formas, sequências (o que vem depois?), lados e pontas |
| **Animais** | 5 | Quem faz esse som?, caça-bichos (4 patas, quem nada), curiosidades, grande e pequeno |

- **Dois tipos de atividade**: *escolher* (2 a 4 respostas: números, letras, bichinhos, formas ou grupinhos) e
  *tocar em todos* (achar todos os itens certos no meio dos outros).
- **O Pipo lê a pergunta em voz alta** sozinho e de novo quando a criança toca no alto-falante (voz do próprio aparelho, sem internet).
- Cada trilha tem seu mundo: cor, mapa e fundo próprios.
- **Errou** → o cartão treme, apaga e o Pipo diz "Opa, quase!". **Acertou** → "Muito bem!" e próxima.
- **Fase completa**: 1 a 3 estrelas conforme os acertos de primeira, confete, Pipo comemorando.
- 15 figuras: ovelha, patinho, laranja, sapo, pintinho, abelha, banana, cachorro, gato, vaca, porco, peixe, uva, elefante e ioiô.
- 7 formas com rostinho (círculo, quadrado, triângulo, retângulo, estrela, coração, losango) em 7 cores.

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
│  └─ *.json            Os exercícios: numeros, letras, formas, animais
├─ estado/progresso.ts  Estrelas por fase (Zustand)
├─ mascote/Pipo.tsx     O Pipo: pisca, flutua e muda de expressão
├─ figuras/             Os 15 bichinhos e objetos desenhados
├─ componentes/         Palco, formas, voz do Pipo, botão 3D, cena, barra, estrelas, animações
└─ tema/                Cores e fontes oficiais
```

## Como criar um exercício novo

Não precisa programar: abra o arquivo da trilha em `src/conteudo/` (`numeros.json`, `letras.json`,
`formas.json` ou `animais.json`), copie um exercício parecido e troque o que quiser.

**Escolher a resposta** — `mostrar` é o que aparece no meio da tela:

```json
{
  "id": "let-2-6",
  "formato": "escolher",
  "habilidade": "letra-inicial",
  "enunciado": "Com que letra começa GATO?",
  "fala": "Gato. Com que letra começa gato?",
  "mostrar": { "tipo": "figura", "figura": "gato", "palavra": "_ATO" },
  "opcoes": [
    { "tipo": "texto", "valor": "G", "correta": true },
    { "tipo": "texto", "valor": "B", "correta": false },
    { "tipo": "texto", "valor": "P", "correta": false }
  ]
}
```

**Tocar em todos**:

```json
{
  "id": "for-3-4",
  "formato": "tocar-todos",
  "habilidade": "achar-forma",
  "enunciado": "Toque em todos os corações",
  "itens": [
    { "tipo": "forma", "forma": "coracao", "cor": "rosa", "alvo": true },
    { "tipo": "forma", "forma": "circulo", "cor": "azul", "alvo": false },
    { "tipo": "forma", "forma": "coracao", "cor": "vermelho", "alvo": true }
  ]
}
```

- O que pode ir em `mostrar`: `cena` (cenário com bichinhos para contar), `figura` (com `palavra` opcional; `_` vira `?`),
  `letra`, `forma`, `sequencia` (fileira terminando em `?`), `som` (balão tipo "MUUU!") e `pipo` (o Pipo com uma fala).
- O que pode ser resposta ou item: `numero`, `texto`, `figura`, `forma` ou `grupo` (vários bichinhos iguais).
- `figura`: `ovelha`, `patinho`, `laranja`, `sapo`, `pintinho`, `abelha`, `banana`, `cachorro`, `gato`, `vaca`, `porco`, `peixe`, `uva`, `elefante`, `ioio`
- `forma`: `circulo`, `quadrado`, `triangulo`, `retangulo`, `estrela`, `coracao`, `losango`
- `cor`: `vermelho`, `azul`, `amarelo`, `verde`, `roxo`, `laranja`, `rosa`
- `fala` é opcional: é o que o Pipo fala em voz alta. Sem ela, ele lê o `enunciado`.

Se você errar alguma coisa, o app avisa ao abrir. Por exemplo: duas respostas marcadas como certas,
ou a resposta certa não bater com a quantidade desenhada.

## Comandos úteis

| Comando | O que faz |
| --- | --- |
| `npx expo start` | Abre o servidor para testar no celular |
| `npm run typecheck` | Confere os tipos do TypeScript |
| `npx expo install <pacote>` | Instala uma biblioteca na versão certa para esta versão do Expo |

## Próximos passos

1. Salvar o progresso no aparelho (`expo-sqlite`) — hoje as estrelas somem ao fechar o app
2. Novas atividades a cada 4 dias
3. Área dos responsáveis
