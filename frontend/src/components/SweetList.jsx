import React, { useEffect, useState } from 'react';
import SweetItem from './SweetItem';

const SweetList = () => {
  const [sweets, setSweets] = useState([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sweets.map(sweet => <SweetItem key={sweet._id} sweet={sweet} />)}
    </div>
  );
};

export default SweetList;