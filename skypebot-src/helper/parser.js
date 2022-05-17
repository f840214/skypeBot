const DOMParser = require('xmldom').DOMParser;
// 可放在訊息進來的時候資料分析， 可以將指令改為 run announce -id=[announceId] 
function getCommandObject(text) {
    let resData = text.trim().split("--");
    let object = {
        command: resData[0].split(' ')[1],
    };
    return resData.slice(1).reduce((pre, now) => {
        let key = now.split('=')[0];
        let value = now.split('=').slice(1).join('=');
        const parser = new DOMParser;
        value = value.startsWith('<a href=')? new DOMParser().parseFromString(value,'text/html').getElementsByTagName('a')[0].attributes[0].value:value;
        pre[key] = value;
        return pre
    }, object)
}

module.exports = getCommandObject;