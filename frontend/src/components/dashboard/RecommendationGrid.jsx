import React from "react";
import RecommendationCard from "./RecommendationCard";

const RecommendationGrid = ({ recommendations }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg mt-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🔥</span> Recommended for You
      </h3>

      {!recommendations || recommendations.length === 0 ? (
        <div className="text-gray-500 italic text-center py-8 bg-gray-800/50 rounded-lg border border-gray-800 border-dashed">
          No recommendations available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationGrid;
