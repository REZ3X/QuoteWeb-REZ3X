// SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="container mx-auto mt-16 p-4">
      <input
        type="text"
        placeholder="Search quotes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;