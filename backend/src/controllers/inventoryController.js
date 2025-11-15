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
