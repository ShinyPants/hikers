<template>
  <div>
    <el-table :data="orders" border>
      <el-table-column
        prop="hname" label="酒店名"></el-table-column>
      <el-table-column
        prop="roomtype" label="房间类型"></el-table-column>
      <el-table-column
        prop="sttime" label="入住时间"></el-table-column>
      <el-table-column
        prop="edtime" label="离开时间"></el-table-column>
      <el-table-column
        prop="person" label="入住人员">
        <template slot-scope="scope">
          <span v-for="(p, index) in scope.row.person" :key="index">
            姓名：{{p.pname}}<br>证件号：{{p.cardid}}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uid: 0,
        orders: []
      }
    },
    activated() {
      // 获取自己的uid
      this.uid = this.$theUser.uid
      this.$axios.get('/api/order/mine/' + this.uid)
      .then((res)=>{
        res = res.data
        // res.data.person = JSON.parse(res.data.personJSON)
        this.orders = res.data
      })
    }
  }
</script>

<style>
</style>
