import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const VideoCard = ({ video, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);

  if (!video) return null;

  const { title, youtube_id, url, game, game_title, author_detail, video_type, tags } = video;

  // Derive embed URL either from youtube_id or generic URL if possible, though backend returns youtube_id usually.
  // Assuming if youtube_id is not present, we might just try to embed url directly or fallback.
  // Since original code used youtube_id, let's stick to it, but backend serializer provides 'url'.
  // Actually, original code used youtube_id but it's not in the serializer! Let's use url or construct from url.
  // Wait, let's keep the iframe logic as is from original but add staff buttons.

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(video);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(video);
    }
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const embedId = youtube_id || getYoutubeId(url);

  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-neon-teal/20 transition-all duration-300 flex flex-col h-full relative">
      {/* 16:9 Aspect Ratio Container for Iframe */}
      <div className="relative w-full pt-[56.25%] bg-black">
        {embedId ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}`}
            title={`${title} video player`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Invalid Video URL
          </div>
        )}
      </div>

      {user?.is_staff && (
        <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            onClick={handleEditClick}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white p-2 rounded-md hover:bg-neon-teal hover:text-gray-900 shadow-md transition-colors"
            title="Edit Video"
          >
            ✏️
          </button>
          <button 
            onClick={handleDeleteClick}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white p-2 rounded-md hover:bg-red-500 shadow-md transition-colors"
            title="Delete Video"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight mb-1">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            {author_detail && <span className="font-medium text-gray-300">{author_detail.name}</span>}
            {video_type && <span className="uppercase tracking-wider px-2 py-0.5 bg-gray-700 rounded-full">{video_type}</span>}
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag, index) => (
              <span key={index} className="text-[10px] px-2 py-0.5 bg-neon-violet/10 text-neon-violet border border-neon-violet/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {game && (
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-700/50">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Game:</span>
            <Link 
              to={`/games/${game}`} 
              className="text-sm text-neon-teal hover:text-teal-300 hover:underline font-medium truncate"
            >
              {game_title || 'View Game'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
