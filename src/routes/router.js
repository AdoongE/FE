import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Sidebar from '../components/Sidebar.js';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
