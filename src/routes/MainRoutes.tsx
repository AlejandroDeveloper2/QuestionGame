import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import PlayerRoutes from "./PlayerRoutes";

import useAuthStore from "@zustand/authStore";

const MainRoutes = (): JSX.Element => {
  const { isValid, refreshUserAuth } = useAuthStore();

  useEffect(() => {
    refreshUserAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <PlayerRoutes />
      <Routes>
        {!isValid ? (
          <>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/admin/*" element={<Navigate to="/login" />} />
            <Route path="/admin/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<ProtectedRoutes />} />
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/login" element={<Navigate to="/admin" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
