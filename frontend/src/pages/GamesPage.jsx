import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../components/games/GameCard';
import GameFormModal from '../components/games/GameFormModal';
import { getGames, updateGame, deleteGame, createGame } from '../api/games';
import { AuthContext } from '../context/AuthContext';

const GamesPage = () => {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await getGames(searchTerm);
      setGames(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timerId = setTimeout(() => {
      fetchGames();
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditOpen = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleCreateOpen = () => {
    setSelectedGame(null); // null indicates we are creating
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedGame) {
        await updateGame(selectedGame.id, formData);
      } else {
        await createGame(formData);
      }
      setShowModal(false);
      // Refresh the list to show updated data
      await fetchGames();
    } catch (err) {
      console.error('Error saving game:', err);
      alert('Failed to save game. ' + (err.response?.data?.detail || ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (game) => {
    if (window.confirm(`Are you sure you want to delete the game "${game.title}"? This action cannot be undone.`)) {
      try {
        await deleteGame(game.id);
        await fetchGames();
      } catch (err) {
        console.error('Error deleting game:', err);
        alert('Failed to delete game. ' + (err.response?.data?.detail || ''));
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Games Catalog
          </h2>
          <p className="text-gray-400">
            Browse our collection of awesome games.
          </p>
        </div>
        <div className="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-64 bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-neon-teal transition-colors"
          />
          <div className="absolute right-3 top-2.5 text-gray-500">
            🔍
          </div>
        </div>
      </header>

      {error ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
            {error}
          </div>
        </div>
      ) : loading && games.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <div className="text-neon-teal text-xl font-bold animate-pulse">
            Loading Games...
          </div>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-20 text-gray-500 italic bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
          No games found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map(game => (
            <GameCard key={game.id} game={game} onEdit={handleEditOpen} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {user?.is_staff && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateOpen}
            className="bg-neon-teal text-gray-950 px-8 py-3 rounded-xl font-bold hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Game
          </button>
        </div>
      )}

      {showModal && (
        <GameFormModal 
          game={selectedGame}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default GamesPage;
