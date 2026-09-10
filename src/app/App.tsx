/**
 * Raiz da aplicação.
 *
 * Só monta: provedor de estado, roteador e o mapa de rotas. Nenhuma regra de
 * jogo vive aqui.
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ConnectionBanner } from '@components/feedback/ConnectionBanner/ConnectionBanner.tsx';
import { ChapterScreen } from '@screens/ChapterScreen/ChapterScreen.tsx';
import { EndingScreen } from '@screens/EndingScreen/EndingScreen.tsx';
import { HomeScreen } from '@screens/HomeScreen/HomeScreen.tsx';
import { InventoryScreen } from '@screens/InventoryScreen/InventoryScreen.tsx';
import { MapScreen } from '@screens/MapScreen/MapScreen.tsx';
import { PrologueScreen } from '@screens/PrologueScreen/PrologueScreen.tsx';
import { RiddleScreen } from '@screens/RiddleScreen/RiddleScreen.tsx';
import { TutorialScreen } from '@screens/TutorialScreen/TutorialScreen.tsx';

import { GameProvider } from './providers/GameProvider.tsx';
import { CHAPTER_ROUTE_PATTERN, ROUTES } from './router/routes.ts';

export function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<HomeScreen />} />
          <Route path={ROUTES.prologue} element={<PrologueScreen />} />
          <Route path={ROUTES.tutorial} element={<TutorialScreen />} />
          <Route path={ROUTES.map} element={<MapScreen />} />
          <Route path={CHAPTER_ROUTE_PATTERN} element={<ChapterScreen />} />
          <Route path={ROUTES.inventory} element={<InventoryScreen />} />
          <Route path={ROUTES.riddle} element={<RiddleScreen />} />
          <Route path={ROUTES.ending} element={<EndingScreen />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </BrowserRouter>

      <ConnectionBanner />
    </GameProvider>
  );
}
