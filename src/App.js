// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeScreen />} />
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

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

export default App;