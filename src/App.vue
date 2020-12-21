<template>
	<div id="app">
		<router-link to="/"></router-link>
		<router-view></router-view>
		<!-- 底部 -->
		<PicBar id="footer" :pics="picbar" class="footer"></PicBar>
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
		}
	}
</script>

<style>
	.footer {
		bottom: 0;
		position: fixed;
		width: 100%;
		left: 0;
	}
</style>
