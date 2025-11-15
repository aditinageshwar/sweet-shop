import { useState, useEffect } from 'react';
import api from '../api';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from 'react-icons/fa';

const AdminPanel = () => {
  const [sweet, setSweet] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editId, setEditId] = useState(null);
  const [sweets, setSweets] = useState([]);
  const [restockQuantities, setRestockQuantities] = useState({}); 

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await api.get('/api/sweets');
      setSweets(res.data);
    } catch (err) {
      alert('Failed to load sweets');
    }
  };

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
      fetchSweets();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await api.delete(`/api/sweets/${id}`);
        alert('Deleted!');
        fetchSweets(); 
      } catch (err) {
        alert(err.response.data.error);
      }
    }
  };

  const handleEdit = (selectedSweet) => {
    setSweet({
      name: selectedSweet.name,
      category: selectedSweet.category,
      price: selectedSweet.price,
      quantity: selectedSweet.quantity,
    });
    setEditId(selectedSweet._id);
  };

  const handleRestock = async (id) => {
    const quantity = restockQuantities[id];
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity to restock');
      return;
    }
    try {
      await api.post(`/api/sweets/${id}/restock`, { quantity: parseInt(quantity) });
      alert('Restocked!');
      setRestockQuantities({ ...restockQuantities, [id]: '' }); 
      fetchSweets(); 
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-sky-700 flex items-center justify-center">
        <FaBoxOpen className="mr-3" />
        Admin Panel - Manage Sweets
      </h2>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaPlus className="mr-2" />
          {editId ? 'Edit Sweet' : 'Add New Sweet'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={sweet.name}
          onChange={(e) => setSweet({ ...sweet, name: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={sweet.category}
          onChange={(e) => setSweet({ ...sweet, category: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={sweet.price}
          onChange={(e) => setSweet({ ...sweet, price: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
          min="1"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={sweet.quantity}
          onChange={(e) => setSweet({ ...sweet, quantity: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
          required
        />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
        >
        {editId ? 'Update' : 'Add'} Sweet 
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setSweet({ name: '', category: '', price: '', quantity: '' });
              setEditId(null);
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
          >
            Cancel Edit
          </button>
        )}
        </div>
      </form>

       {/* Sweets List with Actions */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Sweets Inventory</h3>
      <div className="space-y-4">
        {sweets.map((item) => (
          <div key={item._id} className="border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-md transition bg-gray-50">
           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0 lg:flex-1">
              <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
              <p className="text-gray-600">Category: <span className="font-medium">{item.category}</span></p>
              <p className="text-gray-600">Price: <span className="font-medium">${item.price}</span></p>
              <p className="text-gray-600">Quantity: <span className={`font-medium ${item.quantity < 10 ? 'text-red-600' : 'text-gray-800'}`}>{item.quantity}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Qty"
                  value={restockQuantities[item._id] || ''}
                  onChange={(e) => setRestockQuantities({ ...restockQuantities, [item._id]: e.target.value })}
                  className="w-20 p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
                  min="1"
                  required
                />
                <button
                  onClick={() => handleRestock(item._id)}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  Restock
                </button>
              </div>

              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center"
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
           </div>
          </div>
        ))}
      </div>
    </div>
   </div> 
  );
};

export default AdminPanel;