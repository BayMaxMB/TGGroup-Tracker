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
        console.log('Bot has been Started ...\n');
    },
    
    addDB(chatID, id, newUsers) {
        const newUsers_IDs = newUsers.map((el) => (!(el.is_bot)) ? el.id : false).filter(x => x);
        if (newUsers_IDs.length != 0) {
            const db = readDB();
            if (db[chatID] == undefined) {
                db[chatID] = {};
                db[chatID][id] = newUsers_IDs;
            }
            else if (db[chatID][id] == undefined) {
                db[chatID][id] = newUsers_IDs;
            }
            else {
                db[chatID][id] = [...new Set(db[chatID][id].concat(newUsers_IDs))];
            }
            fs.writeFileSync(dbAdress, JSON.stringify(db, null, '\t'));
        }
    },
    
    delDB(chatID, id, leftID) {
        const db = readDB();
        if(db[chatID] != undefined) {
            Object.keys(db[chatID]).some(adder => {
                const target_index = db[chatID][adder].indexOf(leftID);
                if (target_index != -1) {
                    db[chatID][adder].splice(target_index, 1);
                    if (db[chatID][adder].length == 0) {
                        delete db[chatID][adder];
                        if (db[chatID].length == 0) {
                            delete db[chatID];
                        }
                    }
                    return true;
                }
            });
            fs.writeFileSync(dbAdress, JSON.stringify(db, null, '\t'));
        }
    }
}