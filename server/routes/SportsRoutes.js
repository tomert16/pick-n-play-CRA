const express = require('express');
const router = express.Router();
const { getSports, getSportById } = require('../controllers/SportsController');

router.get('/', getSports);
router.get('/:id', getSportById);

module.exports = router;