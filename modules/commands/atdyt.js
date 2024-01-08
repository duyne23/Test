var 
  ytdl = require('ytdl-core'),
  fs = require("fs-extra"),
  cheerio = require("cheerio"),
  axios = require("axios"),
  { resolve } = require('path'),
  downloadMusicFromYoutube = async function (link, path) {
    var timestart = Date.now();
    if (!link) return 'Thiếu link';
    var 
      resolveFunc = function () { },
      rejectFunc = function () { },
      returnPromise = new Promise(function (resolve, reject) {
        resolveFunc = resolve;
        rejectFunc = reject;
      });
    ytdl(link, {
      filter: format => format.quality == 'tiny' && format.audioBitrate == 128 && format.hasAudio == true
    })
      .pipe(fs.createWriteStream(path))
      .on("close", async () => {
        var data = await ytdl.getInfo(link);
        var result = {
         title: data.videoDetails.title,
          dur: Number(data.videoDetails.lengthSeconds),
          viewCount: data.videoDetails.viewCount,
          likes: data.videoDetails.likes,
          uploadDate: data.videoDetails.uploadDate,
          sub: data.videoDetails.author.subscriber_count,
          author: data.videoDetails.author.name,
          timestart
        };
        resolveFunc(result);
      });
    return returnPromise;
  },
  // getMp4FromFacebook = async function (url, path) {
  //   var 
  //     res = function () {},
  //     rej = function () {},
  //     rePro = new Promise((resolve, reject) => {
  //       res = resolve;
  //       rej = reject;
  //     });
  //   await axios({
  //     method: "GET",
  //     url: 'https://api-nodejs.miraiofficials123.repl.co/fb/get?url=' + url
  //   }).then(async function ({ data: { mp4, owner } }) {
  //     fs.writeFileSync(path, Buffer.from((await axios.get(mp4.playable_url, {
  //       responseType: "arraybuffer"
  //     })).data, "utf-8"));
  //     res(
  //       `→ Đ𝗼̂́𝗶 𝘁𝘂̛𝗼̛̣𝗻𝗴: ` + owner.type + 
  //       `\n→ 𝗨𝗜𝗗: ` + owner.id +
  //       `\n━━━━━━━━━━━━━━━━━━\n` +
  //       `→ 𝗨𝗜𝗗: ` + mp4.id +
  //       `\n→ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ` + mp4.convertTime
  //     );
  //   });
  //   return rePro;
  // },
  // getStoryFromUrl = async function (url, path) {
  //   var
  //     res = function () {},
  //     rej = function () {},
  //     rePro = new Promise(function (resolve, reject) {
  //       res = resolve;
  //       rej = reject;
  //     });
  //   var data = (await axios({
  //     method: "GET",
  //     url: 'https://API-NodeJS.miraiofficials123.repl.co/fb/get?url=' + url
  //   })).data;
  //   var buffer = (await axios({
  //     method: 'GET',
  //     url: data.story_video.url_src,
  //     responseType: 'arraybuffer'
  //   })).data;
  //   fs.writeFileSync(path, Buffer.from(buffer, 'utf-8'));
  //   try {
  //     res(
  //     `→ 𝗧𝗲̂𝗻: ${data.owner.name}\n→ 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${data.owner.gender == 'FEMALE' ? 'Nữ' : 'Nam'}\n→ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: ${data.owner.url}`
  //     );
  //   } catch (e) {
  //     rej(e.message);
  //   }
  //   return rePro;
  // },
  convertHMS = function (value) {
    const sec = parseInt(value, 10); 
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return (hours != '00' ? hours + ':' : '') + minutes + ':' + seconds;
  },
  path = __dirname + "/cache/whatthefuck.mp4",
  config = {
    name: "autodown2",
    hasPermssion: 0,
    version: "1.0",
    description: "Sam",
    credits: "Sam",
    commandCategory: "Tiện ích",
    usages: "[args]",
    cooldowns: 5
  },
  handleEvent = async function ({ api, event, Threads }) {
    var m = (await Threads.getData(event.threadID)).data;
    if (m[config.name] == false) return;
    for (i of event.body.split(" ")) {
      if (i.indexOf("https://") == 0) {
        for (e of i.split("/")) {
          if (e == "youtu.be" || e == "www.youtube.com" || e == "youtube.com") {
            var 
              youtube = __dirname + "/cache/wtf.mp3",
              data = await downloadMusicFromYoutube(i, youtube);
            api.sendMessage({ 
              body: `→ 𝗔̂𝗺 𝗻𝗵𝗮̣𝗰: ${data.title}\n→ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${convertHMS(data.dur)}`,
              attachment: fs.createReadStream(youtube)
            }, event.threadID, () => fs.unlinkSync(youtube));
          }
        
          // if (e == "fb.watch" || e == "reel" || e == "videos") {
          //   var q = await getMp4FromFacebook(i, path);
          //   api.sendMessage({
          //     body: q,
          //     attachment: fs.createReadStream(path)
          //   }, event.threadID, () => fs.unlinkSync(path));
          // }
          // if (e == "stories") {
          //   try {
          //     var q = await getStoryFromUrl(i, path);
          //     api.sendMessage({
          //       body: q,
          //       attachment: fs.createReadStream(path) 
          //     }, event.threadID, () => fs.unlinkSync(path));
          //   } catch (e) {
          //     api.sendMessage(e, event.threadID);
          //   }
          // }
        }
      }
    }
    return;
  },
  run = async function ({ api, event, Threads }) {
    var data = (await Threads.getData(event.threadID)).data;
    if (data[config.name] == false) data[config.name] = true;
    else data[config.name] = false;
    await Threads.setData(event.threadID, {
      data
    });
    return api.sendMessage({
      body: (data[config.name] == true ? "Bật" : "Tắt") + " thành công autoDown"
    }, event.threadID);
  }

module.exports = {
  config,
  handleEvent, 
  run
}
