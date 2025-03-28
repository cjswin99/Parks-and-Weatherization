import { createContext, useState, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  token: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to sign up.");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.username);
    setToken(data.token);
    setUser(data.user.username);
    navigate("/park");
  };

  const login = async (username: string, email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Invalid credentials.");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.username);
    setToken(data.token);
    setUser(data.user.username);
    navigate("/park");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
