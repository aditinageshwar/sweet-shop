import React, { useState } from 'react';
import api from '../api';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });

  const handleSearch = async () => { 
     try {
      const params = new URLSearchParams(query);
      const res = await api.get(`/api/sweets/search?${params}`);
      onSearch(res.data);
    } 
    catch (err) {
      alert('Search failed');
    }
  };

return (
  <div className="mb-8 p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
      <FaSearch className="mr-2 text-sky-700" />
      Filter Sweets
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
     <input
      type="text"
      placeholder="Name"
      onChange={(e) => setQuery({ ...query, name: e.target.value })}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition duration-200 shadow-sm"
     />
     <input
      type="text"
      placeholder="Category"
      onChange={(e) => setQuery({ ...query, category: e.target.value })}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition duration-200 shadow-sm"
     />
     <input
      type="number"
      placeholder="Min Price"
      onChange={(e) => setQuery({ ...query, minPrice: e.target.value })}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition duration-200 shadow-sm"
      min="0"
      step="0.01"
     />
     <input
      type="number"
      placeholder="Max Price"
      onChange={(e) => setQuery({ ...query, maxPrice: e.target.value })}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition duration-200 shadow-sm"
      min="0"
      step="0.01"
     />
     <button
      onClick={handleSearch}
      className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
     >
      <FaSearch className="mr-2" />
      Search
     </button>
    </div>
  </div>
 );
};

export default SearchBar;