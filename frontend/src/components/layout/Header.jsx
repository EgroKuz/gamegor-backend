import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header role="banner" className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-neon-teal">GameGor</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-neon-teal">Home</Link></li>
            <li><Link to="/games" className="hover:text-neon-teal">Games</Link></li>
            <li><Link to="/videos" className="hover:text-neon-teal">Videos</Link></li>
          </ul>
        </nav>
        <div>
          <Link to="/profile" className="text-sm cursor-pointer hover:text-neon-teal">Profile</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
