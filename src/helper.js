const fs = require('fs');
const config = require('./config')
const dbAdress = config.DBAdress;

function readDB() {
    let db = {};
    try {
        db = JSON.parse(fs.readFileSync(dbAdress, 'utf-8'))
    }
    catch (e) {
        fs.writeFileSync(dbAdress, JSON.stringify({}, null, '\t'));
        readDB();
    }
    return db;
}

module.exports = {
    logStart() {
        console.log('Bot has been Started ...');
    },
    
    addDB(id, newUsers) {
        const newUsers_IDs = newUsers.map((el) => (!(el.is_bot)) ? el.id : false).filter(x => x);
        if (newUsers_IDs.length != 0) {
            const db = readDB();
            if (db[id] == undefined) {
                db[id] = newUsers_IDs;
            }
            else {
                db[id] = [...new Set(db[id].concat(newUsers_IDs))];
            }
            fs.writeFileSync(dbAdress, JSON.stringify(db, null, '\t'));
        }
    },
    
    delDB(id, leftID) {
        const db = readDB();
        Object.keys(db).some(el => {
            const target_index = db[el].indexOf(leftID);
            if (target_index >= 0) {
                db[el].splice(target_index, 1);
                if (db[el].length == 0) {
                    delete db[el];
                }
                return true;
            }
        });
        fs.writeFileSync(dbAdress, JSON.stringify(db, null, '\t'));
    }
}