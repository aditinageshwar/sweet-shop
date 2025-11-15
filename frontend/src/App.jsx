import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === 'admin');
      } catch (err) {
        setIsLoggedIn(false);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans">
        {isLoggedIn && (
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Sweet Shop</h1>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                Logout
              </button>
            </div>
          </header>
        )}

        <Routes>
          <Route path="/" element={<Dashboard />} />  
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={ isLoggedIn && isAdmin ? <Admin /> : <Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;