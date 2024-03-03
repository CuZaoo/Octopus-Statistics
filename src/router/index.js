// router.js or router.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/hot_recommend', component: () => import('../views/hot_recommend.vue') },
  { path: '/', component: () => import('../views/cartoonData.vue') },
  { path: '/more', component: () => import('../views/more.vue') },
  { path: '/test', component: () => import('../views/test.vue') },
  { path: '/forgetPassword', component: () => import('../views/forgotPassword.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
