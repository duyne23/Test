const configCommand = {
	name: 'autodown',
	version: '1.1.1',
	hasPermssion: 0,
	credits: 'DC-Nam',
	description: 'Tá»± Ä‘á»™ng táº£i xuá»‘ng khi phĂ¡t hiá»‡n liĂªn káº¿t',
	commandCategory: 'Há»‡ thá»‘ng support-bot',
	usages: '[]',
	cooldowns: 3
},
	axios = require('axios'),
	downloader = require('image-downloader'),
	fse = require('fs-extra'),
	toolsFb = {
		getVideoUrl: async (url) => {
			const res = await axios.get(`${global.configApi.domain1}/fbdownload?apikey=${global.configApi.keyApi1}&url=` + encodeURIComponent(url));
			return res.data.data.medias[res.data.data.medias.length - 1].url;
		}
	},
	path = __dirname + '/cache/statusAuto.json';

const https = require("https");
const agent = new https.Agent({
	rejectUnauthorized: false
});

async function streamURL(url, mime) {
	// const dest = `${__dirname}/cache/${Date.now()}.${mime}`;
	const name = global.utils.randomString(5) + '.' + mime;
	// await downloader.image({
	//     url, dest
	// });
	// setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
	// return fse.createReadStream(dest);
	const res = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});
	res.data.path = name;
	return res.data;
}

function onLoad() {
	if (!fse.existsSync(path)) fse.writeFileSync(path, '{}');
}

async function noprefix(arg) {
	const s = JSON.parse(fse.readFileSync(path));
	if (arg.event.senderID == (global.botID || arg.api.getCurrentUserID())) return;
	if ((typeof s[arg.event.threadID] == 'boolean' && !s[arg.event.threadID])) return;

	const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID),
		arr = arg.event.args || [],
		regEx_tiktok = /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//,
		regEx_youtube = /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//,
		regEx_facebook = /(^https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch|reel)\/\w+\/\w?(\/)?/,
		regEx_instagram = /http(s|):\/\/(www\.)?instagram\.com\/(reel|p)\/\w+/,
		regEx_SC = /^(https?:\/\/)?(www.)?(m\.)?soundcloud\.com\/[\w\-\.]+(\/)+[\w\-\.]+/,
		// https://mp3.zing.vn/bai-hat/Chuyen-Tinh-Loi-Em-Phan-Mem/ZWZBZ0C7.html || https://zingmp3.vn/bai-hat/Chuyen-Tinh-Loi-Em-Phan-Mem/ZWZBZ0C7.html
		regEx_ZingMp3 = /^(https?:\/\/)?(www.)?(m\.)?(mp3|zing)mp3\.vn\/bai-hat\/[\w\-\.]+\/\w+/;

	for (const el of arr) {
		/* Tá»° Äá»˜NG Táº¢I VIDEO TIKTOK */
		if (regEx_tiktok.test(el)) {
			const data = (await axios.post(`https://www.tikwm.com/api/`, {
				url: el
			})).data.data;
			out({
				body: `=== ă€ AUTO DOWN TIKTOK ă€ ===\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n âœ TiĂªu Ä‘á»: ${data.title}\n âœ LÆ°á»£t thĂ­ch: ${data.digg_count}\n âœ LÆ°á»£t bĂ¬nh luáº­n: ${data.comment_count}\n[âœï¸] âœ LÆ°á»£t chia sáº»: ${data.share_count}\n[âœï¸] âœ LÆ°á»£t táº£i: ${data.download_count}\n\n[âœï¸] âœ Tháº£ cáº£m xĂºc "â¤ï¸" Ä‘á»ƒ táº£i nháº¡c`, attachment: await streamURL(data.play, 'mp4')
			}, '', (err, dataMsg) => global.client.handleReaction.push({
				name: 'autodown', messageID: dataMsg.messageID, url_audio: data.music
			})); // Video khĂ´ng logo thĂ¬ sá»­a "wmplay" -> "play";
		}
		/* END */

		/* Tá»° Dá»˜NG Táº¢I VIDEO YOUTUBE */
		if (regEx_youtube.test(el)) {
			const data = (await axios.get(`https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/youtube/download`, {
				params: {
					id: el,
					
				}
			})).data;
			const info = (a) => `=== ă€ AUTO DOWN YOUTUBE ă€ ===\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n - TiĂªu Ä‘á»: ${a.title}\n - Thá»i gian: ${a.t} giĂ¢y\n - KĂªnh: ${a.a}`;
			const MAX_SIZE = 87031808;
			const getFormatVideo = (data.links.find(f => f.type === "mp4" || f.type == 'm4a').qualitys.filter(f => f.size < MAX_SIZE) || []);
			const getFormatAudio = (data.links.find(f => f.type === "mp3").qualitys.filter(f => f.size < MAX_SIZE) || [])[0];
			// if (!getFormatVideo)
			//     return out({
			//         body: `Ráº¥t tiáº¿c, khĂ´ng tĂ¬m tháº¥y video nĂ o cĂ³ dung lÆ°á»£ng nhá» hÆ¡n 83MB`,
			//     }, '');
			let success = false;
			for (const video of getFormatVideo)
				if (video.size || 0 < 87031808) {
					const res = await axios({
						url: video.dlink,
						method: 'GET',
						responseType: 'stream',
						httpsAgent: agent
					});
					res.data.path = 'video.mp4';
					try {
						const datMsg = await out({
							body: `${info(data, data.timer)}\n\n - Tháº£ cáº£m xĂºc "â¤ï¸" Ä‘á»ƒ táº£i nháº¡c\n`,
							attachment: res.data
						}, '');
						global.client.handleReaction.push({
							name: 'autodownurl',
							messageID: datMsg.messageID,
							url_audio: getFormatAudio.dlink,
							agent
						});
						success = true;
						break;
					}
					catch (e) {
					}
				}
			if (!success)
				return out({
					body: ` - Ráº¥t tiáº¿c, Ä‘Ă£ cĂ³ lá»—i xáº£y ra khi táº£i video`,
				}, '');
			// else if (getFormatAudio.size || 0 < 26214400) {
			//     const res = await axios({
			//         url: getFormatAudio.dlink,
			//         method: 'GET',
			//         responseType: 'stream',
			//         httpsAgent: agent
			//     });
			//     res.data.path = 'audio.mp3';
			//     out({
			//         body: (info(data)) + `\n`,
			//         attachment: res.data
			//     });
			// }
		}

		/* Tá»° Äá»˜NG Táº¢I VIDEO FACEBOOK */
		if (el.includes('facebook.com/story.php') || regEx_facebook.test(el)) {
			const fdl = await toolsFb.getVideoUrl(el);
			// console.log(fdl);
			out({
				body: '[âœï¸] âœ Tháº£ cáº£m xĂºc "â¤ï¸" Ä‘á»ƒ gá»­i Ă¢m thanh', attachment: await streamURL(fdl, 'mp4')
			}, '', async (err, dataMsg) => global.client.handleReaction.push({
				name: 'autodown', messageID: dataMsg.messageID, url_audio: fdl
			}));
		}
		/* END */

		if (regEx_instagram.test(el)) {
			try {
				// const isImage = /\/p\//.test(el);
        // console.log(`https://${global.configApi.domain}/instagram/dlpost?apikey=${global.configApi.apiKey}&url=${encodeURIComponent(el)}`)
				const res = await axios({
					url: `https://736d4ec6-134f-49d0-b89e-2ed89e6b1c6d-00-3fmflttuj7k7a.worf.replit.dev/instagram/downloadpost?url=${encodeURIComponent(el)}`,
					method: 'GET'
				});
				// const isImage = (res.data.carousel_media || res.data.image_versions2?.candidates) ? true : false;
				// console.log([{ image_versions2: res.data.image_versions2 }])
				// console.log(res.data.video_versions)

				// if (res.data.video_versions) {
				// 	const resStream = await axios({
				// 		url: res.data.video_versions[0].url,
				// 		method: 'GET',
				// 		responseType: 'stream'
				// 	});
				// 	resStream.data.path = 'video.mp4';
				// 	return out({
				// 		attachment: resStream.data
				// 	});
				// }
				// else if (isImage) {
				// 	const allImage = await Promise.all((res.data.carousel_media || [{ image_versions2: res.data.image_versions2 }]).map(item => axios.get(item.image_versions2.candidates[0].url, {
				// 		responseType: 'stream'
				// 	})
				// 		.then(res => {
				// 			res.data.path = `${Date.now()}.png`;
				// 			return res.data;
				// 		})));
				// 	return out({
				// 		attachment: allImage
				// 	});
				// }
        // console.log(res.data)
				const allAttachment = await Promise.all([...res.data.videos, ...res.data.images].map(item => axios.get(item, {
					responseType: 'stream'
				})
					.then(ress => {
						ress.data.path = `${Date.now()}.${res.data.videos.includes(item) ? 'mp4' : 'png'}`;
						return ress.data;
					})
          .catch(err => {
            console.log(err);
            return null;
          })
        ));
				return out({
					attachment: allAttachment
				});
			}
			catch (err) {
				console.log(err)
			}
		}

		// Auto SoundCloud
		if (regEx_SC.test(el)) {
			const audioStream = await axios.get(`https://apipremium-thanhali.thanhali.repl.co/soundcloud/download?apikey=ThanhAliVip_1234567890&link=${encodeURIComponent(el)}`, {
				responseType: 'stream'
			});
			audioStream.data.path = 'sing.mp3';
			return out({
				attachment: audioStream.data
			});
		}

		// Zingmp3
		if (regEx_ZingMp3.test(el)) {
			const audioStream = await axios.get(`https://apipremium-thanhali.thanhali.repl.co/zingmp3/download?apikey=ThanhAliVip_1234567890&link=${encodeURIComponent(el)}`, {
				responseType: 'stream'
			});
			audioStream.data.path = 'sing.mp3';
			return out({
				attachment: audioStream.data
			});
		}
	}
}


async function reactionMsg(arg) {
	if (arg.event.reaction == 'â¤') // code
	{
		const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d),
			_ = arg.handleReaction;
		if ('url_audio' in _) {
			let streamFile;
			if (_.agent) {
				const res = await axios({
					url: _.url_audio,
					method: 'GET',
					responseType: 'stream',
					httpsAgent: _.agent
				});
				res.data.path = 'audio.mp3';
				streamFile = res.data;
			}
			else
				streamFile = await streamURL(_.url_audio, 'mp3');
			out({
				body: `[âœï¸] âœ Ă‚m thanh tá»« video`, attachment: streamFile
			}, '', '', _.messageID);
		}
	}
}
function runCommand(arg) {
	const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID);
	const data = JSON.parse(fse.readFileSync(path));
	const s = data[arg.event.threadID] = typeof data[arg.event.threadID] != 'boolean' || !!data[arg.event.threadID] ? false : true;
	fse.writeFileSync(path, JSON.stringify(data, 0, 4));
	out((s ? '[âœï¸] âœ KĂ­ch hoáº¡t thĂ nh cĂ´ng cháº¿ Ä‘á»™ ' : '[âœï¸] âœ Táº¯t thĂ nh cĂ´ng cháº¿ Ä‘á»™ ') + ' ' + configCommand.name);
}

module.exports = {
	config: configCommand,
	onLoad,
	run: runCommand,
	handleEvent: noprefix,
	handleReaction: reactionMsg
};
