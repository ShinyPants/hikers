<template>
  <div>
    <div class="div_forms">
      <!-- 登录信息填写 -->
      <div :style="rstep==0?'display: block':'display: none'">
        <el-form ref="form1" :model="user" :rules="user_rule" status-icon label-width="100px">
          <el-form-item label="手机号" prop="phone" required>
            <el-input type="number" v-model="user.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" required>
            <el-input type="password" v-model="user.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpwd" required>
            <el-input type="password" v-model="user.checkpwd" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 密码找回问题 -->
      <div :style="rstep==1?'display: block':'display: none'">
        <el-form ref="form2" :model="user" :rules="user_rule" status-icon label-width="100px">
          <el-form-item label="找回问题" prop="question" required>
            <el-input type="text" v-model="user.question" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="问题答案" prop="answer" required>
            <el-input type="text" v-model="user.answer" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 实名登记 -->
      <div :style="rstep==2?'display: block':'display: none'">
        <el-form ref="form3" :model="user" :rules="user_rule" status-icon label-width="100px">
          <el-form-item label="昵称" prop="nikeName" required>
            <el-input type="text" v-model="user.nikeName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="uname" required>
            <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="user.birthday"></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="user.mail"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 下一步按钮 -->
    <div class="div_buttons">
      <el-button @click="beforestep" type="text" :disabled="rstep==0">上一步</el-button>
      <el-button @click="nextstep" type="success" round v-loading="loading">{{rstep==2?"提交":"下一步"}}</el-button>
    </div>
    <!-- 步骤条 -->
    <div>
      <el-steps :active="rstep" finish-status="success" align-center>
        <el-step title="步骤1" description="填写登录信息"></el-step>
        <el-step title="步骤2" description="密码找回问题"></el-step>
        <el-step title="步骤3" description="实名登记"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
  export default {
    name: "regist",
    data() {
      let vphone = (rule, value, callback) => {
        if (!/^1[3456789]\d{9}$/.test(value))
          callback(new Error("请输入正确的手机号"))
        else {
          // 联网验证是否重复
          this.$axios.get(this.$urls.user.phone + value)
            .then((res) => {
              res = res.data
              if (res.status > 0) {
                if (res.data === true)
                  callback()
                else
                  callback(new Error('已被占用'))
              } else {
                callback(new Error('验证失败'))
              }
            })
            .catch((err) => {
              console.log(err)
              callback(new Error('验证失败'))
            })
        }
      }
      let vnike = (rule, value, callback) => {
        // 联网验证是否重复
        this.$axios.get(this.$urls.user.nike + value)
          .then((res) => {
            res = res.data
            if (res.status > 0)
              if (res.data == true)
                callback()
            else
              callback(new Error('已被占用'))
            else
              callback(new Error('验证失败'))
          })
        callback()
      }
      let vpwd = (rule, value, callback) => {
        if (value === '')
          callback(new Error('请输入密码'))
        else {
          if (value.length < 3 || value.length > 15)
            callback(new Error('长度在3-15之间'))
          else
            callback()
        }
      }
      let vcheckpwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.user.pwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      let vquestion = (rule, value, callback) => {
        if (value === '')
          callback(new Error('请输入找回问题'))
        else {
          if (value.length < 3 || value.length > 10)
            callback(new Error('长度在3-10之间'))
          else
            callback()
        }
      }
      let vanswer = (rule, value, callback) => {
        if (value === '')
          callback(new Error('请输入答案'))
        else if (value === this.user.question)
          callback(new Error('答案不能与问题相同'))
        else
          callback()
      }
      let vuname = (rule, value, callback) => {
        if (value === '')
          callback(new Error('姓名不能为空'))
        else
        if (value.length < 2 || value.length > 10)
          callback(new Error('长度在2-10之间'))
        else
          callback()
      }
      let vmail = (rule, value, callback) => {
        if (value === '')
          callback()
        else
          this.$axios.get(this.$urls.user.mail + this.user.mail)
          .then((res) => {
            res = res.data
            if (res.status > 0)
              if (res.data === true)
                callback()
            else
              callback(new Error('已被占用'))
            else
              callback(new Error('检查邮箱失败'))
          })
          .catch((err) => {
            console.log(err)
            callback(new Error('检查邮箱失败'))
          })
      }
      return {
        loading: false,
        rstep: 0,
        user: {
          phone: '', // 1
          nikeName: '', // 1
          pwd: '', // 1
          checkpwd: '', // 1
          question: '', // 2
          answer: '', // 2
          uname: '', // 3
          mail: '', // 3
          birthday: '' // 3
        },
        user_rule: {
          phone: [{
              required: true,
              message: '请输入电话号',
              trigger: 'blur'
            },
            {
              validator: vphone,
              trigger: 'none'
            }
          ],
          pwd: [{
            validator: vpwd,
            trigger: 'blur'
          }],
          checkpwd: [{
            validator: vcheckpwd,
            trigger: 'blur'
          }],
          question: [{
            validator: vquestion,
            trigger: 'blur'
          }],
          answer: [{
              validator: vanswer,
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在3-10之间',
              trigger: 'blur'
            }
          ],
          birthday: [{
            required: true,
            message: '请输入生日',
            trigger: 'blur'
          }],
          nikeName: [{
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在2-10之间',
              trigger: 'blur'
            },
            {
              validator: vnike,
              trigger: 'none'
            }
          ],
          uname: [{
            validator: vuname,
            trigger: 'blur'
          }],
          mail: [{
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: 'change'
            },
            {
              validator: vmail,
              trigger: 'none'
            }
          ]
        }
      }
    },
    methods: {
      nextstep() {
        if (this.rstep === 0) {
          this.loading = true
          this.$refs.form1.validate((valid) => {
            if (valid) {
              this.rstep++
              this.loading = false
            } else {
              this.loading = false
              return false
            }
          })
        } else if (this.rstep === 1) {
          this.loading = true
          this.$refs.form2.validate((valid) => {
            if (valid) {
              this.rstep++
              this.loading = false
            } else {
              this.loading = false
              return false
            }
          })
        } else if (this.rstep === 2) {
          this.loading = true
          this.$refs.form3.validate((valid) => {
            if (valid === true) {
              this.$axios.post(this.$urls.user.regist, this.user)
                .then((res) => {
                  res = res.data
                  if (res.status > 0) {
                    if (res.data === true) {
                      this.rstep++
                      this.loading = false
                      alert('注册成功')
                      this.$router.back()
                    } else {
                      this.loading = false
                      alert('注册失败')
                    }
                  } else {
                    this.loading = false
                    alert(res.data)
                  }
                })
                .catch((err) => {
                  console.log(err)
                  this.loading = false
                  alert('提交失败')
                })
            } else {
              this.loading = false
              return false
            }
          })
        }
      },
      beforestep() {
        this.rstep--
      }
    }
  }
</script>

<style>
  /* 解决number的箭头问题 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  /* 解决number的箭头问题 */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  .div_forms {
    padding: 50px 20px 10px 15px;
  }
  
  .div_buttons {
    text-align: center;
    padding-bottom: 10px;
  }
</style>
