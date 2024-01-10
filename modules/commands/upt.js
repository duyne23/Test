module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "dtai", //bá»‘ m Ä‘Ă£ bá» cĂ´ng ra ngá»“i lĂ m thĂ¬ Ä‘á»«ng cĂ³ Ä‘á»•i credits
  description: "no prefix",
  commandCategory: "Há»‡ thá»‘ng",
  usages: "xem thá»i gian bot onl",
    cooldowns: 5
};
module.exports.handleEvent = async ({ api, event, Users, Threads }) => { 
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  const time = process.uptime(),hours = Math.floor(time / (60 * 60)),	minutes = Math.floor((time % (60 * 60)) / 60),seconds = Math.floor(time % 60);
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  var thu =
moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chá»§ Nháº­t'
  if (thu == 'Monday') thu = 'Thá»© Hai'
  if (thu == 'Tuesday') thu = 'Thá»© Ba'
  if (thu == 'Wednesday') thu = 'Thá»© TÆ°'
  if (thu == "Thursday") thu = 'Thá»© NÄƒm'
  if (thu == 'Friday') thu = 'Thá»© SĂ¡u'
  if (thu == 'Saturday') thu = 'Thá»© Báº£y'
  if (!event.body) return;
  const timeStart = Date.now();
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
  if (event.body.toLowerCase().indexOf("upt","Upt") == 0) {
    //getPrefix
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("upt")) ? threadSetting.PREFIX : global.config.PREFIX;
    const dateNow = Date.now();
    const time = process.uptime(),
	      	hours = Math.floor(time / (60 * 60)),
		      minutes = Math.floor((time % (60 * 60)) / 60),
		      seconds = Math.floor(time % 60);
  const admins = global.config.ADMINBOT;
    const namebot = config.BOTNAME;
    const { commands } = global.client;
  var i = 1;
  var msg = [];
  var msg = []
    for(var a of admins) {
    if (parseInt(a)) {
    var name = await Users.getNameUser(a);
      msg.push(`${i++}. ${name}`);
    }
    }
    api.sendMessage(`đŸ“Œ ${thu} ${moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')} ${gio}\nâ¤ï¸ Bot name: ${global.config.BOTNAME}\nâ¡ï¸ Ping: ${Date.now() - timeStart}ms\nđŸ“‚ Lá»‡nh cĂ²n sá»‘ng: ${client.commands.size}\nâ°ï¸ Time onl: ${hours} giá» ${minutes} phĂºt ${seconds} giĂ¢y`,event.threadID, event.messageID);
  }
};
module.exports.run = () => {};
