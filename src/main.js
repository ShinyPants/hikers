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

// 将axios放入全局变量，将来需要时可用this.$axios
Vue.prototype.$axios = axios
// 将链接放入全局，方便调用
Vue.prototype.$urls = server
// 设置axios的baseUrl
axios.defaults.baseUrl = server.server

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
