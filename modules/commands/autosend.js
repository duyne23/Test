const axios = require('axios');
const fs = require('fs-extra');
const moment = require('moment-timezone');

const config = [
  { timer: '6:00:00 AM', message: [''] },
  
  { timer: '7:00:00 AM', message: [''] },

  { timer: '8:00:00 AM', message: [''] },

  { timer: '9:00:00 AM', message: [''] },

  { timer: '10:00:00 AM', message: [''] },

  { timer: '11:00:00 AM', message: [''] },

  { timer: '12:00:00 AM', message: [''] },

  { timer: '1:00:00 PM', message: [''] },

  { timer: '3:00:00 PM', message: [''] },

  { timer: '5:00:00 PM', message: [''] },

  { timer: '7:00:00 PM', message: [''] },

  { timer: '10:00:00 PM', message: [''] },
];

const rdPathName = Math.floor(Math.random() * 99999999999999);
const time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss | DD/MM/YYYY');

module.exports = {
  config: {
    name: 'autosend',
    version: '1.0.2',
    hasPermssion: 2,
    credits: 'tnt',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống',
    usages: '[]',
    cooldowns: 3,
  },

  handleReply: async function ({ api, event, handleReply }) {
    const { body, threadID, senderID, messageID } = event;
    const text = `BoxID: ${handleReply.boxid}  Tin Nhắn ${body} || Time: ${time}`;

    if (handleReply.type === 'sendtoadmin' || handleReply.type === 'sendtouser') {
      let path = '';
      if (event.attachments.length !== 0) {
        switch (event.attachments[0].type) {
          case 'audio':
            path = __dirname + `/sendmsg/${rdPathName}.m4a` || __dirname + `/sendmsg/${rdPathName}.mp3`;
            break;
          case 'photo':
            path = __dirname + `/sendmsg/${rdPathName}.jpg`;
            break;
          case 'video':
            path = __dirname + `/sendmsg/${rdPathName}.mp4`;
            break;
          case 'animated_image':
            path = __dirname + `/sendmsg/${rdPathName}.gif`;
            break;
        }

        const getdata = (await axios.get(event.attachments[0].url, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
      }

      const formsend = { body: text };
      if (path !== '') formsend.attachment = fs.createReadStream(path);

      const idad = global.config.ADMINBOT;
      for (const ad of idad) {
        api.sendMessage(formsend, threadID, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              boxid: handleReply.boxid,
              messID: messageID,
              type: handleReply.type === 'sendtoadmin' ? 'sendtouser' : 'sendtoadmin',
            });
          }
        });
      }
    }
  },

  onLoad: (o) => {
    if (global.autosendmessage_setinterval) clearInterval(global.autosendmessage_setinterval);
    global.autosendmessage_setinterval = setInterval(async () => {
      const á = config.find((i) => i.timer === new Date(Date.now() + 25200000).toLocaleString().split(/,/).pop().trim());
      if (á) {
        const msg = r(á.message).replace(/{time}/g, moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss (D/MM/YYYY) (dddd)')).replace(/{thinh}/g, (await get(`https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/poem/cadao`)).data.data);
        const textMsg = { body: msg, attachment: (await get((await get('https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/images/mp3')).data.url, { responseType: 'stream' })).data };
        global.data.allThreadID.forEach((i) => o.api.sendMessage(textMsg, i, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              boxid: i,
              messID: messageID,
              type: 'sendtoadmin',
            });
          }
        }));
      }
    }, 1000);
  },

  run: () => {},
};
