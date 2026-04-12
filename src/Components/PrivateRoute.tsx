import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
