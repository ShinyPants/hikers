<template>
	<div>
    {{$theUser.uid}}
  </div>
</template>

<script>
	export default {
    name: 'focus',
    mounted() {
    },
    methods: {
      // 必须实现这个函数
      refresh() {}
    }
	}
</script>

<style>
</style>
