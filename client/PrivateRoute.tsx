import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./src/context/AuthContext";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { token } = authContext;
  
  return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
