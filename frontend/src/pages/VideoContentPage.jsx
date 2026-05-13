import React, { useState, useEffect, useMemo, useContext } from 'react';
import VideoCard from '../components/videos/VideoCard';
import VideoFormModal from '../components/videos/VideoFormModal';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../api/videos';
import { AuthContext } from '../context/AuthContext';

const VideoContentPage = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await getVideos();
      setVideos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const lowerQuery = searchQuery.toLowerCase();
    return videos.filter((video) => {
      return (
        (video.title && video.title.toLowerCase().includes(lowerQuery)) ||
        (video.description && video.description.toLowerCase().includes(lowerQuery)) ||
        (video.author_name && video.author_name.toLowerCase().includes(lowerQuery))
      );
    });
  }, [videos, searchQuery]);

  const handleEditOpen = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCreateOpen = () => {
    setSelectedVideo(null);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedVideo) {
        await updateVideo(selectedVideo.id, formData);
      } else {
        await createVideo(formData);
      }
      setShowModal(false);
      await fetchVideos();
    } catch (err) {
      console.error('Error saving video:', err);
      alert('Failed to save video. ' + (err.response?.data?.detail || ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (video) => {
    if (window.confirm(`Are you sure you want to delete the video "${video.title}"? This action cannot be undone.`)) {
      try {
        await deleteVideo(video.id);
        await fetchVideos();
      } catch (err) {
        console.error('Error deleting video:', err);
        alert('Failed to delete video. ' + (err.response?.data?.detail || ''));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-neon-teal text-xl font-bold animate-pulse">
          Loading Videos...
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Video Content
          </h2>
          <p className="text-gray-400 mt-1">
            Watch gameplay, reviews, and guides from the community.
          </p>
        </div>
        <div className="w-full md:w-auto min-w-[300px]">
          <input
            type="text"
            placeholder="Search videos by title, description, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-neon-teal transition-colors"
          />
        </div>
      </header>

      {videos.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 text-center">
          <span className="text-6xl block mb-4">📺</span>
          <h3 className="text-xl font-bold text-white mb-2">No Videos Available</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Check back later for new video content.
          </p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-800 text-center animate-in fade-in">
          <span className="text-5xl block mb-4">🔍</span>
          <h3 className="text-xl font-bold text-white mb-2">No Matching Videos Found</h3>
          <p className="text-gray-400">
            We couldn't find any videos matching "{searchQuery}". Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onEdit={handleEditOpen} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {user?.is_staff && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateOpen}
            className="bg-neon-teal text-gray-950 px-8 py-3 rounded-xl font-bold hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Video
          </button>
        </div>
      )}

      {showModal && (
        <VideoFormModal 
          video={selectedVideo}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default VideoContentPage;
