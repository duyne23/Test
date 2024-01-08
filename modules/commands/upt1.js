module.exports.config = {
	name: "upt",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "tnt",
	description: "thời gian bot on",
	commandCategory: "Hệ Thống",
	cooldowns: 0
}

module.exports.run = async({ api, event, getText }) => {
  if (!event.body) return;
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
  if (event.body.toLowerCase().indexOf("upt") == 0) {
    //getPrefix
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("upt")) ? threadSetting.PREFIX : global.config.PREFIX;
var startTime = Date.now()
var uptime = process.uptime()
		hours = Math.floor(uptime / (60 * 60))
		miutes = Math.floor((uptime % (60 * 60)) / 60)
		seconds = Math.floor(uptime % 60)

 api.sendMessage(getText("uptime", checkTime(hours), checkTime(miutes), checkTime(seconds), (Date.now()-startTime)), event.threadID, event.messageID)
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i
    }
  return i
}
