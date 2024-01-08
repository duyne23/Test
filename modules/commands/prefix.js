module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Xem prefix của BOT",
  commandCategory: "tiện ích",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "ManhG") { return api.sendMessage(`Sai credits!`, threadID, messageID)}
  async function out(data) {
      const axios = require('axios');
  const { uptime } = process;
    const hours = Math.floor(uptime() / (60 * 60));
    const miutes = Math.floor((uptime() % (60 * 60)) / 60);
    const seconds = Math.floor(uptime() % 60);
  var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;

  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
		const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`[ ${prefix} ] Nhóm chưa xét prefix mới cho bot`)
      }
      else return out(`uptime: ${hours}:${miutes}:${seconds}\nprefix là:` + data.PREFIX)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("error", event.threadID)
}
