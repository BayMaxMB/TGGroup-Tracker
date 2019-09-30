const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const helper = require('./helper');

helper.logStart();

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});

bot.on('message', msg => {
    console.log('New Message ', msg);
    if (msg.new_chat_members) {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        // bot.sendMessage(msg.chat.id, `New Member ${msg.new_chat_members[0].first_name}`);
    } else if (msg.left_chat_member) {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        // bot.sendMessage(msg.chat.id, `Left Member ${msg.left_chat_member.first_name}`);
    }
});