<template>
  <main>
    <h3 style="text-align: left">
      <div class="circle"></div>
      热词评论排行
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
      全部评论
      <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
    </h3>
    <el-row :gutter="10" justify="start" style="position: relative">
      <el-col :span="6">
        <el-input v-model="searchComments" class="w-50 m-2" placeholder="开始搜索评论吧~" :prefix-icon="Search"
                  maxlength="50"
                  style="display: inline"/>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="large" color="#0000ff" @click="searchReply">搜索</el-button>
      </el-col>
      <el-col :span="6" style="position: absolute;right: 0px">
        <el-button type="primary" size="large" color="#cccccc">最新</el-button>
        <el-button type="primary" size="large" color="#cccccc">最热</el-button>
      </el-col>
    </el-row>
    <el-table v-el-table-infinite-scroll="handleTableScroll" :data="allCommentsData"
              style="height:300px;margin-top:30px;width: 100%;border-radius: 10px"
              :show-header='false'
              :row-style="hotVideoTableRowStyle">
      <el-table-column label="视频信息">
        <template #default="scope" style="display: flex;flex-direction: column;">
          <div>
            <span>时间 : {{ scope.row.push_time_str }}</span>
            <span style="right: 30px;position: absolute">
							<el-button :icon="Pointer" circle></el-button>
							{{ scope.row.stat == undefined ? 0 : scope.row.stat.likes }}
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
import {onMounted, reactive, ref, watch} from "vue";
import moment from "moment/moment";
import {useCartoonStore} from '@/store/cartoonStore.js'

let cartoonStore = useCartoonStore();
const reviewHotWord = ref()
let chartsRef = ref()
let wordCloudRef = ref()
let chartsInstance = null;
let wordCloudInstance = null;
const commentPage = reactive({
  currentCommentPage: '',
  pageSize: ''
})
const allCommentsData = ref()

const searchComments = ref('')
watch(() => cartoonStore.cartoonReviewRecommendInfo, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      // 当值发生变化时执行的回调函数
      allCommentsData.value = newValue
    })
watch(() => cartoonStore.cartoonReviewHotWordInfo, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      console.log("评论热词更新")
      updateCoreData()
    })

function updateCoreData() {
  reviewHotWord.value = cartoonStore.cartoonReviewHotWordInfo
  console.log()
  setTimeout(() => {
    renderChart()
    renderWordCloud()

  }, 500)
}

function handleTableScroll() {
  getNewComments()
}

function getNewComments() {

}


function searchReply() {
  cartoonStore.searchReply(1, 10, searchComments.value)
}

function hotVideoTableRowStyle({row, rowIndex}) {
  return 'background-color:#ecf5ff'
}

function handleSizeChange() {

}

function handleCurrentChange() {

}

function hotVideoTableHeaderCellStyle() {
  return {
    'background-color': '#1989fa',
    'color': '#fff',
    'font-weight': '400'
  }
}

onMounted(() => {
  initEcharts()
  initWordCloud()
})

function initEcharts() {
  let v = chartsRef.value
  chartsInstance = echarts.init(v);
}

function initWordCloud() {
  wordCloudInstance = echarts.init(wordCloudRef.value)

  //随着屏幕大小调节图表
  window.addEventListener("resize", () => {
    wordCloudInstance.resize();
  });
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
      data: reviewHotWord.value
    }]

  }
  option && wordCloudInstance.setOption(option)

}

function renderChart() {
  var option = {
    xAxis: {
      type: 'category',
      data: reviewHotWord.value.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: reviewHotWord.value.map(item => item.value),
        type: 'bar'
      }
    ]
  };
  chartsInstance.setOption(option)
};
</script>

<style scoped>

</style>