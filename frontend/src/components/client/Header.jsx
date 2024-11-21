// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-none backdrop-blur-xl z-50 shadow-md">
      <nav className="container mx-auto p-4 flex flex-row justify-between align-center items-center">
        <div>
            <h1 className='font-bold text-2xl'>A.R.X's Quote</h1>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-[#B2B1AE] hover:text-[#A4A3A0]">Quotes</Link></li>
          <li><Link to="/admin" className="text-[#B2B1AE] hover:text-[#A4A3A0]">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;