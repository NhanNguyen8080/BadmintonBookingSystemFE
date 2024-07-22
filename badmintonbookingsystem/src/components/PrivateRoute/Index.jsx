import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';


function PrivateRoute({ children, allowedRoles }) {
  const user = useSelector(selectUser)

  if (!user) {
    // alert('You do not have permission');
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // alert('You do not have permission');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;