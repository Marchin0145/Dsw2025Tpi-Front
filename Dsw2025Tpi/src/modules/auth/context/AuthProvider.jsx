import { useEffect, useState, createContext } from "react";
import { loginUser } from "../services/loginServices";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const singOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };
  const singIn = async (username, password) => {
    const { data, error } = await loginUser(username, password);
    if (error) {
      return { data: null, error };
    }

    localStorage.setItem("token", data.token);
    setIsAuthenticated(true);
    return { data, error: null };
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        singIn,
        singOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
