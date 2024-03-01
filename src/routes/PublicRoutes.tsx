import { Route, Routes } from "react-router-dom";

import { LoginPage, StartPage } from "@pages/index";

const PublicRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;
