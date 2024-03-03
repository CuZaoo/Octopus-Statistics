<template>
  <main>
    <el-row :gutter="20" justify="center" style="display: flex; flex-wrap: wrap;">
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="head_card" style="text-align: left;background-color: rgba(0,0,255,0.2)">
          <el-link :underline="false" style="display: block">
            <span class="card_header">最热数据 ></span>
          </el-link>
          <el-row>
            <el-col :xs="6" :sm="6" :md="12" :lg="4" :xl="4" v-for="item in getHotCartoonType()" :key="item">
              <el-link class="card_content" :underline="false">{{ item }}</el-link>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="head_card" style="text-align: left;background-color: rgba(0,70,255,0.2)">
          <el-link :underline="false" style="display: block">
            <span class="card_header">类型风格 ></span>
          </el-link>
          <el-row>
            <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" v-for="item in getCartoonType()" :key="item">
              <el-link class="card_content" :underline="false">{{ item }}
              </el-link>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="head_card" style="text-align: left;background-color: rgba(100,150,100,0.2)">
          <el-link :underline="false" style="display: block">
            <span class="card_header">动漫排行></span>
          </el-link>

          <el-row>
            <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" v-for="item in getTheTypeOfList()" :key="item">
              <el-link class="card_content" :underline="false">{{ item }}</el-link>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-divider style="margin: 30px 0px"></el-divider>
    <el-row :gutter="10" >
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <span style="font-size: 0.6rem">动漫信息</span>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

        <el-select
            v-model="searchCartoonContent"
            filterable
            remote
            reserve-keyword
            size="large"
            no-match-text="没有数据"
            placeholder="搜索喜欢的动漫吧~"
            :remote-method="showSearchDropDown"
            :loading="searchLoading"
            @blur="exitSelect"
            @change="changeSelect"
            @focus="focusSelect"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
            <template #default>
              <SelectSearchOption
                  :imgUrl="item.horizontalUrl"
                  :title="item.label"
                  :tagIndex="item.indexShow"
                  :tagFinish="item.isFinish == 1 ? '已完结' : '未完结'"></SelectSearchOption>
            </template>
          </el-option>
          <template #loading>
            <el-icon class="is-loading">
              <svg class="circular" viewBox="0 0 20 20">
                <g
                    class="path2 loading-path"
                    stroke-width="0"
                    style="animation: none; stroke: none"
                >
                  <circle r="3.375" class="dot1" rx="0" ry="0"/>
                  <circle r="3.375" class="dot2" rx="0" ry="0"/>
                  <circle r="3.375" class="dot4" rx="0" ry="0"/>
                  <circle r="3.375" class="dot3" rx="0" ry="0"/>
                </g>
              </svg>
            </el-icon>
          </template>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" justify="center">
      <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="22">
        <el-table class="cartoonTable" :data="tableData" style="width: 100%" table-layout="auto"
                  :border="false"
                  @row-click="showCartoonDetail" :header-cell-style="{background:'#efefef',padding:'20px'}">
          <template #empty>
            <el-row v-if="tableLoading" :gutter="20">
              <el-col v-for="item in 4" :key="item" :span="6">
                <el-skeleton :rows="5" animated/>
              </el-col>
            </el-row>
            <div v-else style="text-align: center;">暂无数据</div>
          </template>
          <el-table-column align="center" label="排行" width="100">
            <template #default="scope">
              <span>{{ scope.row.index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="视频信息" width="300px">
            <template #default="scope">
              <el-row>
                <!--                <el-col :span="7">-->
                <!--                  <el-image :src="scope.row.info.cover"></el-image>-->
                <!--                </el-col>-->
                <el-col>
                  <div style="font-weight: bold;font-size: 15px">{{ scope.row.title }}</div>
                  <div class="bottom-content">
                    <el-tag type="danger">{{ scope.row.isFinish == 1 ? '已完结' : '未完结' }}
                    </el-tag>
                    <el-tag type="info">{{ scope.row.indexShow }}
                    </el-tag>
                  </div>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column :prop="views" label="播放数">
            <template #default="scope">
              <span class="table_number_font">{{
                  scope.row.cartoonDynamicInfo && scope.row.cartoonDynamicInfo.viewsStr || "暂无数据"
                }}</span>
            </template>
          </el-table-column>
          <el-table-column label="追番数">
            <template #default="scope">
              <span class="table_number_font">{{
                  scope.row.cartoonDynamicInfo && scope.row.cartoonDynamicInfo.seriesFollowStr || "暂无数据"
                }}</span>
            </template>
          </el-table-column>
          <el-table-column label="弹幕数">
            <template #default="scope">
              <span class="table_number_font">{{
                  scope.row.cartoonDynamicInfo && scope.row.cartoonDynamicInfo.danmakusStr || "暂无数据"
                }}</span>
            </template>
          </el-table-column>
          <el-table-column label="点赞数">
            <template #default="scope">
              <span class="table_number_font">{{
                  scope.row.cartoonDynamicInfo && scope.row.cartoonDynamicInfo.likesStr || "暂无数据"
                }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投币数">
            <template #default="scope">
              <span class="table_number_font">{{
                  scope.row.cartoonDynamicInfo && scope.row.cartoonDynamicInfo.seriesFollowStr || "暂无数据"
                }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10" justify="center" style="margin-top: 50px">
      <el-col :span="6">
        <el-pagination :hide-on-single-page="true" v-model:current-page="page"
                       background layout="prev, pager, next" :page-count="total"
                       @change="genData"
        />
      </el-col>
    </el-row>
    <el-dialog class="no-header-dialog" style="border-radius: 20px" v-model="cartoonDetailVisible">
      <CartoonDetail></CartoonDetail>
    </el-dialog>

  </main>
</template>

<script lang="tsx" setup>
import {ref, onMounted, Ref} from 'vue';
import CartoonDetail from '../components/CartoonDetail/index.vue'
import SelectSearchOption from '../components/SelectSearchOption/index.vue'
import {Search} from '@element-plus/icons-vue'
import {useGlobalStore} from '@/store/globalStore.js'
import type {DropdownInstance, ListItem} from 'element-plus'

const searchLoading = ref<boolean>(false)
const globalStore = useGlobalStore();
import {useCartoonStore} from '@/store/cartoonStore.js'

const options = ref([
  {
    value: "",
    label: "",
    indexShow: "",
    isFinish: 1,
    horizontalUrl: ""
  }
])
let cartoonStore = useCartoonStore();
const views = ref('')
const currentYear = ref<Array<number>>([]);
// 获取当前时间
const cartoonDetailVisible = ref(false)
const index = ref('');
const searchCartoonContent = ref('')
const tableData = ref([])
const tableLoading = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(1)

// 假设特定时间戳为2024年2月29日 12:00:03（单位：毫秒）
let lastTimestamp = null;

// 计算时间差（单位：毫秒）
function showSearchDropDown(query: string) {
  let timeFlag = true
  if (lastTimestamp == null) {
    lastTimestamp = Date.now();
    timeFlag = false
  } else {
    const currentTimestamp = Date.now()
    const timeDifference = currentTimestamp - lastTimestamp;
    if (Math.abs(timeDifference) <= 500) {
      timeFlag = false;
    }
  }
  if (query && timeFlag) {
    searchLoading.value = true
    cartoonStore.searchCartoon(1, 10, query).then(res => {
      searchLoading.value = false
      options.value = convertOptions(res.data.cartoonInfo)
    }).catch(err => {
      searchLoading.value = false
    })
  }
}

function exitSelect() {
  console.log("触发")
}

function changeSelect() {
  console.log("触发change")
  // cartoonDetailVisible.value = true
  // cartoonStore.updateCurrentIndex((row.index - 1) % size.value)
}

function focusSelect() {
  console.log(searchCartoonContent.value)
}

function convertOptions(arr) {
  console.log("开始映射")
  let result = arr.map(item => {
    return {
      "label": item.title,
      "value": item.seasonId,
      "indexShow": item.indexShow,
      "isFinish": item.isFinish,
      "horizontalUrl": item.horizontalUrl,
    }
  })
  console.log("映射结束", result)
  return result
}

function showCartoonDetail(row, column, event) {
  cartoonDetailVisible.value = true
  cartoonStore.updateCurrentIndex((row.index - 1) % size.value)
}

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  for (let i = 0; i < 8; i++) {
    currentYear.value.push(year - i);
  }
}


function getCartoonType() {
  return ['热血', '漫改', '战斗', '校园']
}

function getTheTypeOfList() {
  return ["日榜", "周榜", "月榜", "年榜"]
}

function getHotCartoonType() {
  return ['最高评分', '最多追番', '最多播放', '最新追番']
}


function genData() {
  tableLoading.value = true
  cartoonStore.getCartoonInfo(page.value, size.value).then((res) => {
    tableLoading.value = true
    if (res.code === 200) {
      console.log(res)
      tableData.value = res.data.cartoonInfo
      total.value = res.data.total
    }
  }).catch(error => {
    tableLoading.value = true
  })
}

onMounted(() => {
  genData()
  getCurrentTime()
});
</script>
<style>


.no-header-dialog .el-dialog__header {
  display: none;
}

.el-dialog__body {
  padding: 0;
}



.table_number_font {
  font-size: large;
  margin-left: 10px;
}
</style>
<style lang='scss' scoped>
.cartoonTable {
  :deep(.el-table__empty-text) {
    margin-top: 40px;
    line-height: 25px;
    text-align: left;
    width: calc(100% - 20px);
  }

  :deep(.el-empty) {
    padding-top: 0;
  }
}

:deep(.el-select-dropdown__item) {
  padding-top: 10px;
  padding-bottom: 10px;
}

.card_content {
  font-size: 0.3rem;
  padding: 0;
  margin: 0;
}

.card_header {
  font-weight: bold;
  font-size: 0.4rem
}
.head_card{
  flex: 1;
  height: 100%;
}
</style>