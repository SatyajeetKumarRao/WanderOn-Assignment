import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { PrivateRoute };
