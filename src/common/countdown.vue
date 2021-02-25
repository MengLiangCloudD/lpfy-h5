<template>
    <div class="countdown">
        <div>{{number}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            number:10
        }
    },
    mounted(){
        let _this=this
        let timer=setInterval(() => {
            if(_this.number==0){
               clearInterval(timer)
               return
           }
           _this.number-- 
        }, 1000);
    }
}
</script>

<style>
.countdown{
    color: rgb(255, 255, 255);
    font-size: 80px;
}
.countdown{
    margin: auto;
}
</style>