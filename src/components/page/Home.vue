<template>
	<div id="home">
		<keep-alive>
			<component ref="dom_view" class="css_view" :is="showPage"></component>
		</keep-alive>
		<!-- 底部 -->
		<PicBar ref="dom_footer" :defSelect="0" class="css_footer" :pics="picbar" @change="change" @again="again"></PicBar>
	</div>
</template>

<script>
	import PicBar from '../bar/PicBar.vue'
	import Index from './home/Index.vue'
	import Cate from './home/Categories.vue'
	import Focus from './home/Focus.vue'
	import Space from './home/Space.vue'

	export default {
		name: 'Home',
		components: {
			PicBar
		},
		data() {
			return {
				picbar: [{
						defaultPic: "/icons/forbidden.png",
						selectedPic: "/icons/forbidden_filled.png",
						toPage: Index
					},
					{
						defaultPic: "/icons/help.png",
						selectedPic: "/icons/help_filled.png",
						toPage: Cate
					},
					{
						defaultPic: "/icons/info.png",
						selectedPic: "/icons/info_filled.png",
						toPage: Focus
					},
					{
						defaultPic: "/icons/info.png",
						selectedPic: "/icons/info_filled.png",
						toPage: Space
					}
				],
				showPage: Index,
        pageKey: 0
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
        // 检查是否登录
        if (this.$theUser === undefined && key > 1) {
          this.$router.push("/login").catch(err => err)
          this.$refs.dom_footer.changeSelect(this.pageKey)
          return
        }
				// 切换页面
        this.pageKey = key
				this.showPage = this.picbar[key].toPage
			},
			again(key) {
        this.$refs.dom_view.refresh()
        key
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
