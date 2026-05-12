import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GamesPage from './pages/GamesPage';
import GameDetailsPage from './pages/GameDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
        <Route path="/games/:id" element={<ProtectedRoute><GameDetailsPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

