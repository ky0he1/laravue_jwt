import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
import Top from './pages/Top'
import Login from './pages/Login'
import User from './pages/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    // 認証必要
    path: '/user',
    name: 'User',
    component: User,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router