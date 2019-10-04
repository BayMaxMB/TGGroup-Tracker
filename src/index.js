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
    const id = msg.from.id;
    const isBot = msg.from.is_bot;
    if (!isBot && msg.new_chat_members && (id != msg.new_chat_member.id)) {
        _.addDB(id, msg.new_chat_members);
    } else if (!isBot && msg.left_chat_member && !msg.left_chat_member.is_bot) {
        _.delDB(id, msg.left_chat_member.id)
    }
});