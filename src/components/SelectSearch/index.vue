<template>
  <div class="custom-select">
    <el-select v-model="innerValue" multiple filterable remote reserve-keyword :remote-method="remoteMethod"
               :multiple-limit="limit" :loading="loading"  tag-type="">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div class="custom-icon">
      <div class="custom-icon__wrapper">
        <font-awesome-icon icon="search" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'


const props = defineProps({
  //远程搜索的方法
  searchMethod: {
    type: Function,
    default: () => { }
  },
  //显示label标签的方法
  showMethod: {
    type: Function,
    default: () => { }
  },
  //多选限制数量
  limit: {
    type: Number,
    default: 1
  },
  //父组件传递的值
  value: {
    type: Number || Array || String,
    defalt: 1
  }
})
const options = ref<ListItem[]>([])
const innerValue = ref<Number[] | String[]>([])
const loading = ref(false)

interface ListItem {
  value: string
  label: string
}
// 监听父组件传递的值的变化
watch(
    () => props.value,
    async () => {
      if (props.value == null) {
        innerValue.value = []
      }
      if (typeof props.value === 'number') {
        innerValue.value = [props.value]
        const response = await props.showMethod(innerValue.value)
        options.value = response.data
      }
    }
)
// 初始化父组件传递的值
onMounted(async () => {
  if (props.value == null) {
    innerValue.value = []
  }
  if (typeof props.value === 'number') {
    innerValue.value = [props.value]
    const response = await props.showMethod(innerValue.value)
    options.value = response.data
  }
})



/**
 * 通过关键词查询选择框列表
 * @param query 查询参数
 */
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true
    const response = await props.searchMethod({ q: query })
    loading.value = false
    options.value = response.data
  } else {
    options.value = []
  }
}
//...省略开启对话框逻辑
</script>
<style lang="scss" scoped>
//将阴影和圆角去掉
::v-deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: 0 0 0 0;
}
//给边框添加阴影，并调整搜索框位置
.custom-select {
  display: inline-block;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color));
  .custom-icon {
    display: inline-block;
    color: var(--el-input-icon-color, var(--el-text-color-placeholder));
    vertical-align: middle;
    cursor: pointer;
    .custom-icon__wrapper {
      padding: 1px 11px;
    }
  }
}
</style>
