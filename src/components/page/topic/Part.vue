<template>
  <div>
    <div style="text-align: center;"><span>{{partName}}</span><span>欢迎您~</span></div>
    <!-- 顶端的编辑菜单 -->
    <div class="div_top">
      <el-input style="width: 80%;" placeholder="板块内搜索" v-model="searchStr">
        <i @click="doSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="doEdit" class="btn_edit" type="primary" icon="el-icon-edit"></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'part',
    data() {
      return {
        searchStr: '',
        partId: '',
        partName: ''
      }
    },
    activated() {
      if (this.partId !== this.$route.params.partId)
        this.refresh()
    },
    methods: {
      doSearch() {
        alert(this.searchStr)
      },
      doEdit() {
        this.$router.push('/edit/' + this.partId).catch(err => err)
      },
      refresh() {
        // 从url获取参数
        this.partId = this.$route.params.partId
        this.partName = this.$route.params.partName
        // 获取分区的内容
      }
    }
  }
</script>

<style>
  .div_top {
    margin: 10px;
  }

  .btn_edit {
    float: right;
  }
</style>
