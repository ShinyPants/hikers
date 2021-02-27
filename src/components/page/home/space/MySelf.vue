<template>
  <div id="my_self" style="padding-top: 30px;">
    <div>
      <img :src="$urls.server + info.photo" style="display: block; margin: 0 auto; width: 100px; height: 100px; border-radius: 50%;"/>
      <el-upload ref="uploader"
        :action="$urls.file.pic"
        :auto-upload="false"
        :limit="picLimit"
        list-type="picture-card"
        accept=".png, .jpg, .jpeg, .gif"
        :data="{uid: info.uid, pwd: $theUser.pwd}"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :class="{hide:!isShowLoader}">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="picVisible" size="tiny">
        <img width="100%" :src="picUrl" alt="">
      </el-dialog>
      <el-button @click.native="submit()" v-show="picsNum>0?true:false">修改头像</el-button>
    </div>
    <table style="margin: 0 auto;">
      <tr class="the_tr">
        <td class="td_title">昵称：</td>
        <td>
          <span style="font-size: xx-large; color: hotpink;">
            {{info.nikeName}}
          </span>
        </td>
      </tr>
      <tr class="the_tr">
        <td class="td_title">电话：</td>
        <td>
          <el-input v-model="info.phone" :disabled="flagPhone"></el-input>
          <span @click="phoneEdit" style="cursor: pointer; margin: 0 10px; color: aqua;">{{flagPhone?'编辑':'取消'}}</span>
          <span @click="doPhone" v-show="!flagPhone" style="cursor: pointer;">提交</span>
        </td>
      </tr>
      <tr class="the_tr">
        <td class="td_title">邮箱：</td>
        <td>
          <el-input v-model="info.mail" :disabled="flagMail"></el-input>
          <span @click="mailEdit" style="cursor: pointer; margin: 0 10px; color: aqua;">{{flagMail?'编辑':'取消'}}</span>
          <span @click="doMail" v-show="!flagMail" style="cursor: pointer;">提交</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'self',
    data() {
      return {
        info: {},
        info_: {},
        flagPhone: true,
        flagMail: true,
        picUrl: '',
        picVisible: false,
        picLimit: 1,
        isShowLoader: true,
        picsNum: 0,
        uploadCount: 0,
        newPicUrl: ''
      }
    },
    activated() {
      this.$axios.get(this.$urls.user.user + '/info/' + this.$theUser.uid)
        .then((res) => {
          this.info = res.data.data
          this.info_ = () => {return res.data.data}
        })
        .catch((err) => {console.log(err)})
    },
    methods: {
      phoneEdit() {
        this.flagPhone = !this.flagPhone
      },
      mailEdit() {
        this.flagMail = !this.flagMail
      },
      doPhone() {
        // 关闭
        this.phoneEdit()
        // 没有修改
        if (this.info.phone === this.info_.phone) {
          return
        }
        // 格式验证
        if (!/^1[3456789]\d{9}$/.test(this.info.phone)) {
          this.$message("手机号码格式不正确")
          return
        }
        this.$axios.put(this.$urls.user.user + '/phone/' + this.info.uid + '/' + this.$theUser.pwd +'/' + this.info.phone).then((res) => {
          res = res.data
          if (res.status > 0) {
            // 更新本地
            this.$theUser.phone = this.info.phone
            // 更新info_
            this.info_.phone = this.info.phone
          }
          this.info.phone = this.info_.phone
        })
      },
      doMail() {
        // 关闭
        this.mailEdit()
        // 没有修改
        if (this.info.mail === this.info_.mail) {
          return
        }
        // 格式验证
        let reg = /^[\w.]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
        if (!reg.test(this.info.mail)) {
          this.$message("邮箱格式不正确")
          return
        }
        this.$axios.put(this.$urls.user.user + '/mail/' + this.info.uid + '/' + this.$theUser.pwd +'/' + this.info.mail).then((res) => {
          res = res.data
          if (res.status > 0) {
            // 更新本地
            this.$theUser.mail = this.info.mail
            // 更新info_
            this.info_.mail = this.info.mail
          }
          this.info.mail = this.info_.mail
        })
      },
      handlePreview(file) {
        this.picUrl = file.url
        this.picVisible = true
      },
      handleChange(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
        this.picsNum = fileList.length
      },
      handleRemove(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
        this.picsNum = fileList.length
      },
      handleSuccess(resp) {
        if (resp.status > 0) {
          this.newPicUrl = resp.data
        }
        else{
          // 显示失败信息
          this.$message(resp.data)
        }
        // 不管成功或失败，计数器加一
        this.uploadCount++
        if (this.uploadCount >= this.picsNum)
          this.doSubmit()
      },
      handleError(err, file, fileList) {
        this.uploadCount++
        if (this.uploadCount >= this.picsNum)
          this.doSubmit()
        this.$message(err)
        // 防报错
        fileList
      },
      submit() {
        this.$refs.uploader.submit()
      },
      doSubmit() {
        this.$axios.put(this.$urls.user.user + '/photo', {
          uid: this.info.uid,
          pwd: this.$theUser.pwd,
          photo: this.newPicUrl
        }).then((res) => {
          res = res.data
          if (res.status > 0)
            // 更新本地
            this.$theUser.photo = this.info.newPicUrl
            // 更新info
            this.info.photo = this.info.newPicUrl
        })
      }
    }
  }
</script>

<style>
  .td_title {
    text-align: right;
    padding-right: 15px;
  }
  
  .the_tr {
    border-bottom: 1px solid #000000;
  }
  
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
