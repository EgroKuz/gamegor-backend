import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SessionItem from '../components/profile/SessionItem';
import { getUserSessions, updateSession } from '../api/sessions';

const GameSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await getUserSessions();
      setSessions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to load sessions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleUpdateSession = async (id, updatedData) => {
    try {
      await updateSession(id, updatedData);
      // Optimistically update the session in the local state or refetch
      await fetchSessions();
    } catch (err) {
      console.error('Failed to update session:', err);
      alert('Failed to update session. ' + (err.response?.data?.detail || ''));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-neon-teal text-xl font-bold animate-pulse">
          Loading Game Sessions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Game Sessions
          </h2>
          <p className="text-gray-400 mt-1">
            Review your past gaming activity and personal ratings.
          </p>
        </div>
        <Link 
          to="/profile"
          className="text-gray-400 hover:text-neon-teal transition-colors font-semibold"
        >
          &larr; Back to Profile
        </Link>
      </header>

      {sessions.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
          <span className="text-6xl block mb-4">🎮</span>
          <h3 className="text-xl font-bold text-white mb-2">No Game Sessions Logged Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            It looks like you haven't recorded any gameplay sessions. Play some games and add reviews to see them here!
          </p>
          <Link 
            to="/games"
            className="inline-block mt-6 bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionItem key={session.id} session={session} onUpdate={handleUpdateSession} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameSessionsPage;
