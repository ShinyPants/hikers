<template>
  <div>
    <el-select v-model="pid" placeholder="先选择分区">
      <el-option
        v-for="i in parts"
        :key="i.value"
        :label="i.label"
        :value="i.value">
      </el-option>
    </el-select>
    <el-input placeholder="板块内搜索" v-model="searchStr">
      <i @click="doSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <div style="height: 100%;">
      <el-table
        :data="topics"
        height="100%"
        border
        style="width: 100%;">
        <el-table-column
          label="uid"
          prop="uid">
        </el-table-column>
        <el-table-column
          label="发帖人"
          prop="nikeName">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="内容"
          prop="info">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="doDelete(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admControlTopic',
    data() {
      return {
        searchStr: '',
        parts: [],
        topics: [],
        pid: 0
      }
    },
    created() {
      let options = []
      let p = this.$parts
      for (let i in p) {
        let item = {
          value: p[i].id,
          label: p[i].name
        }
        options.push(item)
      }
      this.parts = options
    },
    methods: {
      doSearch() {
        let pid = this.pid
        let keyWord = this.searchStr
        this.$axios.get('/api/topic/search', {
          params: {
            pid: pid,
            keyWord: keyWord
          }
        })
        .then((res) => {
          res = res.data
          // this.handlePicUrl(res.data)
          this.topics = res.data
        })
      },
      doDelete(i) {
        let tid = this.parts[i].tid
        this.$axios.delete('/adm/topic', {
          params: {
            tid: tid
          }
        })
        .then(() => {
          this.topics.splice(i, 1)
        })
      }
    }
  }
</script>

<style>
</style>
