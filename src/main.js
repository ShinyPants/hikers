import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'

// 使用ElementUI
Vue.use(ElementUI)

// 将axios放入全局变量，将来需要时可用this.$axios
Vue.prototype.$axios = axios
// 设置axios的baseUrl
// axios.defaults.baseURL = "http://127.0.0.1:8081"
axios.get("/config/axios.json")
.then((res) => {
	res = res.data.server
	axios.defaults.baseURL = res
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
