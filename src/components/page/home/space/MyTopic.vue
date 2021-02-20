<template>
  <div id="my_topic">
    <div v-for="(t,index) in topics" :key="t.tid">
      <div style="text-align: right;">
        <span @click="doDel(t.tid, index)" style="cursor: pointer; color: red; float: right;">删除</span>
      </div>
      <TopicCard v-bind:topic="t"></TopicCard>
    </div>
  </div>
</template>

<script>
  import TopicCard from '../FocusTopicCard.vue'

  export default {
    name: 'topic',
    components: {
      TopicCard
    },
    data() {
      return {
        topics: []
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
          })
          .catch((err) => {
            console.log(err)
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
