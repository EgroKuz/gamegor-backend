import React from 'react';

const Sidebar = () => {
  return (
    <aside role="complementary" className="bg-gray-800 text-gray-300 w-64 min-h-screen p-4 hidden md:block border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-violet-400">Filters</h2>
      <ul>
        <li className="mb-2"><a href="#" className="hover:text-white">Genre 1</a></li>
        <li className="mb-2"><a href="#" className="hover:text-white">Genre 2</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
