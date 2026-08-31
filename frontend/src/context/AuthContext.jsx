import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/api";

const AuthContext = createContext(null);

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token]    = useState(() => localStorage.getItem("token"));
  const [role]     = useState(() => localStorage.getItem("role"));
  const [username] = useState(() => localStorage.getItem("username"));

  const login = async (username, password) => {
    const { data } = await loginService({ username, password });
    localStorage.setItem("token",    data.token);
    localStorage.setItem("role",     data.role);
    localStorage.setItem("username", data.username);
    // Recarrega para atualizar o estado global
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};