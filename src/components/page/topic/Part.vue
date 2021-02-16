<template>
  <div>
    <!-- <div style="text-align: center;"><span>{{partName}}</span><span>欢迎您~</span></div> -->
    <el-page-header @back="doBack" :content="partName"></el-page-header>
    <el-container>
      <!-- 顶端的编辑菜单 -->
      <el-header>
        <el-row style="width: 100%;">
          <!-- <el-col :span="1"><i class="el-icon-arrow-left" style="cursor: pointer;" @click="doBack"></i></el-col> -->
          <el-col :span="22">
            <el-input placeholder="板块内搜索" v-model="searchStr">
              <i @click="doSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button @click="doEdit" type="primary" icon="el-icon-edit"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <!-- 内容 -->
        <div>
          <TopicCard v-for="t in topics" :key="t.tid" v-bind:topic="t"></TopicCard>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import TopicCard from './TopicCard.vue'
  
  export default {
    name: 'part',
    components: {
      TopicCard
    },
    data() {
      return {
        searchStr: '',
        partId: '',
        partName: '',
        topTopics: [],
        hotTopics: [],
        topics: []
      }
    },
    activated() {
      if (this.partId !== this.$route.params.partId)
        this.refresh()
    },
    methods: {
      doSearch() {
        alert(this.searchStr)
      },
      doEdit() {
        this.$router.push('/edit/' + this.partId).catch(err => err)
      },
      doBack() {
        this.$router.back()
      },
      refresh() {
        // 从url获取参数
        this.partId = this.$route.params.partId
        this.partName = this.$route.params.partName
        // 重置内容
        this.topTopics = []
        this.hotTopics = []
        this.topics = []
        // 获取分区的内容
        this.getTopTopics()
        this.getHotTopics()
        this.getTopics()
      },
      getTopTopics() {},
      getHotTopics() {},
      getTopics(type) {
        // 如果是空的，就只能重新加载
        // type = 0 重新加载
        if (this.topics.length === 0 || type === 0)
          this.reloadTopics()
        // type = 1 向下加载
        else if (type === 1)
          this.loadBottom()
      },
      reloadTopics() {
        this.$axios.get(this.$urls.user.part.reload, {
            params: {
              pid: this.partId
            }
          })
          .then(res => {
            res = res.data
            if (res.status > 0) {
              this.handlePicUrl(res.data)
              this.topics = res.data
            }
          })
          .catch(err => {
            // TODO
            console.log(err)
            err
          })
      },
      loadBottom() {
        this.$axios.get(this.$urls.user.part.bottom, {
            params: {
              pid: this.partId,
              tid: this.topics.length - 1
            }
          })
          .then(res => {
            res = res.data
            // TODO
            console.log(res)
          })
          .catch(err => {
            // TODO
            console.log("啊咧咧~")
            err
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
  .el-header {
    background-color: transparent;
  }

  .el-col {
    text-align: center;
  }
</style>
