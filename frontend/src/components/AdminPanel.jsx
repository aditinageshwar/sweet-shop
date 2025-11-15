import React, { useState } from 'react';
import api from '../api';

const AdminPanel = () => {
  const [sweet, setSweet] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/api/sweets/${editId}`, sweet);
        alert('Updated!');
      } 
      else {
        await api.post('/api/sweets', sweet);
        alert('Sweet Added!');
      }
      setSweet({ name: '', category: '', price: '', quantity: '' });
      setEditId(null);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={sweet.name}
          onChange={(e) => setSweet({ ...sweet, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={sweet.category}
          onChange={(e) => setSweet({ ...sweet, category: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={sweet.price}
          onChange={(e) => setSweet({ ...sweet, price: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={sweet.quantity}
          onChange={(e) => setSweet({ ...sweet, quantity: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          {editId ? 'Update' : 'Add'} Sweet
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;