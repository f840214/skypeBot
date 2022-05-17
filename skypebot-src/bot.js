const { ActivityTypes, TurnContext } = require('botbuilder');
const Axios = require('axios');

const { ConversationReference } = require('./helper/Schema')

const { delaySend } = require('./helper/announce')

class MyBot {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async onTurn(turnContext) {
        if (turnContext.activity.type === ActivityTypes.Message) {
            let resData = (turnContext.activity.text).trim().toLowerCase().split(' ');
            let message = {
                command: resData[1],
                text: resData.slice(2).join(' ')
            }
            let reply;
            let reference;
            switch (message.command) {
                // 工作人員的命令
                case 'showreference':
                    reference = TurnContext.getConversationReference(turnContext.activity);
                    await turnContext.sendActivity(JSON.stringify(reference));
                    break;
                case 'setchannel':
                    await this.setChannel(turnContext, message);
                    break;
                case 'announce':
                    await this.announce(turnContext, message);
                    break;
                case 'checkstate':
                    await turnContext.sendActivity(`Bot is ok.`);
                    break;
                case 'checkannounce':
                    await this.checkAnnounce(turnContext, message);
                    break;
                default:
                    // 若是輸入其他的字
            }
        } else {
            // 若不是傳訊事件，就回傳
            // await turnContext.sendActivity(`Hi, team. I'm chatbot. Nice to meet you.`);
        }
    }

    // 產生提取檔案或媒體
    async showAttachment(turnContext, attachments, text) {
        let reply = {
            type: ActivityTypes.Message
        };
        reply.attachments = [attachments];
        reply.text = text;
        return await turnContext.sendActivity(reply);
    }

    // 設定渠道，並儲存到資料庫，使之後能夠推播
    async setChannel(turnContext, message) {
        let reference = TurnContext.getConversationReference(turnContext.activity);
        let channel = {
            skypeName: message.text,
            conversation: reference.conversation.id,
        }
        try {
            let res = await Axios.post(`${process.env.API_URL}/channel`, channel);

            await turnContext.sendActivity(res.data);
        } catch (err) {
            await turnContext.sendActivity(`Write failed: ${err.message}`);
        }
    }
    async checkAnnounce(turnContext, message){
        try{
            if(message.text){
                let announce = await this.announceGenerator(message);
                await turnContext.sendActivity(announce);
            }else{
               await turnContext.sendActivity('请输入 announceID');
            }
        } catch (err) {
           await turnContext.sendActivity(`err: ${err.message}`);
        }
    }
    async announceGenerator(message) {
        // 拉取推播內容
        const res = await Axios.get(`${process.env.API_URL}/announce`, {
            params: {
                _id: message.text
            }
        });
        return `${ res.data.title} 
                        ${ res.data.detail }`;
    }
    // 推播功能，包括滿意度調查與公告
    async announce(turnContext, message) {
        if (message.text) {
            try {
                // 拉取 skype 群清單
                const res = await Axios.get(`${process.env.API_URL}/channel`, {
                    params: {
                        active: true
                    }
                })
                let channels = await res.data;
                // 提取 conversationReference
                const {
                    bot,
                    channelId,
                    serviceUrl
                } = await TurnContext.getConversationReference(turnContext.activity);
                // 製作 reference
                let refs = await channels.map(channel => new ConversationReference({
                    bot,
                    channelId,
                    serviceUrl,
                    conversation: channel.conversation,
                    skypeName: channel.skypeName
                }));

                let announce = await this.announceGenerator(message);
                // 推播公告
                await delaySend.call(this, refs, {
                    reply: announce,
                    turnContext,
                    intervalTime: 100
                });
            } catch (err) {
                await turnContext.sendActivity(`err: ${err.message}`);
            }
        } else {
            await turnContext.sendActivity(`请输入欲广播的项目`)
        }
    }
}


module.exports.MyBot = MyBot;