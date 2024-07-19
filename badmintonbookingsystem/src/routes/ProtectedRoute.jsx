import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../redux/slices/authSlice';


function ProtectedRoute({ children, exceptdRoles }) {
  const user = useSelector(selectUser)
  if (user != null) {
    if (exceptdRoles.includes(user.role)) {
      if (user.role === 'Manager') {
        return <Navigate to="/manager/courts" replace />;
      }
      else if (user.role === 'Admin') {
        return <Navigate to="/admin/centers" replace />;

      }
    }
  }


  return children;
}

export default ProtectedRoute;