<template>
  <div class="div_css">
    <!-- 标题 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="18"><el-input v-model="build.title" placeholder="请输入标题"></el-input></el-col>
        <el-col :span="4"><el-button @click="submit" round>发布</el-button></el-col>
      </el-row>
    </div>
    <!-- 内容 -->
    <div>
      <el-input v-model="build.info"
        maxlength="300"
        type="textarea"
        :autosize="{minRows:2, maxRows:10}"
        placeholder="写点什么吧...">
      </el-input>
      <div style="text-align: right;"><span>字数：{{build.info.length}} / 300</span></div>
    </div>
    <!-- 图片 -->
    <div class="div_pic">
      <el-upload ref="uploader"
        :action="$urls.file.pic"
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
        build: {
          title: '',
          info: ''
        },
        picUrl: '',
        picVisible: false,
        picLimit: 9,
        isShowLoader: true
      }
    },
    methods: {
      submit() {
        this.$refs.uploader.submit()
      },
      handlePreview(file) {
        this.picUrl = file.url
        this.picVisible = true
      },
      handleChange(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
      },
      handleRemove(file, fileList) {
        this.isShowLoader = fileList.length < this.picLimit
      },
      handleSuccess(resp, file, fileList) {
        // 一张一张上传的，所以要确定图片顺序
        console.log("haha", resp)
        console.log(fileList.indexOf(file))
      },
      handleError(err, file, fileList) {
        console.log(err)
        console.log(fileList)
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
