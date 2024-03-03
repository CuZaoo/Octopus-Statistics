import {defineStore} from "pinia";
import {ref} from "vue";
import {
    getCartoonInfoByPageAPI,
    getRecommendCartoonInfoAPI,
    getNDaysDynamicInfoAPI,
    getRecommendReviewInfoAPI,
    searchReplyAPI,
    getReplyHotWordAPI,
    getRecommendDanmukusInfoAPI,
    getDanmukusHotWordAPI,
    searchCartoonAPI
} from "@/api/cartoon.js";
import {simplifyNumber, calculateEngagementRate} from "@/utils/common.js";
import {ElMessage} from "element-plus";

export const useCartoonStore = defineStore("cartoon", () => {
    const cartoonInfo = ref([])
    const currentIndex = ref(-1)
    const badgeEnum = ref(["会员专享", "", "出品", "独家", "会员抢先", "限时免费", "会员特价"])
    const cartoonRecommendInfo = ref([])
    const cartoonReviewRecommendInfo = ref([])
    const currentSeasonId = ref(null)
    const currentMediaId = ref(null)
    const currentHeatAnalysisInfo = ref(null)
    const replyHotWordSize = ref(10)
    const danmukusHotWordSize = ref(10)
    const cartoonReviewHotWordInfo = ref(null)
    const cartoonDanmukusHotWordInfo = ref(null)
    const cartoonDanmukusRecommendInfo = ref(null)

    function getCartoonInfo(page, size) {
        return new Promise((resolve, reject) => {
            getCartoonInfoByPageAPI(page, size).then(res => {
                res.data.cartoonInfo = cartoonInfoMap(res.data.cartoonInfo, page, size)
                cartoonInfo.value = res.data.cartoonInfo
                resolve(res)
            }).catch(err => {
                console.log("错误:")
                reject(err)
            })
        })
    }

    function searchReply(page, size, content) {
        return new Promise((resolve, reject) => {
            searchReplyAPI(currentMediaId.value, page, size, content).then(res => {
                cartoonReviewRecommendInfo.value = cartoonRecommendInfoMap(res.data);
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }

    function searchCartoon(page, size, content) {
        return new Promise((resolve, reject) => {
            searchCartoonAPI(page, size, content).then(res => {
                cartoonReviewRecommendInfo.value = res.data.cartoonInfo;
                // cartoonReviewRecommendInfo.value = cartoonRecommendInfoMap(res.data.cartoonInfo);
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }

    function getCartoonReplyHotWord() {
        return new Promise((resolve, reject) => {
            getReplyHotWordAPI(currentMediaId.value, replyHotWordSize.value).then(res => {
                cartoonReviewHotWordInfo.value = res.data;
                resolve(res)

            }).catch(err => {
                console.log(err)
                reject(err)

            })
        })
    }

    function searchDanmukus(page, size, content) {
        return new Promise((resolve, reject) => {
            searchReplyAPI(currentMediaId.value, page, size, content).then(res => {
                cartoonDanmukusRecommendInfo.value = cartoonRecommendInfoMap(res.data);
                resolve(res)

            }).catch(err => {
                reject(err)
                console.log(err)
            })
        })
    }

    function getCartoonDanmukusHotWord() {
        return new Promise((resolve, reject) => {
            getDanmukusHotWordAPI(currentSeasonId.value, -1, danmukusHotWordSize.value).then(res => {
                cartoonDanmukusHotWordInfo.value = res.data;
                resolve(res)
            }).catch(err => {
                reject(err)
                console.log(err)
            })
        })
    }


    function getRecommendCartoonInfo(seasonId, types) {
        return new Promise((resolve, reject) => {
            getRecommendCartoonInfoAPI(seasonId, types).then(res => {
                cartoonRecommendInfo.value = cartoonRecommendInfoMap(res.data);
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function getRecommendDanmukusInfo(page, size) {
        if ((currentSeasonId.value === null || currentSeasonId.value === undefined) && cartoonInfo.value !== null) {
            currentSeasonId.value = cartoonInfo.value[currentIndex.value].seasonId
        }
        return new Promise((resolve, reject) => {
            getRecommendDanmukusInfoAPI(currentSeasonId.value, 1, page, size).then((res) => {

                if (res.code == 200) {
                    cartoonDanmukusRecommendInfo.value = res.data;
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function getRecommendReviewInfo() {
        if ((currentMediaId.value === null || currentMediaId.value === undefined) && cartoonInfo.value !== null) {
            currentMediaId.value = cartoonInfo.value[currentIndex.value].mediaId
        }
        return new Promise((resolve, reject) => {
            getRecommendReviewInfoAPI(currentMediaId.value, 1, 10, 0).then((res) => {
                if (res.code == 200) {
                    cartoonReviewRecommendInfo.value = res.data;
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function getNDaysDynamicInfo(days) {
        if ((currentSeasonId.value === null || currentSeasonId.value === undefined) && cartoonInfo.value !== null) {
            currentSeasonId.value = cartoonInfo.value[currentIndex.value].seasonId
        }
        console.log("调用了接口")
        return new Promise((resolve, reject) => {
            getNDaysDynamicInfoAPI(currentSeasonId.value, days).then((res) => {
                if (res.code === 200) {
                    console.log("更新了数据")
                    currentHeatAnalysisInfo.value = res.data
                } else {
                    ElMessage.error({message: res.msg})
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function getCurrentSeasonId() {
        return currentSeasonId.value
    }

    function updateCurrentIndex(index) {
        this.currentIndex = index
        if (cartoonInfo !== null || cartoonInfo !== undefined) {
            this.currentSeasonId = cartoonInfo.value.seasonId
        }
    }


    function getDynamicInfoByIndex() {
        return Array.of(cartoonInfo.value[currentIndex.value]["cartoonDynamicInfo"])[0];
    }

    function getCartoonInfoByIndex() {
        return cartoonInfo.value[currentIndex.value];
    }

    function cartoonRecommendInfoMap(content) {
        content.forEach((item, index) => {
            item["index"] = index
            item["score"] = parseFloat(item["score"])
            item["coinsStr"] = simplifyNumber(item["coins"])
            item["danmakusStr"] = simplifyNumber(item["danmakus"])
            item["followStr"] = simplifyNumber(item["follow"])
            item["likesStr"] = simplifyNumber(item["likes"])
            item["seriesFollowStr"] = simplifyNumber(item["seriesFollow"])
            item["sharesStr"] = simplifyNumber(item["shares"])
            item["viewsStr"] = simplifyNumber(item["views"])
        })
        return content
    }

    function cartoonInfoMap(content, page, size) {
        content.forEach((item, index) => {
            item["index"] = (page - 1) * size + parseInt(index) + 1
            item["score"] = parseFloat(item["score"])
            if (item["cartoonDynamicInfo"] !== undefined && item["cartoonDynamicInfo"] !== null) {
                item["cartoonDynamicInfo"]["coinsStr"] = simplifyNumber(item["cartoonDynamicInfo"]["coins"])
                item["cartoonDynamicInfo"]["danmakusStr"] = simplifyNumber(item["cartoonDynamicInfo"]["danmakus"])
                item["cartoonDynamicInfo"]["followStr"] = simplifyNumber(item["cartoonDynamicInfo"]["follow"])
                item["cartoonDynamicInfo"]["likesStr"] = simplifyNumber(item["cartoonDynamicInfo"]["likes"])
                item["cartoonDynamicInfo"]["seriesFollowStr"] = simplifyNumber(item["cartoonDynamicInfo"]["seriesFollow"])
                item["cartoonDynamicInfo"]["sharesStr"] = simplifyNumber(item["cartoonDynamicInfo"]["shares"])
                item["cartoonDynamicInfo"]["viewsStr"] = simplifyNumber(item["cartoonDynamicInfo"]["views"])
                item["cartoonDynamicInfo"]["engagementRate"] = calculateEngagementRate(
                    item["cartoonDynamicInfo"]["views"],
                    item["cartoonDynamicInfo"]["likes"],
                    item["cartoonDynamicInfo"]["danmakus"],
                    item["cartoonDynamicInfo"]["coins"],
                    item["cartoonDynamicInfo"]["shares"],
                    item["cartoonDynamicInfo"]["follow"],
                )
            }
        })
        return content
    }

    return {
        cartoonInfo,
        currentSeasonId,
        getCartoonInfo,
        currentIndex,
        updateCurrentIndex,
        getCartoonInfoByIndex,
        getDynamicInfoByIndex,
        getRecommendCartoonInfo,
        cartoonRecommendInfo,
        getNDaysDynamicInfo,
        currentHeatAnalysisInfo,
        getRecommendReviewInfo,
        cartoonReviewRecommendInfo,
        searchReply,
        searchDanmukus,
        getCartoonReplyHotWord,
        cartoonReviewHotWordInfo,
        getCartoonDanmukusHotWord,
        cartoonDanmukusHotWordInfo,
        getRecommendDanmukusInfo,
        cartoonDanmukusRecommendInfo,
        searchCartoon
    }

}, {
    // persist: {}
})