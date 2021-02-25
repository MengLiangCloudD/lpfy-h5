<template>
  <div class="voicepos">
      <Icon :class="{rotation:rotationstate}" type="md-volume-mute" v-show="isshow=='mute'" size="25" />
      <Icon :class="{rotation:rotationstate}" type="md-volume-down" v-show="isshow=='down'" size="25" />
      <Icon :class="{rotation:rotationstate}" type="md-volume-up" v-show="isshow=='up'" size="25" />
  </div>
</template>

<script>
export default {
    props:{
        isshow:String,
        rotationstate:Boolean
    }
}
</script>

<style>
.rotation{
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg);
}
.voicepos{
    display:inline-block;
    
}
</style>