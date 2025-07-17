import Home from '@/components/Home.vue'
import MainPage from '@/components/user/dasboard/MainPage.vue'
import SignIn from '@/components/user/SignIn.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/user/dasboard',
      name: 'mainpage',
      component: MainPage,
    },
  ],
})

export default router
