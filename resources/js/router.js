import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Top from './pages/Top'
import Login from './pages/Login'
import User from './pages/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
    meta: { isPublic: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => !page.meta.isPublic) && !store.getters['auth/check']) {
    next('/login')
  } else {
    next()
  }
  if (to.name === 'Login' && store.getters['auth/check']) {
    alert('ログイン済みです。')
    next('/')
  }
})

export default router