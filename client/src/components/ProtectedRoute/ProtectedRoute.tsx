import { Navigate, Outlet } from "react-router";
import useMe from "../../hooks/useMe";

function ProtectedRoute() {
  const { user, isLoading, error } = useMe();

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Impossible de vérifier votre authentification.</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user }} />;
}

export default ProtectedRoute;
