import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let isToken = localStorage.getItem("token");
  const [token, setToken] = useState(isToken);
  const userIsLoggedin = !!token;
  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setTimeout(() => {
      localStorage.removeItem("token", 5000);
    }, 300000);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
