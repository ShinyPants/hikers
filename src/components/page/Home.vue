<template>
  <div id="home">
    <el-container ref="container">
      <el-main>
        <keep-alive>
          <el-scrollbar style="height: 100%;">
            <component :is="showPage"></component>
          </el-scrollbar>
        </keep-alive>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span="6">
            <el-image :src="showImage(0)" @click.native="handleClick(0)"></el-image>
          </el-col>
          <el-col :span="6">
            <el-image :src="showImage(1)" @click.native="handleClick(1)"></el-image>
          </el-col>
          <el-col :span="6">
            <el-image :src="showImage(2)" @click.native="handleClick(2)"></el-image>
          </el-col>
          <el-col :span="6">
            <el-image :src="showImage(3)" @click.native="handleClick(3)"></el-image>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Index from './home/Index.vue'
  import Cate from './home/Categories.vue'
  import Focus from './home/Focus.vue'
  import Space from './home/Space.vue'

  export default {
    name: 'Home',
    data() {
      return {
        picbar: [{
            defaultPic: "/icons/forbidden.png",
            selectedPic: "/icons/forbidden_filled.png",
            toPage: Index
          },
          {
            defaultPic: "/icons/help.png",
            selectedPic: "/icons/help_filled.png",
            toPage: Cate
          },
          {
            defaultPic: "/icons/info.png",
            selectedPic: "/icons/info_filled.png",
            toPage: Focus
          },
          {
            defaultPic: "/icons/info.png",
            selectedPic: "/icons/info_filled.png",
            toPage: Space
          }
        ],
        showPage: Index,
        pageKey: 0
      }
    },
    methods: {
      showImage(theKey) {
        return this.pageKey === theKey ? this.picbar[theKey].selectedPic : this.picbar[theKey].defaultPic
      },
      handleClick(key) {
        if (this.pageKey === key) {
          this.again()
          return
        }
        this.change(key)
      },
      change(key) {
        // 检查是否登录
        if (this.$theUser === undefined && key > 1) {
          this.$router.push("/login").catch(err => err)
          return
        }
        // 切换页面
        this.pageKey = key
        this.showPage = this.picbar[key].toPage
      },
      again() {
        this.$refs.dom_view.refresh()
      },
    }
  }
</script>

<style>
  .el-container {
    margin-left: auto;
    margin-right: auto;
    display: block;
    height: 100%;
  }

  .el-footer {
    text-align: center;
    height: auto !important;
  }

  .el-image {
    max-width: 100px;
    max-height: 100px;
    cursor: pointer;
  }

  .el-row {
    margin-bottom: 0;
  }

  .el-col {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  .el-scrollbar__wrap {
    overflow: hidden scroll !important;
  }
</style>
