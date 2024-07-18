import './App.css';
import Header from './layouts/Header';
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import AdminPage from './components/Admin/AdminPage';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute/Index';
import AdminRoutes from './routes/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';
=======
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourtPage from './pages/CourtPage';

>>>>>>> 1e69eb5d5e34fd2252af997a64eadac1cefc00cd

function App() {
  const user = useSelector(selectUser)
  const isStaffOrAdmin = user && (user.role === 'staff' || user.role === 'Admin');
  return (
    <div>
<<<<<<< HEAD
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
=======
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/badminton-centers/:centerId' element={<CourtPage />} />
      </Routes>


>>>>>>> 1e69eb5d5e34fd2252af997a64eadac1cefc00cd
    </div>
  );
}

export default App;
