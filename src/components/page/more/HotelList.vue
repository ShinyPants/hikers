<template>
  <div style="overflow-y: scroll;">
    临近景区：<el-select v-model="sid" @change="doChange" placeholder="请选择">
      <el-option v-for="(s, index) in sights" :key="index" :label="s.sname" :value="s.sid"></el-option>
    </el-select>
    <div>
      <div v-for="h in hotels" :key="h.hid"
        style="background-color: beige; border-radius: 15px; padding: 10px;">
        <el-button @click="doOrderHotel(h.hid)" type="success" round style="float: right;">预定</el-button>
        <h1>{{h.hname}}</h1>
        <h3>{{h.info}}</h3>
        <h5>地址：{{h.address}}</h5>
        <el-table :data="h.rooms" border>
          <el-table-column prop="roomtype" label="房型"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sights: [],
        hotels: [],
        sid: undefined
      }
    },
    created() {
      this.$axios.get('/api/sight')
      .then((res)=>{
        res = res.data
        this.sights = res.data
      })
      let sid = this.$route.params.sid
      if (sid !== undefined) {
        this.sid = sid
        this.doChange(sid)
      }
    },
    methods: {
      doChange(n) {
        this.$axios.get('/api/hotel/' + n)
        .then((res)=>{
          res = res.data
          for (let i of res.data) {
            i.rooms = JSON.parse(i.rooms)
          }
          this.hotels = res.data
        })
      },
      doOrderHotel(hid) {
        this.$router.push('/orderhotel/' + hid)
      }
    }
  }
</script>

<style>
</style>
