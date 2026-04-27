import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'

import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>

      {/* TOP NAVBAR */}
      <Navbar />
      <hr />

      {/* MAIN LAYOUT */}
      <div className="app-content">

        {/* SIDEBAR */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <div className="content">

          <Routes>

            {/* DEFAULT REDIRECT */}
            <Route path="/" element={<Navigate to="/add" />} />

            {/* PAGES */}
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order url={url} />} />

            {/* 404 fallback */}
            <Route path="*" element={<h2>Page Not Found</h2>} />

          </Routes>

        </div>

      </div>

    </div>
  )
}

export default App