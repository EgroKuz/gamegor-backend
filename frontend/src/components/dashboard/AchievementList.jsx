import React from "react";
import AchievementItem from "./AchievementItem";

const AchievementList = ({ achievements }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>⭐</span> Recent Achievements
      </h3>

      {!achievements || achievements.length === 0 ? (
        <div className="text-gray-500 italic text-center py-4 bg-gray-800/50 rounded-lg border border-gray-800 border-dashed">
          No achievements earned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <AchievementItem key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementList;
