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
import ManagerRoutes from './routes/ManagerRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import BookingList from './components/Payment/BookingsList';
import CheckoutBooking from './components/Payment/CheckoutBooking';
import BookingSuccess from './components/Payment/BookingSuccess';
import BookingCancel from './components/Payment/BookingCancel';


function App() {
  const user = useSelector(selectUser)
  const isStaffOrAdminOrManager = user && (user.role === 'staff' || user.role === 'Admin' || user.role === 'Manager');
  return (
    <div>
      {!isStaffOrAdminOrManager && <Header />}
      <Routes>
        <Route
          path='/*'
          element={
            <ProtectedRoute exceptdRoles={['Admin', 'Manager']}>
              <HomePage />
            </ProtectedRoute>}
        />
        <Route path='/badminton-centers/:centerId' element={<CourtPage />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/checkout/:bookingId" element={<CheckoutBooking/>} />
        <Route path="/booking_success" element={<BookingSuccess />} />
        <Route path="/booking_cancel" element={<BookingCancel />} />
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
        <Route
          path='/manager/*'
          element={
            <PrivateRoute allowedRoles={['Manager']}>
              <ManagerRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
