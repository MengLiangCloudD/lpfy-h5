<template>
    <div class="adf">
        <iframe src='jsp/mp/homepage?__biz=MzA4OTA4NzMwOA==&hid=1&sn=7f39efbd59d81968bf6652eaaf14c212' frameborder="0" width="100%" height="100%" ></iframe>
        <!-- <iframe src='jsp/queen/new-broadband-web/new-broadband-web.html?activeId=8818100954349604' frameborder="0" width="100%" height="100%" ></iframe> -->
    <tabbar class="pubtabbar"></tabbar>
    </div>
</template>

<script>
//底部公共组件
import tabbar from "@/common/tabbar";
    export default {
        components: {
            tabbar,
        },
        data() {
            return {
                url:''
            }
        },
        mounted() {
        },
    }
</script>

<style  scoped>
.adf{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: auto;-webkit-overflow-scrolling: touch;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
</style>