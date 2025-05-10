// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (email, password) => {
    // In a real app, you'd authenticate here.
    // For this simplified flow, we'll just navigate on any non-empty credentials.
    if (email && password) {
      navigate('/home');
    }
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;