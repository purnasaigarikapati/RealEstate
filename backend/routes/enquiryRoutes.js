const express = require('express');
const router = express.Router();
const { createEnquiry, getMyEnquiries } = require('../controllers/enquiryController');

router.post('/', createEnquiry);
router.get('/my', getMyEnquiries);

module.exports = router;

