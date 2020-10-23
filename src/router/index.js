import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/common/config/routes.js'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
