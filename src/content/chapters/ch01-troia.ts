/**
 * Capítulo I — Troia.
 *
 * Guardiã: Atena · Tesouro: Lasca do Cavalo · Tema do quiz: A Guerra de Troia
 *
 * Transcrição direta do roteiro v1.1. Nenhuma fala foi reescrita: o que muda é
 * só o formato, de marcação para dados.
 */

import type { Chapter } from '@domain/types';

export const CHAPTER_TROIA: Chapter = {
  id: 'troia',
  order: 1,
  numeral: 'I',
  title: 'Troia',
  guardian: 'atena',
  treasure: 'lasca_cavalo',
  quizTheme: 'A Guerra de Troia',
  tagline: 'A cidade arde. A deusa quer saber se a fama corresponde ao homem.',
  mapCoordinates: { x: 12, y: 26 },
  thumbnail: 'muralhas_troia_amanhecer',
  unlocks: 'ciclopes',

  nodes: [
    { kind: 'checkpoint', chapter: 'troia' },
    { kind: 'background', background: 'muralhas_troia_amanhecer' },

    {
      kind: 'narration',
      lines: [
        'Fumaça. A cidade que resistiu dez anos arde desde a madrugada.',
        'Sobre os escombros, um homem observa a própria obra com o cuidado de quem confere um nó.',
      ],
    },
    {
      kind: 'speech',
      speaker: 'odisseu',
      expression: 'pleased',
      lines: [
        'Dez anos de lanças. Dez anos de homens melhores que eu morrendo no pó desta planície.',
        'E no fim... madeira. Madeira e paciência.',
      ],
    },
    {
      kind: 'speech',
      speaker: 'odisseu',
      expression: 'neutral',
      lines: [
        'Aquiles teria rido de mim. Ájax teria cuspido.',
        'Mas nenhum dos dois está aqui para ver as portas abertas.',
      ],
    },

    { kind: 'background', background: 'muralhas_troia_luz_dourada' },

    {
      kind: 'narration',
      lines: [
        'A fumaça à sua frente se recusa a dispersar. Ela se adensa, toma forma, ganha o brilho frio do bronze polido.',
      ],
    },
    { kind: 'speech', speaker: 'atena', expression: 'neutral', lines: ['Não. Ele não teria rido.'] },
    { kind: 'speech', speaker: 'odisseu', expression: 'intense', lines: ['...Senhora.'] },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'neutral',
      lines: ['Levante-se, filho de Laertes. Não vim colher reverências.', 'Vim colher uma dúvida.'],
    },
    { kind: 'speech', speaker: 'odisseu', expression: 'neutral', lines: ['Dúvida, senhora?'] },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'displeased',
      lines: [
        'Toda a Grécia repete que Odisseu é o mais astuto dos homens.',
        'A fama é uma criatura curiosa. Cresce sozinha, come sozinha, e raramente se parece com aquele que a gerou.',
      ],
    },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'neutral',
      lines: ['Então eu pergunto: o cavalo foi obra da tua mente... ou do teu desespero?'],
    },
    { kind: 'speech', speaker: 'odisseu', expression: 'displeased', lines: ['Há diferença?'] },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'pleased',
      lines: ['Toda.', 'O desespero acerta uma vez. A mente acerta sempre.'],
    },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'intense',
      lines: ['Prove-me qual dos dois te trouxe até aqui. Responde.'],
    },

    {
      kind: 'quiz',
      guardian: 'atena',
      altar: {
        deity: 'atena',
        offerings: ['Azeite', 'Cevada', 'Ramo de oliveira'],
        reproach: [
          'Eu esperava mais.',
          'Não de um herói. De um homem que se diz pensante.',
          'Faça a oferenda. E pense antes de falar, desta vez.',
        ],
      },
      questions: [
        {
          id: 'troia-q1',
          prompt: 'Qual deusa **não** disputou o Pomo da Discórdia?',
          correctAnswerId: 'artemis',
          answers: [
            { id: 'hera', label: 'Hera' },
            { id: 'afrodite', label: 'Afrodite' },
            { id: 'atena', label: 'Atena' },
            { id: 'artemis', label: 'Ártemis' },
          ],
          explanation:
            'O pomo, inscrito "à mais bela", foi disputado por Hera, Atena e Afrodite. Páris escolheu Afrodite — e ganhou Helena, e Troia ganhou uma guerra.',
        },
        {
          id: 'troia-q2',
          prompt: 'Que guerreiro grego era invulnerável, exceto por um ponto do corpo?',
          correctAnswerId: 'aquiles',
          answers: [
            { id: 'ajax', label: 'Ájax' },
            { id: 'aquiles', label: 'Aquiles' },
            { id: 'diomedes', label: 'Diomedes' },
            { id: 'agamemnon', label: 'Agamêmnon' },
          ],
          explanation:
            'Tétis mergulhou o filho no Estige segurando-o pelo calcanhar. A água protegeu tudo o que tocou.',
        },
        {
          id: 'troia-q3',
          prompt: 'Que princesa troiana profetizava a verdade sem jamais ser acreditada?',
          correctAnswerId: 'cassandra',
          answers: [
            { id: 'helena', label: 'Helena' },
            { id: 'andromaca', label: 'Andrômaca' },
            { id: 'cassandra', label: 'Cassandra' },
            { id: 'briseida', label: 'Briseida' },
          ],
          explanation:
            'Apolo deu-lhe a profecia; ao ser recusado, acrescentou a maldição da descrença. Ela avisou sobre o cavalo. Ninguém ouviu.',
        },
      ],
    },

    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'pleased',
      lines: ['Bom.', 'A fama não te inventou. Isso é raro.'],
    },
    {
      kind: 'narration',
      lines: [
        'Ela se abaixa entre os escombros e recolhe uma lasca de madeira — pinho troiano, ainda cheirando a resina.',
      ],
    },

    { kind: 'treasure', treasure: 'lasca_cavalo' },

    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'neutral',
      lines: ['Leve isto. Da tua melhor mentira.'],
    },
    {
      kind: 'speech',
      speaker: 'odisseu',
      expression: 'neutral',
      lines: ['Um pedaço de madeira, senhora?'],
    },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'pleased',
      lines: [
        'Um pedaço de prova.',
        'Haverá um dia, muito longe daqui, em que ninguém acreditará que és quem dizes ser. Nem tua própria casa.',
      ],
    },

    { kind: 'clue', treasure: 'lasca_cavalo' },

    {
      kind: 'speech',
      speaker: 'odisseu',
      expression: 'displeased',
      lines: ['Falas como se a viagem de volta fosse longa. Ítaca está a poucos dias de mar.'],
    },
    { kind: 'speech', speaker: 'atena', expression: 'neutral', lines: ['Está.'] },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'displeased',
      lines: ['Poseidon é que não está de acordo.'],
    },
    { kind: 'speech', speaker: 'odisseu', expression: 'intense', lines: ['Senhora—'] },
    {
      kind: 'speech',
      speaker: 'atena',
      expression: 'neutral',
      lines: [
        'Boa viagem, Odisseu.',
        'Volta a olhar para esta lasca quando o mar te ensinar humildade. Ela vai lembrar-te de que já foste esperto uma vez.',
      ],
    },
    {
      kind: 'narration',
      lines: [
        'Ela se desfaz na luz.',
        'Ele guarda a lasca no cinto sem entender por quê. Levará vinte anos para entender.',
      ],
    },

    { kind: 'background', background: 'praia_troia' },

    {
      kind: 'narration',
      lines: [
        'Na praia, o navio já está carregado. Um homem de barba grisalha espera junto à prancha, contando cabeças pela terceira vez.',
      ],
    },
    {
      kind: 'speech',
      speaker: 'euriloco',
      expression: 'neutral',
      lines: ['Quarenta e seis. Contei três vezes, capitão, e três vezes deu quarenta e seis.'],
    },
    {
      kind: 'speech',
      speaker: 'odisseu',
      expression: 'pleased',
      lines: ['Então estão todos.'],
    },
    {
      kind: 'speech',
      speaker: 'euriloco',
      expression: 'pleased',
      lines: [
        'Estão todos. Dez anos de guerra e estão todos.',
        'Vamos para casa antes que alguém lá em cima mude de ideia.',
      ],
    },

    { kind: 'crew', count: 46, note: 'A tripulação parte inteira de Troia.' },

    { kind: 'narration', lines: ['Alguém lá em cima já mudou.'] },
  ],
};
