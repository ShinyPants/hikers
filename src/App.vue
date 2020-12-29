<template>
	<div id="app">
		<keep-alive>
			<component ref="dom_view" class="css_view" :is="showPage"></component>
		</keep-alive>
		<!-- 底部 -->
		<PicBar ref="dom_footer" class="css_footer" :pics="picbar" @change="change" @again="again"></PicBar>
	</div>
</template>

<script>
	import PicBar from './components/bar/PicBar.vue'
	import Index from './components/page/Index.vue'
	import Space from './components/page/Space.vue'
	import Cate from './components/page/Categories.vue'
	import axios from 'axios'

	export default {
		name: 'App',
		components: {
			PicBar
		},
		data() {
			return {
				picbar: [],
				pages: [Index, Cate, Space],
				showPage: Index
			}
		},
		methods: {
			setViewBottom(addHeight) {
				// 获取底端导航栏的高度
				let footerHeight = this.$refs.dom_footer.$el.offsetHeight
				// 增加一些距离
				footerHeight += addHeight
				// 修改内容的bottom属性
				this.$refs.dom_view.$el.style.bottom = footerHeight + "px"
			},
			change(key) {
				// 切换页面
				//this.showPage = this.pages[key]
				this.showPage = this.picbar[key].toPage
			},
			again(key) {
				console.log(key)
			},
			setBar() {
				axios.request({
					url: '/config/barconfig.json',
					method: 'get'
				}).then(res => {
					this.picbar = res.data
					for (let pic in this.picbar) {
						pic.toPage = () => require(pic.toPage())
					}
					console.log(this.picbar)
				})
			}
		},
		mounted() {
			// 设置router-view的bottom以便不被底部导航遮挡
			this.setViewBottom(5)
			// 试图导入js
			this.setBar()
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
