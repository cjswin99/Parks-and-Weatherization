import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, email: string, password: string) => {
    // Simulate an API call to authenticate the user and get a JWT
    // Replace this with your actual API call:
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      // Assume response contains { token: string, user: string }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error during login in AuthContext:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
