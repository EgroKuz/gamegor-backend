import React, { useState, useEffect } from 'react';

const GameFormModal = ({ game, isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    developer: '',
    release_date: '',
    cover_image: '',
    description: '',
    total_achievements: 0
  });

  useEffect(() => {
    if (isOpen) {
      if (game) {
        setFormData({
          title: game.title || '',
          genre: game.genre || '',
          developer: game.developer || '',
          release_date: game.release_date || '',
          cover_image: game.cover_image || '',
          description: game.description || '',
          total_achievements: game.total_achievements || 0
        });
      } else {
        setFormData({
          title: '',
          genre: '',
          developer: '',
          release_date: '',
          cover_image: '',
          description: '',
          total_achievements: 0
        });
      }
    }
  }, [game, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = !!game;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-white">{isEditing ? `Edit Game: ${game.title}` : 'Add New Game'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="game-form" data-testid="game-form-test" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300">Genre</label>
                <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
              <div>
                <label htmlFor="developer" className="block text-sm font-medium text-gray-300">Developer</label>
                <input type="text" id="developer" name="developer" value={formData.developer} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="release_date" className="block text-sm font-medium text-gray-300">Release Date</label>
                <input type="date" id="release_date" name="release_date" value={formData.release_date} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
              <div>
                <label htmlFor="total_achievements" className="block text-sm font-medium text-gray-300">Total Achievements</label>
                <input type="number" id="total_achievements" name="total_achievements" value={formData.total_achievements} onChange={handleChange} min="0" required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
            </div>

            <div>
              <label htmlFor="cover_image" className="block text-sm font-medium text-gray-300">Cover Image URL</label>
              <input type="url" id="cover_image" name="cover_image" value={formData.cover_image} onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-800 flex justify-end gap-4 shrink-0 bg-gray-900 rounded-b-xl">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" form="game-form" disabled={isSubmitting}
            className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50">
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Game')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameFormModal;
