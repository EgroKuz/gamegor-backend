import React from 'react';

const Header = () => {
  return (
    <header role="banner" className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-neon-teal">GameAggregator</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-neon-teal">Home</a></li>
            <li><a href="/games" className="hover:text-neon-teal">Games</a></li>
          </ul>
        </nav>
        <div>
          {/* User Placeholder */}
          <span className="text-sm cursor-pointer hover:text-neon-teal">User Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
