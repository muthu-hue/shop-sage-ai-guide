import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('shopsage_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('shopsage_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check stored users or use demo credentials
    const storedUsers = JSON.parse(localStorage.getItem('shopsage_users') || '[]');
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
    
    // Demo credentials
    if (email === 'demo@shopsage.ai' && password === 'demo123') {
      const demoUser = { id: 'demo', email: 'demo@shopsage.ai', name: 'Demo User' };
      setUser(demoUser);
      localStorage.setItem('shopsage_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return true;
    }
    
    if (foundUser) {
      const userSession = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userSession);
      localStorage.setItem('shopsage_user', JSON.stringify(userSession));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('shopsage_users') || '[]');
    
    // Check if user already exists
    if (storedUsers.find((u: any) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('shopsage_users', JSON.stringify(storedUsers));
    
    // Auto login after registration
    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userSession);
    localStorage.setItem('shopsage_user', JSON.stringify(userSession));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopsage_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};