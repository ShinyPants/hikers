<template>
  <div>
    <div style="text-align: center;"><span>{{partName}}</span><span>欢迎您~</span></div>
    <!-- 顶端的编辑菜单 -->
    <!-- <div class="div_top">
      <el-input style="width: 80%;" placeholder="板块内搜索" v-model="searchStr">
        <i @click="doSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button @click="doEdit" class="btn_edit" type="primary" icon="el-icon-edit"></el-button>
    </div> -->
    <el-container>
      <!-- 顶端的编辑菜单 -->
      <el-header>
        <el-row>
          <el-col :span="1"><i class="el-icon-arrow-left"></i></el-col>
          <el-col :span="22">
            <el-input placeholder="板块内搜索" v-model="searchStr">
              <i @click="doSearch" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="1" style="text-align: right;">
            <el-button @click="doEdit" type="primary" icon="el-icon-edit"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        {{topics}}
        <!-- 内容 -->
        <div style="width: 600px; margin: 0 auto;">
        <div v-for="t in topics" :key="t.tid" style="width: 100%;">
            <el-image :src="$urls.server + t.photo" fit="cover"
            style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; float: left;"></el-image>
            <div style="margin-left: 55px; background-color: aquamarine;">
              <div>
                <!-- t.uid 打开链接 -->
                {{t.nikeName}}
              </div>
              <div>{{t.time}}</div>
              <div>{{t.title}}</div>
              <div>{{t.info}}</div>
              <div>
                <el-row :gutter="24" style="text-align: center; margin: 0 auto;">
                  <el-col :span="getSpan(t.pics)" v-for="(p,index) in t.pics" :key="index">
                    <div style="width: 1px; padding-bottom: 100%; display: inline;"></div>
                      <el-image :src="$urls.server + p" fit="cover"
                      :class="{'pic-one': isShow(t.pics, 1), 'pic-two': isShow(t.pics, 2), 'pic-three': isShow(t.pics, 9)}">
                      </el-image>
                  </el-col>
                </el-row>
              </div>
            </div>
        </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'part',
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
            if (res.status > 0)
              this.topics = res.data
          })
          .catch(err => {
            // TODO
            console.log("啊咧咧~")
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
      getSpan(pics) {
        if (pics.length === 1)
          return 24
        else if (pics.length === 2 || pics.length === 4)
          return 12
        return 8
      },
      isShow(pics, n) {
        if (pics.length === 1 && n === 1)
          return true
        else if ((pics.length === 2 || pics.length === 4) && n === 2)
          return true
        else if (n === 9)
          return true
        return false
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
  
  .img-pics {
    max-width: none;
    max-height: none;
    width: 110px;
    height: 110px;
  }
  
  .pic-one {
    max-width: none;
    max-height: none;
    width: 110px;
    height: 110px;
  }
  
  .pic-two {
    max-width: none;
    max-height: none;
    width: 270px;
    height: 270px;
  }
  
  .pic-three {
    max-width: none;
    max-height: none;
    width: 147px;
    height: 147px;
  }
</style>
