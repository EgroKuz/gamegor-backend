import React from 'react';

const Sidebar = () => {
  return (
    <aside role="complementary" className="bg-gray-800 text-gray-300 w-64 min-h-screen p-4 hidden md:block border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-neon-violet">Filters</h2>
      <ul>
        <li className="mb-2"><a href="/games?genre=action" className="hover:text-white transition-colors duration-200">Action</a></li>
        <li className="mb-2"><a href="/games?genre=rpg" className="hover:text-white transition-colors duration-200">RPG</a></li>
        <li className="mb-2"><a href="/games?genre=strategy" className="hover:text-white transition-colors duration-200">Strategy</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
