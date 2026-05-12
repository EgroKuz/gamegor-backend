import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1>Game Aggregator</h1>
        <nav>
          <Link to="/" className="mr-4 hover:underline">Dashboard</Link>
          <Link to="/login" className="mr-4 hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
