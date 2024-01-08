module.exports.config = {
  name: "\n",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Tpk",//mod tnt
  description: "sailenh",
  commandCategory: "Tiện ích",
  usages: "Tiện ích",
  cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
  const allicon = ["💞","💖","💗","💜","🌸","💗","💝","🎀","🌹","🍁","🎊","🌟","🍁"];
const icon = allicon[Math.floor(Math.random()*allicon.length)];
const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    var os = require("os");
  var cpus = os.cpus();
  var chips;
  for (var i of cpus) chips = i.model, speed = i.speed;
  if (cpus == undefined);
  const timeStart = Date.now();
  /*const res = await axios.get(`https://apiupt.tntxtrick.repl.co/images/girl`);
var tpk = res.data.url;*/
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const time = process.uptime(),
hours = Math.floor(time / (60 * 60)),
minutes = Math.floor((time % (60 * 60)) / 60),
seconds = Math.floor(time % 60);
  const dateNow = Date.now();
  const xuly = Math.floor((Date.now() - global.client.timeStart)/4444)
 var trinhtrang = xuly < 10 ? "Tốt ✔️":
  xuly > 10 && xuly < 100 ? "Ổn định 📊" : "deplay ";
var tpk = [
  "https://i.imgur.com/d3LPo9d.jpeg",
"https://i.imgur.com/Ld414MY.jpeg",
"https://i.imgur.com/FHGbBel.jpeg",
"https://i.imgur.com/mxeIaMN.jpeg",
"https://i.imgur.com/jJedCAy.jpeg",
"https://i.imgur.com/qNU2aIw.jpeg",
"https://i.imgur.com/y7xwPp5.jpeg",
"https://i.imgur.com/SJFFVsn.jpeg",
"https://i.imgur.com/kyoEe3K.jpeg",
"https://i.imgur.com/4bBmlwm.jpeg",
"https://i.imgur.com/bAnoZ6I.jpeg",
"https://i.imgur.com/3iAQtgJ.jpeg",
"https://i.imgur.com/eXzDbCq.jpeg",
"https://i.imgur.com/njbOky4.jpeg",
"https://i.imgur.com/bl5V9er.jpeg",
"https://i.imgur.com/TS4eLOS.jpeg",
"https://i.imgur.com/eYLcmYw.jpeg",
"https://i.imgur.com/DGW5uy1.jpeg",
"https://i.imgur.com/xLAReHI.jpeg",
"https://i.imgur.com/hYUHZvd.jpeg",
"https://i.imgur.com/Qh5RUE4.jpeg",
"https://i.imgur.com/VlX2FFD.jpeg",
"https://i.imgur.com/vKrJtox.jpeg",
"https://i.imgur.com/I5rXAs1.jpeg",
"https://i.imgur.com/s2VI3w9.jpeg",
"https://i.imgur.com/hGrVKLA.jpeg",
"https://i.imgur.com/8wHsFl2.jpeg",
"https://i.imgur.com/i8HqieM.jpeg",
"https://i.imgur.com/9L2HnXb.jpeg",
"https://i.imgur.com/3UiRm0B.jpeg",
"https://i.imgur.com/VevAPqv.jpeg",
"https://i.imgur.com/pBMMx5R.jpeg",
"https://i.imgur.com/6CX5nmV.jpeg",
"https://i.imgur.com/fr9NXvz.jpeg",
"https://i.imgur.com/4jceamg.jpeg",
"https://i.imgur.com/yk8VGhl.jpeg",
"https://i.imgur.com/xKDK4Hc.jpeg",
"https://i.imgur.com/ep0zUWZ.jpeg",
"https://i.imgur.com/6kQMw6a.jpeg",
"https://i.imgur.com/Z1a1KxC.jpeg",
"https://i.imgur.com/dX8KNAq.jpeg",
"https://i.imgur.com/Zy2O584.jpeg",
"https://i.imgur.com/hkoQ5Ue.jpeg",
"https://i.imgur.com/iKtAAZ5.jpeg",
"https://i.imgur.com/swIK791.jpeg",
"https://i.imgur.com/etXCFVh.jpeg",
"https://i.imgur.com/OirP1ZH.jpeg",
"https://i.imgur.com/kfwBvUs.jpeg",
"https://i.imgur.com/Ud9SbrN.jpeg",
"https://i.imgur.com/ocgr6Ue.jpeg",
"https://i.imgur.com/CpnTdVz.jpeg",
"https://i.imgur.com/oGioFlL.jpeg",
"https://i.imgur.com/0JtU1du.jpeg",
"https://i.imgur.com/kP9NKyv.jpeg",
"https://i.imgur.com/9qH7W9l.jpeg",
"https://i.imgur.com/rn0HdXy.jpeg",
"https://i.imgur.com/qdu2mvP.jpeg",
"https://i.imgur.com/tBnVWr6.jpeg",
"https://i.imgur.com/PFUFtsT.jpeg",
"https://i.imgur.com/y1GI3nD.jpeg",
"https://i.imgur.com/PrAPlM7.jpeg",
"https://i.imgur.com/8JxaRwr.jpeg",
"https://i.imgur.com/uIxci9E.jpeg",
"https://i.imgur.com/SoicJLu.jpeg",
"https://i.imgur.com/L25fv7L.jpeg",
"https://i.imgur.com/Mwn8gAS.jpeg",
"https://i.imgur.com/hrCtxMn.jpeg",
"https://i.imgur.com/NCy70tv.jpeg",
"https://i.imgur.com/wCUZRei.jpeg", "https://i.imgur.com/rmBmkQS.jpeg", "https://i.imgur.com/f3mZI5M.jpeg", "https://i.imgur.com/M9u5jnc.jpeg",
"https://i.imgur.com/DVJkUZi.jpeg", "https://i.imgur.com/mqCcO7b.jpeg",
"https://i.imgur.com/2k45Y0Q.jpeg",
"https://i.imgur.com/uEWhCVu.jpeg",
"https://i.imgur.com/TzTN7TF.jpeg", "https://i.imgur.com/PfRFeJZ.jpeg", "https://i.imgur.com/A8BnEdB.jpeg", "https://i.imgur.com/2VrAIYu.jpeg", "https://i.imgur.com/2V130U8.jpeg",
"https://i.imgur.com/u8rpDrY.jpeg", "https://i.imgur.com/Q20VYTN.jpeg",
"https://i.imgur.com/nTPUii6.jpeg",
"https://i.imgur.com/aTdyuTz.jpeg",
"https://i.imgur.com/JDmCudx.jpeg",
"https://i.imgur.com/FMBbpR9.jpeg",
"https://i.imgur.com/53KZb7V.jpeg",
"https://i.imgur.com/5oOV4F7.jpeg", "https://i.imgur.com/gGUTX6S.jpeg", "https://i.imgur.com/d4nLOlm.jpeg",
"https://i.imgur.com/jyrIzGI.jpeg",
];
var so = [
  "2","3","4","5"
];
const tao = so[Math.floor(Math.random()*so.length)];
  let image = [];
 for(let i = 0; i < tao; i++) {
   const a = tpk[Math.floor(Math.random()*tpk.length)];
    const stream = (await axios.get(a, {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const msg = {
    body: `😻 ==== [ TNTXTRICK ] ==== 😻\n━━━━━━━━━━━━━━━\n[⏰] → Time: ${timeNow}\n[⏳] → Thời gian hoạt động: ${hours}:${minutes}:${seconds}\n[⚙️] → Tình trạng: ${trinhtrang}\n[⏱️] → Tốc độ xử lí: ${xuly} giây\n[📊] → Độ trễ: ${Date.now() - timeStart}ms\n[💾] → Lồng : ${os.cpus().length}
━━━━━━━━━━━━━━━━━
❤️ Xem API
🥰 Xem thông tin nhóm
😆 Khởi động lại bot
😮 Xem id box
😍 Thông tin về bot
━━━━━━━━━━━━━━━━━
👑 Thả icon vào tin nhắn này nếu bạn muốn xem`,
    attachment: image
};
    api.sendMessage(msg,event.threadID, (err, info) => {
    global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: event.senderID,
    })
    },event.messageID);
     }
module.exports.handleReaction = async ({ event, api, handleReaction, Currencies, Users}) => {
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const { threadID,reaction,messageID, userID } = event;
 if (reaction == '❤️') {
  api.unsendMessage(handleReaction.messageID);
     return api.sendMessage(`Wed API:\nhttps://apiupt.tntxtrick1.repl.co/`, event.threadID, event.messageID);
     }
else if (reaction == '🥰') {
  const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const { threadID, messageID, userID } = event;
  const moment = require("moment-timezone");
   const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  async function streamURL(url, mime='jpg') {
    const dest = `${__dirname}/cache/${Date.now()}.${mime}`,
    downloader = require('image-downloader'),
    fse = require('fs-extra');
    await downloader.image({
        url, dest
    });
    setTimeout(j=>fse.unlinkSync(j), 60*1000, dest);
    return fse.createReadStream(dest);
};
          let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
            var gendernam = [];
            var gendernu = [];
            var nope = [];
                for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    }; 
                         var nam = gendernam.length;
             var nu = gendernu.length;
             var kxd = nope.length;
         let threadName = threadInfo.threadName;
            let qtv = threadInfo.adminIDs.length;
            let sl = threadInfo.messageCount;
             let icon = threadInfo.emoji;
                      let color = threadInfo.color;
             let sex = threadInfo.approvalMode;
       var pd = sex == false ? "tắt" : sex == true ? "bật" : "\n";
 
                  var i = 1;
                       var listad_msg = '';
  var adminIDs = threadInfo.adminIDs;
	for (let get of adminIDs) {
    const infoUsers = await Users.getInfo(get.id);
    listad_msg += `• ${i++}. 𝗧𝗲̂𝗻: ${infoUsers.name}\n`
  }
  api.unsendMessage(handleReaction.messageID);
var msg = `=====「 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 𝗡𝗛𝗢́𝗠 」=====\n\n🏘️ 𝗧𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${threadName}\n⚙️ 𝗜𝗗 𝗻𝗵𝗼́𝗺: ${event.threadID}\n👥 𝗦𝗼̂́ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${threadInfo.participantIDs.length}\n 🧑 𝗡𝗮𝗺: ${nam}\n👧 𝗡𝘂̛̃ : ${nu}\n💞 𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻: ${qtv}\n📚 𝗗𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻: ${listad_msg}\n🌷 𝗣𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁: ${pd}\n😻 𝗕𝗶𝗲̂̉𝘂 𝘁𝘂̛𝗼̛̣𝗻𝗴 𝗰𝗮̉𝗺 𝘅𝘂́𝗰: ${icon ? icon : 'Không sử dụng'}\n💝 𝗠𝗮̃ 𝗴𝗶𝗮𝗼 𝗱𝗶𝗲̣̂𝗻: ${color}\n━━━━━━━━━━━━━━━━━━\n🍑 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺: ${sl}\n 📔 𝗡𝗴𝗮̀𝘆 𝘁𝗮̣𝗼 𝗱𝘂̛̃ 𝗹𝗶𝗲̣̂𝘂: ${timeNow}\n🎀 𝗣𝗵𝗶́𝗮 𝘁𝗿𝗲̂𝗻 𝗹𝗮̀ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺 𝗯𝗮̣𝗻 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘅 𝗶𝗻𝗳𝗼 đ𝗲̂̉ 𝘅𝗲𝗺 𝗰𝗵𝗶 𝘁𝗶𝗲̂́𝘁`
return api.sendMessage({body: msg, attachment: await streamURL(threadInfo.imageSrc)},event.threadID,event.messageID);
    }
  else if (reaction == '😆') {
api.unsendMessage(handleReaction.messageID);
    return api.sendMessage(`[✓] Bắt đầu tiến hành khởi động lại bot.`, threadID, () => process.exit(1));
                          }
else if (reaction == '😮') {
  api.unsendMessage(handleReaction.messageID);
  return api.sendMessage (`${event.threadID}`, event.threadID, event.messageID);
       }
  else if (reaction == '😍') {
    api.unsendMessage(handleReaction.messageID);
    return api.sendMessage(`
🎊 Đ𝗮̂𝘆 𝗹𝗮̀ 𝗕𝗼𝘁 𝗧𝗡𝗧 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝗹𝗮̂́𝘆 𝘁𝘂̛̀ 𝘀𝗿𝗰 𝗱 - 𝗷𝘂𝗸𝗲 𝗰𝘂̉𝗮 𝗱𝗶𝗲̣̂𝗻 𝘃𝗲̂̀ 𝘃𝗮̀ 𝗺𝗼𝗱 𝗹𝗮̣𝗶 đ𝗲̂̉ 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗽𝗵𝗮́𝘁 𝘁𝗿𝗶𝗲̂̉𝗻
𝗠𝗼̣𝗶 𝘁𝗵𝗮̆́𝗰 𝗺𝗮̆́𝗰 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗹𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝗮𝗱𝗺𝗶𝗻
🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/tntxtrick
`, event.threadID, event.messageID);
  }
    };
