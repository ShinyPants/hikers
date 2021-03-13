<template>
  <div style="height: 99%; margin: 5px;">
    <el-container style="height: 100%; border: 1px solid #eee; margin-bottom: 10px;">
      <!-- 侧边栏  开始 -->
      <!-- 权限入口 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- <el-menu :default-openeds="['1', '3']" default-active="1-1"> -->
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-edit"></i>论坛功能</template>
            <el-menu-item-group>
              <template slot="title">论坛监控</template>
              <el-menu-item index="1-1" @click="handleClick('/adm/cate')">以分区查看</el-menu-item>
              <el-menu-item index="1-2" @click="handleClick('/adm/regist')">新增用户</el-menu-item>
              <el-menu-item index="1-3" @click="handleClick('/adm/me/message')">我的信箱</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="论坛管理">
              <el-menu-item index="1-4" @click="handleClick('/adm/topic_control')">内容管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边栏  结束 -->
      <!-- header  开始 -->
      <!-- 主要包含管理员的姓名 -->
      <el-container>
        <el-header style="text-align: right; font-size: 12px; background-color: #5188A6;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="doLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$theUser.nikeName}}({{$theAdm.realname}})</span>
        </el-header>
        <!-- header  开始 -->
        <!-- 主界面  开始 -->
        <el-main>
            <router-view style="height: 100%;"></router-view>
        </el-main>
        <!-- 主界面  结束 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "adm",
    data() {
      return {
        // thePage: ''
      }
    },
    methods: {
      handleClick(url) {
        if (this.$theAdm === undefined) {
          this.$router.replace("/adm/login").catch()
          return
        }
        this.$router.push(url)
      },
      doLogout() {
        this.$theAdm = undefined
        this.$theUser = undefined
        this.$router.replace('/adm/login').catch()
      }
    },
    activated() {
      if (this.$theAdm === undefined) {
        this.$router.replace("/adm/login").catch()
        return
      }
    },
    created() {
      if (this.$theAdm === undefined) {
        this.$router.replace("/adm/login").catch()
        return
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
