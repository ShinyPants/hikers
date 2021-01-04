<template>
	<div style="overflow: hidden;">
		<el-row :gutter="24" type="flex" justify="space-around">
			<el-col v-for="(part,index) in parts" :key="part.id" :span="10">
				<el-card class="el-card" :key="index">
					<el-image :src="part.picUrl" class="image"></el-image>
					<div style="padding: 14px;">
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
				this.$axios.get("/api/parts.json")
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
			}
		},
		mounted() {
			// 通过axios获取分区信息
			this.refresh();
		}
	}
</script>

<style>
	.image {
		width: 100px;
		display: block;
	}
	.el-row {
		margin-bottom: 20px;
	}
	.el-col {
		border-radius: 4px;
		/* align-items: stretch;
		margin-bottom: 40px; */
	}
	.el-card {
		min-width: 100%;
		height: 100%;
		margin-right: 20px;
	}
</style>
