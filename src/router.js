import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Index from './components/page/Index'
import Space from './components/page/Space'
import Cate from './components/page/Categories'
import Focus from './components/page/Focus.vue'

Vue.use(Router)

// 配置路由
let router = new Router({
	routes: [{
			path: "/",
			name: "default",
			component: Index
		},
		{
			path: "/index",
			name: "index",
			component: Index
		},
		{
			path: "/home",
			name: "home",
			component: Index
		},
		{
			path: "/space",
			name: "space",
			component: Space
		},
		{
			path: "/cate",
			name: "cate",
			component: Cate
		},
		{
			path: "/focus",
			name: "focus",
			component: Focus
		}
	]
})

// 导出
export default router
