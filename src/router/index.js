import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../view/ttsTimbre/index.vue'; // 导入你的组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 添加其他路由规则
];

const router = createRouter({
  history: createWebHashHistory(), // 使用createWebHashHistory()创建哈希模式的路由历史
  routes
});

export default router;