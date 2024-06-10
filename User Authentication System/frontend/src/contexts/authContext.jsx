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
    const accessToken = sessionStorage.getItem("accessToken");
    const userData = sessionStorage.getItem("userData");

    const checkAuthStatus = async () => {
      axios
        .get(`${BASE_URL}/users/check-auth`, {
          withCredentials: true, // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => response.data)
        .then((responseData) => {
          console.log("Login success");
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

    if (accessToken && userData) checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
