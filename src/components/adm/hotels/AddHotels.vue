<template>
  <div>
    先选择景区，再填写其他内容
    临近景区：<el-select v-model="hotel.sid" placeholder="请选择">
      <el-option v-for="(s, index) in sights" :key="index" :label="s.sname" :value="s.sid"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sights: [],
        hotel: {
          sid: 0
        }
      }
    },
    created() {
      this.$axios.get('/api/sight')
      .then((res)=>{
        res = res.data
        this.sights = res.data
      })
    },
  }
</script>

<style>
</style>
