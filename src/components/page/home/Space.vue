<template>
	<div>
    <!-- 个人信息展示 -->
    <div style="background-color: blueviolet; padding-top: 20px; background-image: url('/images/user_back_image.png');">
      <!-- 头像 -->
      <div style="text-align: center;">
        <el-image :src="user.photo"
          style="border-radius: 50%; height: 100px; width: 100px; border: 1px solid white;"></el-image>
      </div>
      <!-- 昵称 -->
      <div style="text-align: center; font-size: xx-large; color: #fb7299;">
        <span>{{user.nikeName}}</span>
      </div>
      <!-- 粉丝数、关注数 -->
      <div>
        <el-row style="width: 96%; margin: 0 auto; color: aliceblue;">
          <el-col :span="6"></el-col>
          <el-col :span="5" style="text-align: right;">粉丝数：{{user.fans}}</el-col>
          <el-col :span="2"></el-col>
          <el-col :span="5" style="text-align: left;">关注数：{{user.focus}}</el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>
    <!-- 一些选项按钮 -->
    <div>
      <el-row :gutter="24" style="width: 100; text-align: center; margin: 0 auto;">
        <el-col :span="6">
          <el-image src="/icons/myMessage.png" style="width: 50px; height: 50px;"></el-image>
          <div>我的私信</div>
        </el-col>
        <el-col :span="6">
          <el-image src="/icons/myTopic.png" style="width: 50px; height: 50px;"></el-image>
          <div>我的发帖</div>
        </el-col>
        <el-col :span="6">
          <el-image src="/icons/myFocus.png" style="width: 50px; height: 50px;"></el-image>
          <div>我的关注</div>
        </el-col>
        <el-col :span="6">
          <el-image src="/icons/mySelf.png" style="width: 50px; height: 50px;"></el-image>
          <div>个人信息</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'space',
    data() {
      return {
        user: {}
      }
    },
		activated() {
      this.refresh()
		},
    methods: {
      refresh() {
        if (this.$theUser === undefined) {
          this.$router.push('/login').catch()
          return
        }
        this.uid = this.$theUser.uid
        // 获取个人信息
        this.$axios.get(this.$urls.user.user, {params: {uid: this.uid}})
          .then((res) => {
            this.user = res.data.data
            this.user.photo = this.$urls.server + this.user.photo
          })
          .catch((err) => {console.log(err)})
      }
    }
	}
</script>

<style>
</style>
