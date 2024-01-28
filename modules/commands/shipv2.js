const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');

module.exports.config = {
    name: "shipv2",
    version: "2.0.0",
    hasPermission: 2,
    credits: "tnt",
    description: "share mdl runmocky riêng",
    commandCategory: "Admin",
    usages: "/shipv2 [reply or tag or để trống] + tên mdl muốn share",
    cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
    const adminPermission = ["100090168070553"];
    const uid = event.type == 'message_reply' ? event.messageReply.senderID : !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0] : !!args[0] ? args[0] : event.senderID;
    
    if (!adminPermission.includes(event.senderID)) {
        return api.sendMessage("Bạn không phải admin", event.threadID, event.messageID);
    }

    const picture = (await axios.get("https://i.imgur.com/Mv4aOZ8.jpeg", { responseType: "stream" })).data;
    const tnt = moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");

    const { threadID, messageID, messageReply, type } = event;
    const name = args[0];
    const text = type == "message_reply" ? messageReply.body : null;

    if (!text && !name) {
        return api.sendMessage({
            body: `📝==「 SHARE MDL RMK 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ Bây giờ là: ${tnt} 
👉 Bạn có thể reply hoặc tag người muốn share mdl`,
            attachment: (picture)
        }, threadID, messageID);
    }

    if (name.endsWith(".js")) {
        fs.readFile(
            `./modules/commands/${name}`,
            "utf-8", async (err, data) => {
                if (err) {
                    return api.sendMessage({
                        body: `📝==「 SHARE MDL RMK 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ Bây giờ là: ${tnt} 
Mình không tìm thấy file ${name} mà bạn muốn chia sẻ.`,
                        attachment: (picture)
                    }, threadID, messageID);
                }

                axios.post("https://api.mocky.io/api/mock", {
                    status: 200,
                    content: data,
                    content_type: "application/json",
                    charset: "UTF-8",
                    secret: "tnt",
                    expiration: "never"
                }).then(response => {
                    api.sendMessage({
                        body: `📝==「 SHARE MDL RMK 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ Time: ${tnt} 
💼 Tên lệnh: ${name} 
━━━━━━━━━━━━━━━━━━━━━
👉 Bạn vừa được share riêng 1 mdl
💓 Hãy xem tin nhắn ở phần spam`,
                        attachment: (picture)
                    }, threadID, messageID);
                });
            }
        );
        return;
    } else {
        axios.post("https://api.mocky.io/api/mock", {
            status: 200,
            content: name,
            content_type: "application/json",
            charset: "UTF-8",
            secret: "tnt",
            expiration: "never"
        }).then(response => {
            api.sendMessage(`Ket quả: ${response.data.link}`, {
                attachment: (picture)
            }, uid);

            api.sendMessage({
                body: `📝==「 SHARE MDL RMK 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ Time: ${tnt}
💓 Link mdl: ${response.data.link} 
🔰 Tên lệnh: ${name}
👉 Bạn vừa được share riêng 1 mdl.`,
                attachment: (picture)
            }, uid);
        });
    }
}
