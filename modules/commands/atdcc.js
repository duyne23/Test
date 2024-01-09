const linkapi = "https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/capcut";

module.exports.config = {
    name: "capcut",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "dtai",
    description: "Thông Tin Mẫu Capcut",
    commandCategory: "Tiện ích",
    usages: " +link mẫu capcut",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    console.log('Bắt đầu tải video capcut!');
};

module.exports.handleEvent = async function ({ api, event, Users }) {
    const { body, senderID } = event;
    const axios = require("axios");
    const fs = require("fs");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

    if (
        body === undefined ||
        (!body.includes('https://www.capcut.com/template-detail/') && !body.includes('https://www.capcut.com/t/')) ||
        senderID == api.getCurrentUserID() ||
        senderID == ''
    ) {
        return;
    }

    try {
        var res = await axios.get(`${linkapi}?url=${body}`);
        const title = res.data.title;
        const description = res.data.description;
        const usage = res.data.usage;
        const link = res.data.video;

        const response = await axios.get(link, { responseType: "stream" });
        const stream = response.data;

        api.sendMessage(
            {
                body: `
🎬====[ 𝗖𝗔𝗣𝗖𝗨𝗧 ]====🎬
━━━━━━━━━━━━━━━━━━━
📝 𝗧𝗶𝗲̂𝘂 đ𝗲̂̀: ${title} 
🗒 𝗠𝗼̂ 𝘁𝗮̉: ${description}
📸 𝗟𝘂̛𝗼̛̣𝘁 𝗱𝘂̀𝗻𝗴: ${usage}
━━━━━━━━━━━━━━━━━━━
⏰ 𝗧𝗶𝗺𝗲: ${gio}
🌸 𝗧𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝘃𝗶𝗱𝗲𝗼 𝘁𝘂̛̀ 𝗖𝗮𝗽𝗖𝘂𝘁`,
                attachment: stream,
            },
            event.threadID,
            event.messageID
        );
    } catch (error) {
        console.error(error);
    }
};
