<template>
  <div>
    <el-button @click="doSub" style="float: right;" type="success" round>提交</el-button>
    <h1>{{hotel.hname}}</h1>
    <h3>{{hotel.info}}</h3>
    <h5>地址：{{hotel.address}}</h5>
    请选择房间类型：<el-select v-model="order.roomtype" placeholder="请选择">
      <el-option
        v-for="(r,index) in hotel.rooms" :key="index"
        :value="r.roomtype"
        :label="r.roomtype">
      </el-option>
    </el-select><br>
    请选择入住日期：<el-date-picker
      v-model="order.livetime"
      type="datetimerange"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="center"></el-date-picker><br>
    请添加入住人员：<input v-model="ps.pname" placeholder="姓名" />
    <input v-model="ps.cardid" placeholder="身份证号" />
    <el-button @click="addPerson" type="text">添加</el-button><br>
    <div v-for="(p, index) in order.person" :key="index">
      <el-button @click="delPerson(i)" type="text">删除</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {{p.pname}}
      {{p.cardid}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hotel: {},
        roomtype: '',
        order: {
          hid: 0,
          uid: this.$theUser.uid,
          roomtype: '',
          livetime: [],
          person: []
        },
        ps: {
          pname: '',
          cardid: ''
        }
      }
    },
    created() {
      let hid = this.$route.params.hid
      this.order.hid = hid
      this.$axios.get('/api/hotel/one/' + hid)
      .then((res)=>{
        res = res.data
        res.data.rooms = JSON.parse(res.data.rooms)
        this.hotel = res.data
      })
    },
    methods: {
      addPerson() {
        // 检查姓名
        if (this.ps.pname.trim().length === 0) {
          this.$message("姓名不能为空")
          return
        }
        // 检查身份号
        if (this.ps.cardid.trim().length === 0) {
          this.$message("身份证号不能为空")
          return
        }
        // 检查格式
        let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!p.test(this.ps.cardid.trim())) {
          this.$message("身份证号格式不正确")
          return
        }
        
        this.ps.pname = this.ps.pname.trim()
        this.ps.cardid = this.ps.cardid.trim()
        this.order.person.push(this.ps)
      },
      delPerson(i) {
        this.order.person.splice(i, 1)
      },
      doSub() {
        // 检查房间类型
        if (this.order.roomtype.length === 0) {
          this.$message("房间类型不能为空")
          return
        }
        // 检查入住时间
        if (this.order.livetime.length === 0) {
          this.$message("入住时间不能为空")
          return
        }
        // 检查入住人数
        if (this.order.person.length === 0) {
          this.$message("请添加入住用户")
          return
        }
        // 提交订单
        this.$axios.post('/api/order', this.order)
        .then(()=>{
          this.$message("提交成功")
          this.$router.back()
        })
        .catch((err)=>{
          console.log(err)
          this.$message("提交失败")
        })
      }
    }
  }
</script>

<style>
</style>
