import { useEffect, useState, createContext, useContext } from "react";
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
    localStorage.setItem("user",username);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
