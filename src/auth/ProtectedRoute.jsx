import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from './AuthContext.jsx';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Remember where they were headed so login can send them back.
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}