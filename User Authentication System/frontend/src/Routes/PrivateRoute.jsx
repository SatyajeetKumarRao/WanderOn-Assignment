import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  const accessToken = sessionStorage.getItem("accessToken");
  const userData = sessionStorage.getItem("userData");

  if (auth.isAuth || (accessToken && userData)) {
    return children;
  }

  return <Navigate to="/login" />;
};

export { PrivateRoute };
