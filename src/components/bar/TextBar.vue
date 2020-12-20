<template>
  <el-row :style="backStyle" type="flex" class="cls_row" justify="space-around">
    <el-col
      :span="3"
      v-for="(item, index) in titles"
      :key="item.titles"
      class="cls_col"
      :style="select===index?slctStyle:itemStyle"
      @click.native="handleSelect(index)"
    >
      <span>{{item}}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "textbar",
  props: {
    titles: {
      type: Array,
    },
    backStyle: {},
    itemStyle: {},
    slctStyle: {},
  },
  data() {
    return {
      select: -1,
    };
  },
  methods: {
    handleSelect(key) {
      if (this.select === key) {
        this.$emit("again", key);
        return;
      }
      this.select = key;
      this.$emit("change", key);
    },
  },
};
</script>

<style>
.cls_row {
  text-align: center;
}
.cls_col {
  cursor: pointer;
}
</style>