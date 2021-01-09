<template>
  <div id="thediv">
    <!--登陆按钮-->
    <h3 id="login" v-if="isLogin==true">欢迎您 | <a href="javascript:;" @click="logout">注销</a></h3>
    <h3 id="login" v-else><a href="javascript:;" @click="login1">登录</a> | 注册</h3>

    <!--登陆框 -->
    <div id="login-box" :style="log==0?'display:none':'display:block;zIndex:1'">
      <form action="">
        <label>用&nbsp;&nbsp;&nbsp;&nbsp;户:
          <input v-model="uname" type="text" placeholder="请输入用户名...">
        </label>
        <label>密&nbsp;&nbsp;&nbsp;&nbsp;码:
          <input v-model="upwd" type="password" placeholder="请输入密码...">
        </label>
        <button type="button" @click="login2">登录</button>
        <p id="close" @click="close">×</p>
      </form>
    </div>

    <!--背景半透明处理-->
    <div id="back" :style="log==0?'display:none':'display:block'"></div>
  </div>
</template>

<script>
  export default {
    name: "regist",
    data() {
      return {
        isLogin: false,
        log: 0,
        uname: "",
        upwd: ""
      }
    },
    methods: {
      login1() {
        this.log = 1;
      },
      login2() {
        if (this.uname == "hahaha" && this.upwd == "123456") {
          this.log = 0;
          this.isLogin = true;
        } else {
          alert("用户名或密码不正确！");
        }
      },
      close() {
        this.log = 0;
        //清空input中的内容
        this.uname = "";
        this.upwd = "";
      },
      logout() {
        this.isLogin = false;
        this.uname = "";
        this.upwd = "";
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  /*登陆按钮*/
  #thediv {
    width: 140px;
    height: 36px;
    margin: 10px auto;
  }

  #login,
  #login a {
    width: 200px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    text-decoration: none;
    font-size: 24px;
    color: #000;
  }

  /*登陆框*/
  #login-box {
    padding: 20px;
    display: none;
    width: 350px;
    height: 150px;
    background: #eeeeee;
    border-radius: 5px;
    position: absolute;
    margin-left: -80px;
    margin-top: 150px;
  }

  #login-box>form {
    text-align: center;
  }

  #login-box label {
    display: block;
    font-size: 20px;
    margin: 10px 0 0 0;
  }

  #login-box label input {
    width: 200px;
    height: 30px;
  }

  #login-box button {
    width: 200px;
    height: 30px;
    margin: 10px 0 0 0;
    width: 90px;
    border-radius: 5px;
  }

  #close {
    font-size: 18px;
    position: absolute;
    top: 0;
    right: 5px;
    cursor: pointer;
  }

  /*背景*/
  #back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }
</style>
