const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.db'
})

const Sport = sequelize.define('sports', {
    sport_type: DataTypes.STRING,
    img_url: DataTypes.STRING,
    bg_image: DataTypes.STRING,
    location_id: DataTypes.INTEGER
},
{
    timestamps: false
})

// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./db/database.db');

// // db.run(`
// //     CREATE TABLE IF NOT EXISTS sports (
// //         id INTEGER PRIMARY KEY AUTOINCREMENT,
// //         sport_type TEXT,
// //         img_url TEXT,
// //         bg_image TEXT,
// //         location_id INTEGER
// //     )
// // `);

// const SportsModel = {
//     getAllSports: (callback) => {
//         db.all(`
//             SELECT * FROM sports
//         `, function (err, rows) {
//             if (err) {
//                 console.error(err);
//                 callback(err);
//             } else {
//                 callback(null, rows)
//             }
//         })
//     },
//     getSportById: (id, callback) => {
//         db.all(`
//             SELECT * FROM sports WHERE id = ?
//         `,[id],
//         function (err, rows) {
//             if (err) {
//                 console.error(err);
//                 callback(err);
//             } else {
//                 const sport = rows[0] || null;
//                 callback(null, sport)
//             }
//         }
//         )
//     }
// }

module.exports = { Sport };