import React from 'react';

const Header = () => {
  return (
    <header role="banner" className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-teal-400">GameAggregator</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-teal-300">Home</a></li>
            <li><a href="/games" className="hover:text-teal-300">Games</a></li>
          </ul>
        </nav>
        <div>
          {/* User Placeholder */}
          <span className="text-sm">User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
