<template>
  <div style="overflow-y: scroll;">
    <div v-for="(s, index) in sights" :key="index"
      style="background-color: aliceblue; border-radius: 15px;">
      <el-button @click="doOrderHotel(index)" style="float: right;" type="success" round>预定酒店</el-button>
      <h1>{{s.sname}}</h1>
      <h3>{{s.info}}</h3>
      <span>地址：{{s.address}}</span>
      <div v-for="(p, i) in s.pics" :key="i">
        <img :src="'http://127.0.0.1:8081' + p"
          style="width: 90%; margin: 0 auto; display: block;"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sights: []
      }
    },
    created() {
      this.$axios.get('/api/sight')
      .then((res)=>{
        res = res.data
        this.sights = res.data
      })
    },
    methods: {
      doOrderHotel(index) {
        let sid = this.sights[index].sid
        this.$router.push('/hotels/' + sid)
      }
    }
  }
</script>

<style>
</style>
