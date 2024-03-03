import request from "@/api/request.js";

export function getCartoonInfoByPageAPI(page, size) {
    const data = {
        page, size
    }
    return request({
        url: '/cartoon/getInfo',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: "get",
        params: data
    })
}

export function getRecommendCartoonInfoAPI(seasonId, types) {
    const typesString = types.join(',');
    const data = {
        seasonId,
        types: typesString
    }
    return request({
        url: '/cartoon/getRecommendationsInfo',
        headers: {
            isToken: false,
            repeatSubmit: false,
            isArrayObject: true
        },
        method: "get",
        params: data
    })
}

export function getNDaysDynamicInfoAPI(seasonId, days) {
    const data = {
        seasonId,
        days
    }
    return request({
        url: '/cartoon/getHeatAnalysisInfo',
        headers: {
            isToken: false,
            repeatSubmit: false,
        },
        method: "get",
        params: data
    })
}

// export function getReviewAnalysisInfoAPI(mediaId, page, size) {
//     const data = {
//         mediaId, page, size
//     }
//     return request({
//         url: '/'
//     })
// }

export function getRecommendReviewInfoAPI(mediaId, page, size, type) {
    const data = {
        mediaId, page, size, type
    }
    return request({
        url: '/cartoon/getReply',
        params: data,
        method: "get",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}

export function getRecommendDanmukusInfoAPI(seasonId, episodesId, page, size, type) {
    const data = {
        seasonId, episodesId, page, size, type
    }
    return request({
        url: '/cartoon/v2/getDanmukus',
        params: data,
        method: "get",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}

export function searchReplyAPI(mediaId, page, size, content) {
    const data = {
        mediaId, page, size, content
    }
    return request({
        url: '/cartoon/searchReply',
        data: data,
        method: "post",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}

export function searchCartoonAPI(page, size, content) {
    const data = {
        page, size, content
    }
    return request({
        url: '/cartoon/searchCartoon',
        data: data,
        method: "post",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}


export function getReplyHotWordAPI(mediaId, size) {
    const data = {
        mediaId, size
    }
    return request({
        url: '/cartoon/getReplyHotWord',
        params: data,
        method: "get",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}

export function searchDanmukusAPI(seasonId, episodesId, page, size, content) {
    const data = {
        seasonId, episodesId, page, size, content
    }
    return request({
        url: '/cartoon/searchDanmukus',
        data: data,
        method: "post",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}


export function getDanmukusHotWordAPI(seasonId, episodesId, size) {
    const data = {
        seasonId, episodesId, size
    }
    return request({
        url: '/cartoon/getDanmukusHotWord',
        params: data,
        method: "get",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    })
}