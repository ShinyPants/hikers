<template>
  <div>
    <div style="width: 80%; margin: 0 auto;">
      <!-- 选择原因 -->
      <div style="padding-top: 10px; padding-bottom: 10px;">
        <el-radio v-model="report.reason" label="内容包含敏感信息">内容包含敏感信息</el-radio>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">
        <el-radio v-model="report.reason" label="内容投递板块错误">内容投递板块错误</el-radio>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">
        <el-radio v-model="report.reason" label="内容与他人撞车">内容与他人撞车</el-radio>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">
        <el-radio v-model="report.reason" label="图片含有敏感信息">图片含有敏感信息</el-radio>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">
        <el-radio v-model="report.reason" label="图片与他人撞车">图片与他人撞车</el-radio>
      </div>
      <!-- 编辑详情 -->
      <el-input type="textarea" :rows="2" placeholder="请输入详情以帮助我们净化社区环境" v-model="report.info"></el-input>
      <!-- 按钮 -->
      <div style="padding-top: 15px;">
        <el-button @click="doSubmit" type="success" round size="medium" style="margin: 0 auto; display: block;">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        report: {
          tid: 0,
          uid: 0,
          reason: '',
          info: ''
        }
      }
    },
    created() {
      let tid = this.$route.params.tid
      let uid = this.$route.params.uid
      this.report.tid = tid
      this.report.uid = uid
    },
    methods: {
      doSubmit() {
        if (this.report.reason.length === 0) {
          this.$message("请选择举报类型")
          return
        }
        if (this.report.info.trim().length === 0) {
          this.$message("请输入详情")
          return
        }
        this.report.info = this.report.info.trim()
        this.$axios.post('/api/report', this.report)
        .then(()=>{
          this.$message("感谢您为净化社区环境所作出的贡献")
          this.$router.back()
        })
      }
    }
  }
</script>

<style>
</style>
