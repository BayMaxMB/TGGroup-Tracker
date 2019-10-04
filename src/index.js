const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const config = require('./config');
const _ = require('./helper');

const url = 'https://baymaxmb.alwaysdata.net';
const port = 8443;
const TOKEN = config.TOKEN;

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/${TOKEN}`);

const app = express();
// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

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