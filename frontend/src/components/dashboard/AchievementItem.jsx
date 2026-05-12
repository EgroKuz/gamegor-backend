import React from 'react';

const AchievementItem = ({ data }) => {
  if (!data) return null;

  const { achievement, earned_at } = data;
  const date = new Date(earned_at).toLocaleDateString();

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl shrink-0">
        🏆
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold">{achievement.title}</h4>
        <p className="text-gray-400 text-sm">{achievement.description}</p>
      </div>
      <div className="text-xs text-gray-500 whitespace-nowrap">
        {date}
      </div>
    </div>
  );
};

export default AchievementItem;
