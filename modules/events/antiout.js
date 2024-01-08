module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events",
  dependencies: {
		"fs-extra": "",
		"path": ""
}
};

module.exports.run = async({ event, api, Threads, Users }) => {
  const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
  const { join } =  global.nodemodule["path"];
   const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
     if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝟐'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝟑'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝟒'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝟓'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝟔'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝟕'
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
const path = join(__dirname, "cache", "antiout","randomgif");
	const gifPath = join(path, `tb.mp3`);
  const hhh = join(__dirname, "cache", "antiout","randomgif");
	const gifhh = join(hhh, `tc.mp3`);
	const randomPath = readdirSync(join(__dirname, "cache", "antiout", "randomgif"));
	 if (randomPath.lenth != 0) {
		const pathRandom = join(__dirname, "cache", "antiout", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
}
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage({body: `[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] - 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐞̂𝐦 𝐥𝐚̣𝐢 𝐜𝐨𝐧 𝐚̂𝐦 𝐛𝐢𝐧𝐡 𝐧𝐚̀𝐲 ${name} 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 \n[ 𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 ] ➣ ${timeNow} `, attachment: createReadStream(gifPath) },event.threadID)
   } else api.sendMessage({body:`[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] - 𝐀𝐝𝐮𝐮𝐮 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐲𝐞̂𝐮 ${name} 𝐜𝐮̉𝐚 𝐭𝐚𝐨 𝐯𝐮̛̀𝐚 𝐭𝐡𝐨𝐚́𝐭 𝐤𝐡𝐨̉𝐢 𝐧𝐡𝐨́𝐦 𝐧𝐡𝐮̛𝐧𝐠 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐨𝐚́𝐭 𝐤𝐡𝐨̉𝐢 𝐭𝐚𝐲 𝐚𝐧𝐡 ! \n『 𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 』➣ ${timeNow} `,attachment: createReadStream(gifhh) }, event.threadID);
  })
 }
}
