import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 导入URL配置
import server from '../public/config/axios.json'

// 使用ElementUI
Vue.use(ElementUI)

// 将链接放入全局，方便调用
Vue.prototype.$urls = server
// 设置axios的baseUrl
axios.defaults.baseURL = server.server
// 将axios放入全局变量，将来需要时可用this.$axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 判断某个路由是否需要登录
router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    // 如果需要登录
    if (Vue.prototype.$theUser !== undefined) {
      next()
    } else {
      next({
        path: "/login"
      })
    }
  } else {
    // 不需要登录
    next()
  }
})

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
