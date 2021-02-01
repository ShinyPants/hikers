<template>
	<div>
    {{$theUser.uid}}
  </div>
</template>

<script>
	export default {
    name: 'focus',
    mounted() {
      console.log(this.$theUser)
    },
    methods: {
      // 必须实现这个函数
      refresh() {}
    }
	}
</script>

<style>
</style>
