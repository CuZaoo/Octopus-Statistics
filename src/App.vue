<template>
  <div id="app">
    <el-scrollbar :height="windowHeight">
      <el-row justify="center">
        <el-col :span="22" style="background-color: white">
          <el-header>
            <PageHeader/>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <PageTailer/>
          </el-footer>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import PageHeader from './components/PageHeader/index.vue'
import PageTailer from './components/PageTailer/index.vue'
import {useLoginStore} from './store/loginStore.js'
import {onBeforeMount, onMounted, ref} from "vue";
const store = useLoginStore()
const windowHeight = ref(window.innerHeight)
function updateWindowHeight(){
  windowHeight.value = window.innerHeight;
}
onMounted(()=>{
  window.addEventListener('resize',updateWindowHeight);
  store.windowHeight = windowHeight.value
  console.log(store.windowHeight)
})
onBeforeMount(()=>{
  window.removeEventListener('resize',updateWindowHeight);
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>