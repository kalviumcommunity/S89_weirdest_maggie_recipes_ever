import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import About from './About';
import AddEntity from './components/AddEntity';
import UpdateEntity from './components/UpdateEntity';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/add-entity" element={<AddEntity />} />
      <Route path="/update-entity" element={<UpdateEntity />} />
    </Routes>
  );
};

export default AllRoutes;