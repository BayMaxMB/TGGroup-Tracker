const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config');
const _ = require('./helper');

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});

_.logStart();

bot.on('message', msg => {
    console.log('\n---------- New Message ----------\n', msg);
    const chatType = msg.chat.type;
    const chatID = msg.chat.id;
    switch (chatType) {
        case 'group': console.log('From Group');
        case 'supergroup': {
            const id = msg.from.id;
            if (!msg.from.is_bot) {
                if (msg.new_chat_members && (id != msg.new_chat_member.id)) {
                    _.addDB(chatID, id, msg.new_chat_members);
                } else if (msg.left_chat_member && !msg.left_chat_member.is_bot) {
                    _.delDB(chatID, id, msg.left_chat_member.id)
                }
            }
            break;
        }
        case 'private' : {
            if (msg.text == '/me') {
              bot.sendMessage(chatID, _.getDB(chatID));
            }
            break;
        }
        case 'channel' : {
            // TODO: fix: cannot get msg from channels (Maybe if connect webhooks, it will be fixed)
            break;
        }
    }
});