const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config');
const _ = require('./helper');

const bot = new TelegramBot(config.TOKEN);

_.logStart();

bot.on('message', msg => {
    console.log('New Message ', msg);
    const chatType = msg.chat.type;
    const chatID = msg.chat.id;
    switch (chatType) {
        case 'group':
        case 'supergroup': {
            console.log('got from sugr')
            const id = msg.from.id;
            const isBot = msg.from.is_bot;
            if (!isBot && msg.new_chat_members && (id != msg.new_chat_member.id)) {
                _.addDB(id, msg.new_chat_members);
            } else if (!isBot && msg.left_chat_member && !msg.left_chat_member.is_bot) {
                _.delDB(id, msg.left_chat_member.id)
            }
            break;
        }
        case 'private' : {
            
            break;
        }
        case 'channel' : {
            // TODO: fix: cannot get msg from channels (Maybe if connect webhooks, it will be fixed)
            break;
        }
    }
});