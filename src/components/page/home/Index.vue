<template>
	<div>
		{{str}}
	</div>
</template>

<script>
	export default {
    data() {
      return {
        str: '这是主页\n'
      }
    },
		mounted() {
      for (let i=0; i<10; i++)
        this.str += this.str
		},
    methods: {
      refresh() {}
    }
	}
</script>

<style>
</style>
