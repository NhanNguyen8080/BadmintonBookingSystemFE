import './App.css';
import Header from './layouts/Header';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import AdminPage from './components/Admin/AdminPage';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute/Index';
import AdminRoutes from './routes/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const user = useSelector(selectUser)
  const isStaffOrAdmin = user && (user.role === 'staff' || user.role === 'Admin');
  return (
    <div>
      {!isStaffOrAdmin && <Header />}
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
         <Route
          path='*'
          element={<NotFoundPage />}
        />
        <Route
          path='/admin/*'
          element={
          <PrivateRoute allowedRoles={['Admin']}>
          <AdminRoutes />
         </PrivateRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
