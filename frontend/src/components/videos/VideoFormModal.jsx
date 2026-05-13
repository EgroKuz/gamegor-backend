import React, { useState, useEffect } from 'react';
import { getGames } from '../../api/games';
import { getAuthors } from '../../api/videos';

const VIDEO_TYPES = [
  { value: 'guide', label: 'Гайд' },
  { value: 'analysis', label: 'Разбор' },
  { value: 'news', label: 'Новости' },
  { value: 'stream', label: 'Стрим' },
  { value: 'tip', label: 'Лайфхак' },
];

const VideoFormModal = ({ video, isOpen, onClose, onSubmit, isSubmitting }) => {
  const [games, setGames] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail: '',
    video_type: 'guide',
    duration: 0,
    tags: '',
    uploaded_at: new Date().toISOString().slice(0, 16),
    author: '',
    game: '',
    moderated: true
  });

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const gamesData = await getGames();
        const authorsData = await getAuthors();
        setGames(gamesData);
        setAuthors(authorsData);
      } catch (err) {
        console.error('Failed to load games/authors for select fields');
      }
    };
    if (isOpen) fetchSelectData();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (video) {
        setFormData({
          title: video.title || '',
          url: video.url || '',
          thumbnail: video.thumbnail || '',
          video_type: video.video_type || 'guide',
          duration: video.duration || 0,
          tags: Array.isArray(video.tags) ? video.tags.join(', ') : (video.tags || ''),
          uploaded_at: video.uploaded_at ? new Date(video.uploaded_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
          author: video.author || '',
          game: video.game || '',
          moderated: video.moderated !== undefined ? video.moderated : true
        });
      } else {
        setFormData({
          title: '',
          url: '',
          thumbnail: '',
          video_type: 'guide',
          duration: 0,
          tags: '',
          uploaded_at: new Date().toISOString().slice(0, 16),
          author: '',
          game: '',
          moderated: true
        });
      }
    }
  }, [video, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    // Split comma separated tags
    submitData.tags = submitData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    // Ensure author and game are integers or null
    submitData.author = submitData.author ? parseInt(submitData.author, 10) : null;
    submitData.game = submitData.game ? parseInt(submitData.game, 10) : null;

    if (!submitData.author) {
      alert('Author is required');
      return;
    }

    onSubmit(submitData);
  };

  const isEditing = !!video;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-white">{isEditing ? `Edit Video: ${video.title}` : 'Add New Video'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="video-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300">Video URL</label>
                <input type="url" id="url" name="url" value={formData.url} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-300">Thumbnail URL</label>
                <input type="url" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">Author</label>
                <select id="author" name="author" value={formData.author} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal">
                  <option value="">Select Author...</option>
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="game" className="block text-sm font-medium text-gray-300">Game (Optional)</label>
                <select id="game" name="game" value={formData.game} onChange={handleChange}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal">
                  <option value="">No Game</option>
                  {games.map(g => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="video_type" className="block text-sm font-medium text-gray-300">Video Type</label>
                <select id="video_type" name="video_type" value={formData.video_type} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal">
                  {VIDEO_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} min="0" required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
              <div>
                <label htmlFor="uploaded_at" className="block text-sm font-medium text-gray-300">Uploaded At</label>
                <input type="datetime-local" id="uploaded_at" name="uploaded_at" value={formData.uploaded_at} onChange={handleChange} required
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma separated)</label>
              <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. guide, dark souls, boss fight"
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal" />
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" id="moderated" name="moderated" checked={formData.moderated} onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-neon-teal focus:ring-neon-teal focus:ring-offset-gray-900" />
              <label htmlFor="moderated" className="ml-2 block text-sm text-gray-300">
                Moderated (Visible to users)
              </label>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-800 flex justify-end gap-4 shrink-0 bg-gray-900 rounded-b-xl">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" form="video-form" disabled={isSubmitting}
            className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50">
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Video')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoFormModal;
