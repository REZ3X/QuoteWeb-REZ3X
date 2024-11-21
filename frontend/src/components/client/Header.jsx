// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-xl z-50 shadow-md">
      <nav className="container mx-auto p-4 flex flex-row justify-between align-center items-center">
        <div className='flex flex-col items-baseline'>
            <h1 className='font-bold text-2xl'>A.R.X's Quote</h1>
            <h1 className='font-bold text-sm text-[#B2B1AE] mt-[-11.5px]'>Beta</h1>
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