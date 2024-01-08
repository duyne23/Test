module.exports.config = {
    name: "join",
    eventType: ['log:subscribe'],
    version: "1.0.0",
    credits: "Mirai-Team",//inspire by miraibot
    description: "GROUP UPDATE NOTIFICATION"
};
const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=1ZwFqYB-x6S9MjPfYm3t3SP1joohGl4iw&export=download'
module.exports.circle = async (image) => {
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }
module.exports.run = async function({ api, event, Users }) {
   const { threadID } = event;
  var fullYear = global.client.getTime("fullYear");
  	var getHours = await global.client.getTime("hours");
  var getData = await Users.getData(event.author)
       var nameAuthor = typeof getData.name == "undefined" ? "link join" : getData.name
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`『 ${global.config.PREFIX} 』  ➜ ${(!global.config.BOTNAME) ? "TNT" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage("", event.threadID, () => api.sendMessage({ body: `Kết nối với box thành công`, attachment: fs.createReadStream(__dirname + "/cache/jrtxtracy.png") }, threadID));
  }
  else {
    try {
        if(!fs.existsSync(__dirname+`/cache/Semi.ttf`)) { 
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname+`/cache/Semi.ttf`, Buffer.from(getfont, "utf-8"));
        };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
     // console.log(event.logMessageData.addedParticipants)
      var id = [];
      for(o = 0; o < event.logMessageData.addedParticipants.length; o++){
    let pathImg = __dirname + `/cache/${o}.png`;
  let pathAva = __dirname + `/cache/fbcover2.png`;
  let avtAnime = (await axios.get(encodeURI(
    `https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{
      headers:{
        cookie:'Có thì nhét vào :v'
      }
    }), { responseType: "arraybuffer" })).data;
    var ok = [
      'https://i.imgur.com/pm6wchW.jpeg',
      "https://i.imgur.com/RwwOIrx.jpeg",
"https://i.imgur.com/Ypo7YXK.jpeg",
"https://i.imgur.com/vD8gL76.jpeg",
"https://i.imgur.com/mC3tHvE.jpeg"

             ]
  let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer", })).data;
  fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
  fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    var avatar = await this.circle(pathAva);
  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(avatar);
  registerFont(__dirname+`/cache/Semi.ttf`, {
        family: "Semi"
    });
  let canvas = createCanvas(1902, 1082);
    console.log(canvas.width, canvas.height)
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
  ctx.fillStyle = "#0000FF";
  ctx.textAlign = "center";
  ctx.font = `155px Semi`;
  ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20 , canvas.height / 2 + 100);
  ctx.save();
  ctx.font = `75px Semi`;
  ctx.fillText(`Chào mừng tới ${threadName}`, canvas.width / 2 - 15 , canvas.height / 2 + 235)
  ctx.fillText(`Thành viên thứ ${participantIDs.length - o}`, canvas.width / 2 - 15 , canvas.height / 2 + 350)
  ctx.restore();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  abx.push(fs.createReadStream(__dirname + `/cache/${o}.png`))
      }
      memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = "=== 『 𝐉𝐎𝐈𝐍 𝐍𝐎𝐓𝐈 ===\n ➜ 𝐻𝑖 {type} {name}.\n[✌️] ➜ 𝐶ℎ𝑎̀𝑜 𝑚𝑢̛̀𝑛𝑔 {type} đ𝑎̃ đ𝑒̂́𝑛 𝑣𝑜̛́𝑖 {threadName}.\n[🪪] ➜ 𝑈𝑟𝑙 𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘: {uid}\n[🔎] ➜ 𝑈𝐼𝐷 𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘: {iduser}\n[❗] ➜ 𝑇𝑢̛̀ 𝑛𝑎𝑦 {name} 𝑠𝑒̃ 𝑙𝑎̀ 𝑡ℎ𝑎̀𝑛ℎ 𝑣𝑖𝑒̂𝑛 𝑡ℎ𝑢̛́ {soThanhVien} 𝑐𝑢̉𝑎 𝑛ℎ𝑜́𝑚 {threadName}\n[❤️] ➜ 𝐶ℎ𝑢́𝑐 {type} 𝑐𝑜́ 𝑚𝑜̣̂𝑡 𝑏𝑢𝑜̂̉𝑖 {session} 𝑣𝑢𝑖 𝑣𝑒̉\n[👉] ➜ 𝑁𝑔𝑎̀𝑦 𝑣𝑎̀𝑜: [ {fullYear} || {time} ]\n[📍] ➜ {name} đ𝑢̛𝑜̛̣𝑐 𝑡ℎ𝑒̂𝑚 𝑏𝑜̛̉𝑖: {author}\n[🔗] ➜ 𝐿𝑖𝑛𝑘 𝑓𝑎𝑐𝑒𝑏𝑜𝑜𝑘 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑡ℎ𝑒̂𝑚: https://www.facebook.com/profile.php?id={uidfb}" : msg = threadData.customJoin;
      msg = msg
                .replace(/\{iduser}/g, iduser)
                .replace(/\{name}/g, nameArray.join(' • '))
                .replace(/\{type}/g, (memLength.length > 1) ? '𝑐𝑎́𝑐 𝑏𝑎̣𝑛' : '𝑏𝑎̣𝑛')
                .replace(/\{soThanhVien}/g, memLength.join(' • '))
                .replace(/\{threadName}/g, threadName)
                .replace(/\{session}/g, hours <= 10 ? "𝑠𝑎́𝑛𝑔" : 
    hours > 10 && hours <= 12 ? "𝑡𝑟𝑢̛𝑎" :
    hours > 12 && hours <= 18 ? "𝑐ℎ𝑖𝑒̂̀𝑢" : "𝑡𝑜̂́𝑖")
                .replace(/\{fullYear}/g, fullYear)
                .replace(/\{uid}/g, event.logMessageData.addedParticipants.map(i => 'https://www.facebook.com/profile.php?id=' + i.userFbId).join('\n'))
      .replace(/\{author}/g, nameAuthor)
      .replace(/\{uidfb}/g, event.author)
                .replace(/\{time}/g, time);  

      var formPush = { body: msg, attachment: abx, mentions }
      return api.sendMessage(formPush, threadID);
      for (let ii = 0; ii < parseInt(id.length); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.png`)
    }
    } catch (e) { return console.log(e) };
  }
}
