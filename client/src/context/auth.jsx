import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const data = localStorage.getItem("auth");
      return data ? JSON.parse(data) : { user: null, token: "" };
    } catch {
      return { user: null, token: "" };
    }
  });

  
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
      axios.defaults.headers.common["Authorization"] = auth.token;
    } else {
      localStorage.removeItem("auth");
      delete axios.defaults.headers.common["Authorization"];
    }
    axios.defaults.withCredentials = true;
  }, [auth]);

  return (
    <authContext.Provider value={[ auth, setAuth ]}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
