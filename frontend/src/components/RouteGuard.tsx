import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RouteGuard = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // If user is logged in and tries to go to login, send them to their dashboard
      if (location.pathname === '/login') {
         const target = user.role === 'OWNER' ? '/owner/dashboard' : 
                      user.role === 'MANAGER' ? '/manager/customers/new' : '/staff/customers/new';
         navigate(target);
      }
    }
  }, [user, loading, location.pathname, navigate]);

  return null;
};
