'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { User } from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Create context to share user data
const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = getToken();
      
      if (!token) {
        if (isMounted) {
          router.push('/login');
        }
        return;
      }

      try {
        const response = await authAPI.getMe();
        if (isMounted) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (isMounted) {
          router.push('/login');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

