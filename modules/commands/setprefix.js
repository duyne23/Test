module.exports.config = {
	name: "setprefix",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Đặt lại prefix của nhóm",
	commandCategory: "công cụ",
	usages: "[prefix/reset]",
	cooldowns: 0
};

module.exports.languages ={
	"vi": {
		"successChange": "Đ𝗮̃ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 đ𝗼̂̉𝗶 𝗽𝗿𝗲𝗳𝗶𝘅 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺 𝘁𝗵𝗮̀𝗻𝗵: %1",
		"missingInput": "𝗣𝗵𝗮̂̀𝗻 𝗽𝗿𝗲𝗳𝗶𝘅 𝗰𝗮̂̀𝗻 đ𝗮̣̆𝘁 𝗸𝗵𝗼̂𝗻𝗴 đ𝘂̛𝗼̛̣𝗰 đ𝗲̂̉ 𝘁𝗿𝗼̂́𝗻𝗴",
		"resetPrefix": "Đ𝗮̃ 𝗿𝗲𝘀𝗲𝘁 𝗽𝗿𝗲𝗳𝗶𝘅 𝘃𝗲̂̀ 𝗺𝗮̣̆𝗰 đ𝗶̣𝗻𝗵: %1",
		"confirmChange": "𝗯𝗮̣𝗻 𝗰𝗼́ 𝗰𝗵𝗮̆́𝗰 𝗺𝘂𝗼̂́𝗻 đ𝗼̂̉𝗶 𝗽𝗿𝗲𝗳𝗶𝘅 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺 𝘁𝗵𝗮̀𝗻𝗵: %1\n➝ 𝘁𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 𝘃𝗮̀𝗼 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝘅𝗮́𝗰 𝗻𝗵𝗮̣̂𝗻"
	},
	"en": {
		"successChange": "Changed prefix into: %1",
		"missingInput": "Prefix have not to be blank",
		"resetPrefix": "Reset prefix to: %1",
		"confirmChange": "Are you sure that you want to change prefix into: %1"
	}
}

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);
    
     api.changeNickname(`[ ${handleReaction.PREFIX} ] ${global.config.BOTNAME}`, event.threadID, event.senderID);
		return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
    
	} catch (e) { return console.log(e) }
}

module.exports.run = async ({ api, event, args, Threads , getText }) => {
	if (typeof args[0] == "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	if (prefix == "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
    var uid = api.getCurrentUserID()
    api.changeNickname(`« ${global.config.PREFIX} « ${global.config.BOTNAME}`,event.threadID, uid);
    
		return api.sendMessage(getText("resetPrefix", global.config.PREFIX), event.threadID, event.messageID);
	} else return api.sendMessage(getText("confirmChange", prefix), event.threadID, (error, info) => {
		global.client.handleReaction.push({
			name: "setprefix",
			messageID: info.messageID,
			author: event.senderID,
			PREFIX: prefix
		})
	})
}
