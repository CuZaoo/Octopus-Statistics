// main.js or main.ts
import {createApp} from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import './assets/icons/iconfont.css'    // 引入阿里云字体图标css
import './assets/icons/iconfont.js'    // 引入阿里云字体图标js
// import "amfe-flexible/index.js";
import skeletonDirective from "./directive/skeletonDirective.ts"
import directive from '@/directive/index.js';
// pinia
import {createPinia} from "pinia";
// pinia 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import flexible from "@/utils/flexible.js"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

// 设置HTML根元素的字体大小
const setRem = () => {
    let deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;
    let fontSize = deviceWidth / 15;
    let minFontSize = 50;
    console.log("字体大小:",fontSize);
    fontSize = Math.max(fontSize, minFontSize);
    document.documentElement.style.fontSize = fontSize + 'px';
    document.documentElement.style.lineHeight = "1.5";

};

// 初始化设置
setRem();

// 监听窗口大小变化，重新设置HTML根元素的字体大小
window.addEventListener('resize', setRem);



directive(app)
app.use(pinia)
// app.use(flexible)
app.use(skeletonDirective)
app.use(router);
app.use(ElementPlus)
app.mount('#app');


