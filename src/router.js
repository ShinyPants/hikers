import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/page/Index'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: "/", name: "default", component: Index},
    {path: "/index", name: "index", component: Index},
		{path: "/home", name:"home", component: Index}
  ]
})

export default router