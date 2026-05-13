import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameDetails } from '../api/games';
import { createSession } from '../api/sessions';
import SessionForm from '../components/sessions/SessionForm';

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
      await createSession({
        ...sessionData,
        game: game.id,
      });
      setShowReviewModal(false);
      navigate('/');
    } catch (err) {
      setSubmitError(err.response?.data?.detail || err.response?.data?.error || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
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

      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col md:flex-row">
        {/* Cover Image Section */}
        <div className="md:w-1/3 relative bg-gray-950 flex-shrink-0">
          {game.cover_image_url ? (
            <img 
              src={game.cover_image_url} 
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
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
            <p className="leading-relaxed">
              {game.description || 'No description available for this game.'}
            </p>
          </div>
          
          <div className="mt-auto pt-8 flex gap-4">
             <button 
               onClick={() => setShowReviewModal(true)}
               className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.4)]"
             >
               Add Review
             </button>
             <button className="bg-gray-800 text-white border border-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors">
               View Videos
             </button>
          </div>
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-4">Add Review for {game.title}</h2>
            <SessionForm 
              onSubmit={handleAddReview} 
              onCancel={() => setShowReviewModal(false)}
              isSubmitting={isSubmitting}
              error={submitError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetailsPage;
