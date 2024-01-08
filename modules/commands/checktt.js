module.exports.config = {
  name: "checktt", // Tên lệnh, được sử dụng trong việc gọi lệnh
  version: "1.0.1", // phiên bản của module này
  hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
  credits: "DungUwU && Nghĩa", // Mod by (Q.Huy, Hanaku, Dương Công Nam, Tpk)
  description: "Check tương tác ngày/tuần/toàn bộ", // Thông tin chi tiết về lệnh
  commandCategory: "Tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
  usages: "[all/week/day]", // Cách sử dụng lệnh
  cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
  dependencies: {
    "fs": " ",
    "moment-timezone": " "
  }
};

const path = __dirname + '/checktt1/';
const moment = require('moment-timezone');
 
module.exports.onLoad = () => {
  const fs = require('fs');
  if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
    fs.mkdirSync(path, { recursive: true });
  }
  setInterval(() => {
    const today = moment.tz("Asia/Ho_Chi_Minh").day();
    const checkttData = fs.readdirSync(path);
    checkttData.forEach(file => {
      let fileData = JSON.parse(fs.readFileSync(path + file));
      if (fileData.time != today) {
        setTimeout(() => {
          fileData = JSON.parse(fs.readFileSync(path + file));
          if (fileData.time != today) {
            fileData.time = today;
            fs.writeFileSync(path + file, JSON.stringify(fileData, null, 4));
          }
        }, 60 * 1000);
      }
    })
  }, 60 * 1000);
}

module.exports.handleEvent = async function({ api, event, Threads }) {
  if (!event.isGroup) return;
  if (global.client.sending_top == true) return;
  const fs = global.nodemodule['fs'];
  const { threadID, senderID } = event;
  const today = moment.tz("Asia/Ho_Chi_Minh").day();

  if (!fs.existsSync(path + threadID + '.json')) {
    const newObj = {
      total: [],
      week: [],
      day: [],
      time: today
    };
    fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
    const threadInfo = await Threads.getInfo(threadID) || {};
    if (threadInfo.hasOwnProperty('isGroup') && threadInfo.isGroup) {
      const UserIDs = threadInfo.participantIDs;
      for (user of UserIDs) {
        if (!newObj.total.find(item => item.id == user)) {
          newObj.total.push({
            id: user,
            count: 0
          });
        }
        if (!newObj.week.find(item => item.id == user)) {
          newObj.week.push({
            id: user,
            count: 0
          });
        }
        if (!newObj.day.find(item => item.id == user)) {
          newObj.day.push({
            id: user,
            count: 0
          });
        }
      }
    }
    fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
  }
  const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
  if (threadData.time != today) {
    global.client.sending_top = true;
    setTimeout(() => global.client.sending_top = false, 5 * 60 * 1000);
  }
  const userData_week_index = threadData.week.findIndex(e => e.id == senderID);
  const userData_day_index = threadData.day.findIndex(e => e.id == senderID);
  const userData_total_index = threadData.total.findIndex(e => e.id == senderID);
  if (userData_total_index == -1) {
    threadData.total.push({
      id: senderID,
      count: 1,
    });
  } else threadData.total[userData_total_index].count++;
  if (userData_week_index == -1) {
    threadData.week.push({
      id: senderID,
      count: 1
    });
  } else threadData.week[userData_week_index].count++;
  if (userData_day_index == -1) {
    threadData.day.push({
      id: senderID,
      count: 1
    });
  } else threadData.day[userData_day_index].count++;
  // if (threadData.time != today) {
  //     threadData.day.forEach(e => {
  //         e.count = 0;
  //     });
  //     if (today == 1) {
  //         threadData.week.forEach(e => {
  //             e.count = 0;
  //         });
  //     }
  //     threadData.time = today;
  // }

  fs.writeFileSync(path + threadID + '.json', JSON.stringify(threadData, null, 4));
}

module.exports.run = async function({ api, event, args, Users, Threads }) {
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
  await new Promise(resolve => setTimeout(resolve, 500));
  let threadInfo = await api.getThreadInfo(event.threadID);
  const fs = global.nodemodule['fs'];
  const { threadID, messageID, senderID, mentions } = event;
  if (!fs.existsSync(path + threadID + '.json')) {
    return api.sendMessage("Chưa có dữ liệu", threadID);
  }
  const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
  const query = args[0] ? args[0].toLowerCase() : '';
  ///////////////////small code////////////////////////////////
  var x = threadData.total.sort((a, b) => b.count - a.count);
  var o = [];
  for (i = 0; i < x.length; i++) {
    o.push({
      rank: i + 1,
      id: x[i].id,
      count: x[i].count
    })
  }
  /////////////////////////////////////////////////////////////
  var header = '',
    body = '',
    footer = '',
    msg = '',
    count = 1,
    storage = [],
    data = 0;
  if (query == 'all' || query == '-a') {
    header = '==== 𝗖𝗛𝗘𝗖𝗞_𝗔𝗟𝗟 ====';
    data = threadData.total;

  } else if (query == 'week' || query == '-w') {
    header = '==== 𝗖𝗛𝗘𝗖𝗞_𝗪𝗘𝗘𝗞 ====';
    data = threadData.week;
  } else if (query == 'day' || query == '-d') {
    header = '==== 𝗖𝗛𝗘𝗖𝗞_𝗗𝗔𝗬 ====';
    data = threadData.day;
  } else {
    data = threadData.total;
  }
  for (const item of data) {
    const userName = await Users.getNameUser(item.id) || 'Facebook User';
    const itemToPush = item;
    itemToPush.name = userName;
    storage.push(itemToPush);
  };
  let check = ['all', '-a', 'week', '-w', 'day', '-d'].some(e => e == query);
  if (!check && Object.keys(mentions).length > 0) {
    storage = storage.filter(e => mentions.hasOwnProperty(e.id));
  }
  //sort by count from high to low if equal sort by name
  storage.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    else if (a.count < b.count) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  if ((!check && Object.keys(mentions).length == 0) || (!check && Object.keys(mentions).length == 1) || (!check && event.type == 'message_reply')) {
    const UID = event.messageReply ? event.messageReply.senderID : Object.keys(mentions)[0] ? Object.keys(mentions)[0] : senderID;
    const userRank = storage.findIndex(e => e.id == UID);
    const userTotal = threadData.total.find(e => e.id == UID) ? threadData.total.find(e => e.id == UID).count : 0;
    const userTotalWeek = threadData.week.find(e => e.id == UID) ? threadData.week.find(e => e.id == UID).count : 0;
    const userRankWeek = threadData.week.sort((a, b) => b.count - a.count).findIndex(e => e.id == UID);
    const userTotalDay = threadData.day.find(e => e.id == UID) ? threadData.day.find(e => e.id == UID).count : 0;
    const userRankDay = threadData.week.sort((a, b) => b.count - a.count).findIndex(e => e.id == UID);
    const nameUID = storage[userRank].name || 'Facebook User';
    const tlttd = (userTotalDay / (storage.reduce((a, b) => a + b.count, 0))) * 100;
    const tlttt = (userTotalWeek / (storage.reduce((a, b) => a + b.count, 0))) * 100
    const tltt = (((storage.filter($ => $.id == senderID))[0].count) / (storage.reduce((a, b) => a + b.count, 0))) * 100
    let threadInfo = await api.getThreadInfo(event.threadID);
    nameThread = threadInfo.threadName;
    var permission;
    if (global.config.ADMINBOT.includes(UID)) permission = `Admin Bot`;
    else if
      (global.config.NDH.includes(UID))
      permission = `Người Hỗ Trợ`; else if (threadInfo.adminIDs.some(i => i.id == UID)) permission = `Quản Trị Viên`; else permission = `Thành Viên`;
    const target = UID == senderID ? 'Bạn' : nameUID;
    if (userRank == -1) {
      return api.sendMessage(`${target} chưa có dữ liệu`, threadID);
    }
    body += `🌸=== [ 𝗖𝗛𝗘𝗖𝗞 𝗧𝗨̛𝗢̛𝗡𝗚 𝗧𝗔́𝗖 ] ===🌸
        ━━━━━━━━━━━━━━━
        👤 𝗧𝗲̂𝗻: ${nameUID}
        💮 𝗖𝗵𝘂̛́𝗰 𝗩𝘂̣: ${permission}
        🎶 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: https://www.facebook.com/profile.php?id=${UID}
        🔰 𝗧𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${nameThread}
        ━━━━━━━━━━━━━━━
        💌 𝗧𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗿𝗼𝗻𝗴 𝗻𝗴𝗮̀𝘆: ${userTotalDay}
        🎖️ 𝗛𝗮̣𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝗻𝗴𝗮̀𝘆: ${userRankDay + 1}
        📊 𝗧𝗶̉ 𝗹𝗲̣̂ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 𝗻𝗴𝗮̀𝘆: ${Math.ceil(tlttd)}%
        ━━━━━━━━━━━━━━━
        💬 𝗧𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗿𝗼𝗻𝗴 𝘁𝘂𝗮̂̀𝗻: ${userTotalWeek}
        📚 𝗛𝗮̣𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝘁𝘂𝗮̂̀𝗻: ${userRankWeek + 1}
        📑 𝗧𝗶̉ 𝗹𝗲̣̂ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 𝘁𝘂𝗮̂̀𝗻: ${Math.ceil(tlttt)}%
        ━━━━━━━━━━━━━━━
        📝 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${userTotal}
        🏅 𝗛𝗮̣𝗻𝗴 𝘁𝗼̂̉𝗻𝗴: ${userRank + 1}
        📊 𝗧𝗶̉ 𝗹𝗲̣̂ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 𝘁𝗵𝗮́𝗻𝗴: ${Math.ceil(tltt)}℅

        😻 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 "❤️" 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝗼̂̉𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝘁𝗼𝗮̀𝗻 𝗯𝗼̣̂ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺.
        `.replace(/^ +/gm, '');
    console.log(storage.reduce((a, b) => a + b.count, 0))
  } else {
    console.log((storage.filter($ => $.id == senderID))[0].count)
    body = storage.map(item => {
      return `${count++}. ${item.name} với ${item.count} tin nhắn`;
    }).join('\n');
    const userTotalWeek = threadData.week.find(e => e.id == senderID) ? threadData.week.find(e => e.id == senderID).count : 0;
    const userTotalDay = threadData.day.find(e => e.id == senderID) ? threadData.day.find(e => e.id == senderID).count : 0;
    const tlttd = (userTotalDay / (storage.reduce((a, b) => a + b.count, 0))) * 100;
    const tlttt = (userTotalWeek / (storage.reduce((a, b) => a + b.count, 0))) * 100
    const tltt = (((storage.filter($ => $.id == senderID))[0].count) / (storage.reduce((a, b) => a + b.count, 0))) * 100
    footer = `\n💞 𝗧𝗼̂̉𝗻𝗴 𝗧𝗶𝗻 𝗡𝗵𝗮̆́𝗻: ${storage.reduce((a, b) => a + b.count, 0)}`;
  }

  msg = `${header}\n\n${body}\n${footer}`;
 api.sendMessage({body: msg + '\n' /*+ `→ Bạn hiện đang đứng ở hạng: ${(o.filter(id => id.id == senderID))[0]['rank']}` */ + `${query == 'all' || query == '-a' ? `🌸 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 đ𝗮𝗻𝗴 đ𝘂̛́𝗻𝗴 𝗼̛̉ 𝗵𝗮̣𝗻𝗴: ${(o.filter(id => id.id == senderID))[0]['rank']}\n━━━━━━━━━━━━━━━━━━\n↪️ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ đ𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗹𝗼̣𝗰 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰.\n📌 𝗟𝘂̛𝘂 𝘆́: 𝗰𝗵𝗶̉ 𝗤𝗧𝗩 𝗺𝗼̛́𝗶 đ𝘂̛𝗼̛̣𝗰 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴.` : ""}`, attachment: [await streamURL(threadInfo.imageSrc), await streamURL(`
https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)]}, threadID, (error, info) => {

    if (error) console.log(error)
    if(query == 'all' || query == '-a'){
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      tag: 'locmen',
      thread: threadID,
      author: senderID,storage,
    })
    }
       //if((!check && Object.keys(mentions).length == 0) || (!check && Object.keys(mentions).length == 1) || (!check && event.type == 'message_reply')){
    global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      sid:senderID,
    })
//  }
  });
  threadData = storage = null;
}
module.exports.handleReply = async function({
  api
  , event
  , args
  , handleReply
  , client
  , __GLOBAL
  , permssion
  , Threads
  , Users
  , Currencies
}) {
  try {
    const { senderID } = event
    let dataThread = (await Threads.getData(event.threadID)).threadInfo;
    if (isNaN(event.body)) return api.sendMessage()
    if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('→ Bot cần quyền quản trị viên!', event.threadID, event.messageID);
if (!dataThread.adminIDs.some(item => item.id == senderID)) return api.sendMessage('→ Bạn không đủ quyền hạn để lọc thành viên!', event.threadID, event.messageID);
    const fs = require('fs')
    //const threadData = JSON.parse(fs.readFileSync(path + handleReply.thread + '.json'));
    // const data = threadData["total"]
    /*var x = threadData.total.sort((a, b) => b.count - a.count);
    var o = [];
    for (i = 0; i < x.length; i++) {
      o.push({
        rank: i + 1,
        id: x[i].id,
        count: x[i].count
      })
    }
    console.log(o)*/
    var split = event.body.split(" ")

    if(isNaN(split.join('')))return api.sendMessage(`→ dữ liệu không hợp lệ!`, event.threadID);

    let msg = [];
    for(let $ of split){
        let id = handleReply?.storage[$-1]?.id;

        if(!!id){await api.removeUserFromGroup(id, event.threadID);
            msg.push(`${$}. ${global.data.userName.get(id)}`)
        }
    };

    api.sendMessage(`💮 === [ 𝗖𝗛𝗘𝗖𝗞 𝗟𝗢̣𝗖 𝗠𝗘𝗠 ] === 💮\n\n💓 đ𝗮̃ 𝘅𝗼́𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n👤 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗗𝘂̀𝗻𝗴: ${msg.join('\n')}`, handleReply.thread/*, (e, i) => {
      for (i = 0; i < split.length; i++) {
        if (e) return api.sendMessage('Hãy reply 1 con số bất kỳ trong danh sách tương tác', handleReply.thread)
        if (i > split.length) break;
        var oi = split[i]
        api.removeUserFromGroup(o[oi - 1].id, handleReply.thread)
      }
    }*/)

  } catch (e) {
    console.log(e)
  }
}
module.exports.handleReaction = function({ event, Users,Threads , api, handleReaction:_, Currencies}){
  const fs = require('fs')
  if (event.userID != _.sid) return;
  if (event.reaction != "❤") return; 
  api.unsendMessage(_.messageID)
  let data = JSON.parse(fs.readFileSync(`${path}${event.threadID}.json`));
  let sort = data.total.sort((a,b)=>a.count<b.count?0:-1);

  api.sendMessage(`${sort.map(($,i)=>`${i+1}. ${global.data.userName.get($.id)} - ${$.count} tin.`).join('\n')}\n\n🔗 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${data.total.reduce((s,$)=>s+$.count,0)}\n🌸 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 đ𝗮𝗻𝗴 đ𝘂̛́𝗻𝗴 𝗼̛̉ 𝗵𝗮̣𝗻𝗴: ${sort.findIndex($=>$.id==event.userID)+1}\n━━━━━━━━━━━━━━━━━━\n↪️ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ đ𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗹𝗼̣𝗰 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰.\n📌 𝗟𝘂̛𝘂 𝘆́: 𝗰𝗵𝗶̉ 𝗤𝗧𝗩 𝗺𝗼̛́𝗶 đ𝘂̛𝗼̛̣𝗰 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴.`, event.threadID,(err, info)=>global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      tag: 'locmen',
      thread: event.threadID,
      author: event.senderID,
    })
    );


  /*const { senderID } = event;
  const { author } = handleReaction
  const threadData = JSON.parse(fs.readFileSync(path + handleReaction.thread + '.json'));
    let dataThread = (await Threads.getData(handleReaction.thread)).threadInfo;
  var header = '',
    body = '',
    footer = '',
    msg = '',
    count = 1,
    storage = [],
    data = 0;
 header = '==== 𝗖𝗛𝗘𝗖𝗞_𝗔𝗟𝗟 ====';
    data = threadData.total;
    for (const item of data) {
    const userName = await Users.getNameUser(item.id) || 'Facebook User';
    const itemToPush = item;
    itemToPush.name = userName;
    storage.push(itemToPush);
  };
   storage.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    else if (a.count < b.count) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  body = storage.map(item => {
      return `${count++}. ${item.name} với ${item.count} tin nhắn`;
    }).join('\n');
    const userTotalWeek = threadData.week.find(e => e.id == author) ? threadData.week.find(e => e.id == author).count : 0;
    const userTotalDay = threadData.day.find(e => e.id == author) ? threadData.day.find(e => e.id == author).count : 0;
    const tlttd = (userTotalDay / (storage.reduce((a, b) => a + b.count, 0))) * 100;
    const tlttt = (userTotalWeek / (storage.reduce((a, b) => a + b.count, 0))) * 100
    const tltt = (((storage.filter($ => $.id == author))[0].count) / (storage.reduce((a, b) => a + b.count, 0))) * 100
    footer = `\n→ Tổng Tin Nhắn: ${storage.reduce((a, b) => a + b.count, 0)}`;
  msg = `${header}\n${body}\n${footer}`;
return api.sendMessage(msg, event.threadID)*/
    }
