import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  requireOwner?: boolean;
  requireManager?: boolean;
  requireStaff?: boolean;
}

const ProtectedRoute = ({ children, requireOwner, requireManager, requireStaff }: ProtectedRouteProps & { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#FFF5F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-400"></div>
    </div>
  );

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOwner && user.role !== 'OWNER') return <Navigate to="/" replace />;
  if (requireManager && !['OWNER', 'MANAGER'].includes(user.role)) return <Navigate to="/" replace />;
  if (requireStaff && !['OWNER', 'MANAGER', 'STAFF'].includes(user.role)) return <Navigate to="/" replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
