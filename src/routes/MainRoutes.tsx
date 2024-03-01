import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const MainRoutes = (): JSX.Element => {
  const isAuth = true;
  return (
    <BrowserRouter>
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<ProtectedRoutes />} />
            <Route path="/*" element={<Navigate to="/admin" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
