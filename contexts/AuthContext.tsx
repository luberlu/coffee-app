import { createContext, useContext, useState, ReactNode } from 'react';
import { TokenResponse } from 'expo-auth-session';

export type AuthTokens = TokenResponse | null;
export type SetAuthTokens = (tokens: AuthTokens) => void;

export interface AuthContextType {
  authTokens: AuthTokens;
  setAuthTokens: SetAuthTokens;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authTokens, setAuthTokens] = useState<AuthTokens>(null);

  const value = {
    authTokens,
    setAuthTokens,
    isAuthenticated: !!authTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 