/** Prólogo — abertura da aventura. Roteiro, seção PRÓLOGO. */

import type { SceneNode } from '@domain/types';

export const PROLOGUE_NODES: readonly SceneNode[] = [
  { kind: 'background', background: 'mar_noite' },

  {
    kind: 'narration',
    lines: [
      'Conta-se que há homens que os deuses amam.',
      'Conta-se também que há homens que os deuses não conseguem esquecer.',
      'Este é sobre um deles.',
    ],
  },
  {
    kind: 'narration',
    lines: [
      'Vinte anos. Dez de guerra, dez de mar.',
      'Uma ilha à espera. Uma mulher à espera. Um filho que já não é criança.',
      'E entre ele e tudo isso: o oceano inteiro, e a memória rancorosa de um deus.',
    ],
  },
  {
    kind: 'narration',
    lines: [
      'Ele tem um nome, e o nome é conhecido em toda a Grécia.',
      'Guarde-o. Haverá um momento nesta história em que dá-lo será a coisa mais perigosa que ele pode fazer.',
    ],
  },

  { kind: 'tutorial' },
];
