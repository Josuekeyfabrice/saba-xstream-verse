
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
