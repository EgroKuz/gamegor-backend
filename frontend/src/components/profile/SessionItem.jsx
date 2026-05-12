import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SessionItem = ({ session }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!session || !session.game) return null;

  const { game, date_played, duration_minutes, rating, review_text } = session;

  const formattedDate = new Date(date_played).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const hours = Math.floor(duration_minutes / 60);
  const minutes = duration_minutes % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors duration-300">
      <div 
        className="flex flex-col sm:flex-row cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="session-item-header"
      >
        {/* Thumbnail */}
        <div className="sm:w-32 h-32 sm:h-auto flex-shrink-0 bg-gray-900 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-700">
          {game.cover_image_url ? (
            <img src={game.cover_image_url} alt={`${game.title} cover`} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-600">🎮</span>
          )}
        </div>

        {/* Core Metrics */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold text-white leading-tight">
              <Link to={`/games/${game.id}`} className="hover:text-neon-teal hover:underline" onClick={(e) => e.stopPropagation()}>
                {game.title}
              </Link>
            </h3>
            {rating && (
              <span className="bg-gray-900 text-neon-teal font-bold px-2 py-1 rounded border border-gray-700 text-sm whitespace-nowrap">
                {rating}/10
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              📅 {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              ⏱️ {formattedDuration}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Review Section */}
      {isExpanded && review_text && (
        <div className="p-4 bg-gray-900/50 border-t border-gray-700 text-gray-300 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200">
          <p className="whitespace-pre-line">{review_text}</p>
        </div>
      )}
      {isExpanded && !review_text && (
        <div className="p-4 bg-gray-900/50 border-t border-gray-700 text-gray-500 italic text-sm">
          No review text provided for this session.
        </div>
      )}
    </div>
  );
};

export default SessionItem;
