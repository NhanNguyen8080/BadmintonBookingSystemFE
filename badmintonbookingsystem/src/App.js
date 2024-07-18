import './App.css';
import Header from './layouts/Header';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute/Index';
import AdminRoutes from './routes/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';
import CourtPage from './pages/CourtPage';


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
        <Route path='/badminton-centers/:centerId' element={<CourtPage />} />
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
