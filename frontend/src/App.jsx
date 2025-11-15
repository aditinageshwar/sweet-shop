import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Header from './components/Header'; 
import Footer from './components/Footer';

function App() {
  const navigateTo = useNavigate();
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
    navigateTo('/login');
  };


  return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 font-sans flex flex-col">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard />} />  
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/admin" element={ isLoggedIn && isAdmin ? <Admin /> : <Navigate to="/dashboard" />} />
        </Routes>
        <Footer isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      </div>
  );
}

export default App;