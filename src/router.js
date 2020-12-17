import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/Index.vue'
import PicBar from './components/bar/PicBar.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: "/", name: "default", component: Index},
    {path: "/index", name: "index", component: PicBar}
  ]
})

export default router