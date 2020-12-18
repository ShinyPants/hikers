<template>
	<div>
		<el-row type="flex" class="row-bg" justify="space-around">
			<el-col :span="6" v-for="(item, index) in pics" :key="index" @click.native="handleSelect(index)" style="cursor: pointer;">
				<el-image :style="{height: picSize+'px', width: picSize+'px'}" :src="item.defaultPic" :fit="picFit"></el-image>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "picbar",
		props: {
			pics: {
				validator: function(value) {
					for (let item of value)
						if (item.defaultPic === undefined || item.selectedPic === undefined)
							return false;
					return true;
				},
			},
			picSize: {
				type: Number,
				default: 50
			},
			picFit: {
				default: "fill",
				validator(value) {
					return ["fill", "contain", "cover", "none"].indexOf(value) !== -1
				}
			},
		},
		methods: {
			handleSelect(key) {
				this.$emit('selected', key)
			}
		},
		data() {
			return {
				picStyle: {
					height: this.picSize + "px",
					width: this.picSize + "px"
				}
			}
		}
	};
</script>

<style>
	.row-bg {
		text-align: center;
	}
</style>
