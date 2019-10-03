const fs = require('fs');
const dbAdress = 'database.json';
// if (!(fs.existsSync(dbAdress))) {
    // fs.writeFileSync(dbAdress, JSON.stringify({}));
//     console.log('File was not existed')
// }
// else 
// if (JSON.parse(fs.readFileSync(dbAdress))) {
//     console.log('File was empty')
// }
function readDB() {
    let db = {};
    try {
        db = JSON.parse(fs.readFileSync(dbAdress, 'utf-8'))
    }
    catch (e) {
        console.log('val: ' + e.message)
        console.log(e.code)
        if (e.code == 'ENOENT') {
            console.log('eeeee')
        }
        fs.writeFileSync(dbAdress, JSON.stringify({}, null, '\t'));
        readDB();
    }
    return db;
}

module.exports = {
    logStart() {
        console.log('Bot has been Started ...');
    },
    
    updateDB(id, newUsers) {
        const db = readDB();
        const newUsers_IDs = newUsers.map((el) => (!(el.is_bot)) ? el.id : false).filter(x => x);
        if (db[id] == undefined) {
            db[id] = newUsers_IDs;
            console.log(`${id} was not declared`)
        }
        else {
            db[id] = [...new Set(db[id].concat(newUsers_IDs))];
        }
        fs.writeFileSync(dbAdress, JSON.stringify(db, null, '\t'));
    }
    
}