import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameDetails, updateGame, deleteGame } from '../api/games';
import { createSession } from '../api/sessions';
import SessionForm from '../components/sessions/SessionForm';
import GameFormModal from '../components/games/GameFormModal';
import { AuthContext } from '../context/AuthContext';

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getGameDetails(id);
        setGame(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Failed to load game details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleAddReview = async (sessionData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const newSession = await createSession({
        ...sessionData,
        game: game.id,
      });
      setShowReviewModal(false);
      navigate(`/sessions/${newSession.id}/recommendation`);
    } catch (err) {
      setSubmitError(err.response?.data?.detail || err.response?.data?.error || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditGame = async (formData) => {
    setIsEditing(true);
    try {
      const updatedGame = await updateGame(game.id, formData);
      setGame(updatedGame);
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating game:', err);
      alert('Failed to update game. ' + (err.response?.data?.detail || ''));
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteGame = async () => {
    if (window.confirm(`Are you sure you want to delete the game "${game.title}"? This action cannot be undone.`)) {
      try {
        await deleteGame(game.id);
        navigate('/games');
      } catch (err) {
        console.error('Error deleting game:', err);
        alert('Failed to delete game. ' + (err.response?.data?.detail || ''));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-neon-teal text-xl font-bold animate-pulse">
          Loading Game Details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
          {error}
        </div>
        <Link to="/games" className="text-cyan-400 hover:underline">
          &larr; Back to Games
        </Link>
      </div>
    );
  }

  if (!game) return null;

  const formattedDate = game.release_date 
    ? new Date(game.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Unknown';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto relative">
      <Link to="/games" className="inline-flex items-center text-gray-400 hover:text-neon-teal transition-colors">
        <span className="mr-2">&larr;</span> Back to Games
      </Link>

      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col md:flex-row relative">
        {user?.is_staff && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors shadow-md text-sm font-medium flex items-center gap-2"
            >
              <span>✏️</span> Edit Game
            </button>
            <button 
              onClick={handleDeleteGame}
              className="bg-gray-800/80 backdrop-blur-sm border border-red-900/50 text-red-400 px-3 py-1.5 rounded-md hover:bg-red-900/30 hover:text-red-300 transition-colors shadow-md text-sm font-medium flex items-center gap-2"
            >
              <span>🗑️</span> Delete Game
            </button>
          </div>
        )}

        {/* Cover Image Section */}
        <div className="md:w-1/3 relative bg-gray-950 flex-shrink-0">
          {game.cover_image ? (
            <img 
              src={game.cover_image} 
              alt={`${game.title} cover`} 
              className="w-full h-full object-cover min-h-[400px]"
            />
          ) : (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-gray-600">
              <span className="text-6xl mb-4">🎮</span>
              <span>No Cover Image</span>
            </div>
          )}
          {/* Mobile gradient overlay for text readability if stacking changed later */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 md:hidden" />
        </div>

        {/* Details Section */}
        <div className="p-8 md:w-2/3 flex flex-col">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight pr-12">
            {game.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
              {game.developer || 'Unknown Developer'}
            </span>
            <span className="flex items-center gap-1">
              📅 {formattedDate}
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300">
            <h3 className="text-xl font-bold text-white mb-2 border-b border-gray-800 pb-2">About the Game</h3>
            <p className="leading-relaxed whitespace-pre-line">
              {game.description || 'No description available for this game.'}
            </p>
          </div>
          
          <div className="mt-auto pt-8 flex gap-4">
             <button 
               onClick={() => setShowReviewModal(true)}
               className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.4)]"
             >
               Add Session
             </button>
             <button onClick={() => navigate(`/videos?gameId=${game.id}`)} className="bg-gray-800 text-white border border-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors">
               View Videos
             </button>
          </div>
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-4">Add Session for {game.title}</h2>
            <SessionForm 
              onSubmit={handleAddReview} 
              onCancel={() => setShowReviewModal(false)}
              isSubmitting={isSubmitting}
              error={submitError}
            />
          </div>
        </div>
      )}

      {showEditModal && (
        <GameFormModal 
          game={game}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditGame}
          isSubmitting={isEditing}
        />
      )}
    </div>
  );
};

export default GameDetailsPage;
