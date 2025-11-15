const express = require('express');
const router = express.Router();
const {restock, addSweet, updateSweet, deleteSweet, getSweets} = require('../controllers/inventoryController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post('/:id/restock', auth, admin, restock);
router.post('/', auth, admin, addSweet);
router.put('/:id', auth, admin, updateSweet);
router.delete('/:id', auth, admin, deleteSweet);
router.get('/', auth, getSweets);

module.exports = router;
