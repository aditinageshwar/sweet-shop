import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });

  const handleSearch = async () => { 
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setQuery({ ...query, category: e.target.value })}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => setQuery({ ...query, minPrice: e.target.value })}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setQuery({ ...query, maxPrice: e.target.value })}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;