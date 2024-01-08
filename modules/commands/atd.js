var configCommand = {
    name: 'atd',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: 'Tự động tải xuống khi phát hiện liên kết',
    commandCategory: 'TIỆN ÍCH',
    usages: '[]',
    cooldowns: 3
},
axios = require('axios'),
downloader = require('image-downloader'),
fse = require('fs-extra'),
toolsFb = require('tools-fb'),
path = __dirname+'/cache/statusAuto.json';

async function streamURL(url, mime) {
    const dest = `${__dirname}/cache/${Date.now()}.${mime}`;
    await downloader.image({
        url, dest
    });
    setTimeout(j=>fse.unlinkSync(j), 60*1000, dest);
    return fse.createReadStream(dest);
};

function onLoad() {
    if (!fse.existsSync(path)) fse.writeFileSync(path, '{}');
};

async function noprefix(arg) {
    const s = JSON.parse(fse.readFileSync(path));
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY)  (dddd)");
    if (arg.event.senderID == (global.botID || arg.api.getCurrentUserID())) return;
    if ((typeof s[arg.event.threadID] == 'boolean' && !s[arg.event.threadID])) return;

    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID),
    arr = arg.event.args,
    regEx_tiktok = /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//,
    regEx_youtube = /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//,
    regEx_facebook = /(^https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch)\/((story\.php|page\.\w+)(\?|\/))?(story_fbid=|\w+\/)/,
    regEx_instagram = /^\u0068\u0074\u0074\u0070\u0073\u003a\/\/(www\.)?instagram\.com\/(reel|p)\/\w+\/\w*/

    for (const el of arr) {
        /* 𝗧𝘂̛̣ 𝗱𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝘃𝗶𝗱𝗲𝗼 𝘁𝗶𝗸 𝘁𝗼𝗸 🌼 */
       /* if (regEx_tiktok.test(el)) {
            const data = (await axios.post(`https://www.tikwm.com/api/`, {
                url: el
            })).data.data;
            out({
body: `=== 『 𝗠𝗣𝟯 𝗗𝗢𝗪𝗡 』 ====\n━━━━━━━━━━━━━━━━━━\n\n→ [🎶] 𝐀̂𝗺 𝘁𝗵𝗮𝗻𝗵 𝘁𝘂̛̀ 𝘃𝗶𝗱𝗲𝗼 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗲̀\n→ [💓] Đ𝐚̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝗱𝗼𝘄𝗻 𝗺𝗽𝟯 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝘁𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 ( 👍 ) 𝘃𝗮̀𝗼 𝘃𝗶𝗱𝗲𝗼`, attachment: await streamURL(_.url, 'mp3')}, '', '', _.messageID);
                }); // Video không logo thì sửa "wmplay" -> "play";
        };
        /* END */

        /* 𝙏𝙪̛̣ 𝙙𝙤̣̂𝙣𝙜 𝙩𝙖̉𝙞 𝙫𝙞𝙙𝙚𝙤 𝙮𝙤𝙪𝙩𝙪𝙗𝙚 🌹*/
       /* if (regEx_youtube.test(el)) {
            const data = (await axios.get(`https://nguyenlienmanh.com/v2/youtube/downloader?url=${el}=Jk38OqdAQxc`)).data.data,
            info = (a, b) => `=== 『 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 』 ====\n━━━━━━━━━━━━━━━━━━\n\n[📩] → 𝗧𝗶𝗲̂𝘂 Đ𝗲̂̀: ${a.title}\n[🧸] → 𝗧𝗵𝗼̛̀𝗶 𝗟𝘂̛𝗼̛̣𝗻𝗴: ${a.duration}\n\n[❤] → Đ𝐚̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝘃𝗶𝗱𝗲𝗼 𝘆𝗼𝘂𝘁𝘂𝗯𝗲 𝗸𝗵𝗶 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝗹𝗶𝗻𝗸 📺`;
            if (data.video.size < 26214400)out({
                body: (info(data, data.video.size))+'\n\n→ 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 👍 đ𝗲̂̉ 𝘁𝗮̉𝗶 𝗻𝗵𝗮̣𝗰.'+`\n\n`, attachment: await streamURL(data.video.url, 'mp4')}, '', (err, datMsg) => global.client.handleReaction.push({
                    name: configCommand.name, messageID: datMsg.messageID, url: data.video.url
                })); else if (data.music.size < 26214400)out({
                body: (info(data))+`\n\n→ 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝘀𝗮̀𝗶 𝗯𝗼𝘁 𝘃𝘂𝗶 𝘃𝗲̉ 💓`, attachment: await streamURL(data.music.url, 'mp3')});
        };
        /* END */

        /*  𝙏𝙪̛̣ 𝙙𝙤̣̂𝙣𝙜 𝙩𝙖̉𝙞 𝙫𝙞𝙙𝙚𝙤 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 🌵 */
        if (regEx_facebook.test(el)) out({
            attachment: await streamURL((result = (await axios.get(`https://cukcak--0981390692.repl.co/api/facebook?URL=${el}`)).data.data, result.HD), 'mp4'), body: `=== 『 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 』 ====\n━━━━━━━━━━━━━━━━━━\n\n[📖] → 𝗧𝗶𝗲̂𝘂 Đ𝗲̂̀: ${result.title}\n[📺] → Đ𝐚̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝘃𝗶𝗱𝗲𝗼 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗸𝗵𝗶 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝗹𝗶𝗻𝗸\n→ 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 👍 đ𝗲̂̉ 𝘁𝗮̉𝗶 𝗻𝗵𝗮̣𝗰.`
        }, '', (err, dataMsg) => global.client.handleReaction.push({
                name: configCommand.name, messageID: dataMsg.messageID, url: result.music.url
            }));
        /* END */

        if (regEx_instagram.test(el))out({
            attachment: await streamURL((idl = (await axios.get(`https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/instagram/downloadpost?url=${el}`)).data, idl[((irx = /\/p\//.test(el))?'display': 'video')+'_url']), irx?'jpg': 'mp4'), body: !irx? '👍':''
        }, '', !irx?(err, dataMsg) => global.client.handleReaction.push({
                name: configCommand.name, messageID: dataMsg.messageID, url: idl.video_url
            }): '');
    };
};
async function reactionMsg(arg) {
  if(arg.event.reaction == '👍'){
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d),
    _ = arg.handleReaction;
    if ('url'in _) out({
        body: `=== 『 𝗠𝗣𝟯 𝗗𝗢𝗪𝗡 』 ====\n━━━━━━━━━━━━━━━━━━\n\n→ [🎶] 𝐀̂𝗺 𝘁𝗵𝗮𝗻𝗵 𝘁𝘂̛̀ 𝘃𝗶𝗱𝗲𝗼 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗲̀\n→ [💓] Đ𝐚̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝗱𝗼𝘄𝗻 𝗺𝗽𝟯 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝘁𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 ( 👍 ) 𝘃𝗮̀𝗼 𝘃𝗶𝗱𝗲𝗼`, attachment: await streamURL(_.url, 'mp3')}, '', '', _.messageID);
}
};
function runCommand(arg) {
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID);
    const data = JSON.parse(fse.readFileSync(path));
    s = data[arg.event.threadID] = typeof data[arg.event.threadID] != 'boolean'||!!data[arg.event.threadID]?false: true;
    fse.writeFileSync(path, JSON.stringify(data, 0, 4));
    out((s?'→ bật': '→ tắt')+' '+configCommand.name);
};

module.exports = {
    config: configCommand,
    onLoad,
    run: runCommand,
    handleEvent: noprefix,
    handleReaction: reactionMsg
};
