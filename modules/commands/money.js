module.exports.config = {
	name: "money",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",//mod by ARAXY XD
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "Kiếm tiền",
	usages: "[Tag]",
	cooldowns: 0
};
function replace(int){
    var str = int.toString();
    var newstr = str.replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return newstr;
}
module.exports.run = async function({ api, event, args, Currencies, Users }) {
	const { threadID, messageID, senderID, mentions } = event;
  const fs = require('fs');
const axios = require('axios')
 if(!fs.existsSync(__dirname+'/cache/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/cache/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
if (event.type == "message_reply") {
    var uid = event.messageReply.senderID;
    var name = (await Users.getData(uid)).name;
    var money = (await Currencies.getData(uid)).money;
    if (!money) money = 0;
var argss = `${money}`;
}
else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions).keys
		var uid = mention
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
	  var argss = `${money}`;
    var name = (await Users.getData(mention)).name
	} else {
   var name = (await Users.getData(senderID)).name;
   var uid = senderID
    var money = (await Currencies.getData(senderID)).money;
    if (!money) money = 0;
var argss = `${money}`;
  }
	 const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/atmaraxy.png";
    let bg = (await axios.get(`https://imgur.com/wrS74gQ.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
           let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = global.nodemodule["canvas"];
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname+`/cache/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    Canvas.registerFont(__dirname+`/cache/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "50px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText('' + argss.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 530, 359);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
       var msg =  {body: `💸 𝐒𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐜𝐮̉𝐚 ${name}\n${replace(money)}\n𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 ( ❤ ) 𝐓𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 Đ𝐎̂̉𝐈 Đ𝐎̛̀𝐈 𝐡𝐨𝐚̣̆𝐜 𝐓𝐑𝐀̆́𝐍𝐆 𝐓𝐀𝐘`, attachment: fs.createReadStream(path)
    }
return api.sendMessage(msg,  threadID, (error, info) => {
  global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: uid,
    })
    fs.unlinkSync(path),
        messageID
})
}
module.exports.handleReaction = async function({ event, api, handleReaction, Currencies}){
  if (event.userID != handleReaction.author) return;
  if (event.reaction != "❤") return; 
  const { senderID } = event 
  var money = (await Currencies.getData(handleReaction.author)).money;
  if(money < 500){
    return api.sendMessage('𝐒𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐛𝐚̣𝐧 đ𝐚𝐧𝐠 𝐜𝐨́ 𝐩𝐡𝐚̉𝐢 𝐡𝐨̛𝐧 𝟓𝟎𝟎 đ𝐨̂', event.threadID)
  }
  var sothu1 = Math.floor(Math.random() * 1000) + 1000
  var sothu2 = Math.floor(Math.random() * 1000) + 1000
  if (sothu1 == sothu2){
  await Currencies.increaseMoney(handleReaction.author, parseInt(money)) 
    return api.sendMessage(`𝐒𝐨̂́ 𝐦𝐚𝐲 𝐦𝐚̆́𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐥𝐚̀ [ ${sothu1} ]\n𝐒𝐨̂́ 𝐁𝐨𝐭 đ𝐮̛𝐚 𝐫𝐚 𝐥𝐚̀ [ ${sothu2} ]\n𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐧 đ𝐮̛𝐨̛̣𝐜 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐥𝐚̀ ${money + money}`,event.threadID)
  } else {
    await Currencies.decreaseMoney(handleReaction.author, parseInt(money)) 
    return api.sendMessage(`𝐒𝐨̂́ 𝐦𝐚𝐲 𝐦𝐚̆́𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐥𝐚̀ [ ${sothu1} ]\n𝐒𝐨̂́ 𝐁𝐨𝐭 đ𝐮̛𝐚 𝐫𝐚 𝐥𝐚̀ [ ${sothu2} ]\n𝐁𝐚̣𝐧 𝐭𝐫𝐚̆́𝐧𝐠 𝐭𝐚𝐲`,event.threadID)
  }
}
