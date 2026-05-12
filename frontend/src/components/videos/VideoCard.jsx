import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  if (!video) return null;

  const { title, youtube_id, game, game_title, author_detail, video_type, tags } = video;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-neon-teal/20 transition-all duration-300 flex flex-col h-full">
      {/* 16:9 Aspect Ratio Container for Iframe */}
      <div className="relative w-full pt-[56.25%] bg-black">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtube_id}`}
          title={`${title} video player`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

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
