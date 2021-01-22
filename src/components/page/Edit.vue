<template>
  <div>
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
        }
      }
    },
    methods: {
      submit() {
      }
    }
  }
</script>

<style>
</style>
