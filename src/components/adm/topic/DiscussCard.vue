<template>
  <div style="margin-bottom: 10px;">
    <!-- 头像 -->
    <el-image :src="$urls.server + discuss.photo" fit="cover" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; float: left; cursor: default;"></el-image>
    <!-- 详情 -->
    <div style="margin-left: 55px;">
      <!-- 昵称和时间 -->
      <div>
        <!-- 昵称 -->
        <div>
          <el-button type="text" @click="lookUserInfo(discuss.uid)" style="color: #fb7299; font-size: x-large; padding: 0;">{{discuss.nikeName}}</el-button>
        </div>
        <!-- 时间 -->
        <div style="font-size: small; color: #99a2aa;">{{getFormatTime(discuss.time)}}</div>
      </div>
      <!-- 内容 -->
      <div style="padding-right: 30px;">
        <span class="infoopen" v-html="INFO"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'discuss_card',
    props: {
      discuss: Object
    },
    methods: {
      lookUserInfo(uid) {
        this.$router.push('/space/' + uid)
      },
      getFormatTime(timeStamp) {
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
          timeSpanStr = year + '-' + month + '-' + day + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes().toString().padStart(2, '0')
        } else {
          timeSpanStr = year + '-' + month + '-' + day + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes().toString().padStart(2, '0')
        }
        return timeSpanStr;
      },
    },
    computed: {
      INFO() {
        return this.discuss.info.replace(/\r\n/g, '<br>')
      }
    }
  }
</script>

<style>
  .infoopen {
    line-height: 25px;
  }
</style>
