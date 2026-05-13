import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SessionItem = ({ session }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  if (!session || !session.game) return null;

  const { id, game, created_at, rating, comment, tags } = session;

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

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
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              <Link to={`/games/${game.id}`} className="hover:text-neon-teal transition-colors" onClick={(e) => e.stopPropagation()}>
                {game.title}
              </Link>
            </h3>
            <div className="flex items-center gap-2">
              {rating && (
                <span className="bg-gray-900 text-neon-teal font-bold px-3 py-1.5 rounded-lg border border-gray-700 text-sm whitespace-nowrap shadow-sm">
                  {rating} / 10
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-4 text-sm text-gray-400">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="flex items-center gap-1 font-medium text-gray-300">
                📅 {formattedDate}
              </span>
            </div>
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-700 text-gray-200 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Review Section */}
      {isExpanded && (
        <div className="p-5 bg-gray-900/60 border-t border-gray-700 animate-in slide-in-from-top-2 duration-200 flex flex-col gap-4">
          {comment ? (
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">{comment}</p>
          ) : (
            <p className="text-gray-500 italic text-sm">No review text provided for this session.</p>
          )}
          
          <div className="flex justify-end pt-3 border-t border-gray-800/50 mt-2">
            <button
              onClick={() => navigate(`/sessions/${id}/recommendation`)}
              className="bg-neon-teal/10 text-neon-teal hover:bg-neon-teal hover:text-gray-900 border border-neon-teal px-5 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] text-sm flex items-center gap-2"
            >
              <span className="text-lg">🤖</span> View AI Advice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionItem;


