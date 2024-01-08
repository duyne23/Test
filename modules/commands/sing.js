const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                dislike:
data.videoDetails.dislikes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchMusic]",
    cooldowns: 0
}

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.m4a`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗴𝘂̛̉𝗶 𝗳𝗶𝗹𝗲. 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗯𝗮̀𝗶 𝗵𝗮́𝘁 𝗸𝗵𝗮́𝗰!', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body:`🎶 ==== [ 𝗠𝗨𝗦𝗜𝗖 ] ==== 🎶\n━━━━━━━━━━━━━━━━━━\n→ 𝗡𝗮𝗺𝗲 𝗠𝘂𝘀𝗶𝗰: ${data.title}\n→ 𝗧𝗶𝗺𝗲: ${this.convertHMS(data.dur)}\n→ 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${data.author}\n→ 𝗩𝗶𝗲𝘄𝘀: ${data.viewCount}\n→ 𝗟𝗶𝗸𝗲𝘀: ${data.likes}\n→ 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: ${Math.floor((Date.now()- data.timestart)/1000)}s\n→ 𝗟𝗶𝗻𝗸 𝗧𝗮̉𝗶 𝗡𝗵𝗮̣𝗰: https://www.y2meta.com/vi/youtube/${handleReply.link[event.body -1]}\n→ 𝗡𝗴𝗮̀𝘆 𝗧𝗮̉𝗶 𝗟𝗲̂𝗻: ${data.publishDate}\n━━━━━━━━━━━━━━━━━━\n🎶 ==== [ 𝗠𝗨𝗦𝗜𝗖 ] ==== 🎶`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)

    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10);
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
  let axios = require('axios');
    if (args.length == 0 || !args) return api.sendMessage({body: '=== [ 𝗦𝗜𝗡𝗚 𝗠𝗘𝗡𝗨 ] ====\n━━━━━━━━━━━━━━━━━━\n\n𝟭. 𝗦𝗶𝗻𝗴 + 𝘁𝗲̂𝗻 𝗯𝗮̀𝗶 𝗵𝗮́𝘁 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗻𝗴𝗵𝗲 (𝘃𝗱: ?𝘀𝗶𝗻𝗴 𝗰𝗵𝗮́𝘂 𝘆𝗲̂𝘂 𝗯𝗮̀)\n𝟮. 𝗦𝗶𝗻𝗴 + 𝗹𝗶𝗻𝗸 𝘃𝗱 𝘆𝘁𝗯 𝗻𝗵𝗮̣𝗰 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗻𝗴𝗵𝗲 (𝘃𝗱: ?𝘀𝗶𝗻𝗴 𝗵𝘁𝘁𝗽𝘀://𝘆𝗼𝘂𝘁𝘂.𝗯𝗲/𝗶𝗗𝗫𝗥𝗞𝗛𝗬𝟳𝗺𝗝𝗔)\n[💓] → 𝗕𝗮̣𝗻 𝗰𝘂̃𝗻𝗴 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝗮̀𝗶 𝘀𝗶𝗻𝗴𝟮 𝗵𝗼𝗮̣̆𝗰 𝘀𝗶𝗻𝗴𝟯\n━━━━━━━━━━━━━━━━━━\n⚠️ 𝗟𝘂̛𝘂 𝘆́ 𝟭 𝘀𝗼̂́ 𝗻𝗵𝗮̣𝗰 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝗴𝘂̛̉𝗶 đ𝘂̛𝗼̛̣𝗰 𝗹𝗮̀ 𝗱𝗼 𝗾𝘂𝗮́ 𝗱𝗮̀𝗶',attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/images/girl')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.m4a`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 2621440000) return api.sendMessage('→ 𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗴𝘂̛̉𝗶 𝗳𝗶𝗹𝗲. 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗯𝗮̀𝗶 𝗵𝗮́𝘁 𝗸𝗵𝗮́𝗰!', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `🎧 Music: ${data.title}\n⏰ Time: ${this.convertHMS(data.dur)}\n👤 Channel: ${data.author}\n👀 Views: ${data.viewCount}\n👍 Likes: ${data.likes}\n⏱️ Processing time: ${Math.floor((Date.now()- data.timestart)/1000)}s`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)

        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0,
                numb = 0;
            var imgthumnail = []
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              let folderthumnail = __dirname + `/cache/${numb+=1}.png`;
                let linkthumnail = `https://img.youtube.com/vi/${value.id}/hqdefault.jpg`;
                let getthumnail = (await axios.get(`${linkthumnail}`, {
                    responseType: 'arraybuffer'
                })).data;
              let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=AIzaSyANZ2iLlzjDztWXgbCgL8Oeimn3i3qd0bE`)).data;
              fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));
              imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
                let channel = datac.items[0].snippet.channelTitle;
              num = num+=1
  if (num == 1) var num1 = "🎼→ ⓵ "
  if (num == 2) var num1 = "🎼→ ⓶ "
  if (num == 3) var num1 = "🎼→ ⓷ "
  if (num == 4) var num1 = "🎼→ ⓸ "
  if (num == 5) var num1 = "🎼→ ⓹ "
  if (num == 6) var num1 = "🎼→ ⓺ "
              msg += (`${num1} ${value.title}\n→[⏰] 𝐓𝐢𝐦𝐞: ${value.length.simpleText}\n→[📻] 𝐊𝐞̂𝐧𝐡: ${channel}\n---------------------------\n`);
            }
            var body = `→🔎 𝐂𝐨́ ${link.length} 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐫𝐮̀𝐧𝐠 𝐯𝐨̛́𝐢 𝐭𝐮̛̀ 𝐤𝐡𝐨𝐚́ 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧:\n\n${msg}\n→ 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢 𝐭𝐡𝐞𝐨 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣) 𝐜𝐡𝐨̣𝐧 𝐦𝐨̣̂𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐭𝐫𝐞̂𝐧`
            return api.sendMessage({
              attachment: imgthumnail,
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('Đã xảy ra lỗi, vui lòng thử lại trong giây lát!!\n' + e, event.threadID, event.messageID);
        }
    }
              }
