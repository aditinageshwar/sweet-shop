import React from 'react';
import SweetList from '../components/SweetList';
import SearchBar from '../components/SearchBar';

const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 text-center">Sweet Shop Dashboard</h1>
    <SearchBar />
    <SweetList />
  </div>
);

export default Dashboard;