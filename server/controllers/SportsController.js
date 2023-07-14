const { promisify } = require('util');
const { Sport } = require('../models/SportModel.js')

module.exports.getSports = async (req, res) => {
   try {
        const sports = await Sport.findAll();
        return res.status(200).json(sports);
   } catch (err) {
        return res.status(400).json({ msg: 'Error retrieving sports'})
   }
};

module.exports.getSportById = async (req, res) => {
    const { id }  = req.params;
    try{
        const sport = await Sport.findOne({where: {id: id}})
        return res.status(200).json(sport);
    } catch (err) {
        return res.status(404).json({ msg: 'Sport not found' });

    }
}