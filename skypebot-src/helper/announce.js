async function delay(delayTime) {
    return new Promise((resolve, reject) => {
        if (delayTime) {
            setTimeout(() => {
                resolve('delay finished');
            }, delayTime);
        } else {
            reject(new Error('delay error happened'))
        }
    })
}

async function delaySend([ref_1, ...refs], {
    reply,
    intervalTime,
    turnContext
} = {
    intervalTime: 100
}) {
    if (ref_1 === undefined) {
        await turnContext.sendActivity(`Announce has been send`);
    } else {
        try {
            if (reply && turnContext) {
                await this.adapter.continueConversation(ref_1, async (proactiveTurnContext) => {
                    await proactiveTurnContext.sendActivity(reply);
                });
                await delay(intervalTime);
            } else {
                await turnContext.sendActivity(`err: reply & turnContext is undefined`);
            }
        } catch (err) {
            await turnContext.sendActivity(`err: ${ref_1.skypeName} Not notified, please check`);
        }
        await delaySend.call(this, refs, {
            reply,
            turnContext,
            intervalTime
        });
    }
}

const announce = {};
announce.delaySend = delaySend;

module.exports = announce;