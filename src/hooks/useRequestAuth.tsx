import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/UserAuthProvider';

export const useRequireAuth = (redirectUrl: string = '/login') => {
  console.log('useRequireAuth');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      void navigate(redirectUrl, { replace: true });
    }
  }, [user, navigate, redirectUrl]);

  return user;
};
