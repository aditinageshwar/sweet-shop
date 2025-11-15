const Sweet = require('../models/Sweet');

exports.restock = async (req, res) => {
  const { quantity } = req.body;
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) 
    return res.status(404).json({ error: 'Sweet not found' });
  sweet.quantity += quantity;
  await sweet.save();
  res.json(sweet);
};

exports.addSweet = async (req, res) => {  
  const sweet = new Sweet(req.body);
  await sweet.save();
  res.status(201).json(sweet);
};

exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sweet) 
    return res.status(404).json({ error: 'Sweet not found' });
  res.json(sweet);
};

exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sweet deleted' });
};

exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};
  if (name) 
    query.name = new RegExp(name, 'i');       // name search (case-insensitive)
  if (category) 
    query.category = category;
  if (minPrice || maxPrice) {
      query.price = {
        $gte: minPrice ? Number(minPrice) : 0,
        $lte: maxPrice ? Number(maxPrice) : Infinity
      };
    }
  const sweets = await Sweet.find(query);
  res.json(sweets);
};

exports.purchase = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet || sweet.quantity <= 0) 
    return res.status(400).json({ error: 'Out of stock' });
  sweet.quantity -= 1;
  await sweet.save();
  res.json({ message: 'Purchased', sweet });
};
