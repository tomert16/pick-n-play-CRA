const { Location } = require('../models/LocationModel.js');

module.exports.getAllLocations = async (req, res) => {
    try{
        const locations = await Location.findAll();
        return res.status(200).json(locations)
    } catch(err) {
        return res.status(400).json({ msg: 'Error retrieving all locations'})
    }
}

module.exports.getLocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.findOne({where: {id: id}});
        return res.status(200).json(location)
    } catch (err) {
        return res.status(400).json({ msg: 'Could not find location', err})
    }
}