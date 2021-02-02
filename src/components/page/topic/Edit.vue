<template>
  <div class="div_css">
    <!-- 标题 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="18"><el-input v-model="topic.title" placeholder="请输入标题"></el-input></el-col>
        <el-col :span="4"><el-button @click="submit" round>发布</el-button></el-col>
      </el-row>
    </div>
    <!-- 内容 -->
    <div>
      <el-input v-model="topic.info"
        maxlength="300"
        type="textarea"
        :autosize="{minRows:2, maxRows:10}"
        placeholder="写点什么吧...">
      </el-input>
      <div style="text-align: right;"><span>字数：{{topic.info.length}} / 300</span></div>
    </div>
    <!-- 图片 -->
    <div class="div_pic">
      <el-upload ref="uploader"
        :action="$urls.file.pic"
        :auto-upload="false"
        :limit="picLimit"
        list-type="picture-card"
        accept=".png, .jpg, .jpeg, .gif"
        :data="{uid: topic.uid, pwd: topic.pwd}"
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        topic: {
          title: '',
          pid: 0,
          info: '',
          pics: [],
          uid: 0,
          pwd: ''
        },
        picUrl: '',
        picVisible: false,
        picLimit: 9,
        isShowLoader: true,
        picsNum: 0,
        uploadCount: 0,
        subSuccess: false
      }
    },
    mounted() {
      this.getInfo()
    },
    activated() {
      this.getInfo()
      if (this.subSuccess === true)
        this.reset()
    },
    methods: {
      getInfo() {
        // 获取用户名和密码
        this.topic.uid = this.$theUser.uid
        this.topic.pwd = this.$theUser.pwd
        this.topic.pid = this.$route.params.partId
      },
      reset() {
        // 重置数据
        this.topic.title = ''
        this.topic.info = ''
        this.topic.pics = []
        this.picsNum = 0
        this.uploadCount = 0
        this.subSuccess = false
      },
      submit() {
        // 检查数据
        if (this.topic.title.split().length===0) {
          this.$message("标题不能为空")
          return false
        }
        if (this.topic.info.split().length===0) {
          this.$message("内容不能为空")
          return false
        }
        if (this.topic.pid === 0) {
          this.$message("未知错误")
          return false
        }
        if (this.topic.uid <= 0) {
          this.$message("请先登录")
          this.$router.replace("/login")
          return false
        }
        // 检查图片数量
        if (this.picsNum === 0 || this.uploadCount >= this.picsNum) {
          this.doSubmit()
          return
        }
        // 设置用来保存图片url的数组长度
        this.topic.pics = new Array(this.picsNum)
        this.$refs.uploader.submit()
      },
      goBack() {
        this.$router.back()
      },
      doSubmit() {
        this.$axios.post(this.$urls.user.topic, this.topic)
          .then(res => {
            res = res.data
            if (res.status > 0) {
              this.$message("提交成功")
              this.subSuccess = true
            }
            else
              this.$message("提交失败")
            this.goBack()
          })
          .catch(err => {
            this.$message("提交失败")
            this.goBack()
            err
          })
      },
      handlePreview(file) {
        this.picUrl = file.url
        this.picVisible = true
      },
      // 增加选择的图片
      handleChange(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
        this.picsNum = fileList.length
      },
      // 删除选择的图片
      handleRemove(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
        this.picsNum = fileList.length
      },
      handleSuccess(resp, file, fileList) {
        // 一张一张上传的，所以要确定图片顺序
        if (resp.status > 0) {
          this.topic.pics[fileList.indexOf(file)] = resp.data
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
      }
    }
  }
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }
  
  .div_css {
    height: 100%;
    overflow-x: none;
    overflow-y: scroll;
  }
  
  .div_pic {
    text-align: center;
  }
</style>
