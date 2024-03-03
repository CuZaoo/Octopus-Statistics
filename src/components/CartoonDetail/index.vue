<template>
  <main>
    <el-card :style="{height: wheight - 580 + 'px',padding:0}" style="width: 120%">
      <el-row :gutter="0" justify="start">
        <el-col :span="10" style="display: flex;flex-direction: column;">
          <el-image style="height: 200px;width: 300px;" :src="VITE_APP_BASE_API + basicData.horizontalUrl">
          </el-image>
        </el-col>
        <el-col class="videoInfo" :span="14" style="text-align: left">
          <el-tag effect="dark">
            {{ basicData.badge }}
          </el-tag>
          <span style="text-align:center ;font-weight: bold;font-size: large">{{ basicData.title }}</span>
          <span>{{ basicData.subTitle }}</span>
          <el-text line-clamp="2" style="padding: 0;margin: 0">
            {{ basicData.desc || "暂无简介" }}
          </el-text>
          <div>
            <el-space :size="'large'">
              <el-tag color="#cccccc" style="color: white" v-for="tag in basicData.types"
                      :key="tag">{{ tag }}
              </el-tag>
            </el-space>
          </div>
          <el-text size="large">评分:{{ basicData.score }}</el-text>
          <el-rate style="margin-bottom: 1px" v-model="basicData.score" :disabled="true" :max="10" allow-half/>
          <el-row :gutter="10">
            <el-space :size="'large'" style="padding: 0">
              <el-button color="#0000cc" @click="playVideo(basicData.link)">
                播放视频
              </el-button>
              <el-button color="#0000cc">加入比较</el-button>
            </el-space>
          </el-row>

        </el-col>
      </el-row>
    </el-card>
    <el-card :style="{height: wheight + 'px'}" style="width: 120%">
      <!-- <el-card style="overflow: visible;height:auto"> -->
      <!-- <el-scrollbar> -->
      <el-row :gutter="10">
        <el-col :span="24" style="position: relative">
          <el-tabs v-model="currentTab" class="demo-tabs" @tab-click="tabClick">
            <el-tab-pane label="核心数据" name="coreData">
              <coreData></coreData>
            </el-tab-pane>
            <el-tab-pane label="热度分析" name="heatAnalysis" lazy>
              <heatAnalysis ref="heatAnalysisRef"></heatAnalysis>
            </el-tab-pane>
            <el-tab-pane label="评论分析" name="reviewAnalysis" lazy>
              <reviewAnalysis></reviewAnalysis>
            </el-tab-pane>
            <el-tab-pane label="弹幕分析" name="barrageAnalysis" lazy>
              <barrageAnalysis></barrageAnalysis>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute;right:10px;top:5px;">
            <el-tooltip
                effect="dark"
                content="暂未实现~"
                placement="left"
            >
              <el-button :icon="Refresh" style="border: 0px" circle/>
            </el-tooltip>
            <el-text size="small">
              更新时间 : {{ basicData.cartoonDynamicInfo && basicData.cartoonDynamicInfo.date || videoUpdateTime}}
            </el-text>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </main>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
import moment from 'moment';
import {Refresh} from "@element-plus/icons-vue";
import coreData from './coreData.vue'
import heatAnalysis from './heatAnalysis.vue'
import reviewAnalysis from './reviewAnalysis.vue'
import barrageAnalysis from './barrageAnalysis.vue'
import {useGlobalStore} from '@/store/globalStore.js'
import {useCartoonStore} from '@/store/cartoonStore.js'


let cartoonStore = useCartoonStore();
const globalStore = useGlobalStore();
const wheight = globalStore.windowHeight * 0.9;
const currentTab = ref('coreData')
const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
const videoUpdateTime = ref(moment(new Date()).format('YYYY-MM-DD HH:mm'))
const heatAnalysisRef = ref()
let basicData = ref({
  title: "标题",
  horizontalUrl: "",
  badge: "",
  subTitle: "子标题",
  desc: "简介",
  types:[],
  score:5,
  link:"",
  cartoonDynamicInfo:{date:""}
})

function init() {
  //获取当前卡通信息
  basicData.value = cartoonStore.getCartoonInfoByIndex()
  currentTab.value = "coreData"
}

onMounted(() => {
  init()
})
watch(() => cartoonStore.currentIndex, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      // 当值发生变化时执行的回调函数
      init()
    })


computed(() => {
  return
})

function tabClick(tab, event) {
  // cartoonStore.updateCurrentIndex()
  switch (tab.props.name) {
    case "heatAnalysis":
      cartoonStore.getNDaysDynamicInfo(7)
      break
    case "reviewAnalysis":
      cartoonStore.getRecommendReviewInfo()
      cartoonStore.getCartoonReplyHotWord()
      break
    case "barrageAnalysis":
      cartoonStore.getRecommendDanmukusInfo(1, 10)
      cartoonStore.getCartoonDanmukusHotWord()
  }
}

function playVideo(url) {
  window.open(url, '_blank')
}

</script>
<style scoped>
:deep(.el-card__body) {
  border-radius: 40px;
  padding: 40px;
}

:deep(.circle) {
  width: 10px;
  height: 10px;
  display: inline-block;
  background-color: #0000cc;
  /* 设置圆点的颜色 */
  border-radius: 50%;
  /* 将边框半径设置为50%以使其变成圆形 */
}

.videoInfo > * {
  padding: 10px;
}
</style>