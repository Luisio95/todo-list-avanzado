import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../pages/Login.vue') },
    { path: '/dashboard', component: () => import('../pages/Dashboard.vue') },
    { path: '/register', component: () => import('../pages/Register.vue') },

  ],
})

export default router