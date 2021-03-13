<template>
  <div style="width: 100%; height: 100%; background-color: #5188A6;">
    <div style="float: left; display: inline-block; width: 100%; text-align: center;">
      <h1 style="padding-top: 200px;">踏青旅游论坛</h1>
      <h2>管理员入口</h2>
    </div>
    <div style="height: 100%; padding-top: 418px;">
  <div style="width: 500px; margin: 0 auto 0 auto; background-color: #B3C0D1; border-radius: 30px; padding: 20px;">
    <div>
      <el-form ref="loginForm" :model="user" :rules="check_rule" status-icon>
        <el-form-item label="用户名" prop="uname">
          <el-input placeholder="手机号码/邮箱" v-model="user.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="user.pwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="div_button">
      <el-button @click="doLogin" type="success" round v-loading="loading">登录</el-button>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: "admlogin",
    data() {
      const vuname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
          return
        }
        // 是手机号
        if (/^1[3456789]\d{9}$/.test(value)) {
          this.user.phone = value
          callback()
          return
        }
        // 是邮箱
        else if (/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(value)) {
          this.user.mail = value
          callback()
          return
        }
        callback(new Error('用户名格式不正确'))
      }
      const vpwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
          return
        }
        // 长度检查
        if (value.length < 3 || value.length > 15) {
          callback(new Error('长度在3-15之间'))
          return
        }
        callback()
      }
      return {
        loading: false,
        user: {
          phone: '',
          mail: '',
          uname: '',
          pwd: ''
        },
        check_rule: {
          uname: [{
            validator: vuname,
            trigger: 'blur'
          }],
          pwd: [{
            validator: vpwd,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      doLogin() {
        this.loading = true
        this.$refs.loginForm.validate((valid) => {
          if (valid === false) {
            this.loading = false
            return false
          }
          this.$axios.get(this.$urls.adm.login, {
            params: this.user
          })
          .then((res) => {
            res = res.data
            // 登录成功
            if (res.status === 1) {
              // 将用户信息注册到全局
              Vue.prototype.$theUser = res.data
              Vue.prototype.$theAdm = res.data
              // 成功后的事件
              this.loading = false
              this.$router.replace('/adm')
              return
            }
            // 登录失败
            alert('用户名或密码不正确')
            this.loading = false
            return false
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
            alert('操作失败')
          })
        })
      }
    }
  }
</script>

<style>
</style>
