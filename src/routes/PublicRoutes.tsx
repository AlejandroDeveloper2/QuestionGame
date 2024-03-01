import { Route, Routes } from "react-router-dom";

import { LoginPage, QuizPage, StartPage } from "@pages/index";
import PlayerLayout from "@layout/player-layout/PlayerLayout";

const PublicRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/quiz" element={<PlayerLayout />}>
        <Route index element={<QuizPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
