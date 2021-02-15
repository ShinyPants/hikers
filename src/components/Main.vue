<template>
  <div id="umain" style="height: 100%;">
    <keep-alive>
      <router-view :class="{'wide_mode': isWide}" class="rview"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "umain",
    data() {
      return {
        wWidth: 0,
        wHeight: 0
      }
    },
    created() {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.wWidth = document.documentElement.clientWidth
        this.wHeight = document.documentElement.clientHeight
      }
    },
    computed: {
      isWide: function() {
        return this.wHeight < this.wWidth
      }
    }
  }
</script>

<style>
  #umain {
    height: 100%;
    background-image: url('/images/backpic.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  
  .rview {
    background-color: antiquewhite;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  
  .wide_mode {
    max-width: 800px;
  }
</style>
