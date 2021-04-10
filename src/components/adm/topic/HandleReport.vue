<template>
  <div>
    <el-table :data="reportList" stripe>
      <el-table-column label="被举报链接">
        <template slot-scope="scope">
          <el-button @click="lookTopic(scope.row.tid)" type="text">{{scope.row.tid}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="发帖人">
        <template slot-scope="scope">
          <el-button @click="lookUser(scope.row.uid)" type="text">{{scope.row.uname}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="举报数量"></el-table-column>
      <el-table-column label="查看详情">
        <template slot-scope="scope">
          <el-button @click="lookInfo(scope.row.tid)" type="text">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="setNormal(scope.row.tid)" type="success">正常</el-button>
          <el-button @click="delTopic(scope.row.tid)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reportList: []
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh() {
        this.$axios.get('/adm/report/list')
        .then((res)=>{
          res = res.data
          this.reportList = res.data
        })
      },
      lookTopic(tid) {
        this.$router.push('/adm/tinfo/' + tid)
      },
      lookUser(uid) {
        this.$router.push('/space/' + uid)
      },
      lookInfo(tid) {
        this.$router.push('/adm/tinfo/' + tid)
      },
      setNormal(tid) {
        this.$axios.delete('/adm/report/' + tid)
        .then(() => {
          this.refresh()
        })
      },
      delTopic(tid) {
        this.$axios.delete('/adm/topic' + tid)
        this.setNormal(tid)
      }
    }
  }
</script>

<style>
</style>
