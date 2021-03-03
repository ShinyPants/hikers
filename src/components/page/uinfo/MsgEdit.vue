<template>
  <div>
    <el-container>
      <el-header style="text-align: center; background-color: lightpink;">
        <i @click="doBack" class="el-icon-arrow-left" style="float: left; font-size: 50px; cursor: pointer;"></i>
        <span style="font-size: xx-large; color: white;">{{tuser.nikeName}}</span>
      </el-header>
      <el-main style="">
        <div style="height: 100%;">
          <MsgInfo v-for="(m, index) in msgList" :key="index" :fuser="fuser" :tuser="tuser" :msg="m"></MsgInfo>
        </div>
      </el-main>
      <el-footer style="">
        <div style="padding: 10px 0 10px 0;">
          <input v-model="newMsg" type="text" maxlength="50" style="width: 90%;" />
          <button @click="doSend" style="cursor: pointer;">发送</button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import MsgInfo from './MsgInfo.vue'
  
  export default {
    name: 'msg-edit',
    components: {MsgInfo},
    data() {
      return {
        newMsg: '',
        uid: this.$theUser.uid,
        tid: 0,
        msgList: [],
        tuser: {},
        fuser: this.$theUser
      }
    },
    activated() {
      // 获取本人和目标的id
      this.uid = this.$theUser.uid
      this.tid = this.$route.params.tid
      // 获取个人信息
      this.$axios.get(this.$urls.user.user, {params: {uid: this.tid}})
        .then((res) => {
          this.tuser = res.data.data
        })
        .catch((err) => {console.log(err)})
      // 获取聊天信息列表
      this.$axios.get(this.$urls.user.msg + '/info', {params: {fuid: this.uid, tuid: this.tid}})
        .then((res) => {
          res = res.data
          this.msgList = res.data
        }).catch((err) => {console.log(err)})
    },
    methods: {
      doSend() {
        if (this.newMsg.trim().length == 0)
          return
        let msg = this.newMsg.trim()
        let fuid = this.uid
        let tuid = this.tid
        let pwd = this.$theUser.pwd
        this.$axios.post(this.$urls.user.msg, {
          fuid: fuid,
          tuid: tuid,
          info: msg,
          pwd: pwd
        })
          .then((res) => {
            res
            // TODO 增加到列表
            this.msgList.push({
              fuid: this.uid,
              tuid: this.tid,
              info: this.newMsg.trim()
            })
            this.newMsg = ''
          })
          .catch((err) => {
            console.log(err)
          })
      },
      doBack() {
        this.$router.back()
      }
    }
  }
</script>

<style>
</style>
