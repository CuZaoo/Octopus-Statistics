<template>
  <main>
    <h3 style="text-align: left">
      <div class="circle"></div>
      数据概览
      <el-tooltip
          effect="dark"
          content="鼠标悬停可以查看具体数量哦~"
          placement="right"
      >
      <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
      </el-tooltip>
    </h3>
    <el-table :highlight-current-row="false" :data="cartoonDynamicInfo"
              style="width: 100%;border-radius: 10px;border: #0000cc 3px solid "
              :header-cell-style="headerCellStyle"
              :row-style="tableRowStyle">
      <el-table-column prop="viewsStr" label="播放数"/>
      <el-table-column prop="likesStr" label="点赞数"/>
      <!--      <el-table-column prop="commentsStr" label="评论数"/>-->
      <el-table-column prop="danmakusStr" label="弹幕数"/>
      <el-table-column prop="coinsStr" label="投币数"/>
      <el-table-column prop="sharesStr" label="分享数"/>
      <el-table-column prop="followStr" label="追番数"/>
      <el-table-column prop="engagementRate" label="互动率"/>
    </el-table>
    <h3 style="text-align: left">
      <div class="circle"></div>
      同标签热门视频
      <el-tooltip
          effect="dark"
          content="按照视频标签推荐，可以有选择的去除标签哦~"
          placement="right"
      >
        <el-button style="border: 0;width: 0;height:0" circle :icon="QuestionFilled"></el-button>
      </el-tooltip>
    </h3>
    <div style="text-align: left">
      视频标签 :
      <el-space :size="'large'">
        <el-check-tag v-for="(item,index) in types" :checked="item['check']" :key="item['tag']" color="#cccccc"
                      style="color: white"
                      @change="onChangeTag(index)">
          {{ item['tag'] }}
        </el-check-tag>
        <!--        <el-tag color="#cccccc" style="color: white" v-for="tag in types" :key="tag">{{ tag }}</el-tag>-->
      </el-space>
    </div>
    <el-table :data="cartoonRecommendInfo" style="margin-top:10px;width: 100%;border-radius: 10px"
              :header-cell-style="hotVideoTableHeaderCellStyle" :row-style="hotVideoTableRowStyle">
      <el-table-column label="视频信息" width="300">
        <template #default="scope" style="display: flex;flex-direction: column;">
          <el-space>
            <el-image style="width: 10vh" :src="VITE_APP_BASE_API + scope.row.coverUrl"></el-image>
            <el-space style="display:inline-block;" direction="vertical">
              <el-text line-clamp="2">{{ scope.row.title }}</el-text>
              <div>
                <el-tag style="display: inline" v-for="type in scope.row.types" type="success">{{ type }}
                </el-tag>
              </div>
            </el-space>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="likesStr" label="点赞数">
        <template #default="scope">
          <span>{{ scope.row.likesStr || "暂无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="viewsStr" label="播放数">
        <template #default="scope">
          <span>{{ scope.row.viewsStr || "暂无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sharesStr" label="分享数">
        <template #default="scope">
          <span>{{ scope.row.sharesStr || "暂无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="followStr" label="追番数">
        <template #default="scope">
          <span>{{ scope.row.followStr || "暂无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="danmakusStr" label="弹幕数">
        <template #default="scope">
          <span>{{ scope.row.danmakusStr || "暂无数据" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small">加入比较</el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>
<script lang="ts" setup>
import {QuestionFilled} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import moment from "moment";
import {useCartoonStore} from '@/store/cartoonStore.js'

const types = ref<any>([])
let cartoonStore = useCartoonStore();
const cartoonInfo = ref<any>()
const cartoonRecommendInfo = ref<any>()
const cartoonDynamicInfo = ref<any>()
const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
onMounted(() => {
  init()
})

function init() {
  getCartoonInformation()
  getRecommendedCartoonInformation()
}

watch(() => cartoonStore.currentIndex, // 监听的值，可以是任何响应式的对象或者 ref
    (newValue, oldValue) => {
      // 当值发生变化时执行的回调函数
      console.log('myValue changed from', oldValue, 'to', newValue)
      init()
    })

function getRecommendedCartoonInformation() {
  // const types_ = Object.values(types.value)
  const trueTags = types.value.filter(item => item.check).map(item => item.tag);
  if (trueTags.length == 0) {
    return;
  }
  let seasonId = cartoonInfo.value.seasonId;
  cartoonStore.getRecommendCartoonInfo(seasonId, trueTags).then((res) => {
    if (res.code === 200) {
      cartoonRecommendInfo.value = res.data
    }
  })
}

function getCartoonInformation() {
  let cartoonInfoByIndex = cartoonStore.getCartoonInfoByIndex();
  cartoonInfo.value = cartoonInfoByIndex
  cartoonDynamicInfo.value = Array.of(cartoonInfoByIndex["cartoonDynamicInfo"])
  types.value = cartoonInfoByIndex.types.map(tag => ({tag, check: true}));
}

function tableRowStyle({row, rowIndex}) {
  return {'background-color': '#cccccc', 'border': '0px'}
}

function headerCellStyle() {
  return {
    'background-color': '#cccccc',
    'color': '#000',
    'font-weight': '400',
    'font-size': 'bold'
  }
}

function onChangeTag(value) {
  types.value[value]["check"] = !types.value[value]["check"]
  getRecommendedCartoonInformation()
}

function hotVideoTableRowStyle({row, rowIndex}) {
  return 'background-color:#ecf5ff'
}

function hotVideoTableHeaderCellStyle() {
  return {
    'background-color': '#1989fa',
    'color': '#fff',
    'font-weight': '400'
  }
}

</script>
<style scoped>


:deep(.el-table th.is-leaf ) {
  border-bottom: none;
}

.el-table__body {
  -webkit-border-vertical-spacing: 0px;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td ) {
  background-color: transparent;
}
</style>