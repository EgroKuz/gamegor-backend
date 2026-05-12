import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GamesPage from './pages/GamesPage';
import GameDetailsPage from './pages/GameDetailsPage';
import ProfilePage from './pages/ProfilePage';
import GameSessionsPage from './pages/GameSessionsPage';
import VideoContentPage from './pages/VideoContentPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <MainLayout>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
        <Route path="/games/:id" element={<ProtectedRoute><GameDetailsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/sessions" element={<ProtectedRoute><GameSessionsPage /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><VideoContentPage /></ProtectedRoute>} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

