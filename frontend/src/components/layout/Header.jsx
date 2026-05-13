import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header role="banner" className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-neon-teal">GameGor</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-neon-teal transition-colors">Home</Link></li>
            <li><Link to="/games" className="hover:text-neon-teal transition-colors">Games</Link></li>
            <li><Link to="/videos" className="hover:text-neon-teal transition-colors">Videos</Link></li>
            {isAuthenticated && (
              <li><Link to="/profile/sessions" className="hover:text-neon-teal transition-colors">Sessions</Link></li>
            )}
          </ul>
        </nav>
        <div>
          <Link to="/profile" className="text-sm cursor-pointer hover:text-neon-teal transition-colors">Profile</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
