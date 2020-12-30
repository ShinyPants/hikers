import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Home from './components/page/Home.vue'

Vue.use(Router)

// 配置路由
let router = new Router({
	routes: [{
			path: "/",
			name: "default",
			component: Home
		},
		{
			path: "/home",
			name: "home",
			component: Home
		}
	]
})

// 导出
export default router
