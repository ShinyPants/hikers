<template>
	<div>
    <TopicCard v-for="t in topics" :key="t.tid" v-bind:topic="t"></TopicCard>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TopicCard from './FocusTopicCard.vue'
  
	export default {
    name: 'focus',
    components: {
      TopicCard
    },
    data() {
      return {
        uid: 0,
        topics: []
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        if (this.$dynamics === undefined)
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
          })
          .catch((err) => {console.log(err)})
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
