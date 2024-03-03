<template>
  <main>
    <h3 style="text-align: left">
      <div class="circle"></div>
      变化趋势
      <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
    </h3>
    <div ref="chartsRef" style="width: 100%;height:600px"></div>

  </main>
</template>
<script lang="ts" setup>
import {QuestionFilled} from "@element-plus/icons-vue";
import {onMounted, ref, watch, watchEffect} from "vue";

let chartsInstance = null;
let chartsRef = ref()
const lastSevenDays = []
import * as echarts from 'echarts';
import moment from "moment";
import {useCartoonStore} from '@/store/cartoonStore.js'

let cartoonStore = useCartoonStore();
let days = ref(7)
const coreData = ref()

const basicData = ref()

function updateCoreData() {
  coreData.value = cartoonStore.currentHeatAnalysisInfo
  if (lastSevenDays.length === 0){
    calculateLastNDays(coreData.value.length);
  }
  renderChart()
}

watch(() => cartoonStore.currentHeatAnalysisInfo, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      console.log("监听值数据变化")
      // 当值发生变化时执行的回调函数
      updateCoreData()

    })

function initEcharts() {
  chartsInstance = echarts.init(chartsRef.value);
}

function calculateLastNDays(days) {
  const today = new Date(); // 当前日期

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const d = moment(day).format('MM-DD')
    lastSevenDays.push(d);
  }
  console.log(lastSevenDays)
}

function renderChart() {
  //
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis:{type: 'category',data: lastSevenDays},
    yAxis: {},
    legend: {},
    series: [
      {
        name: "播放数",
        type: 'line',
        data: coreData.value.map(item => item.views) // 使用 map 方法提取 views 属性作为折线图的数据
      },
      {
        name: "点赞数",
        type: 'line',
        data: coreData.value.map(item => item.likes) // 使用 map 方法提取 likes 属性作为折线图的数据
      },
      {
        name: "弹幕数",
        type: 'line',
        data: coreData.value.map(item => item.danmakus) // 使用 map 方法提取 likes 属性作为折线图的数据
      },
      {
        name: "追番数",
        type: 'line',
        data: coreData.value.map(item => item.follow) // 使用 map 方法提取 likes 属性作为折线图的数据
      },
      {
        name: "分享数",
        type: 'line',
        data: coreData.value.map(item => item.shares) // 使用 map 方法提取 likes 属性作为折线图的数据
      }
    ]
  }
  chartsInstance.setOption(option)
}

onMounted(() => {

  initEcharts()
})

</script>
<style scoped>

</style>