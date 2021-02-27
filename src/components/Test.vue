<template>
  <div id="thediv" style="overflow: scroll;" ref="dddiv">
    <div v-for="(item, index) in list" :key="index" style="background-color: #5188A6; height: 100px;">
      {{item}}{{index}}
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading" scrollContainer="dddiv">
      loading...
    </mugen-scroll>
  </div>
</template>

<script>
  import MugenScroll from 'vue-mugen-scroll'
  
  export default {
    name: "thetest",
    components: {MugenScroll},
    data() {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        loading: false
      }
    },
    mounted() {
      
    },
    methods: {
      fetchData() {
        console.log("fetchData")
        this.loading = true
        let st = this.list[this.list.length - 1]
        let ed = st + 15
        for (let i = st + 1; i < ed; i++) {
          this.list.push(i)
        }
        console.log(this.list.length)
        this.loading = false
      }
    }
  }
</script>

<style>
</style>
