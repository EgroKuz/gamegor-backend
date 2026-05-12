import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in duration-700">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-purple-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] select-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-black/50 blur-sm mix-blend-overlay"></div>
      </div>
      
      <h2 className="text-4xl font-bold text-white mt-8 mb-4 uppercase tracking-widest">
        Game Over
      </h2>
      
      <p className="text-xl text-gray-400 max-w-lg mb-12">
        The page you are looking for does not exist or has been moved to another server.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
        <Link 
          to="/" 
          className="flex-1 bg-neon-teal text-gray-950 font-bold py-3 px-6 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-teal-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300 uppercase tracking-wider text-center"
        >
          Return to Home
        </Link>
        <Link 
          to="/games" 
          className="flex-1 bg-transparent border-2 border-neon-violet text-neon-violet font-bold py-3 px-6 rounded-lg hover:bg-neon-violet/10 transition-all duration-300 uppercase tracking-wider text-center"
        >
          Browse Games
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
