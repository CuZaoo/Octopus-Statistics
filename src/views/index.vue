<template xmlns:el-col="http://www.w3.org/1999/html">
  <main>
    <el-row :gutter="10">
      <el-col :offset="1" :span="7">
        <section style="margin-top: 20%">
          <div>
            <span style="font-weight:bold;font-size: 5em">
            动漫之家
            </span>
          </div>
          <div style="margin-top: 20%">
           <span style="font-weight:normal;font-size: 1.5em">
            一个专注于动漫推荐和数据的平台
            </span>
          </div>
          <div style="margin-top: 40%">
            <el-button color="#0000ff" style="padding: 30px 55px" size="large">开始使用</el-button>
            <el-button style="padding: 30px 35px" size="large">帮助</el-button>
          </div>
        </section>
      </el-col>
      <el-col :offset="2" :span="14">
        <el-image loading="lazy" style="width: 900px; height: 700px" src="src/assets/img.jpg"/>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col>
        <el-row justify="center">
          <span style="font-size: 40px;font-weight: bold">热门推荐</span>
        </el-row>
      </el-col>
      <el-col>
        <el-row justify="center" style="margin: 40px 0">
          <span style="font-size: 30px;color: #888888">每日为您推荐最新最热番剧</span>
        </el-row>
      </el-col>
      <el-col>
        <el-carousel :interval="4000" :autoplay="true" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
            <span>一部讲述人与自然的动漫</span>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row class="row" style="align-items: center" justify="space-evenly">
      <el-col :offset="1" :span="6">
        <span style="font-weight: bold;font-size: 30px">即刻加入我们</span>
        <h4>
          立即加入我们的网站，与其他动漫爱好者一同交流
        </h4>
      </el-col>
      <el-col :offset="2" :span="12">
        <el-row :gutter="8" justify="end">
          <el-col :span="12">
            <el-input v-model="search_input" placeholder="输入您的邮箱地址">
            </el-input>
            <h4>点击注册即表示您同意我们的条款和条件</h4>
          </el-col>
          <el-col :span="6">
            <el-button style="float: left" color="#0000ff" size="large">注册账号</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const search_input = ref('');
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.row {
  margin-top: 90px;
}


</style>
