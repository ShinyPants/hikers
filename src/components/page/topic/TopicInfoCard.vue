<template>
  <div style="width: 100%; margin: auto; background-color: white;">
    <!-- 上面信息展示部分 -->
    <div style="width: 95%; margin: 0 auto 10px auto;">
      <!-- 头像 -->
      <el-image :src="$urls.server + topic.photo" fit="cover" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; float: left; cursor: default;"></el-image>
      <!-- 内容 -->
      <div style="margin-left: 55px;">
        <!-- 用户信息 -->
        <div>
          <el-button type="text" @click="lookUserInfo(topic.uid)" style="color: #fb7299; font-size: x-large; padding: 0;">{{topic.nikeName}}</el-button>
          <FocusButton v-bind:tuid="topic.uid" style="float: right;"></FocusButton>
        </div>
        <div style="font-size: small; color: #99a2aa;">{{getFormatTime(topic.time)}}</div>
        <div style="font-size: x-large; width: 100%;">
          {{topic.title}}
        </div>
        <div style="padding-right: 30px;">
          <span class="infoopen" v-html="INFO"></span>
        </div>
        <div>
          <el-row :gutter="24" style="text-align: center; margin: 0 auto;">
            <el-col :span="getSpan(topic.pics)" v-for="(p,index) in topic.pics" :key="index">
              <div style="width: 1px; padding-bottom: 100%; display: inline;"></div>
              <el-image :src="p" fit="cover" class="img-pics" :preview-src-list="topic.pics">
              </el-image>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 举报栏 -->
      <div style="height: 30px;">
        <span @click="doReport" style="float: right; color: gray; font-size: smaller; cursor: pointer;">举报</span>
      </div>
      <!-- 点赞评论收藏数 -->
      <div style="border-top: 1px solid #B3C0D1; border-bottom: 1px solid #B3C0D1;">
        <el-row style="text-align: center; font-size: 25px; margin: 0 auto;">
          <!-- 收藏 -->
          <el-col :span="8">
            <span>
              收藏：{{topic.collect}}
            </span>
          </el-col>
          <!-- 评论 -->
          <el-col :span="8" style="border-left: 1px solid #B3C0D1; border-radius: 0;">
            <span>
              讨论：{{topic.discuss}}
            </span>
          </el-col>
          <!-- 点赞 -->
          <el-col :span="8" style="border-left: 1px solid #B3C0D1; border-radius: 0;">
            <span>
              点赞：{{topic.agree}}
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import FocusButton from './FocusButton.vue'

  export default {
    name: 'topic_card',
    components: {
      FocusButton
    },
    props: {
      topic: Object
    },
    data() {
      return {
        isCollect: false,
        isAgree: false
      }
    },
    activated() {
      if (this.$theUser === undefined)
        return
      // 检查是否收藏、点赞
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
            this.isCollect = true
        })
    },
    methods: {
      doReport() {
        this.$router.push('/editreport/' + this.topic.tid + '/' + this.topic.uid)
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
      lookUserInfo(uid) {
        this.$router.push('/space/' + uid)
      },
      getFormatTime(timeStamp) {
        if (timeStamp === undefined)
          return null
        timeStamp = timeStamp.replace('+00', '+08')
        let dateTime = new Date(timeStamp);
        let no1new = dateTime.valueOf();
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        let day = dateTime.getDate();
        let now = new Date();
        let now_new = now.valueOf();
        let milliseconds = 0;
        let timeSpanStr;
        milliseconds = now_new - no1new;
        if (milliseconds <= 1000 * 60 * 1) {
          timeSpanStr = '刚刚';
        } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
          timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
        } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
          timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
          timeSpanStr = year + '-' + month + '-' + day + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes().toString()
            .padStart(2, '0')
        } else {
          timeSpanStr = year + '-' + month + '-' + day + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes().toString()
            .padStart(2, '0')
        }
        return timeSpanStr;
      },
      getSpan(pics) {
        if (pics.length === 1)
          return 24
        else if (pics.length === 2 || pics.length === 4)
          return 12
        return 8
      }
    },
    computed: {
      INFO() {
        if (this.topic.info === undefined)
          return this.topic.info
        return this.topic.info.replace(/\r\n/g, '<br>')
      }
    }
  }
</script>

<style>
  .img-pics {
    max-width: none;
    max-height: none;
    width: 100%;
    max-height: 400px;
  }

  .infoopen {
    line-height: 25px;
  }
</style>
