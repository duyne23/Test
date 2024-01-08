const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "sendtion",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "TruongMini", //Update by Quoc Tuan
  description: "",
  commandCategory: "Admin",
  usages: "< nội dung >",
  cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
  let msg = {}, attachment = [];
  msg.body = body;
  for (let eachAtm of atm) {
    await new Promise(async (resolve) => {
      try {
        let response = await request.get(eachAtm.url),
          pathName = response.uri.pathname,
          ext = pathName.substring(pathName.lastIndexOf(".") + 1),
          path = __dirname + `/cache/${eachAtm.filename}.${ext}`
        response
          .pipe(fs.createWriteStream(path))
          .on("close", () => {
            attachment.push(fs.createReadStream(path));
            atmDir.push(path);
            resolve();
          })
      } catch (e) { console.log(e); }
    })
  }
  msg.attachment = attachment;
  resolve(msg);
})

module.exports.handleReply = async function({ api, event, handleReply, Users, Threads }) {
  const { threadID, messageID, senderID, body } = event;
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  let name = await Users.getNameUser(senderID);
  var abc = [event.senderID.toString()]
  var content = event.body
  switch (handleReply.type) {
    case "sendnoti": {
      let text = `===== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] =====\n\n→ Gửi từ thành viên: ${name}\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n→ Tên nhóm: ${(await Threads.getInfo(threadID)).threadName || "Tên không tồn tại"}\n──────────────────\n→ Nội dung: ${body}\n→ Phản hồi từ nội dung: ${handleReply.content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để gửi nội dung đến thành viên`;
      if (event.attachments.length > 0) text = await getAtm(event.attachments, `===== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] =====\n\n→ Gửi từ thành viên: ${name}\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n→ Tên nhóm: ${(await Threads.getInfo(threadID)).threadName || "Tên không tồn tại"}\n──────────────────\n→ Nội dung: ${body}\n→ Phản hồi từ nội dung: ${handleReply.content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để gửi nội dung đến thành viên`);
      for (var id of handleReply.abc) {
        api.sendMessage(text, id, (err, info) => {
          atmDir.forEach(each => fs.unlinkSync(each))
          atmDir = [];
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            messID: messageID,
            threadID,
            nameUser: name,
            content
          })
        });
      }
      api.sendMessage(`Đã gửi nội dung đến a chủ ${handleReply.nameUser} của mị 🥰`, event.threadID, event.messageID);
      break;
    }
    case "reply": {
      let text = `==== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] ====\n\n→ Thông báo từ ${name} gửi đến\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n→ Nơi gửi: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName : 'từ cuộc trò chuyện riêng với bot '}\n──────────────────\n→ Nội dung: ${body}\n→ Phản hồi từ nội dung: ${handleReply.content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để báo về cho Người điều hành`;
      if (event.attachments.length > 0) text = await getAtm(event.attachments, `==== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] ====\n\n→ Thông báo từ ${name} gửi đến\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n→ Nơi gửi: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName : 'từ cuộc trò chuyện riêng với bot '}\n──────────────────\n→ Nội dung: ${body}\n→ Phản hồi từ nội dung: ${handleReply.content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để báo về cho Người điều hành`);
      api.sendMessage(text, handleReply.threadID, (err, info) => {
        api.sendMessage(`Đã gửi nội dung đến thành viên ${handleReply.nameUser}`, event.threadID, event.messageID);
        atmDir.forEach(each => fs.unlinkSync(each))
        atmDir = [];
        global.client.handleReply.push({
          name: this.config.name,
          type: "sendnoti",
          messageID: info.messageID,
          threadID,
          nameUser: name,
          abc,
          content
        })
      }, handleReply.messID);
      break;
    }
  }
}

module.exports.run = async function({ api, event, args, Users }) {
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  const { threadID, messageID, senderID, messageReply } = event;
  if (!args[0]) return api.sendMessage("Vui lòng nhập nội dung cần gửi", threadID);
  let allThread = global.data.allThreadID || [];
  let can = 0, canNot = 0;
  let nameUser = await Users.getNameUser(senderID)
  var abc = [event.senderID.toString()]
  var content = args.join(" ")
  let text = `==== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] ====\n\n→ Thông báo từ ${nameUser} gửi đến\n→ Nơi gửi: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName : 'từ cuộc trò chuyện riêng với bot '}\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n──────────────────\n→ Nội dung: ${content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để báo về cho Người Điều Hành`;
  if (event.type == "message_reply") text = await getAtm(messageReply.attachments, `==== [ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] ====\n\n→ Thông báo từ ${nameUser} gửi đến\n→ Nơi gửi: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName : 'từ cuộc trò chuyện riêng với bot '}\n→ Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n──────────────────\n→ Nội dung: ${content}\n→ Time: ${gio}\n──────────────────\n→ Phản hồi tin nhắn này để báo về cho Người Điều Hành`);
  await new Promise(resolve => {
    allThread.forEach((each) => {
      try {
        api.sendMessage(text, each, (err, info) => {
          if (err) { canNot++; }
          else {
            can++;
            atmDir.forEach(each => fs.unlinkSync(each))
            atmDir = [];
            global.client.handleReply.push({
              name: this.config.name,
              type: "sendnoti",
              messageID: info.messageID,
              messID: messageID,
              threadID,
              nameUser,
              abc,
              content
            })
            resolve();
          }
        })
      } catch (e) { console.log(e) }
    })
  })
  api.sendMessage(`[ ᴛʜᴏ̂ɴɢ ʙᴀ́ᴏ ] → Gửi thông báo thành công ${can} nhóm, không thành công ${canNot} nhóm`, threadID);
}
