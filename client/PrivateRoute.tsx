import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./src/context/AuthContext"; // Adjust the path based on your folder structure

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  
  const { user } = authContext;
  
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;