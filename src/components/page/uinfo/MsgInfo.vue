<template>
  <div style="width: 100%;">
    <el-row style="width: 100%;">
      <el-col :span="2">
        <img v-if="tuser.uid === msg.fuid" :src="$urls.server + tuser.photo" style="width: 50px; height: 50px; border-radius: 50%;"/>
      </el-col>
      <el-col :span="20">
        <span :style="{float: tuser.uid === msg.fuid ? 'left':'right'}" class="info">
          {{msg.info}}
        </span>
      </el-col>
      <el-col :span="2">
        <img v-if="fuser.uid === msg.fuid" :src="$urls.server + fuser.photo" style="width: 50px; height: 50px; border-radius: 50%;"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'msginfo',
    props: ['fuser', 'tuser', 'msg']
  }
</script>

<style>
  .info {
    max-width: 450px;
    margin: 15px;
    padding: 15px;
    border-radius: 10px;
    background-color: aqua;
    text-align: left;
  }
</style>
