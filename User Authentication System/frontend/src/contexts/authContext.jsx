import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/vars";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    userId: "",
    email: "",
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      axios
        .get(`${BASE_URL}/users/check-auth`, {
          withCredentials: true, // Include cookies in the request
        })
        .then((response) => response.data)
        .then((responseData) => {
          setAuth({
            isAuth: true,
            userId: responseData.userId,
            email: responseData.email,
          });
        })
        .catch((error) => {
          // console.log(error);
          setAuth({ isAuth: false, userId: "", email: "" });
        });
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
