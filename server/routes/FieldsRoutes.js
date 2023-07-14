const express = require('express');
const router = express.Router();
const { getAllFields, getFieldById } = require('../controllers/FieldsController');

router.get('/', getAllFields);
router.get('/:id', getFieldById)

module.exports = router;