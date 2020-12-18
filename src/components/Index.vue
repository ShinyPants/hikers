<template>
  <div>
    这是index页面
    <PicBar
      :pics="pics"
      @selected="changePage"
			:picSize="100">
    </PicBar>
    {{selected}}项被选中了
  </div>
</template>

<script>
import PicBar from './bar/PicBar'

export default {
  name: 'index',
  components: {
    PicBar: PicBar
  },
  data: function() {
    return {
      pics: [
        {
          defaultPic: "/images/logo.png",
          selectedPic: "hehe"
        },
        {
          defaultPic: "/images/logo.png",
          selectedPic: "hehe"
        },
        {
          defaultPic: "/images/logo.png",
          selectedPic: "hehe"
        }
      ],
      selected: -1
    }
  },
  methods: {
    changePage(key) {
      this.selected = key
    }
  }
}
</script>

<style>

</style>