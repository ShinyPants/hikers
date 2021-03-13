<template>
	<div style="overflow: hidden; text-align: center;">
		<el-row :gutter="24" type="flex" style="margin: 0 auto;">
			<el-col v-for="(part,index) in parts" :key="index" :span="6">
				<el-card :key="index" @click.native="showPart(part.id, part.name)">
					<el-image :src="part.picUrl"></el-image>
					<div style="width: 100%;">
						<span>{{part.name}}</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
  import Vue from 'vue'
  
	export default {
		data() {
			return {
				parts: []
			}
		},
		methods: {
			refresh() {
				this.$axios.get(this.$urls.parts)
					.then((res) => {
						res = res.data
						if (res.status > 0) {
							// 排序
							Vue.prototype.$parts = res.data.sort(function(a, b) {
								return b["score"] - a["score"]
							})
              this.parts = this.$parts
						} else
							console.log(res.data)
					})
					.catch((error) => {
						console.log(error)
					})
			},
      showPart(partId, partName) {
        this.$router.push('/adm/part/' + partId + '/' + partName)
      }
		},
		mounted() {
			// 获取分区信息
      if (this.$parts === undefined)
        this.refresh();
      else
        this.parts = this.$parts
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;
		display: flex;
		flex-wrap: wrap;
		width: 95%;
	}

	.el-col {
		border-radius: 4px;
		align-items: stretch;
		margin-bottom: 20px;
		margin-top: 20px;
	}

	.el-card {
		min-width: 100%;
		height: 100%;
		overflow: hidden;
    cursor: pointer;
	}

	.el-card .el-card__body {
		padding: 0;
	}

	.el-image {
		width: 100%;
		display: block;
	}
</style>
