import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Home from './components/page/Home.vue'
import Adm from './components/adm/Adm.vue'
import Cate from './components/page/home/Categories.vue'
import Regist from './components/page/Regist.vue'
import Login from './components/page/Login.vue'
import Part from './components/page/Part.vue'
import Edit from './components/page/Edit.vue'

// 使用router
Vue.use(Router)

// 配置路由
let router = new Router({
	routes: [{
			path: "/",
			name: "default",
			component: Home,
      meta: {
        keepAlive: true
      }
		},
		{
			path: "/home",
			name: "home",
			component: Home,
      meta: {
        keepAlive: true
      }
		},
    {
      path: "/regist",
      name: "regist",
      component: Regist
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/part/:partId",
      name: "part",
      component: Part
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    },
		{
			path: "/adm",
			name: "adm",
			component: Adm,
			children: [{
				path: "cate",
				component: Cate
			},
      {
        path: "regist",
        component: Regist
      },
      {
        path: "login",
        component: Login
      }]
		}
	]
})

// 导出
export default router
