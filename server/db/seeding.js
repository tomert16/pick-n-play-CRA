const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db');

let sports = [{
    
}, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-WJHvkNHb-px3rFWlviZ0LuXsJbqjQSR3w&usqp=CAU']

let placeholders = sports.map((sport) => '(?)').join(',');
let sql = `INSERT INTO sports(img_url) VALUES` + placeholders;

console.log(sql);

db.run(sql, sports, (err) => {
    if (err) {
        console.error(err.message);
    }else {
        console.log(`Successfully inserted sport images`)
    }
})

db.close();