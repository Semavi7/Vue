import Home from '@/components/Home.vue'
import AddCourse from '@/components/user/dasboard/admin/AddCourse.vue'
import Courses from '@/components/user/dasboard/admin/Courses.vue'
import EditCourse from '@/components/user/dasboard/admin/EditCourse.vue'
import Dasboard from '@/components/user/dasboard/Dasboard.vue'
import MainPage from '@/components/user/dasboard/MainPage.vue'
import Profile from '@/components/user/dasboard/Profile.vue'
import SignIn from '@/components/user/SignIn.vue'
import { isAuth, isLoggedIn } from '@/composable/auth'
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
      beforeEnter: isLoggedIn
    },
    {
      path: '/user/dasboard',
      name: 'mainpage',
      beforeEnter: isAuth,
      component: MainPage,children:[
        {path:'',component: Dasboard, name:'dashboard'},
        {path:'profile',component: Profile, name:'profile'},
        {path:'courses',component: Courses, name:'courses'},
        {path:'courses/add',component: AddCourse, name:'courses_add'},
        {path:'courses/edit/:id',component: EditCourse, name:'courses_edit'}
      ]
    },
  ],
})

export default router
