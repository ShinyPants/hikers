<template>
  <div id="my_topic" style="overflow-y: scroll; height: 100%;" ref="dddiv">
    <div v-for="(t,index) in topics" :key="t.tid">
      <div style="text-align: right;">
        <span @click="doDel(t.tid, index)" style="cursor: pointer; color: red; float: right;">删除</span>
      </div>
      <TopicCard v-bind:topic="t"></TopicCard>
    </div>
    <mugen-scroll :handler="loadBottom" :should-handle="!loading" scrollContainer="dddiv">
      <el-divider>{{!stopLoading?'正在加载中':'已经到底啦'}}</el-divider>
    </mugen-scroll>
  </div>
</template>

<script>
  import TopicCard from '../FocusTopicCard.vue'
  import MugenScroll from 'vue-mugen-scroll'

  export default {
    name: 'topic',
    components: {
      TopicCard,
      MugenScroll
    },
    data() {
      return {
        topics: [],
        loading: false,
        stopLoading: false
      }
    },
    activated() {
      this.init()
    },
    methods: {
      init() {
        let uid = this.$theUser.uid
        this.$axios.get(this.$urls.user.part.topics + '/' + uid + '/0')
          .then((res) => {
            res = res.data
            this.handlePicUrl(res.data)
            this.topics = res.data
            if (res.data.length < this.$config.loadNum)
              this.stopLoading = true
          })
          .catch((err) => {
            console.log(err)
          })
      },
      loadBottom() {
        if (this.topics.length < this.$config.loadNum || this.stopLoading == true)
          return
        this.loading = true
        let uid = this.$theUser.uid
        this.$axios.get(this.$urls.user.part.topics + '/' + uid + '/' + this.topics[this.topics.length - 1].tid)
          .then((res) => {
            res = res.data
            this.handlePicUrl(res.data)
            this.topics = this.topics.concat(res.data)
            if (res.data.length < this.$config.loadNum)
              this.stopLoading = true
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
          })
      },
      handlePicUrl(topics) {
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].pics === null) continue;
          for (let j = 0; j < topics[i].pics.length; j++) {
            topics[i].pics[j] = this.$urls.server + topics[i].pics[j]
          }
        }
      },
      doDel(tid, index) {
        this.$axios.delete(this.$urls.user.part.topics, {params: {
          tid: tid,
          uid: this.$theUser.uid,
          pwd: this.$theUser.pwd
        }})
          .then(() => {
            this.$message("删除成功")
            // 在数组中删除
            this.topics.splice(index, 1)
          })
          .catch((err) => {
            this.$message("删除失败")
            console.log(err)
          })
      }
    }
  }
</script>

<style>
</style>
