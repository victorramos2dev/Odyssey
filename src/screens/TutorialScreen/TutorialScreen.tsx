/**
 * Tela de Tutorial — seção 7 do PDF.
 * Explicação das regras, objetivos da missão e orientações de navegação.
 */

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes.ts';
import { Button } from '@components/ui/Button/Button.tsx';
import { Screen } from '@components/layout/Screen/Screen.tsx';
import { useGame } from '@hooks/useGame.ts';

import styles from './TutorialScreen.module.css';

interface Rule {
  readonly title: string;
  readonly body: string;
}

const RULES: readonly Rule[] = [
  {
    title: 'Podes sair e voltar',
    body: 'Abrir o mapa ou o inventário no meio de uma cena não te faz perder o lugar. Voltas exatamente onde paraste — só entrar noutro capítulo pelo mapa troca o marcador.',
  },
  {
    title: 'A viagem é sequencial',
    body: 'Dez pontos, um de cada vez. O seguinte só abre quando o atual estiver concluído. O mapa mostra a trilha inteira desde o começo — para que saibas o tamanho do que tens pela frente.',
  },
  {
    title: 'Cada ponto tem um Guardião',
    body: 'Um deus, um monstro ou um morto faz três perguntas sobre mitologia. Acertar as três liberta a pista completa e desbloqueia o próximo local.',
  },
  {
    title: 'Errar o quiz nunca mata',
    body: 'O Guardião ofende-se e exige uma oferenda no altar: arrasta as três oferendas que ele pede, na ordem certa. Feito o ritual, as perguntas recomeçam. Não há limite de tentativas.',
  },
  {
    title: 'Escolher errado, sim',
    body: 'As decisões de Odisseu — o que oferecer, que nome dar, dormir ou vigiar — podem partir o fio. As Moiras reatam-no e a cena recomeça no início do capítulo.',
  },
  {
    title: 'As pistas nunca se perdem',
    body: 'Morrer devolve-te ao checkpoint com o inventário intacto. Nada do que já recolheste volta atrás. Nunca.',
  },
  {
    title: 'A tripulação só desce',
    body: 'Partem quarenta e seis homens de Troia. O número no alto da tela não sobe nunca — não há reforços nem resgates.',
  },
  {
    title: 'O enigma final',
    body: 'Concluídos os dez pontos, ordena os nove tesouros pelos machados na ordem cronológica da viagem. A flecha só atravessa quando a jornada estiver contada certa.',
  },
];

const CONTROLS: readonly [string, string][] = [
  ['Clique · Espaço · Enter · →', 'Avança a fala'],
  ['Tab · Shift + Tab', 'Percorre os controles'],
  ['Espaço sobre uma peça', 'Pega e solta ao arrastar'],
  ['Alt + ↑ ↓', 'Move uma pista no inventário'],
  ['Escape', 'Cancela o arrasto em curso'],
];

export function TutorialScreen() {
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const beginAdventure = () => {
    dispatch({ type: 'tutorial/seen' });
    void navigate(ROUTES.map);
  };

  return (
    <Screen
      eyebrow="Antes de zarpar"
      title="Como se joga"
      lead="Vinte anos de mar cabem em oito regras."
      background="menu_mapa"
      actions={
        <Button variant="primary" size="lg" onClick={beginAdventure}>
          Ao mapa
        </Button>
      }
    >
      <div className={styles['layout']}>
        <ol className={styles['rules']}>
          {RULES.map((rule, position) => (
            <li key={rule.title} className={styles['rule']}>
              <span className={styles['ordinal']} aria-hidden="true">
                {position + 1}
              </span>
              <div>
                <h2 className={styles['ruleTitle']}>{rule.title}</h2>
                <p className={styles['ruleBody']}>{rule.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className={styles['controls']} aria-labelledby="controls-title">
          <h2 id="controls-title" className={styles['controlsTitle']}>
            Teclado
          </h2>
          <dl className={styles['controlList']}>
            {CONTROLS.map(([keys, meaning]) => (
              <div key={keys} className={styles['control']}>
                <dt className={styles['keys']}>{keys}</dt>
                <dd className={styles['meaning']}>{meaning}</dd>
              </div>
            ))}
          </dl>
          <p className={styles['note']}>
            Tudo o que se arrasta com o mouse também se move pelo teclado. Nenhuma parte da
            aventura exige apontador.
          </p>
        </aside>
      </div>
    </Screen>
  );
}
