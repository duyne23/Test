module.exports.config = {
    name: "uptime",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Vihoo",
    description: "",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs-extra": "",
        "request": ""
    }
};
function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.handleEvent = async ({
    event,
    api,
    Users
}) => {
    const fs = global.nodemodule["fs-extra"];
  const moment = require('moment-timezone');
  const timeStart = Date.now();
  const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
  var thu =
moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
    var {
        threadID,
        messageID,
        body,
        senderID
    } = event;
    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["upt"] !== "undefined" && thread["upt"] == false) return;
const axios = require('axios')
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    let name = await Users.getNameUser(event.senderID);
    if (senderID == api.getCurrentUserID()) return;
const namebot = config.BOTNAME;
  const PREFIX = config.PREFIX;
  const { commands } = global.client; 
    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }
    //trả lời
    var msg = {
        body: `==「𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧」==\n━━━━━━━━━━━━━━━━━━\n → 𝗧𝗲̂𝗻 𝗕𝗼𝘁 : ${global.config.BOTNAME}\n → Đ𝗮̃ 𝗵𝗼𝗮̣𝘁 đ𝗼̣̂𝗻𝗴 đ𝘂̛𝗼̛̣𝗰 : ${hours} 𝗚𝗶𝗼̛̀ ${minutes} 𝗣𝗵𝘂́𝘁 ${seconds} 𝗚𝗶𝗮̂𝘆\n → 𝗣𝗿𝗲𝗳𝗶𝘅 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴: ${global.config.PREFIX}\n → 𝗧𝗼̂̉𝗻𝗴 𝗹𝗲̣̂𝗻𝗵:${commands.size}\n━━━━━━━━━━━━━━━━━━\n → 𝗧𝗼̂̉𝗻𝗴 𝗻𝗵𝗼́𝗺:${global.data.allThreadID.length}\n → 𝗖𝗣𝗨: ${pidusage.cpu.toFixed(1)}%\n → 𝗥𝗮𝗺: ${byte2mb(pidusage.memory)}\n → 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}ms\n━━━━━━━━━━━━━━━━━━\n → 𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${gio} ${thu}`,
        attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/images/girl')).data.url,
            method: "GET",
            responseType: "stream"
        })).data
    }
    // Gọi bot
    var arr = ["Upt"];
    arr.forEach(i => {
        let str = i[0].toUpperCase() + i.slice(1);
        if (body === i.toUpperCase() | body === i | str === body) return out(msg)
    });
};
 
module.exports.languages = {
    "vi": {
        "on": "Bật",
        "off": "Tắt",
        "successText": "upt thành công",
    },
    "en": {
        "on": "on",
        "off": "off",
        "successText": "hi success!",
    }
}
 
module.exports.run = async function({
    api,
    event,
    Threads,
    getText
}) {
    const {
        threadID,
        messageID
    } = event;
    let data = (await Threads.getData(threadID)).data;
 
    if (typeof data["upt"] == "undefined" || data["upt"] == true) data["upt"] = false;
    else data["upt"] = true;
 
    await Threads.setData(threadID, {
        data
    });
    global.data.threadData.set(threadID, data);
    return api.sendMessage(`${(data["upt"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
