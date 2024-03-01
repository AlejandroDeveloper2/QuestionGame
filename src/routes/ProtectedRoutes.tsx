import { Route, Routes } from "react-router-dom";

import AdminLayout from "@layout/admin-layout/AdminLayout";

import { CategoriesPage, HomePage } from "@pages/index";

const ProtectedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
