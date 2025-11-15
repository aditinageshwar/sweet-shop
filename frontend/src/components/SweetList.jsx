import { useEffect, useState } from 'react';
import SweetItem from './SweetItem';
import SearchBar from './SearchBar';
import api from '../api';

const SweetList = () => {
  const [sweets, setSweets] = useState([]);

   useEffect(() => {
    api.get('/api/sweets').then(res => setSweets(res.data));
  }, []);

  return (
    <div>
    <SearchBar onSearch={setSweets} />
    <h3 className="text-3xl font-bold text-center mb-6 text-sky-700 ">Sweet Delights</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
     {sweets.length > 0 ? (
      sweets.map(sweet => <SweetItem key={sweet._id} sweet={sweet} />)
     ):(
       <p className="text-center text-gray-600 col-span-full mb-72">No sweets found</p>
     )}
    </div>
    </div>
  );
};

export default SweetList;