<template>
  <main style="padding: 10px;height: 50vh;position: relative">
    <el-row :gutter="100" justify="center">
      <el-col :span="10">
        <el-image src="src/assets/login.jpg" fit="cover" style="height: 100%;border-radius: 10px"></el-image>
      </el-col>
      <el-col :span="12">
        <el-tabs :stretch="true" v-model="activeTab" @tab-click="usePhoneTab">
          <el-tab-pane label="账号" name="account">
            <el-form
                ref="rulesAccountFormRef"
                :model="loginForm"
                status-icon
                :rules="rulesAccount"
                label-width="auto"
            >
              <el-form-item label="账号" prop="account">
                <el-input
                    v-model="loginForm.account"
                    autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off"/>
              </el-form-item>
              <el-form-item >
                <div style="float: right">
                  <el-link :underline="false" href="/forgetPassword" @click="forgetPassword">
                    忘记密码
                  </el-link>
                </div>

              </el-form-item>
              <el-form-item>
                <el-button class="loginButton" type="primary" size="large" color="#0000ff"
                           @click="sysLogin(rulesAccountFormRef)">登录
                </el-button>
                <el-button class="signUpButton" size="large" @click="enrollAccount">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号" name="iphone">
            <el-form
                ref="rulesPhoneFormRef"
                :model="loginForm"
                status-icon
                :rules="rulesPhone"
                label-width="auto"
            >
              <el-form-item label="手机号" prop="iphone">
                <el-input
                    v-model="loginForm.iphone"
                />
              </el-form-item>
              <el-form-item label="验证码" prop="captcha">
                <!--                <el-input v-model="loginForm.captcha" autocomplete="off">-->
                <!--                  <template #append>-->
                <!--                    <el-button>获取验证码</el-button>-->
                <!--                  </template>-->
                <!--                </el-input>-->
                <el-input v-model="loginForm.captcha">
                  <template #append style="box-shadow: none">
                    <el-image element-loading-text="Loading..." v-loading="captchLoading" style="padding: 0;margin: 0"
                              :src="captchaBase64" @click="getCaptchaBase64"></el-image>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-link :underline="false" href="/forgetPassword" @click="forgetPassword">
                  忘记密码
                </el-link>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%" size="large" color="#0000ff" @click="sysPhoneLogin(rulesPhoneFormRef)">登录
                  /
                  注册
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div>其他登录方式</div>
        <el-space :size="60">
          <el-link :underline="false">
            <Icon icon="icon-weixin" size="20"></Icon>
            微信
          </el-link>
          <el-link :underline="false">
            <Icon icon="icon-shejiaotubiao-39" size="20"></Icon>
            QQ
          </el-link>
        </el-space>

      </el-col>
    </el-row>
    <div style="color: #888888;margin-top: 30px">
      未注册的手机号将被自动注册
    </div>
    <div style="color: #888888">
      登录或者完成注册则代表您同意
      <el-link :underline="false" style="color: #0086b3">用户协议</el-link>
      和
      <el-link :underline="false" style="color: #0086b3">隐私政策</el-link>

    </div>
  </main>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import Icon from '../Icon/Icon.vue'
import {ElMessage} from "element-plus";
import {login, captcha, phoneLogin} from '@/api/login.js'
import {useLoginStore} from "@/store/loginStore.js";

const loginStore = useLoginStore();
const captchLoading = ref(true)
const rulesPhoneFormRef = ref(null)
const rulesAccountFormRef = ref(null)
const activeTab = ref('account')
const captchaBase64 = ref("")
const loginForm = reactive({
  'account': '',
  'password': '',
  'iphone': '',
  'captcha': ''
})
const checkAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  }
}
const validateIphone = (rule: any, value: any, callback: any) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (value.length != 11 && !reg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (loginForm.password !== '') {
      if (!rulesAccountFormRef.value) return
      // rulesAccountFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validateCaptcha = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.length != 4) {
    callback(new Error('请输入正确的验证码'))
  }
}

const rulesAccount = reactive<FormRules<typeof loginForm>>({
  account: [{validator: checkAccount, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
})

const rulesPhone = reactive<FormRules<typeof loginForm>>({
  iphone: [{validator: validateIphone, trigger: 'blur'}],
  captcha: [{validator: validateCaptcha, trigger: 'blur'}],
})
function forgetPassword(){
  loginStore.loginDialogVisible = false
}
function usePhoneTab(pane, ev) {
  if (pane.props.name === "iphone") {
    // 加载验证码
    getCaptchaBase64()
  }
}

function getCaptchaBase64() {
  captchLoading.value = true
  captcha().then((res) => {
    captchLoading.value = false
    captchaBase64.value = 'data:image/png;base64,' + res.msg;
  }).catch((err) => {
    ElMessage({
      message: '服务器异常:' + err.msg,
      customClass: 'enrollMessage',
      duration: 30000,
    })
  })
}

function sysLogin(formEl: FormInstance | undefined) {
  console.log("登录1")
  if (!formEl) return
  console.log("登录2")
  // formEl.validate((valid) => {
  console.log("登录3")
  // if (valid) {
  console.log("登录4")
  login(loginForm.account, loginForm.password).then((res) => {
    console.log("登录5")
    if (res.code == 200) {
      ElMessage({
        message: res.msg,
        customClass: 'enrollMessage',
        duration: 30000,
      })
      loginStore.setToken(res.data);
      console.log(loginStore.token);
    }
    console.log(res)
  }).catch((err) => {
    console.log(err)
  });
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
  // })
}

function sysPhoneLogin(formEl: FormInstance | undefined) {
  console.log("登录1")
  if (!formEl) return
  console.log("登录2")
  // formEl.validate((valid) => {
  console.log("登录3")
  // if (valid) {
  console.log("登录4")
  phoneLogin(loginForm.iphone, loginForm.captcha).then((data) => {
    console.log("登录5")
    console.log(data)
  }).catch((err) => {
    console.log(err)
  });
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
  // })
}


function enrollAccount() {
  ElMessage({
    message: '输入手机号,注册账号',
    customClass: 'enrollMessage',
    duration: 30000,
  })
  activeTab.value = 'iphone'
}

onMounted(() => {
  console.log("token" + loginStore.token);
})
</script>
<style scoped>

.loginButton {
  width: 60%;
}

.signUpButton {
  width: 35%;
}

:deep(.el-input-group__append) {
  box-shadow: none;
  background-color: white;
}
</style>