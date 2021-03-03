<template>
  <div @click="toEdit" style="width: 100%; background-color: #EEEEEE; border-radius: 15px; padding: 10px 0 10px 0; cursor: pointer;">
    <img :src="picurl" style="float: left; width: 50px; height: 50px; border-radius: 50%;"/>
    <div style="margin-left: 55px;">
      <div style="color: plum; font-size: x-large;">{{item.fuid===$urls.uid?item.tnike:item.fnike}}</div>
      <div>{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mymsgcard',
    props: ['item'],
    data() {
      return {
        picurl: ''
      }
    },
    activated() {
      let str = this.item.fuid===this.$theUser.uid?this.item.tphoto:this.item.fphoto
      this.picurl = this.$urls.server + str
    },
    methods: {
      toEdit() {
        let tuid = this.item.fuid===this.$theUser.uid?this.item.tuid:this.item.fuid
        this.$router.push("/me/msgedit/" + tuid)
      }
    }
  }
</script>

<style>
</style>
