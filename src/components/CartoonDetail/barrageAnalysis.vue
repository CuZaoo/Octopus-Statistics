<template>
  <main>
    <h3 style="text-align: left">
      <div class="circle"></div>
      热词弹幕排行
      <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
    </h3>
    <el-row :gutter="10">
      <el-col :span="12">
        <div ref="chartsRef" style="width: 100%;height:200px"></div>
      </el-col>
      <el-col :span="12">
        <div ref="wordCloudRef" style="width: 100%;height:200px"></div>
      </el-col>
    </el-row>
    <h3 style="text-align: left">
      <div class="circle"></div>
      全部弹幕
      <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
    </h3>
    <el-row :gutter="10" justify="start" style="position: relative">
      <el-col :span="6">
        <el-input
            v-model="searchComments"
            class="w-50 m-2"
            placeholder="开始搜索弹幕吧~"
            :prefix-icon="Search"
            style="display: inline"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="large" color="#0000ff">搜索</el-button>
      </el-col>
    </el-row>

    <el-table v-el-table-infinite-scroll="handleTableScroll" :data="allCommentsData"
              style="height:300px;margin-top:30px;width: 100%;border-radius: 10px"
              :show-header='false' :row-style="hotVideoTableRowStyle">
      <el-table-column label="视频信息">
        <template #default="scope" style="display: flex;flex-direction: column;">
          <div>
            <span>发送时间 : {{ parseTimestamp(scope.row.ctime) }}</span>
            <span style="right: 30px;position: absolute">
<!--              <el-button :icon="Pointer" circle></el-button>-->
            视频进度:{{ parseBilibiliTime(scope.row.progress) }}
            </span>
          </div>
          <article style="padding: 30px 0px 10px 0px">{{ scope.row.content }}</article>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>
<script lang="ts" setup>

import {Pointer, QuestionFilled, Search} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import 'echarts-wordcloud';
import {onMounted, ref, watch} from "vue";
import moment from "moment/moment";
import {useCartoonStore} from '@/store/cartoonStore.js'

let cartoonStore = useCartoonStore();
let chartsRef = ref()
let wordCloudRef = ref()
let chartsInstance = null;
let myChart = null
const danmukusHotWord = ref()
const allCommentsData = ref()
const searchComments = ref('')

function handleTableScroll() {
  // 滚动条到最下，开始加载新数据
  getNewBarrage()
}

function getNewBarrage() {
//   加载新数据方法
}

function initEcharts() {
  let v = chartsRef.value
  chartsInstance = echarts.init(v);
}

function hotVideoTableRowStyle({row, rowIndex}) {
  return 'background-color:#ecf5ff'
}

function parseTimestamp(timestampString) {
  // 将时间戳字符串转换为毫秒级别的数字
  const timestamp = parseInt(timestampString) * 1000;

  // 使用Date对象来解析时间戳
  const date = new Date(timestamp);

  // 提取小时、分钟和秒
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 格式化时间
  const formattedTime = year + "年" + month + "月" + day + "日" + hours + "时" + minutes + "分" + seconds + "秒";

  // 返回格式化后的时间字符串
  return formattedTime;
}

function parseBilibiliTime(milliseconds) {
  // 将毫秒转换为秒
  var totalSeconds = milliseconds / 1000;

  // 计算分钟数
  var minutes = Math.floor(totalSeconds / 60);

  // 计算剩余的秒数
  var seconds = Math.floor(totalSeconds % 60);

  // 返回分钟:秒格式的字符串
  return minutes + "分" + seconds + "秒";
}

function hotVideoTableHeaderCellStyle() {
  return {
    'background-color': '#1989fa',
    'color': '#fff',
    'font-weight': '400'
  }
}

watch(() => cartoonStore.cartoonDanmukusRecommendInfo, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      // 当值发生变化时执行的回调函数
      allCommentsData.value = newValue
    })
watch(() => cartoonStore.cartoonDanmukusHotWordInfo, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      updateCoreData()
    })

function updateCoreData() {
  danmukusHotWord.value = cartoonStore.cartoonDanmukusHotWordInfo
  setTimeout(() => {
    renderChart()
    renderWordCloud()
  }, 500)
}

onMounted(() => {
  initEcharts()
  initWordCloud()
})

function initWordCloud() {
  myChart = echarts.init(wordCloudRef.value)

}

function renderWordCloud() {
  const option = {
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      keepAspect: false,
      // maskImage: maskImage,
      left: 'center',
      top: 'center',
      width: '100%',
      height: '90%',
      right: null,
      bottom: null,
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 8,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        // focus: 'self',
        textStyle: {
          textShadowBlur: 3,
          textShadowColor: '#333'
        }
      },
      //data属性中的value值却大，权重就却大，展示字体就却大
      data: danmukusHotWord.value
    }]

  }
  option && myChart.setOption(option)

  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    myChart.resize();
  });
}

function renderChart() {
  var option = {
    xAxis: {
      type: 'category',
      data: danmukusHotWord.value.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: danmukusHotWord.value.map(item => item.value),
        type: 'bar'
      }
    ]
  };
  chartsInstance.setOption(option)
};
</script>

<style scoped>

</style>