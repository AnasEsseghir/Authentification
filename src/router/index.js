import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '../users/Login.vue'
import Secure from '../users/Secure.vue'
import Register from '../users/Register.vue'
import NewEmployer from '../users/newemployer.vue'
Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/newemp',
      name: 'NewEmployer',
      component: NewEmployer
    }
  ]
})
