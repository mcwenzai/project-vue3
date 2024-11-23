import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import BoardDataView from '../views/BoardDataView.vue'
import BasicInfoView from '../views/pages/BasicInfoView.vue'
import Login from '../views/Login.vue'
import { getToken } from '../utils/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/BoardData/:projectItem',
    name: 'BoardData',
    component: () => import('@/views/BoardDataView.vue'),
    props: true
  },
  {
    path: '/BasicInfoView',
    name: 'BasicInfoView',
    component: BasicInfoView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   props: true
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   const token = getToken();
//   if (!token && to.name !== 'Login') {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
