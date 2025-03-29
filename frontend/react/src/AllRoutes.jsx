import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './About'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AllRoutes