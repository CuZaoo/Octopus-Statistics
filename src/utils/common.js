/*
通用方法的封装
 */

export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

export function simplifyNumber(number) {
    number = parseInt(number)
    if (number >= 100000000) {
        return (number / 100000000).toFixed(1) + '亿';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + '百万';
    } else if (number >= 10000) {
        return (number / 10000).toFixed(1) + '万';
    } else {
        return number.toString();
    }
}

// 定义计算互动率的函数
export function calculateEngagementRate(plays, likes, danmaku, coins, shares, follows) {
    // 定义权重系数
    const weight = {
        likes: 100,
        shares: 300,
        danmaku: 50,
        coins: 200,
        follows: 200
    };

    // 计算互动率
    const engagementRate = (weight.likes * likes + weight.shares * shares + weight.danmaku * danmaku + weight.coins * coins + weight.follows * follows) / plays;

    return engagementRate.toFixed(2) + "%";
}