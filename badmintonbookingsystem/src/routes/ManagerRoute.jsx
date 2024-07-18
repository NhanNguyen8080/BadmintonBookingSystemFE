import React from 'react';
import { Route, Routes } from "react-router-dom";
import ManagerPage from '../components/Manager/ManagerPage';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/courts" element={<ManagerPage />} />
      {/* <Route path=":productId" element={<ProductDetails />} /> */}
      <Route path="/timeslots" element={<ManagerPage />} />
    </Routes>
  );
};

export default ManagerRoutes;