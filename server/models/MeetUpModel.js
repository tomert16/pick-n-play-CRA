const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

db.run(`
    CREATE TABLE IF NOT EXISTS meetUps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        field_id INTEGER,
        sport_id INTEGER,
        players TEXT, 
        date TEXT
    )
`)