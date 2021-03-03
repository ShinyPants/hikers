<template>
  <div style="cursor: pointer; display: inline;" @click="toPage">
    <i class="el-icon-message"></i>私信
  </div>
</template>

<script>
  export default {
    name: 'msg-button',
    props: {
      tid: {
        type: Number
      }
    },
    methods: {
      toPage() {
        this.$router.push("/me/msgedit/" + this.tid).catch((err) => {console.log(err)})
      }
    }
  }
</script>

<style>
</style>
