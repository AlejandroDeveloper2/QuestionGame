import { Route, Routes } from "react-router-dom";
import PlayerLayout from "@layout/player-layout/PlayerLayout";

import { QuizPage } from "@pages/index";

const PlayerRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/quiz" element={<PlayerLayout />}>
        <Route index element={<QuizPage />} />
      </Route>
    </Routes>
  );
};

export default PlayerRoutes;
