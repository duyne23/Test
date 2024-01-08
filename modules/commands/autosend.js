module.exports.config = {
  name: 'autosend',
  version: '10.02',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Tự động gửi tin nhắn theo giờ đã cài!',
  commandCategory: 'Hệ thống',
  usages: '[]',
  cooldowns: 3
};
const r = a => a[Math.floor(Math.random()*a.length)],
{
  get
} = require('axios'),
config = [  {
  timer: '6:00:00 AM',
  message: ['🔔====𝗧𝗛𝗢̂𝗡𝗚 𝗕𝗔́𝗢====🔔\n▱▱▱▱▱▱▱▱▱▱▱\n💸 ==== [ 𝗧𝗛𝗨𝗘̂ 𝗕𝗢𝗧 ] ==== 💸\n➝ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 𝟮𝟬𝗸/𝘁𝗵\n➝ Đ𝘂̛𝗼̛̣𝗰 𝘁𝗮𝗴 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗯𝗼𝘅 𝗸𝗲̂̉ 𝗰𝗮̉ 𝗱𝘂̛𝗼̛́𝗶 𝟭𝟬 𝗻𝗴𝘂̛𝗼̛̀𝗶\n➝ 𝗗𝘂̀𝗻𝗴 đ𝘂̛𝗼̛̣𝗰 𝗺𝗼̣̂𝘁 𝘀𝗼̂́ 𝗹𝗲̣̂𝗻𝗵 𝗔𝗱𝗺𝗶𝗻\n▱▱▱▱▱▱▱▱▱▱▱\n⚜️ ==== [ 𝗠𝗨̛𝗢̛̣𝗡 𝗕𝗢𝗧 ] ==== ⚜️\n➝ 𝗬𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗵𝗼́𝗺 𝘁𝗿𝗲̂𝗻 𝟰𝟬 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻\n➝ 𝗧𝘂̛̣ 𝗱𝘂̀𝗻𝗴 𝗹𝗮̂𝘂 𝗵𝘂̛𝗼̛́𝗻𝗴 𝗱𝗮̂̃𝗻 𝗰𝗵𝗼 𝗯𝗶𝗲̂́𝘁 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗹𝗲̣̂𝗻𝗵 𝗺𝗼̛́𝗶\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '7:00:00 AM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐬𝐚́𝐧𝐠 𝗳𝘂𝗹𝗹 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '9:00:00 AM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐭𝐫𝐮̛𝐚 𝗳𝘂𝗹𝗹 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '12:00:00 AM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐭𝐫𝐮̛𝐚 𝗳𝘂𝗹𝗹 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '1:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐜𝐡𝐢𝐞̂̀𝐮 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '3:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐜𝐡𝐢𝐞̂̀𝐮 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '4:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝐜𝐡𝐢𝐞̂̀𝐮 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '5:28:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝐧𝐠𝐚̆́𝐦 𝐡𝐨𝐚̀𝐧𝐠 𝐡𝐨̂𝐧 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '6:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝐛𝐮𝐨̂̉𝐢 𝐭𝐨̂́𝐢 𝐯𝐮𝐢 𝐯𝐞̉ 𝐛𝐞̂𝐧 𝐠𝐢𝐚 đ𝐢̀𝐧𝐡\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '8:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝐛𝐮𝐨̂̉𝐢 𝐭𝐨̂́𝐢 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '9:00:00 PM',
  message: ['\n💘==== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ====💘\n▱▱▱▱▱▱▱▱▱▱▱\n➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: {time} \n🧸 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝐛𝐮𝐨̂̉𝐢 𝐭𝐨̂́𝐢 𝐯𝐮𝐢 𝐯𝐞̉\n💬 𝗖𝗮̂𝘂 𝘁𝗵𝗶́𝗻𝗵:{thinh}\n▱▱▱▱▱▱▱▱▱▱▱\n➝ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴']
},
{
  timer: '10:00:00 AM',
  message: ['Time: {time}']
},
{
  timer: '10:30:00 AM',
  message: ['Time: {time}']
},
{
  timer: '11:00:00 AM',
  message: ['Time: {time}']
},
{
  timer: '11:30:00 AM',
  message: ['Time: {time}']
},
{
  timer: '8:30:00 PM',
  message: ['Time: {time}']
},
{
  timer: '9:30:00 PM',
  message: ['Time: {time}']
},
{
  timer: '5:00:06 PM',
  message: ['Time: {time}']
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ''
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
},
{
  timer: '',
  message: ['']
  }];
  const rdPathName = Math.floor(Math.random() * 99999999999999);
  const moment = require("moment-timezone");
const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss | DD/MM/YYYY");
  module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
     // var name = (await Users.getData(event.senderID)).name;
      let { body, threadID, senderID, messageID } = event;
      var text = `BoxID: ${handleReply.boxid}  Tin Nhắn ${body} || Time: ${time}`
      const axios = require('axios');
          const fs = require('fs-extra')
     if(handleReply.type == 'sendtoadmin'){
      if (event.attachments.length != 0) {
          if (event.attachments[0].type == "audio") {
          var path = __dirname + `/sendmsg/${rdPathName}.m4a` ||  __dirname + `/sendmsg/${rdPathName}.mp3`
          }
          if (event.attachments[0].type == "photo") {
          var path = __dirname + `/sendmsg/${rdPathName}.jpg`
          }
          if (event.attachments[0].type == "video") {
          var path = __dirname + `/sendmsg/${rdPathName}.mp4`
          }
          if (event.attachments[0].type == "animated_image") {
          var path = __dirname + `/sendmsg/${rdPathName}.gif`
          }
        let getdata = (await axios.get(`${event.attachments[0].url}`, {
            responseType: 'arraybuffer'
          })).data
          fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
          var formsend = {
            body: `${text}`,
            attachment: fs.createReadStream(path) 
          }
     } else {
      var formsend = {
          body: `${text}`
        }
     }
     var idad = global.config.ADMINBOT;
     for (let ad of idad) {
      api.sendMessage(fromsend, threadID, (error, info) => {       
          if (error) { console.log(error) } else
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              boxid: handleReply.boxid,
              messID: messageID,
              type: "sendtouser"
            })
          })
     }   
}
if(handleReply.type == "sendtouser"){
  if (event.attachments.length != 0) {
      if (event.attachments[0].type == "audio") {
      var path = __dirname + `/sendmsg/${rdPathName}.m4a` ||  __dirname + `/sendmsg/${rdPathName}.mp3`
      }
      if (event.attachments[0].type == "photo") {
      var path = __dirname + `/sendmsg/${rdPathName}.jpg`
      }
      if (event.attachments[0].type == "video") {
      var path = __dirname + `/sendmsg/${rdPathName}.mp4`
      }
      if (event.attachments[0].type == "animated_image") {
      var path = __dirname + `/sendmsg/${rdPathName}.gif`
      }
    let getdata = (await axios.get(`${event.attachments[0].url}`, {
        responseType: 'arraybuffer'
      })).data
      fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
      var formsend = {
        body: `${text}`,
        attachment: fs.createReadStream(path) 
      }
 } else {
  var formsend = {
      body: `${text}`
    }
 }
 var idad = global.config.ADMINBOT;
 for (let ad of idad) {
  api.sendMessage(fromsend, threadID, (error, info) => {       
      if (error) { console.log(error) } else
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          boxid: handleReply.boxid,
          messID: messageID,
          type: "sendtoadmin"
        })
      })
 } 
}
}
module.exports.onLoad = o => {
  if (!!global.autosendmessage_setinterval) clearInterval(global.autosendmessage_setinterval);
  global.autosendmessage_setinterval = setInterval(async function() {
      if (á = config.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) {
          var msg = r(á.message);
          msg = msg.replace(/{time}/g, (require("moment-timezone")).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)")).replace(/{thinh}/g, (await get(`https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/poem/cadao`)).data.data)
          msg = {
              body: msg, attachment: (await get((await get(`https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/images/mp3`)).data.url, {
                  responseType: 'stream'
              })).data
          };
          global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i, (error, info) => {       
              if (error) { console.log(error) } else
                global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  boxid: i,
                  messID: messageID,
                  type: "sendtoadmin"
                })
              }));
      };
  }, 1000);
};
module.exports.run = () => {};
