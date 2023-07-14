

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.db'
});

//create locations table
const Location = sequelize.define('locations', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    
},{
    timestamps: false
})

// Location.drop()
// console.log('Successfully dropped')

// const syncToDatabase = async () => {
//     try {
//         await Location.sync({ force: true });
//         return Location.bulkCreate([
//             {
//                 city: 'New York City',
//                 state: 'NY'
//             },
//             {
//                 city: 'Miami',
//                 state: 'Fl'
//             }
//         ]);
//     } catch (err) {
//         console.log('Error syncing to database:', err);
//     }
// }
// syncToDatabase();


// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./db/database.db');

// const LocationsModel = {
//     getAllLocations: (callback) => {
//         db.all(`
//             SELECT * FROM locations
//         `,
//             function(err, rows) {
//                 if (err) {
//                     console.error(err);
//                     callback(err);
//                 } else {
//                     callback(null, rows);
//                 }
//             }
//         )
//     }
// };

module.exports = { Location };