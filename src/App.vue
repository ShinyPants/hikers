<template>
	<div id="app" style="height: 100%;">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "App",
		methods:{
			_isMobile() {
				let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
				return flag;
			}
		},
		mounted() {
			if (this._isMobile())
				this.$router.replace("/home").catch(err => err)
			else
				this.$router.replace("/adm").catch(err => err)
      // this.$router.replace("/regist")
		}
	}
</script>

<style>
</style>
