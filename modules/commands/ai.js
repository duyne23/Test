const axios = require('axios');
const apiKey = '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';
if (!global.notWaitForPrefixs)
    global.notWaitForPrefixs = [];

if (!global.openAIUsing)
    global.openAIUsing = {};
if (!global.openAIUsing)
    global.openAIUsing = {};

module.exports.config = {
    name: 'ai',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'raiden ei',
    description: 'OpenAI ChatGPT',
    commandCategory: 'Tiện ích',
    usages: 'text | img <text>',
    cooldowns: 5
};


module.exports.languages = {};

        

module.exports.handleEvent = async function ({ api, event, Threads }) {
    const threadData = (await Threads.getData(event.threadID)).data;
    if (!threadData['openAI'])
        return;

    if (event.body) {
        const text = await askGPT(event.body, event.senderID);
        return api.sendMessage(text, event.threadID, event.messageID);
    }
};

module.exports.run = async function ({
    api, event, args, Threads
}) {
    switch (args[0]) {
        case 'img':
        case 'image':
        case 'draw': {
            if (!args[1])
                return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);
            if (global.openAIUsing[event.senderID])
                return api.sendMessage('Bạn đang sử dụng tính năng này, vui lòng chờ quay lại sau khi yêu cầu trước kết thúc', event.threadID, event.messageID);

            global.openAIUsing[event.senderID] = true;

            try {
                const sending = api.sendMessage('Đang xử lý yêu cầu của bạn...', event.threadID, event.messageID);
                const responseImage = await axios({
                    url: "https://api.openai.com/v1/images/generations",
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + apiKey,
                        "Content-Type": "application/json"
                    },
                    data: {
                        prompt: args.slice(1).join(' '),
                        n: 4,
                        size: '1024x1024'
                    }
                });
                const imageUrls = responseImage.data.data;
                const images = await Promise.all(imageUrls.map(async (item) => {
                    const image = await axios.get(item.url, {
                        responseType: 'stream'
                    });
                    image.data.path = `${Date.now()}.png`;
                    return image.data;
                }));
                return api.sendMessage({
                    attachment: images
                }, event.threadID, async () => {
                    api.unsendMessage(await sending.messageID);
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
            catch (err) {
                const errorMessage = err.response?.data.error.message || err.message;
                return api.sendMessage(`Đã có lỗi xảy ra\n${errorMessage}`, event.threadID, () => {
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
        }

        case 'on':
        case 'off': {
            const threadData = (await Threads.getData(event.threadID)).data;
            threadData['openAI'] = args[0] == 'on';
            await Threads.setData(event.threadID, { data: threadData });
            return api.sendMessage(`Đã ${args[0] == 'on' ? 'bật' : 'tắt'} tính năng OpenAI trong nhóm này`, event.threadID, event.messageID);
        }

        default: {
            if (!args[1])
                return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);

            try {
                const text = await askGPT(args.join(' '), event.senderID);
                return api.sendMessage(text, event.threadID, (err, info) => {
                    if (err) return console.log(err);
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        senderID: event.senderID
                    });
                }, event.messageID);
            }
            catch (err) {
                console.log(err.response?.data);
                const errorMessage = err.response?.data.error.message || err.message;
                return api.sendMessage(`Đã có lỗi xảy ra\n${errorMessage}`, event.threadID, () => {
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
        }
    }
};


async function askGPT(question, senderID) {
    try {
        const response = await axios({
            url: "https://api.openai.com/v1/chat/completions",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: 'user',
                    content: question
                }],
                max_tokens: 4000,
                temperature: 0.7
            }
        });

        const text = response.data.choices[0].message.content;

        if (!global.openAIUsing[senderID] || !Array.isArray(global.openAIUsing[senderID]))
            global.openAIUsing[senderID] = [];

        if (global.openAIUsing[senderID].length > 4)
            global.openAIUsing[senderID].shift();

        global.openAIUsing[senderID].push(
            {
                role: 'user',
                content: question
            },
            {
                role: 'assistant',
                content: text
            }
        );

        return text;
    }
    catch (err) {
        throw err;
    }
}

global.askGPT = askGPT;
