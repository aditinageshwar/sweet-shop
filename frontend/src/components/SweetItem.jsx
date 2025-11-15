import api from '../api';
import { FaShoppingCart} from 'react-icons/fa';
import { BiSolidTagAlt } from "react-icons/bi";

const SweetItem = ({ sweet }) => {
  const handlePurchase = async () => {
     try {
      await api.post(`/api/sweets/${sweet._id}/purchase`);
      alert('Purchased!');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
        <BiSolidTagAlt className="mr-2 text-sky-700" />
        <span>{sweet.name}</span>
      </h3>
      <p className="text-gray-600 mb-1 ml-2 flex items-center">
        Category: <span className="font-medium ml-1"> {sweet.category}</span>
      </p>
      <p className="text-gray-600 mb-1 flex items-center ml-2">  
        Price: <span className="font-medium"> ₹{sweet.price}</span>
      </p>
      <p className="mb-4 flex items-center ml-2 text-gray-600">
        Quantity: <span className="font-medium"> {sweet.quantity}</span>
        {sweet.quantity < 10 && <span className="ml-2 text-sm text-red-600">(Low Stock!)</span>}
      </p>
    </div>
    <button
      onClick={handlePurchase}
      disabled={sweet.quantity === 0}
      className={`w-1/2 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
       sweet.quantity === 0
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
      }`}
    >
      <FaShoppingCart className="mr-2" />
      {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
    </button>
  </div>
  );
};

export default SweetItem;