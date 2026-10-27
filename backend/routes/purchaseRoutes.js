const express = require('express');
const router = express.Router();
const { createPurchase, getMyPurchases, getAllPurchases } = require('../controllers/purchaseController');

router.post('/', createPurchase);
router.get('/my', getMyPurchases);
router.get('/all', getAllPurchases);

module.exports = router;

