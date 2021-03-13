import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Home from './components/page/Home.vue'
// import Cate from './components/page/home/Categories.vue'
import Regist from './components/page/basic/Regist.vue'
import Login from './components/page/basic/Login.vue'
import Part from './components/page/topic/Part.vue'
import Edit from './components/page/topic/Edit.vue'
import Myinfo from './components/page/uinfo/Myinfo.vue'
import TopicInfo from './components/page/topic/TopicInfo.vue'
// 个人中心部分
import MyMessage from './components/page/home/space/MyMessage.vue'
import MyTopic from './components/page/home/space/MyTopic.vue'
import MyFocus from './components/page/home/space/MyFocus.vue'
import MySelf from './components/page/home/space/MySelf.vue'
import MsgEdit from './components/page/uinfo/MsgEdit.vue'
// 主页面
import Main from './components/Main.vue'

// 管理员页面
import Adm from './components/adm/Adm.vue'
import AdmLogin from './components/adm/AdmLogin.vue'
// 管理员功能
import AdmCate from './components/adm/topic/AdmCategories.vue'
import AdmPart from './components/adm/topic/AdmPart.vue'
import AdmTopicInfo from './components/adm/topic/AdmTopicInfo.vue'
import AdmControlTopic from './components/adm/topic/AdmControlTopic.vue'

// 测试用页面
import Test from './components/Test.vue'

// 使用router
Vue.use(Router)

// 配置路由
let router = new Router({
  routes: [
    {
      path: "/",
      name: "default",
      component: Main,
      meta: {
        keepAlive: true
      },
      redirect: '/home',
      children: [{
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "/login",
          name: "login",
          component: Login
        },
        {
          path: "/regist",
          name: "regist",
          component: Regist
        },
        {
          path: "/part/:partId/:partName",
          name: "part",
          component: Part,
          meta: {
            keepAlive: false
          }
        },
        {
          path: "/edit/:partId",
          name: "edit",
          component: Edit,
          meta: {
            needLogin: true
          }
        },
        {
          path: "/space/:uid",
          name: "space",
          component: Myinfo,
          meta: {
            keepAlive: false
          }
        },
        {
          path: "/tinfo/:tid",
          name: "tinfo",
          component: TopicInfo,
          meta: {
            keepAlive: false
          }
        },
        {
          path: "/me/message",
          name: "mymessage",
          component: MyMessage,
          meta: {
            needLogin: true
          }
        },
        {
          path: "/me/topic",
          name: "mytopic",
          component: MyTopic,
          meta: {
            needLogin: true
          }
        },
        {
          path: "/me/focus",
          name: "myfocus",
          component: MyFocus,
          meta: {
            needLogin: true
          }
        },
        {
          path: "/me/self",
          name: "myself",
          component: MySelf,
          meta: {
            needLogin: true
          }
        },
        {
          path: "/me/msgedit/:tid",
          name: "msgedit",
          component: MsgEdit,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
        {
          path: "/test",
          name: "thetest",
          component: Test
        }
      ]
    },
    {
      path: "/adm",
      name: "/adm",
      component: Adm,
      children: [{
          path: "cate",
          component: AdmCate
        },
        {
          path: "part/:partId/:partName",
          component: AdmPart
        },
        {
          path: "edit/:partId",
          component: Edit,
          meta: {
            needLogin: true
          }
        },
        {
          path: "tinfo/:tid",
          component: AdmTopicInfo,
          meta: {
            keepAlive: false
          }
        },
        {
          path: "regist",
          component: Regist
        },
        {
          path: "topic_control",
          component: AdmControlTopic
        },
        {
          path: "me/message",
          component: MyMessage,
          meta: {
            needLogin: true
          }
        },
      ]
    },
    {
      path: "/adm/login",
      component: AdmLogin
    }
  ]
})

// 导出
export default router
