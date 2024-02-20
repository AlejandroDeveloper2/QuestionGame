import { Routes, Route, BrowserRouter } from "react-router-dom";

import { CategoriesPage, HomePage, StartPage, QuizPage } from "@pages/index";
import AdminLayout from "@layout/admin-layout/AdminLayout";
import PlayerLayout from "@layout/player-layout/PlayerLayout";

const MainRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
        </Route>
        <Route path="/quiz" element={<PlayerLayout />}>
          <Route index element={<QuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
