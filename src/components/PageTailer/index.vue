<script lang="ts" setup>
import {ChatLineRound, Promotion, Service, Share} from "@element-plus/icons-vue";
import {ref} from "vue";

const emailSub = ref('')
</script>

<template>
  <main>
    <el-divider/>
    <el-row justify="center">
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8">
        <el-space :size="'small'">
        <el-image src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
                  style="width: 0.5rem;height: 0.5rem"></el-image>
        <span style="font-weight: bold;font-size: 0.3rem;vertical-align: middle">鲁ICP备2024061938号</span>
        </el-space>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8">
        <el-space :size="'large'">
        <el-link :underline="false">常见问题</el-link>
        <el-link :underline="false">使用指南</el-link>
        <el-link :underline="false">服务协议</el-link>
        </el-space>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8">
        <el-space :size="'large'">
          <el-link :underline="false">隐私条款</el-link>
          <el-link :underline="false">服务条款</el-link>
        </el-space>
      </el-col>
    </el-row>
  </main>
</template>
<style scoped>

</style>