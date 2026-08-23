import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, SignupData, UserRole } from '@/types/auth';
import { DEMO_USERS, DEFAULT_DEMO_USER } from '@/data/mockUsers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  loginDemo: (userIndex?: number) => Promise<void>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUser: (userId: string) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'kneesight_auth_user';
const REMEMBER_KEY = 'kneesight_auth_remember';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // If user had "remember me" checked previously, default to demo user for smooth first-run dev experience
      const remember = localStorage.getItem(REMEMBER_KEY);
      if (remember === 'true') {
        return DEFAULT_DEMO_USER;
      }
    } catch {
      // Fallback
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean = true) => {
    setIsLoading(true);
    // Simulate network authentication latency
    await new Promise((resolve) => setTimeout(resolve, 750));

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Please provide both email and password.' };
    }

    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Match existing demo user or generate a session user
    const matchedUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    const authenticatedUser: User = matchedUser || {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: 'Orthopedic Surgeon' as UserRole,
      organization: 'Clinical Affiliate Hospital',
      initials: email.slice(0, 2).toUpperCase(),
      status: 'online',
    };

    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, 'true');
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    setUser(authenticatedUser);
    setIsLoading(false);
    return { success: true };
  }, []);

  const loginDemo = useCallback(async (userIndex: number = 0) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const targetUser = DEMO_USERS[userIndex] || DEFAULT_DEMO_USER;
    localStorage.setItem(REMEMBER_KEY, 'true');
    setUser(targetUser);
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!data.name || !data.email || !data.password) {
      setIsLoading(false);
      return { success: false, error: 'All required fields must be completed.' };
    }

    if (data.password !== data.confirmPassword) {
      setIsLoading(false);
      return { success: false, error: 'Passwords do not match.' };
    }

    const nameParts = data.name.trim().split(' ');
    const initials = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : data.name.slice(0, 2).toUpperCase();

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.startsWith('Dr.') ? data.name : `Dr. ${data.name}`,
      email: data.email,
      role: data.role || 'Orthopedic Surgeon',
      organization: data.organization || 'Memorial Health Center',
      initials,
      status: 'online',
    };

    localStorage.setItem(REMEMBER_KEY, 'true');
    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }, []);

  const switchUser = useCallback((userId: string) => {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginDemo,
        signup,
        logout,
        switchUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
