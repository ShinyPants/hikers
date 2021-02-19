<template>
  <div style="display: inline;">
    <button style="cursor: pointer;" @click="doFocus" :class="{unfocus: !flag, yesfocus: flag}">{{flag?'已关注':'+ 关注'}}</button>
  </div>
</template>

<script>
  export default {
    name: 'focus_button',
    data() {
      return {
        flag: false
      }
    },
    props: {
      tuid: {
        type: Number,
        default: 0
      }
    },
    methods: {
      doFocus() {
        if (this.$theUser === undefined) {
          this.$router.push('/login')
          return
        }
        // 关注与不关注切换
        if (this.flag) {
          // 不再关注
          this.$axios.delete(this.$urls.user.focus, {params: {
            uid: this.$theUser.uid,
            tuid: this.tuid,
            pwd: this.$theUser.pwd
          }})
          .then((res) => {
            res = res.data
            if (res.status < 0) {
              this.$message(res.data)
              this.$axios.push("/login")
            }
            this.flag = false
          }).catch((err)=>{console.log(err)})
        } else {
          this.$axios.put(this.$urls.user.focus + '/' + this.$theUser.uid + '/' + this.tuid + '/' + this.$theUser.pwd)
          .then((res) => {
            res = res.data
            if (res.status < 0) {
              this.$message(res.data)
              this.$axios.push("/login")
            }
            this.flag = true
          }).catch((err)=>{console.log(err)})
        }
      }
    },
    watch: {
      // 作为入口
      tuid() {
        // 获取是否关注
        if (this.tuid === 0) {
          this.$message("用户不存在")
          this.$router.back()
          return
        }
        if (this.$theUser === undefined) {
          return
        }
        this.$axios.get(this.$urls.user.focus, {params: {uid: this.$theUser.uid, tuid: this.tuid}})
          .then((res) => {
            res = res.data
            if (res.status > 0)
              this.flag = res.data
          })
          .catch((err) => {console.log(err)})
      }
    }
  }
</script>

<style>
  .unfocus {
    border: 1px solid hotpink;
    border-radius: 5px;
    margin: 3px;
    color: hotpink;
  }

  .yesfocus {
    border: 1px solid darkgray;
    border-radius: 5px;
    margin: 3px;
    color: darkgray;
  }
</style>
