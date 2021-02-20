<template>
  <div id="my_focus">
    <div v-for="(f, index) in focus" :key="f.uid" style="padding-top: 20px;">
      <!-- 头像 -->
      <img :src="$urls.server + f.photo" style="width: 30px; height: 30px; border-radius: 50%; float: left; margin-left: 20px;" />
      <!-- 其他信息 -->
      <div style="margin-left: 55px;">
        <!-- 用户名 -->
        <span @click="lookUserInfo(f.uid)" style="color: #fb7299; font-size: x-large; margin-left: 20px; cursor: pointer;">{{f.nikeName}}</span>
        <!-- 粉丝数 -->
        <span style="padding-left: 20px;">粉丝数：{{f.fans}}</span>
        <!-- 取关按钮 -->
        <span @click="doNotFocus(f.uid, index)" style="border: 1px solid #B3C0D1; border-radius: 3px; color: #B3C0D1; float: right; cursor: pointer; margin-right: 20px;">取消关注</span>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'focus',
    data() {
      return {
        focus: []
      }
    },
    activated() {
      this.$axios.get(this.$urls.user.myfocus, {params: {uid: this.$theUser.uid}})
        .then((res) => {
          res = res.data
          if (res.status > 0) {
            this.focus = res.data
          }
        })
        .catch((err) => {console.log(err)})
    },
    methods: {
      lookUserInfo(uid) {
        this.$router.push('/space/' + uid)
      },
      doNotFocus(uid, index) {
        this.$axios.delete(this.$urls.user.focus, {params: {
          uid: this.$theUser.uid,
          tuid: uid,
          pwd: this.$theUser.pwd
        }})
        .then((res) => {
          res = res.data
          if (res.status > 0) {
            this.$message("已取关")
            this.focus.splice(index, 1)
          } else {
            this.$message(res.data)
          }
        }).catch((err)=>{
          this.$message("失败")
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
