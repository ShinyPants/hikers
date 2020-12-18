<template>
  <div>
    这是index页面
    <PicBar
      :pics="pics"
      @change="changePage"
      @again="again">
    </PicBar>
    {{selected}}项被选中了<br>
    <img src="favicon.ico" alt="">
  </div>
</template>

<script>
import PicBar from './bar/PicBar'
import {icons} from '../config/barconfig'

export default {
  name: 'index',
  components: {
    PicBar
  },
  data: function() {
    return {
      pics: icons,
      selected: -1
    }
  },
  methods: {
    changePage(key) {
      this.selected = key
    },
    again(key) {
      alert("是要刷新么" + key)
    }
  }
}
</script>

<style>

</style>