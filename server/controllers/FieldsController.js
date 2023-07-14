const { Field } = require('../models/FieldModel.js');

module.exports.getAllFields = async (req, res, next) => {
    try {
        const fields = await Field.findAll();
        return res.status(200).json(fields);
    } catch (err) {
        return res.status(400).json({ msg: 'Error retrieving fields', err})
    }
};

module.exports.getFieldById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const field = await Field.findOne({ where: { id: id } });
        return res.status(200).json(field)
    } catch (err) {
        return res.status(400).json({ msg: 'Could not find field', err })
    }
};