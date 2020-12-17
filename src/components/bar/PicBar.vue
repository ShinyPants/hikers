<template>
  <div>
    这是PicBar
    <br />
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item, index) in pics" :key="index" :index="index.toString()">
        <el-image
          :style="picstyle"
          :src="item.defaultPic"
          :fit="picfit"></el-image>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "picbar",
  props: {
    pics: {
      validator: function (value) {
        for (let item of value)
          if (item.defaultPic === undefined || item.selectedPic === undefined)
            return false;
        return true;
      },
    },
    picstyle: {
      default: function() {
        return {
          width: "50px",
          height: "50px"
        }
      },
    },
    picfit: {
      default: "fill",
    },
  },
  methods: {
    handleSelect(key) {
      this.$emit('selected', key)
    }
  }
};
</script>

<style>
</style>