import React from 'react';

const Footer = () => {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-gray-400 text-center p-4 border-t border-gray-800 mt-auto">
      <p>&copy; {new Date().getFullYear()} GameGor. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
