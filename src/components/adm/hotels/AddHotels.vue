<template>
  <div>
    <el-button @click="doClick" style="float: right;" type="success" round>提交</el-button>
    临近景区：<el-select v-model="hotel.sid" placeholder="请选择">
      <el-option v-for="(s, index) in sights" :key="index" :label="s.sname" :value="s.sid"></el-option>
    </el-select>
    <br>
    酒店名：<input v-model="hotel.hname" />
    <br>
    地址：<input v-model="hotel.address" />
    <br>
    简介：<input v-model="hotel.info" maxlength="300" />
    <div>
      房间类型：<input v-model="room.roomtype" />
      数量：<el-select v-model="room.num">
        <el-option v-for="index in 20" :key="index"
        :label="index"
        :value="index"></el-option>
      </el-select>
      单价：<input v-model="room.price" />
      <el-button @click="addRoom" type="text" round>+添加</el-button>
      <br>
      <div v-for="(r, index) in hotel.rooms" :key="index">
        <el-button @click="delRoom(index)" type="text" round>-删除</el-button>
        &nbsp;&nbsp;&nbsp;
        {{r.roomtype}}
        &nbsp;&nbsp;&nbsp;
        {{r.num}}
        &nbsp;&nbsp;&nbsp;
        {{r.price}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sights: [],
        hotel: {
          sid: 0,
          hname: '',
          address: '',
          info: '',
          rooms: []
        },
        room: {
          roomtype: '',
          num: 1,
          price: 100
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
    methods: {
      doClick() {
        if (this.hotel.sid === 0) {
          this.$message("需要选择附近景区")
          return
        }
        if (this.hotel.hname.trim().length === 0) {
          this.$message("需要填写酒店名")
          return
        }
        if (this.hotel.address.trim().length === 0) {
          this.$message("需要填写酒店地址")
          return
        }
        if (this.hotel.info.trim().length === 0) {
          this.$message("需要填写酒店介绍")
          return
        }
        this.$axios.post('/adm/hotel', this.hotel)
        .then(()=>{
          this.$message("添加成功")
        })
        .catch((err)=>{
          console.log(err)
          this.$message("添加失败")
        })
      },
      addRoom() {
        let r = {
          roomtype: this.room.roomtype,
          num: this.room.num,
          price: this.room.price
        }
        this.hotel.rooms.push(r)
      },
      delRoom(index) {
        this.hotel.rooms.splice(index, 1)
      }
    }
  }
</script>

<style>
</style>
