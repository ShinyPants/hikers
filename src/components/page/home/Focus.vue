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
    }
	}
</script>

<style>
</style>
