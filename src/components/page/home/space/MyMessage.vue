<template>
  <div id="my_message">
    <MyMsg v-for="(item, index) in list" :key="index" :item="item" style="margin: 5px 0 5px 0;"></MyMsg>
  </div>
</template>

<script>
  import MyMsg from './MyMsg.vue'
  
  export default {
    name: 'message',
    components: {MyMsg},
    data() {
      return {
        uid: 0,
        list: []
      }
    },
    activated() {
      // 获取自己的uid
      this.uid = this.$theUser.uid
      // 获取列表
      this.$axios.get(this.$urls.user.msg + '/list', {params: {uid: this.uid}})
      .then((res)=>{
        res = res.data
        // 过滤重复项
        this.list = this.doSort(res.data)
      }).catch((err)=>{console.log(err)})
    },
    methods: {
      doSort(dt) {
        let lst = []
        let st = new Set()
        for (let i in dt) {
          console.log(dt[i])
          let str = ''
          if (dt[i].fuid<dt[i].tuid) {
            str = dt[i].fuid + ":" + dt[i].tuid
          } else {
            str = dt[i].tuid + ":" + dt[i].fuid
          }
          if (!st.has(str)) {
            // 不存在，添加
            lst.push(dt[i])
            st.add(str)
          }
        }
        console.log(lst)
        return lst
      }
    }
  }
</script>

<style>
</style>
