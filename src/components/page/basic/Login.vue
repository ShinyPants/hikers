<template>
  <div class="div_round">
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
    <div>
      <el-button @click="doRegist" type="text">立即注册</el-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: "login",
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
          this.$axios.get(this.$urls.user.login, {
            params: this.user
          })
          .then((res) => {
            res = res.data
            // 登录成功
            if (res.status === 1) {
              // 将用户信息注册到全局
              Vue.prototype.$theUser = res.data
              // 成功后的事件
              this.loading = false
              this.$router.back()
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
      },
      doRegist() {
        this.$router.push("/regist").catch(err => err)
      }
    }
  }
</script>

<style>
  .div_round {
    padding: 50px 20px 0 20px;
    text-align: center;
  }
  .div_button {
    text-align: right;
  }
</style>
