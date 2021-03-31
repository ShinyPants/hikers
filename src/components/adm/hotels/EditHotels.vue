<template>
  <div>
    <div>
      临近景区：<el-select v-model="hotel.sid" placeholder="请选择">
        <el-option v-for="(s, index) in sights" :key="index" :label="s.sname" :value="s.sid"></el-option>
      </el-select>
      酒店名：<input v-model="hotel.hname" />
      酒店地址：<input v-model="hotel.address" />
      酒店介绍：<input v-model="hotel.info" />
      <el-button @click="doClick" style="float: right;" type="success" round>提交</el-button><br>
      酒店房间：房间类型：<input v-model="room.roomtype" />
      数量：<el-select v-model="room.num">
        <el-option v-for="index in 20" :key="index"
        :label="index"
        :value="index"></el-option>
      </el-select>
      单价：<input v-model="room.price" />
      <el-button @click="addRoom" type="text" round>+添加</el-button>
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
    <div>
      <el-table :data="hotels" border>
        <el-table-column
          prop="hname" label="酒店名"></el-table-column>
        <el-table-column
          prop="address" label="酒店地址"></el-table-column>
        <el-table-column
          prop="info" label="酒店介绍"></el-table-column>
        <el-table-column
          prop="rooms" label="酒店房间">
          <template slot-scope="scope">
            <span v-for="(r, index) in scope.row.rooms" :key="index">
              <span>{{r.roomtype}}&nbsp;<span style="color: indianred;">数量：{{r.num}}</span>&nbsp;<span style="color: blueviolet;">价格：{{r.price}}</span></span><br>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="startEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sights: [],
        hotels: [],
        hotel: {
          hid: 0,
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
      this.refresh()
    },
    methods: {
      refresh() {
        this.$axios.get("/api/hotel")
        .then((res)=>{
          res = res.data
          for (let i of res.data) {
            i.rooms = JSON.parse(i.rooms)
          }
          this.hotels = res.data
        })
        this.$axios.get('/api/sight')
        .then((res)=>{
          res = res.data
          this.sights = res.data
        })
      },
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
        this.$axios.put('/adm/hotel', this.hotel)
        .then(()=>{
          this.$message("添加成功")
          this.refresh()
        })
        .catch((err)=>{
          console.log(err)
          this.$message("添加失败")
        })
      },
      startEdit(row) {
        this.hotel = row
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
