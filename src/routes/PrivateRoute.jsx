import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';

export function PrivateRoute({ children, isAdmin }) {
  const { userInfo, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin && !userInfo.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;