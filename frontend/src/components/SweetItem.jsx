const SweetItem = ({ sweet }) => {
  const handlePurchase = async () => {
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{sweet.name}</h3>
      <p className="text-gray-600 mb-1">Category: {sweet.category}</p>
      <p className="text-gray-600 mb-1">Price: ${sweet.price}</p>
      <p className="text-gray-600 mb-4">Quantity: {sweet.quantity}</p>
      <button
        onClick={handlePurchase}
        disabled={sweet.quantity === 0}
        className={`w-full py-2 rounded font-semibold ${
          sweet.quantity === 0
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        Purchase
      </button>
    </div>
  );
};

export default SweetItem;