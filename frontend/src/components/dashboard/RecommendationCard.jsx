import React from "react";

const RecommendationCard = ({ item }) => {
  if (!item) return null;

  const authorName = item.author?.name || "Unknown Author";
  const gameTitle = item.game?.title || "";

  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
    >
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {item.thumbnail_url ? (
          <img
            src={item.thumbnail_url}
            alt={`${item.title} thumbnail`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            No Thumbnail
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      <div className="p-4">
        <h4 className="text-white font-bold truncate mb-1 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h4>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span className="truncate pr-2">{authorName}</span>
          {gameTitle && (
            <span className="bg-gray-700 px-2 py-1 rounded-md text-cyan-300 truncate max-w-[50%]">
              {gameTitle}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default RecommendationCard;
