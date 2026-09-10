/**
 * Registro do elenco.
 *
 * Quatro expressões por personagem, conforme o roteiro. Quando a arte ainda
 * não tem uma expressão, ela aponta para a mais próxima disponível — o motor
 * nunca fica sem sprite, e a lacuna fica visível aqui em vez de virar uma
 * imagem quebrada em cena.
 */

import type { Character, CharacterId } from '@domain/types';

const P = 'personagens';

/** Repete o mesmo arquivo nas quatro expressões. Base para sobrescrever o que existe. */
const uniformSprites = (path: string): Character['sprites'] => ({
  neutral: path,
  intense: path,
  pleased: path,
  displeased: path,
});

export const CHARACTERS: Readonly<Record<CharacterId, Character>> = {
  odisseu: {
    id: 'odisseu',
    displayName: 'Odisseu',
    defaultPosition: 'left',
    sprites: {
      neutral: `${P}/odisseu/odysseu.webp`,
      intense: `${P}/odisseu/odisseu-intenso.webp`,
      pleased: `${P}/odisseu/odisseu-satisfeito.webp`,
      displeased: `${P}/odisseu/odisseu-contrariado.webp`,
    },
  },

  euriloco: {
    id: 'euriloco',
    displayName: 'Euríloco',
    defaultPosition: 'left',
    sprites: {
      neutral: `${P}/eoriluco/euriloco.webp`,
      intense: `${P}/eoriluco/euriloco-intenso.webp`,
      pleased: `${P}/eoriluco/euriloco-satisfeito.webp`,
      displeased: `${P}/eoriluco/euriloco-contrariado.webp`,
    },
  },

  tripulacao: {
    id: 'tripulacao',
    displayName: 'A Tripulação',
    defaultPosition: 'center',
    isChorus: true,
    sprites: {
      ...uniformSprites(`${P}/eoriluco/tripulacao.webp`),
      intense: `${P}/eoriluco/euriloco-bando.webp`,
      displeased: `${P}/eoriluco/euriloco-bando.webp`,
    },
  },

  atena: {
    id: 'atena',
    displayName: 'Atena',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/athena/athena.webp`,
      intense: `${P}/athena/athena-intensa.webp`,
      // O arquivo-fonte chama-se "Athana_Contente" — grafia mantida de propósito.
      pleased: `${P}/athena/athana-contente.webp`,
      displeased: `${P}/athena/athena-contrariada.webp`,
    },
  },

  polifemo: {
    id: 'polifemo',
    displayName: 'Polifemo',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/poliphemus/polyphemus-fase-2.webp`,
      intense: `${P}/poliphemus/poliphemus-bravo.webp`,
      // Um ciclope satisfeito é um ciclope que acabou de comer. Serve a mesma arte.
      pleased: `${P}/poliphemus/polyphemus-fase-2.webp`,
      displeased: `${P}/poliphemus/poliphemus-irritado.webp`,
    },
  },

  eolo: {
    id: 'eolo',
    displayName: 'Éolo',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/eolu/eolus.webp`,
      intense: `${P}/eolu/eolu-intenso.webp`,
      pleased: `${P}/eolu/eolu-satisfeito.webp`,
      displeased: `${P}/eolu/eolu-contrariado.webp`,
    },
  },

  hermes: {
    id: 'hermes',
    displayName: 'Hermes',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/hermes/hermes.webp`,
      intense: `${P}/hermes/hermes-intenso.webp`,
      pleased: `${P}/hermes/hermes-satisfeito.webp`,
      displeased: `${P}/hermes/hermes-contrariado.webp`,
    },
  },

  circe: {
    id: 'circe',
    displayName: 'Circe',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/circe/circe.webp`,
      intense: `${P}/circe/circe-intensa.webp`,
      pleased: `${P}/circe/circe-satisfeita.webp`,
      displeased: `${P}/circe/circe-contrariada.webp`,
    },
  },

  anticleia: {
    id: 'anticleia',
    displayName: 'Anticleia',
    defaultPosition: 'center',
    sprites: {
      ...uniformSprites(`${P}/anticleia/anticleia.webp`),
      pleased: `${P}/anticleia/anticleia-satisfeita.webp`,
    },
  },

  tiresias: {
    id: 'tiresias',
    displayName: 'Tirésias',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/tiresias/tiresias.webp`,
      intense: `${P}/tiresias/tiresias-intenso.webp`,
      pleased: `${P}/tiresias/tiresias-satisfeito.webp`,
      displeased: `${P}/tiresias/tiresias-nervoso.webp`,
    },
  },

  sereias: {
    id: 'sereias',
    displayName: 'As Sereias',
    defaultPosition: 'right',
    sprites: {
      ...uniformSprites(`${P}/sereias/sereias.webp`),
      pleased: `${P}/sereias/sereias-satisfeitas.webp`,
    },
  },

  scylla: {
    id: 'scylla',
    displayName: 'Scylla',
    defaultPosition: 'right',
    // Sem sprite próprio em `img/personagens`: usa a arte do covil até haver um.
    sprites: uniformSprites('cenarios/carybdis-scylla/scylla.webp'),
  },

  apolo: {
    id: 'apolo',
    displayName: 'Apolo',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/apolo/apollo.webp`,
      intense: `${P}/apolo/apollo-intenso.webp`,
      pleased: `${P}/apolo/apollo-satisfeito.webp`,
      displeased: `${P}/apolo/apollo-contrariado.webp`,
    },
  },

  calipso: {
    id: 'calipso',
    displayName: 'Calipso',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/calipso/calipso.webp`,
      intense: `${P}/calipso/calipso-intenso.webp`,
      pleased: `${P}/calipso/calipso-satisfeita.webp`,
      displeased: `${P}/calipso/calipso-contrariado.webp`,
    },
  },

  telemaco: {
    id: 'telemaco',
    displayName: 'Telêmaco',
    defaultPosition: 'center',
    sprites: {
      neutral: `${P}/telemaco/telemaco.webp`,
      intense: `${P}/telemaco/telemaco-intenso.webp`,
      pleased: `${P}/telemaco/telemaco-satisfeito.webp`,
      displeased: `${P}/telemaco/telemaco-contrariado.webp`,
    },
  },

  penelope: {
    id: 'penelope',
    displayName: 'Penélope',
    defaultPosition: 'right',
    sprites: {
      neutral: `${P}/penelope/penelope.webp`,
      intense: `${P}/penelope/penelope-intenso.webp`,
      pleased: `${P}/penelope/penelope-satisfeito.webp`,
      displeased: `${P}/penelope/penelope-contrariado.webp`,
    },
  },
};

export const getCharacter = (id: CharacterId): Character => CHARACTERS[id];
