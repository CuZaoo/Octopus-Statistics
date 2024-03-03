<template>
  <main>
    <el-row style="margin-top: 20px;align-items: center">
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8">
        <el-space style="vertical-align: bottom;">
          <el-image style="width: 1rem; height: 1rem" src="/src/assets/webIcons.png"/>
          <el-text style="font-weight: bold;font-size: 0.6rem;color: black">
            异世界数据
          </el-text>
        </el-space>
      </el-col>
      <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="8">
        <el-button ref="loginRef" circle
                   @click="loginDialogShow">
          <el-avatar style="width: 60px;height:60px"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            登录
          </el-avatar>
        </el-button>
        <el-popover
            :visible="loginPopoverVisible"
            ref="popoverRef"
            :virtual-ref="loginRef"
            trigger="click"
            virtual-triggering
        >
          <template #default>
            <div class="demo-rich-conent"
                 style="display: flex; gap: 16px; flex-direction: column">
              <el-avatar :size="60" src="https://avatars.githubusercontent.com/u/72015883?v=4"
                         style="margin-bottom: 8px"/>
              <div>
                <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
                  Element Plus
                </p>
                <p
                    class="demo-rich-content__mention"
                    style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                >
                  @element-plus
                </p>
              </div>

              <p class="demo-rich-content__desc" style="margin: 0">
                Element Plus, a Vue 3 based component library for developers,
                designers and product managers
              </p>
            </div>
          </template>
        </el-popover>
      </el-col>
      <el-col :xs="16" :sm="12" :md="8" :lg="8" :xl="8">
        <el-space :size="20" style="vertical-align: bottom">
          <el-link class="link" :href="links[2]" :underline="false">消息</el-link>
          <el-link class="link" :href="links[2]" :underline="false">收藏</el-link>
          <el-link class="link" :href="links[2]" :underline="false">历史</el-link>
        </el-space>
      </el-col>
    </el-row>
    <el-dialog v-model="loginStore.loginDialogVisible" style="border-radius: 20px" title="登录" :show-close="false"
               :align-center="true">
      <Login></Login>
    </el-dialog>

  </main>

</template>

<script lang="ts" setup>
import {onMounted, ref, unref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import Login from '../Login/index.vue'
import {useGlobalStore} from '@/store/globalStore.js'
import {useLoginStore} from "@/store/loginStore.js";

const globalStore = useGlobalStore();
const loginStore = useLoginStore();
const links = ['/', '/hot_recommend', '/cartoon_data', '/more']

const username = ref('')
const password = ref('')
const loginRef = ref()
const popoverRef = ref()
const loginPopoverVisible = ref(false)

function loginDialogShow() {
  console.log("更新")
  loginStore.updateLoginDialogVisible(true)
}

onMounted(() => {
  if (Math.random() > 0.5 && globalStore.isUserLogin) {
    loginPopoverVisible.value = true
    setTimeout(() => {
      loginPopoverVisible.value = false
    }, 3000)
  }
})
</script>

<style scoped>
.link {
  font-size: 0.4rem;
}

.menu_button {
  margin-top: 5px;
}

.eb {
  width: 20%;
  height: 100px; /* 调整按钮的高度 */
  background-color: #ccc; /* 按钮背景色 */
  color: black; /* 文字颜色 */
  cursor: pointer;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: center;
}
</style>
