// Libraries
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Contexts
import { UserContext } from '../contexts/UserContext';

export const ProtectedRoute = ({children, roles}) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoggedIn && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

    return children ? children : <Outlet />;
};
