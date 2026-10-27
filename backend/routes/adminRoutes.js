const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, updateUserRole } = require('../controllers/adminController');

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;

