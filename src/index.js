const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config');
const _ = require('./helper');

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});
_.logStart();

bot.on('message', msg => {
    console.log('New Message ', msg);

    if (msg.new_chat_members) {
        _.updateDB(msg.from.id, msg.new_chat_members);
        // bot.sendMessage(msg.chat.id, `New Member ${msg.new_chat_members[0].first_name}`);
        // bot.deleteMessage(msg.chat.id, msg.message_id);
    } else if (msg.left_chat_member) {
        // console.log('New Message ', msg);
        // bot.sendMessage(msg.chat.id, `Left Member ${msg.left_chat_member.first_name}`);
        // bot.deleteMessage(msg.chat.id, msg.message_id);
    }
});

function wrote(err) {
    console.log(err)
}