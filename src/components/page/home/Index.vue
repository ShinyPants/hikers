<template>
  <div>
	<div>
    <el-carousel :interval="5000">
      <el-carousel-item @click.native="showSight()" style="background-image: url('/images/pic_sights.jpg'); background-size: 100% 100%;">
        <h1>风景名胜哪家强</h1>
      </el-carousel-item>
      <el-carousel-item @click.native="showHotel()" style="background-image: url('/images/pic_hotels.jpg'); background-size: 100% 100%;">
        <h1>玩累了，休息下</h1>
      </el-carousel-item>
    </el-carousel>
	</div>
  <el-divider>看看热门内容</el-divider>
  <div>
    <TopicCard v-for="t in hotTopics" :key="t.tid" v-bind:topic="t"></TopicCard>
  </div>
  </div>
</template>

<script>
  import TopicCard from '../topic/TopicCard.vue'
  
	export default {
    components: {
      TopicCard
    },
    data() {
      return {
        hotTopics: []
      }
    },
		created() {
      this.$axios.get('/api/topic/hp')
      .then((res)=>{
        res = res.data
        this.handlePicUrl(res.data)
        this.hotTopics = res.data
      })
		},
    methods: {
      refresh() {},
      showSight() {
        // TODO
        this.$router.push('/sights')
      },
      showHotel() {
        // TODO
        this.$router.push('/hotels')
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
  .el-carousel__item h1 {
    padding-top: 240px;
    color: crimson;
    text-align: center;
    margin: 0 auto;
  }
</style>
