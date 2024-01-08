module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "DungUwU (Khánh Milo Fix)",
    hasPermssion: 1,
    description: "Bật tắt antiout",
    usages: "antiout on/off",
    commandCategory: "Box Chat",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`=== [ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] ====\n━━━━━━━━━━━━━━━━━━\n\n→ 𝗞𝗶́𝗰𝗵 𝗵𝗼𝗮̣𝘁 ${(data["antiout"] == true) ? "𝗯𝗮̣̂𝘁" : "𝘁𝗮̆́𝘁"} 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗼̂́𝗻𝗴 𝗼𝘂𝘁 𝗰𝗵𝘂̀𝗮 `, event.threadID);

}
