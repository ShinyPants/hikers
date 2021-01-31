<template>
  <div>
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
        searchStr: ''
      }
    },
    created() {
      // 初始化数据
    },
    mounted() {
      // 执行什么呢？
    },
    methods: {
      doSearch() {
        alert(this.searchStr)
      },
      doEdit() {
        this.$router.push('/edit').catch(err => err)
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
