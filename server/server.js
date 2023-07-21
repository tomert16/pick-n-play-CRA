const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const sportsRoutes = require('./routes/SportsRoutes');
const locationsRoutes = require('./routes/LocationsRoutes');
const fieldsRoutes = require('./routes/FieldsRoutes');

const PORT = process.env.PORT || 3000;

new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('connection established')
    }
})

//middlewares
app.use(cors());
//routes
app.use('/sports', sportsRoutes);
app.use('/locations', locationsRoutes);
app.use('/fields', fieldsRoutes);


//start server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})