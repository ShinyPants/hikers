<template>
  <div style="width: 100%; height: 100%; overflow-y: scroll;" ref="dddiv">
    <!-- 内容 -->
    <TopicInfoCard v-bind:topic="topic"></TopicInfoCard>
    <!-- 编辑栏 -->
    <div style="text-align: center; height: 1px;">
      <div style="margin: 5px auto; bottom: 0; left: 50%; transform: translate(-50%, -50%); position: absolute; width: 500px;">
        <img @click="doAgree" :src="isAgree?'/icons/thumb_on.png':'/icons/thumb_off.png'" style="vertical-align: middle; cursor: pointer;">
        <img @click="doCollect" :src="isCollect?'/icons/star_on.png':'/icons/star_off.png'" style="vertical-align: middle; cursor: pointer;">
        <el-input maxlength="150" type="textarea" resize="none" :autosize="{minRows:1, maxRows:10}" v-model="myDis"
          placeholder="说点什么吧..." style="width: 70%;"></el-input>
        <el-button @click="doDis" type="primary" icon="el-icon-edit"></el-button>
      </div>
    </div>
    <!-- 讨论区 -->
    <div style="width: 80%; margin: 0 auto; margin-bottom: 50px;">
      <DiscussCard v-for="d in dises" :key="d.did" v-bind:discuss="d"></DiscussCard>
    </div>
    <mugen-scroll style="z-index: -1;" :handler="loadBottom" :should-handle="!loading" scrollContainer="dddiv">
      <el-divider>{{!stopLoading?'正在加载中':'已经到底啦'}}</el-divider>
    </mugen-scroll>
  </div>
</template>

<script>
  import TopicInfoCard from './TopicInfoCard.vue'
  import DiscussCard from './DiscussCard.vue'
  import MugenScroll from 'vue-mugen-scroll'

  export default {
    name: 'topic_info',
    components: {
      TopicInfoCard,
      DiscussCard,
      MugenScroll
    },
    activated() {
      this.$nextTick(() => {
        this.init()
      })
    },
    data() {
      return {
        topic: {},
        isCollect: false,
        isAgree: false,
        myDis: '',
        dises: [],
        loading: false,
        stopLoading: false
      }
    },
    methods: {
      init() {
        let tid = this.$route.params.tid
        // 获取内容
        this.$axios.get(this.$urls.user.topic, {
            params: {
              tid: tid
            }
          })
          .then((res) => {
            res = res.data
            if (res.data === null) {
              this.$message("内容不存在")
              this.$router.back()
            }
            this.topic = this.handlePicUrl(res.data)
          })
          .catch((err) => {
            console.log(err)
            this.$message("内容不存在")
            this.$router.back()
          })
        // 获取评论
        this.$axios.get(this.$urls.user.part.discuss, {
            params: {
              tid: tid,
              did: 0
            }
          })
          .then((res) => {
            res = res.data
            this.dises = res.data
            if (res.data < this.$config.loadNum)
              this.stopLoading = true
          })
          .catch(err => {
            console.log(err)
          })
        // 检查是否收藏、点赞
        if (this.$theUser === undefined)
          return
        this.$axios.get(this.$urls.user.part.topicCollect, {
            params: {
              uid: this.$theUser.uid,
              tid: this.topic.tid
            }
          })
          .then((res) => {
            res = res.data
            if (res.data)
              this.isCollect = true
          })
        this.$axios.get(this.$urls.user.part.topicAgree, {
            params: {
              uid: this.$theUser.uid,
              tid: this.topic.tid
            }
          })
          .then((res) => {
            res = res.data
            if (res.data)
              this.isAgree = true
          })
      },
      loadBottom() {
        if (this.dises.length < this.$config.loadNum || this.stopLoading == true)
          return
        this.loading = true
        // 获取评论
        this.$axios.get(this.$urls.user.part.discuss, {
            params: {
              tid: this.$route.params.tid,
              did: this.dises[this.dises.length - 1].did
            }
          })
          .then((res) => {
            res = res.data
            this.dises = this.dises.concat(res.data)
            if (res.data < this.$config.loadNum)
              this.stopLoading = true
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      handlePicUrl(topic) {
        if (topic.pics !== null)
          for (let i = 0; i < topic.pics.length; i++) {
            topic.pics[i] = this.$urls.server + topic.pics[i]
          }
        return topic
      },
      doCollect() {
        if (this.$theUser === undefined) {
          this.$router.push('/login')
          return
        }
        if (!this.isCollect) {
          this.$axios.put(this.$urls.user.part.topicCollect + '/' + this.$theUser.uid + '/' + this.topic.tid + '/' +
              this.$theUser.pwd)
            .then(() => {
              this.isCollect = true
              this.topic.collect++
            })
        } else {
          this.$axios.delete(this.$urls.user.part.topicCollect, {
              params: {
                uid: this.$theUser.uid,
                tid: this.topic.tid,
                pwd: this.$theUser.pwd
              }
            })
            .then(() => {
              this.isCollect = false
              this.topic.collect--
            })
        }
      },
      doAgree() {
        if (this.$theUser === undefined) {
          this.$router.push('/login')
          return
        }
        if (!this.isAgree) {
          this.$axios.put(this.$urls.user.part.topicAgree + '/' + this.$theUser.uid + '/' + this.topic.tid + '/' + this
              .$theUser.pwd)
            .then(() => {
              this.isAgree = true
              this.topic.agree++
            })
        } else {
          this.$axios.delete(this.$urls.user.part.topicAgree, {
              params: {
                uid: this.$theUser.uid,
                tid: this.topic.tid,
                pwd: this.$theUser.pwd
              }
            })
            .then(() => {
              this.isAgree = false
              this.topic.agree--
            })
        }
      },
      doDis() {
        if (this.myDis.trim().length === 0)
          return
        if (this.$theUser === undefined) {
          this.$router.push('/login')
          return
        }
        this.$axios.post(this.$urls.user.part.discuss, {
            info: this.myDis,
            uid: this.$theUser.uid,
            tid: this.topic.tid,
            pwd: this.$theUser.pwd
          })
          .then((res) => {
            res = res.data
            if (res.status > 0) {
              this.myDis = ''
              this.$message("回复成功")
            } else if (res.status === 0) {
              this.$message("回复失败，请稍后重试")
            } else {
              this.$message(res.data)
              this.$axios.push("/login")
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message("回复失败，请稍后重试")
          })
      }
    }
  }
</script>

<style>
</style>
