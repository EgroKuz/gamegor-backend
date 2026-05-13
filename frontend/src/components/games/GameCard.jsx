import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const GameCard = ({ game, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!game) return null;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(game);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(game);
    }
  };

  return (
    <Link 
      to={`/games/${game.id}`}
      className="block group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-neon-teal transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-teal/20"
    >
      <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden">
        {game.cover_image ? (
          <img 
            src={game.cover_image} 
            alt={`${game.title} cover`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gray-850">
            <span className="text-4xl mb-2">🎮</span>
            <span className="text-sm">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {user?.is_staff && (
          <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all">
            <button 
              onClick={handleEditClick}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white p-2 rounded-md hover:bg-neon-teal hover:text-gray-900 shadow-md transition-colors"
              title="Edit Game"
            >
              ✏️
            </button>
            <button 
              onClick={handleDeleteClick}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white p-2 rounded-md hover:bg-red-500 shadow-md transition-colors"
              title="Delete Game"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-neon-teal transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-gray-400 truncate mt-1">
          {game.developer || 'Unknown Developer'}
        </p>
      </div>
    </Link>
  );
};

export default GameCard;
