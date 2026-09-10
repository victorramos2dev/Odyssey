/**
 * Tesouros da viagem — Apêndice A do roteiro.
 *
 * `partialText` é o que a carta mostra enquanto a pista está *incompleta*
 * (tesouro achado, quiz ainda não vencido). `fullText` é o que o Guardião
 * libera ao aceitar a resposta. A diferença entre os dois é o que dá sentido
 * ao ciclo de estados exigido pelo requisito 4.5.
 */

import type { Treasure, TreasureId } from '@domain/types';

/** Chave de ícone. Ver `TreasureIcon`. */
export type TreasureSymbol =
  | 'horse'
  | 'closed-eye'
  | 'wind-spiral'
  | 'white-flower'
  | 'coin'
  | 'sound-wave'
  | 'six-points'
  | 'sun'
  | 'sail';

export const TREASURES: Readonly<Record<TreasureId, Treasure>> = {
  lasca_cavalo: {
    id: 'lasca_cavalo',
    name: 'Lasca do Cavalo',
    chapter: 'troia',
    symbol: 'horse',
    chronologicalOrder: 1,
    partialText: 'Uma lasca de pinho troiano, ainda cheirando a resina.',
    fullText:
      'Da melhor mentira que já contou. Atena guardou-a como prova para o dia em que ninguém — nem a própria casa dele — acreditar que é quem diz ser.',
  },
  anel_la_carneiro: {
    id: 'anel_la_carneiro',
    name: 'Anel de lã do carneiro',
    chapter: 'ciclopes',
    symbol: 'closed-eye',
    chronologicalOrder: 2,
    partialText: 'Um anel torcido com a lã do carneiro que o carregou para fora.',
    fullText:
      'Escapou por baixo do animal, agarrado ao velo. Saiu como Ninguém e pagou o preço de voltar a ter nome.',
  },
  odre_couro: {
    id: 'odre_couro',
    name: 'Odre de couro',
    chapter: 'eolo',
    symbol: 'wind-spiral',
    chronologicalOrder: 3,
    partialText: 'Um odre de couro vazio, a boca ainda marcada pela corda de prata.',
    fullText:
      'Continha todos os ventos exceto o que levava para casa. Foi aberto a poucas braças de Ítaca — e por lealdade, não por ganância.',
  },
  ramo_moly: {
    id: 'ramo_moly',
    name: 'Ramo de moly',
    chapter: 'circe',
    symbol: 'white-flower',
    chronologicalOrder: 4,
    partialText: 'Flor branca de raiz negra, colhida por um deus porque nenhum homem consegue.',
    fullText:
      'Hermes entregou-a antes do palácio. Protege de feitiço, não de encantamento: um ano em Eeia passou como se fosse uma noite.',
  },
  obolo_caronte: {
    id: 'obolo_caronte',
    name: 'Óbolo de Caronte',
    chapter: 'hades',
    symbol: 'coin',
    chronologicalOrder: 5,
    partialText: 'Uma moeda gasta, do tipo que se põe na boca dos mortos.',
    fullText:
      'Pagou a travessia do Estige vivo. Do outro lado, a mãe dele não sabia que estava morta, e Tirésias sabia tudo o que ainda ia acontecer.',
  },
  no_cera: {
    id: 'no_cera',
    name: 'Nó de cera',
    chapter: 'sereias',
    symbol: 'sound-wave',
    chronologicalOrder: 6,
    partialText: 'Um nó de cera de abelha, endurecido no formato de um ouvido.',
    fullText:
      'Toda a tripulação ficou surda para atravessar. Só o capitão ouviu, amarrado ao mastro, e por isso é o único que sabe o que foi oferecido.',
  },
  escama: {
    id: 'escama',
    name: 'Escama',
    chapter: 'scylla',
    symbol: 'six-points',
    chronologicalOrder: 7,
    partialText: 'Uma escama larga, arrancada de algo que tinha seis pescoços.',
    fullText:
      'O preço da rota: seis homens por uma passagem. Polites, Perimedes, Antifos, Elpenor, Egíalo e Léucon. Euríloco disse o primeiro nome em voz alta.',
  },
  chifre_dourado: {
    id: 'chifre_dourado',
    name: 'Chifre dourado',
    chapter: 'trinacia',
    symbol: 'sun',
    chronologicalOrder: 8,
    partialText: 'O chifre de uma rês que não devia ter sido tocada.',
    fullText:
      'O gado era de Apolo e a fome foi mais alta que o juramento. O raio de Zeus cobrou o resto da tripulação de uma só vez.',
  },
  tabua_jangada: {
    id: 'tabua_jangada',
    name: 'Tábua da jangada',
    chapter: 'ogigia',
    symbol: 'sail',
    chronologicalOrder: 9,
    partialText: 'Uma tábua de amieiro, cortada e aplainada pelas próprias mãos.',
    fullText:
      'Sete anos numa ilha onde nada envelhece, e a resposta foi não. Recusar a imortalidade é a única astúcia que não precisou de mentira.',
  },
};

/** Ordenados pela cronologia da viagem — gabarito do enigma final. */
export const TREASURE_LIST: readonly Treasure[] = Object.values(TREASURES).sort(
  (a, b) => a.chronologicalOrder - b.chronologicalOrder,
);

export const getTreasure = (id: TreasureId): Treasure => TREASURES[id];
