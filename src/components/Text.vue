<template>
  <div>
    这是index页面
    <PicBar :pics="pics" @change="changePage" @again="again"></PicBar>
    <TextBar
      :titles="titles"
      @change="changePage"
      @again="again"
      :slctStyle="{'background-color':'red'}"
    ></TextBar>
    {{selected}}项被选中了
    <br />
    <img src="favicon.ico" alt />
  </div>
</template>

<script>
import PicBar from "./bar/PicBar";
import TextBar from "./bar/TextBar";
import { icons } from "../config/barconfig";

export default {
  name: "index",
  components: {
    PicBar,
    TextBar,
  },
  data: function () {
    return {
      pics: icons,
      selected: -1,
      titles: ["哈哈", "呵呵"],
    };
  },
  methods: {
    changePage(key) {
      this.selected = key;
    },
    again(key) {
      alert("是要刷新么" + key);
    },
  },
};
</script>

<style>
</style>