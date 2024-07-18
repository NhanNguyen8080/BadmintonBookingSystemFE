import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminPage from '../components/Admin/AdminPage';

const AdminRoutes = () => {
    return (
      <Routes>
        <Route path="/accounts" element={<AdminPage />} />
        {/* <Route path=":productId" element={<ProductDetails />} /> */}
        <Route path="/centers" element={<AdminPage />} />
      </Routes>
    );
  };
  
  export default AdminRoutes;