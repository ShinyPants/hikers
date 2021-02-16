<template>
  <div style="width: 100%;">
    <div style="width: 100%; border-radius: 10px; margin-bottom: 10px; background-color: white;">
      <el-image :src="$urls.server + topic.photo" fit="cover" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; float: left; cursor: default;"></el-image>
      <div style="margin-left: 55px;">
        <div>
          <el-button type="text" @click="lookUserInfo(topic.uid)" style="color: #fb7299; font-size: x-large; padding: 0;">{{topic.nikeName}}</el-button>
        </div>
        <div style="font-size: small; color: #99a2aa;">{{getFormatTime(topic.time)}}</div>
        <div style="font-size: x-large; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
          {{topic.title}}
        </div>
        <div style="padding-right: 30px;">
          <a @click="showDetail" ref="ainfo" :class="{ainfo: !isShowInfo, infoopen: isShowInfo}" v-html="INFO"></a>
          <div :class="{ctloff: !isShowCtl}" ref="ctl" style="float: right; color: orange; cursor: pointer;"><span @click="showInfo">{{CTL}}</span></div>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topic_card',
    props: {
      topic: Object
    },
    data() {
      return {
        isShowInfo: false,
        isShowCtl: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.isShowCtl = this.$refs.ainfo.offsetHeight > 120 ? true : false
      })
    },
    methods: {
      showInfo() {
        this.isShowInfo = !this.isShowInfo
      },
      showDetail() {
        this.$router.push('/tinfo/' + this.topic.tid)
      },
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
        } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
          timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
          timeSpanStr = year + '-' + month + '-' + day
        } else {
          timeSpanStr = year + '-' + month + '-' + day
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
        return this.topic.info.replace(/\r\n/g, '<br>')
      },
      CTL() {
        return this.isShowInfo === true ? '收起' : '展开'
      }
    }
  }
</script>

<style>
  .img-pics {
    max-width: none;
    max-height: none;
    width: 100%;
    max-height: 650px;
  }
  
  .ainfo {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    line-height: 25px;
  }
  
  .infoopen {
    line-height: 25px;
  }
  
  .ctloff {
    display: none;
  }
</style>
