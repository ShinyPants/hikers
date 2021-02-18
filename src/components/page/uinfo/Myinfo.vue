<template>
  <div id="myinfo" style="overflow-y: scroll;">
    <!-- 个人信息展示 -->
    <div style="background-color: blueviolet; padding-top: 20px; background-image: url('/images/backpic.png');">
      <!-- 头像 -->
      <div style="text-align: center;">
        <el-image :src="$urls.server + user.photo"
          style="border-radius: 50%; height: 100px; width: 100px; border: 1px solid white;"></el-image>
      </div>
      <!-- 昵称 -->
      <div style="text-align: center; font-size: xx-large; color: #fb7299;">
        <span>{{user.nikeName}}</span>
      </div>
      <!-- 粉丝数、关注数 -->
      <div>
        <el-row style="width: 96%; margin: 0 auto;">
          <el-col :span="6"></el-col>
          <el-col :span="5" style="text-align: right;">粉丝数：{{user.fans}}</el-col>
          <el-col :span="2"></el-col>
          <el-col :span="5" style="text-align: left;">关注数：{{user.focus}}</el-col>
          <el-col :span="6" style="text-align: right;"><FocusButton :tuid="user.uid"></FocusButton></el-col>
        </el-row>
      </div>
    </div>
    <!-- 发过的帖子 -->
    <div>
      <TopicCard v-for="t in topics" :key="t.tid" v-bind:topic="t"></TopicCard>
    </div>
  </div>
</template>

<script>
  import FocusButton from '../topic/FocusButton.vue'
  import TopicCard from '../topic/TopicCard.vue'
  
  export default {
    name: "Myinfo",
    components: {
      FocusButton,
      TopicCard
    },
    data() {
      return {
        uid: this.$route.params.uid,
        user: {},
        topics: []
      }
    },
    activated() {
      this.init()
    },
    methods: {
      init() {
        this.uid = this.$route.params.uid
        // 获取个人信息
        this.$axios.get(this.$urls.user.user, {params: {uid: this.uid}})
          .then((res) => {
            this.user = res.data.data
          })
          .catch((err) => {console.log(err)})
        // 获取发过的帖子
        this.$axios.get(this.$urls.user.part.topics + '/' + this.uid + '/0')
          .then(res => {
            res = res.data
            if (res.status > 0) {
              this.handlePicUrl(res.data)
              this.topics = res.data
            }
          })
          .catch(err => {
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
      }
    }
  }
</script>

<style>
</style>
