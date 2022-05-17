const {
    ActivityTypes,
    ActionTypes,
    CardFactory
} = require('botbuilder');

let Schema = {};

Schema.ConversationReference = class ConversationReference {
    constructor({
        activityId,
        bot,
        channelId,
        conversation,
        user,
        serviceUrl,
        skypeName
    }) {
        this.activityId = activityId;
        this.bot = bot;
        this.channelId = channelId;
        this.conversation = {
            id: conversation
        };
        this.user = user;
        this.serviceUrl = serviceUrl;
        this.skypeName = skypeName;
    }
    generateSatisfyAnnounce(YM){
        return {
            type: ActivityTypes.Message,
            attachments: [CardFactory.heroCard('', undefined, [{
                type: ActionTypes.OpenUrl,
                title: `开始评分 start to appraise`,
                value: `https://skypebot-backend.azurewebsites.net/satisfy?name=${encodeURI(this.skypeName)}&YM=${encodeURI(YM)}`
            }], {
                text: `很抱歉，能占用您宝贵的时间为我们评分吗？
Execuse me, Would you like to provide your suggestion about our service?`
            })]
        }
    }
}

module.exports = Schema;