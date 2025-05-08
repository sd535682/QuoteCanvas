import {createContext, ReactNode, useEffect, useState} from 'react';
import {getToken, removeToken, saveToken} from '../utils/authStorage';
import {
  AuthResponse,
  Login,
  Logout,
  Register,
  validateToken,
} from '../services/authAPI';

export interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export default function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        console.log('token', token);
        await validateToken(token).then(res => {
          if (res.valid) {
            setUser(res.user);
          }
        });
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data: AuthResponse = await Login(email, password);
    await saveToken(data.data.token);
    console.log('data.data.token', data.data.token);
    setUser(data.data.user);
    console.log('User logged in:', data.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data: AuthResponse = await Register(name, email, password);
    await saveToken(data.data.token);
    setUser(data.data.user);
    console.log('User registered:', data.data.user);
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
    await Logout();
  };

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
