<template>
	<div id="app">
		<router-link :to="page"></router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "App",
		data() {
			return {
				page: '/home'
			}
		}
	}
</script>

<style>
</style>
