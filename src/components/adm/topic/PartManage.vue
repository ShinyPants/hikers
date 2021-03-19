<template>
  <div>
    <div>
      <el-button type="primary" round @click="doAdd()">添加</el-button>
      <el-button type="success" round @click="doEdit()">修改</el-button><br>
      分区名称：<input v-model="epart.name" />
      分区权重：<input v-model="epart.score" type="number" />
    </div>
    <el-table :data="parts" stripe style="width: 100%;">
      <!-- <el-table-column prop="picUrl" label="分区图标"></el-table-column> -->
      <el-table-column prop="name" label="分区名称"></el-table-column>
      <el-table-column prop="score" label="分区权重"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editRow(scope.$index)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'partmanage',
    data() {
      return {
        parts: [],
        epart: {
          id: 0,
          picUrl: '',
          name: '',
          score: 0
        }
      }
    },
    created() {
      this.$axios.get('/api/parts').then((res)=>{
        res = res.data
        this.parts = res.data
      })
    },
    methods: {
      editRow(index) {
        this.epart = this.parts[index]
      },
      doAdd() {
        if (!this.checkPart()) {
          return
        }
        this.$axios.post("/adm/parts", this.epart).then(()=>{this.refresh()})
      },
      doEdit() {
        if (!this.checkPart()) {
          return
        }
        this.$axios.put("/adm/parts", this.epart).then(()=>{this.refresh()})
      },
      checkPart() {
        console.log(this.epart.name.trim().length)
        if (this.epart.name.trim().length === 0) {
          alert("名字不能为空")
          return false
        }
        return true
      },
      refresh() {
        this.$axios.get('/api/parts').then((res)=>{
          res = res.data
          this.parts = res.data
        })
      }
    }
  }
</script>

<style>
</style>
