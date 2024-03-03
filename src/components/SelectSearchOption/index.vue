<template>
  <div>
<!--    <el-avatar shape="square" :size="50" :src="props.imgUrl"/>-->
    {{props.title}}
    <el-tag>{{props.tagIndex}}</el-tag>
    <el-tag>{{props.tagFinish}}</el-tag>
  </div>
</template>
<script lang="ts" setup>
import {defineComponent, defineProps, onMounted} from 'vue'

const props = defineProps({
  imgUrl: {
    type: String,
  },
  //父组件传递的值
  title: {
    type: String,
    default: "标题"
  },
  tagIndex: {
    type: String,
    default: "标签1"
  },
  tagFinish: {
    type: String,
    default: "标签2"
  }
})
onMounted(()=>{
  console.log("更新了")
})
</script>
<style scoped>

</style>