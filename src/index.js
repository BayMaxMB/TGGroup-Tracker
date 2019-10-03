const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config');
const _ = require('./helper');

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});
_.logStart();

let db = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
db[0]['482944903'] = db[0]['482944903'] ? db[0]['482944903'].concat([123]) : [123];

function readDB(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}
function updateDB(db, id, newUsers) {
    const newUsers_IDs = newUsers.map((el) => el.id)
    db[id] = db[id] ? db[id].concat(newUsers_IDs) : newUsers_IDs;
    fs.writeFile('database.json', JSON.stringify(db), (err) => {console.log(err)});
    return db;
}

fs.writeFileSync('database.json', JSON.stringify(db));

bot.on('message', msg => {
    console.log('New Message ', msg);

    if (msg.new_chat_members) {
        
        // bot.sendMessage(msg.chat.id, `New Member ${msg.new_chat_members[0].first_name}`);
        bot.deleteMessage(msg.chat.id, msg.message_id);
    } else if (msg.left_chat_member) {
        // console.log('New Message ', msg);
        // bot.sendMessage(msg.chat.id, `Left Member ${msg.left_chat_member.first_name}`);
        bot.deleteMessage(msg.chat.id, msg.message_id);
    }
});

function wrote(err) {
    console.log(err)
}