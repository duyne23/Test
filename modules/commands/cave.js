const fs = require("fs-extra");
module.exports.config = {
    name: "cave",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "⚡D-Jukie", 
    description: "Làm việc để có tiền, có làm thì mới có ăn",
    commandCategory: "Kiếm tiền",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 100000
    }
};
module.exports.onLoad = () => {
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "work.jpeg")) request("https://i.imgur.com/pPw9hY9.jpeg").pipe(fs.createWriteStream(dirMaterial + "work.jpeg"));
}
module.exports.languages = {
    "vi": {
        "cooldown": "『 🌸 』 → 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐥𝐚̀𝐦 𝐯𝐢𝐞̣̂𝐜 𝐱𝐨𝐧𝐠 đ𝐞̂̉ 𝐭𝐫𝐚́𝐧𝐡 𝐦𝐞̣̂𝐭, 𝐡𝐚̃𝐲 𝐪𝐮𝐚𝐲 𝐥𝐚̣𝐢 𝐬𝐚𝐮: %1 𝐩𝐡𝐮́𝐭 %2 𝐠𝐢𝐚̂𝐲 𝐧𝐮̛̃𝐚"      
    },
    "en": {
        "cooldown": "⚡️You're done, come back later: %1 minute(s) %2 second(s)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
var coinsdd1 = Math.floor(Math.random() * 500000) + 10000; //random coins khi đào đá

//random công việc cần làm
var rddd1 = ['𝐤𝐡𝐚́𝐜𝐡 𝐯𝐢𝐩', '𝐤𝐡𝐚́𝐜𝐡 𝐪𝐮𝐞𝐧', '𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐥𝐚̣', '𝐭𝐡𝐚̆̀𝐧𝐠 𝐧𝐠𝐮 𝐭𝐚̂̀𝐦 𝟐𝟑 𝐭𝐮𝐨̂̉𝐢', '𝐚𝐧𝐡 𝐥𝐚̣ 𝐦𝐚̣̆𝐭', '𝐤𝐡𝐚́𝐜𝐡 𝐪𝐮𝐞𝐧', 'đ𝐚̣𝐢 𝐠𝐢𝐚 𝟗𝟐 𝐭𝐮𝐨̂̉𝐢', '𝐭𝐡𝐚̆̀𝐧𝐠 𝐧𝐡𝐨́𝐜 𝟏𝟐 𝐭𝐮𝐨̂̉𝐢']; //random công việc khi đào đá
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];


var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))` ; Currencies.increaseMoney(event.senderID, coinsdd1); break;             
                case "2": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "3": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "4": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "5": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))` ; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "6": msg = `『 🌸 』𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 ${work6} 𝐜𝐡𝐨 ${coinsdd1}$ 𝐧𝐞̂́𝐮 𝐱𝐱𝐱 𝟏 đ𝐞̂𝐦, 𝐭𝐡𝐞̂́ 𝐥𝐚̀ 𝐛𝐚̣𝐧 đ𝐨̂̀𝐧𝐠 𝐲́ 𝐧𝐠𝐚𝐲 :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = "『 🌸 』 → 𝐂𝐡𝐮̛𝐚 𝐮𝐩𝐝𝐚𝐭𝐞..."; break; //thêm case nếu muốn 
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("『 🌸 』 → 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́.", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("『 🌸 』 → 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "『 🌸 』 → 𝐂𝐡𝐮̛𝐚 𝐮𝐩𝐝𝐚𝐭𝐞...") {
                msg = "『 🌸 』 → Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime cho mỗi lần nhận 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 600000),
            seconds = ((time % 600000) / 10000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage({body:
        "🏮===𝐏𝐇𝐎̂́ 𝐇𝐎𝐀 𝐊𝐈𝐄̂̀𝐔===🏮" +
        "\n\n𝟏. 𝐏𝐡𝐨̂́ 𝐓𝐫𝐚̂̀𝐧 𝐃𝐮𝐲 𝐇𝐮̛𝐧𝐠 🎀" +
        "\n𝟐. 𝐂𝐚̂̀𝐮 𝐓𝐡𝐢̣ 𝐍𝐠𝐡𝐞̀ 💦" +
        "\n𝟑. 𝐇𝐨̂̀ 𝐇𝐨𝐚̀𝐧 𝐊𝐢𝐞̂́𝐦 🍄" +
        "\n𝟒. 𝐓𝐢̣𝐧𝐡 𝐓𝐡𝐚̂́𝐭 𝐁𝐨̂̀𝐧𝐠 𝐋𝐚𝐢" +
        "\n𝟓. 𝐏𝐡𝐨̂́ 𝐓𝐚𝐦 𝐓𝐫𝐢𝐧𝐡 🐥" +
        "\n𝟔. 𝐊𝐡𝐚́𝐜𝐡 𝐒𝐚̣𝐧 𝐘 𝐍𝐮 💈" +
        "\n\n𝐇𝐚̃𝐲 𝐑𝐞𝐩𝐥𝐚𝐲 𝐒𝐓𝐓 𝐂𝐡𝐨̣𝐧 𝐊𝐡𝐮 𝐕𝐮̛̣𝐜 𝐇𝐚̀𝐧𝐡 𝐍𝐠𝐡𝐞̂̀ ❤️"
        ,attachment: fs.createReadStream(__dirname + `/cache/work.jpeg`)}, event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
