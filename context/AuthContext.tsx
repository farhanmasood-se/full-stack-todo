'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth as clerkAuth } from '@clerk/nextjs';
import User from '@/lib/models/user.modal';
import { getUserByClerkId } from '@/lib/actions/user.action';

type AuthContextData = {
  user?: typeof User | null | undefined;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { userId } = clerkAuth();

  const [user, setUser] = useState<typeof User>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const user = await getUserByClerkId(userId);
        setUser(user);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
