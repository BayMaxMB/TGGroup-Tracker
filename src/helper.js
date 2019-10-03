const fs = require('fs');
const dbAdress = 'database.json';
if (!(fs.existsSync(dbAdress))) {
    fs.writeFileSync(dbAdress, JSON.stringify({}));
}

module.exports = {
    logStart() {
        console.log('Bot has been Started ...');
    },
    
    updateDB(id, newUsers) {
        const db = JSON.parse(fs.readFileSync(dbAdress, 'utf-8'));
        if (db[id] == undefined) {
            db[id] = newUsers.map((el) => el.id);
        }
        else if
        const newUsers_IDs = newUsers.map((el) => el.id);
        db[id] = db[id] ? db[id].concat(newUsers_IDs) : newUsers_IDs;
        fs.writeFileSync(dbAdress, JSON.stringify(db));
    }
    
}