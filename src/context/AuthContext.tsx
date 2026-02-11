import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  setUser: (name: string | null) => void;
  login: (fullName: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('userName')
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  const login = useCallback((fullName: string, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', fullName);
    setUser(fullName);
    setIsAuthenticated(true);
    navigate('/tasks');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/signin');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
