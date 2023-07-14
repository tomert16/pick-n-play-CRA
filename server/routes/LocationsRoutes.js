const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationById } = require('../controllers/LocationsController')

router.get('/', getAllLocations);
router.get('/:id', getLocationById);

module.exports = router;