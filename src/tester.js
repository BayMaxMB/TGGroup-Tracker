const fs = require('fs');

const data = [
    {
        id: 106529367,
        is_bot: false,
        first_name: 'Begzod',
        last_name: 'Muxamedov',
        username: 'Begzod_Muxamedov'
    },
    {
        id: 123529123,
        is_bot: false,
        first_name: 'Beg',
        last_name: 'Mux',
        username: 'Beg_Muxamedo'
    },
    {
        id: 226529344,
        is_bot: false,
        first_name: 'Bod',
        last_name: 'Mov',
        username: 'Bod_Mov'
    }
]

let filtered = data.map((el) => el.id);
// console.log(filtered);
// let db = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
// console.log(db)
let dbs = [];
fs.readFile('database.json',(err, data) => {
    dbs = JSON.parse(data)
    fs.writeFileSync('database.json', JSON.stringify(dbs))
})
console.log(dbs)
// db = JSON.parse(db);
// console.log(db);
// db[0]['482944903'] = db[0]['482944903'] ? db[0]['482944903'].concat([123]) : [123];
// console.log(db[0]['482944903'])
// fs.writeFileSync('database.json', JSON.stringify(d