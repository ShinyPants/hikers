<template>
  <div class="div_css">
    <!-- 标题 -->
    <div>
      <el-row :gutter="24">
        <el-col :span="20"><el-input v-model="topic.sname" placeholder="景区名称" clearable></el-input></el-col>
        <el-col :span="20"><el-input v-model="topic.address" placeholder="景区地址" clearable></el-input></el-col>
        <el-col :span="2"><el-button @click="submit" round type="success" icon="el-icon-upload">发布</el-button></el-col>
      </el-row>
    </div>
    <!-- 内容 -->
    <div>
      <el-input v-model="topic.info"
        maxlength="300"
        type="textarea"
        :autosize="{minRows:2, maxRows:10}"
        resize="none"
        placeholder="景区介绍"
        clearable>
      </el-input>
      <div style="text-align: right;"><span>字数：{{topic.info.length}} / 300</span></div>
    </div>
    <!-- 图片 -->
    <div class="div_pic">
      <el-upload ref="uploader"
        :action="purl"
        :auto-upload="false"
        :limit="picLimit"
        list-type="picture-card"
        accept=".png, .jpg, .jpeg, .gif"
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
          sname: '',
          address: '',
          info: '',
          pics: [],
        },
        picUrl: '',
        picVisible: false,
        picLimit: 9,
        isShowLoader: true,
        picsNum: 0,
        uploadCount: 0,
        subSuccess: false,
        purl: 'http://127.0.0.1:8081/file/admpic'
      }
    },
    mounted() {
    },
    activated() {
      if (this.subSuccess === true)
        this.reset()
    },
    methods: {
      submit() {
        // 去除空格
        this.topic.sname = this.topic.sname.trim()
        this.topic.info = this.topic.info.trim()
        // 检查数据
        if (this.topic.sname.length===0) {
          this.$message("标题不能为空")
          return false
        }
        if (this.topic.address.length===0) {
          this.$message("内容不能为空")
          return false
        }
        if (this.topic.info.length===0) {
          this.$message("内容不能为空")
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
        this.$axios.post('/adm/sight', this.topic)
          .then(res => {
            res = res.data
            if (res.status > 0) {
              this.$message("发布成功")
              this.subSuccess = true
            }
            else
              this.$message("发布失败")
            this.goBack()
          })
          .catch(err => {
            this.$message("发布失败")
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
    overflow-y: scroll;
  }
  
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  
  .div_pic {
    text-align: center;
  }
</style>
