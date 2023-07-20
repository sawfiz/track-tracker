import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


export const ProtectedRoute = ({children, roles}) => {
  console.log("🚀 ~ file: ProtectedRoute.jsx:7 ~ ProtectedRoute ~ roles:", roles)
  const { isLoggedIn, userInfo } = useContext(UserContext);
  console.log("🚀 ~ file: ProtectedRoute.jsx:8 ~ ProtectedRoute ~ isLoggedIn:", isLoggedIn)

  console.log("🚀 ~ file: ProtectedRoute.jsx:14 ~ ProtectedRoute ~ userInfo.role:", userInfo.role)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoggedIn && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

    return children ? children : <Outlet />;
};
