import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import App from './App'; 

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} /> {/* Render RecipeCard components on the home page */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AllRoutes;