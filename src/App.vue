<template>
	<div id="app">
		<router-link to="/"></router-link>
		<router-view ref="dom_view" class="css_view"></router-view>
		<!-- 底部 -->
		<PicBar ref="dom_footer" class="css_footer" :pics="picbar"></PicBar>
	</div>
</template>

<script>
	import PicBar from './components/bar/PicBar.vue'

	export default {
		name: 'App',
		components: {
			PicBar
		},
		data() {
			return {
				picbar: [{
						defaultPic: "/icons/forbidden.png",
						selectedPic: "/icons/forbidden_filled.png"
					},
					{
						defaultPic: "/icons/help.png",
						selectedPic: "/icons/help_filled.png"
					},
					{
						defaultPic: "/icons/info.png",
						selectedPic: "/icons/info_filled.png"
					}
				]
			}
		},
		methods: {
			setViewBottom(addHeight) {
				// 获取底端导航栏的高度
				let footerHeight = this.$refs.dom_footer.$el.offsetHeight
				// 增加点距离
				footerHeight += addHeight
				// 修改内容的bottom属性
				this.$refs.dom_view.$el.style.bottom = footerHeight + "px"
			}
		},
		mounted() {
			// 设置router-view的bottom以便不被底部导航遮挡
			this.setViewBottom(5)
		}
	}
</script>

<style>
	.css_footer {
		bottom: 0;
		left: 0;
		position: fixed;
		width: 100%;
		display: block;
	}
	.css_view {
		position: absolute;
		overflow: auto;
		top: 0;
		left: 0;
		right: 0;
	}
</style>
