import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1>Game Aggregator</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/" className="mr-4 hover:underline">Dashboard</Link>
              <button onClick={logout} className="hover:underline bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
