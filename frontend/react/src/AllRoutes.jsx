import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import About from './About';
import AddEntity from './components/AddEntity';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/add-entity" element={<AddEntity />} />
    </Routes>
  );
};

export default AllRoutes;