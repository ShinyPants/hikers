<template>
	<div>
		<el-row :style="backStyle" type="flex" justify="space-around">
			<el-col :span="3" v-for="(item, index) in pics" :key="index" @click.native="handleSelect(index)" :style="itemStyle">
				<el-image :style="{height: picSize+'px', width: picSize+'px'}" :src="select===index?item.selectedPic:item.defaultPic" :fit="picFit"></el-image>
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
				default: 50,
			},
			picFit: {
				default: "fill",
				validator(value) {
					return ["fill", "contain", "cover", "none"].indexOf(value) !== -1;
				},
			},
			backStyle: {},
			itemStyle: {},
			defSelect: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				picStyle: {
					height: this.picSize + "px",
					width: this.picSize + "px",
				},
				select: this.defSelect,
			};
		},
		methods: {
			handleSelect(key) {
				if (this.select === key) {
					this.$emit("again", key);
					return;
				}
				this.select = key;
				this.$emit("change", key);
			},
		}
	};
</script>

<style>
	.el-col {
		margin-bottom: 0;
	}
	.el-row {
		margin-bottom: 0;
	}
</style>
