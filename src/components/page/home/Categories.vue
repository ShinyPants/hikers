<template>
	<div style="overflow: hidden; text-align: center;">
		<el-row :gutter="24" type="flex" style="margin: 0 auto;">
			<el-col v-for="(part,index) in parts" :key="index" :span="6">
				<el-card :key="index" @click.native="showPart(part.id)">
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
							this.parts = res.data.sort(function(a, b) {
								return b["score"] - a["score"]
							})
						} else
							console.log(res.data)
					})
					.catch((error) => {
						console.log(error)
					})
			},
      showPart(partId) {
        this.$router.push('/part/' + partId)
      }
		},
		mounted() {
			// 通过axios获取分区信息
			this.refresh();
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
	}

	.el-card .el-card__body {
		padding: 0;
	}

	.el-image {
		width: 100%;
		display: block;
	}
</style>
