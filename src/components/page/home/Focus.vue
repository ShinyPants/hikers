<template>
	<div ref="dddiv" style="height: 100%; overflow: scroll;">
    <TopicCard v-for="t in topics" :key="t.tid" v-bind:topic="t"></TopicCard>
    <mugen-scroll :handler="loadBottom" :should-handle="!loading" scrollContainer="dddiv">
      <el-divider>{{!stopLoading?'正在加载中':'已经到底啦'}}</el-divider>
    </mugen-scroll>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TopicCard from './FocusTopicCard.vue'
  import MugenScroll from 'vue-mugen-scroll'
  
	export default {
    name: 'focus',
    components: {
      TopicCard,
      MugenScroll
    },
    data() {
      return {
        uid: 0,
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
        this.loading = false
        this.stopLoading = false
        if (this.$dynamics === undefined || this.$dynamics === null || this.$dynamics.length === 0)
          this.refresh()
        else
          this.topics = this.$dynamics
      },
      // 必须实现这个函数
      refresh() {
        this.uid = this.$theUser.uid
        this.$axios.get(this.$urls.user.dynamic, {params: {uid: this.uid, tid: 0}})
          .then((res) => {
            res = res.data
            this.handlePicUrl(res.data)
            Vue.prototype.$dynamics = res.data
            this.topics = res.data
            if (res.data.length < this.$config.loadNum)
              this.stopLoading = true
          })
          .catch((err) => {console.log(err)})
      },
      loadBottom() {
        if (this.topics.length < this.$config.loadNum || this.stopLoading == true)
          return
        this.loading = true
        this.$axios.get(this.$urls.user.dynamic, {params: {uid: this.uid, tid: this.topics[this.topics.length - 1].tid}})
          .then((res) => {
            res = res.data
            this.handlePicUrl(res.data)
            this.topics = this.topics.concat(res.data)
            Vue.prototype.$dynamics = this.topics
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
      }
    }
	}
</script>

<style>
</style>
