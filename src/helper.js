const fs = require('fs');

module.exports = {
    logStart() {
        console.log('Bot has been Started ...');
    },
    checkUser(id) {
        return fs.existsSync(`./users/${id}.json`);
    }
}