<template>
  <div>
    <div>
      
      景区名：<input v-model="sight.sname" />
      <el-button @click="doEdit" type="success" round>确认修改</el-button><br>
      景区地址：<input v-model="sight.address" /><br>
      景区介绍：<br>
      <el-input v-model="sight.info"
        maxlength="300"
        type="textarea"
        :autosize="{minRows:2, maxRows:10}"
        resize="none"
        placeholder="写点什么吧..."
        clearable>
      </el-input>
    </div>
    <div>
      <el-table :data="sights" border>
        <el-table-column
          prop="sname" label="景区名"></el-table-column>
        <el-table-column
          prop="address" label="景区地址"></el-table-column>
        <el-table-column
          prop="info" label="景区介绍"></el-table-column>
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
        sight: {
          sid: 0,
          sname: '',
          info: '',
          address: '',
          pics: ''
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
      refresh() {
        this.$axios.get('/api/sight')
        .then((res)=>{
          res = res.data
          this.sights = res.data
        })
      },
      startEdit(row) {
        this.sight = row
      },
      doEdit() {
        if (this.sight.sid === 0) {
          return
        }
        this.$axios.put('/adm/sight', this.sight)
        .then(()=>{
          this.refresh()
        })
      }
    }
  }
</script>

<style>
</style>
