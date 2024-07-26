import { useQuery } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "src/components/modules/Loader";
import PageNotFound from "src/pages/404";
import AdminPage from "src/pages/AdminPage";
import AuthPage from "src/pages/AuthPage";
import DashboardPage from "src/pages/DashboardPage";
import HomePage from "src/pages/HomePage";
import { getProfile } from "src/services/user";

function Router() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  if (isLoading) return <Loader/>;
  // console.log({ data, error });
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
