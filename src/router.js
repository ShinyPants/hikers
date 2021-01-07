import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Home from './components/page/Home.vue'
import Adm from './components/adm/Adm.vue'
import Cate from './components/page/home/Categories.vue'

// 使用router
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
		},
		{
			path: "/adm",
			name: "adm",
			component: Adm,
			children: [{
				path: "cate",
				component: Cate
			}]
		}
	]
})

// 导出
export default router
