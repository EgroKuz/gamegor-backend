import React from 'react';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md flex items-center justify-between hover:border-cyan-400 transition-colors duration-300">
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      </div>
      {icon && (
        <div className="text-cyan-400 text-4xl opacity-80">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
