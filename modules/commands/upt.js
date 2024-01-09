module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "tnt", 
  description: "no prefix",
  commandCategory: "Hệ thống",
  usages: "xem thời gian bot onl",
  cooldowns: 5
};
module.exports.handleEvent = async ({ api, event, Users, Threads }) => { 
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  const time = process.uptime(),hours = Math.floor(time / (60 * 60)),	minutes = Math.floor((time % (60 * 60)) / 60),seconds = Math.floor(time % 60);
  
  if (!event.body) return;
  const timeStart = Date.now();
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
  if (event.body.toLowerCase().indexOf("Upt","uptime") == 0) {
    //getPrefix
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("upt")) ? threadSetting.PREFIX : global.config.PREFIX;
    const dateNow = Date.now();
    const time = process.uptime(),
	      	hours = Math.floor(time / (60 * 60)),
		      minutes = Math.floor((time % (60 * 60)) / 60),
		      seconds = Math.floor(time % 60);
  
    api.sendMessage(` Time hoạt động : ${hours} : ${minutes} : ${seconds} .`,event.threadID, event.messageID);
  }
};
module.exports.run = () => {};
