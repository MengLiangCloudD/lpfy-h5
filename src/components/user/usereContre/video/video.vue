<template>
    <div  style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             我的课程
        </div>
        <div class="content" v-for="(item,index) in list" :key="index" @click="goContent(item)">
            <div class="content_item">
                <p>{{item.name}}</p>
                <p>{{item.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                list:[]
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                this.$router.push('/HomePage');
            },
            async selectList(){
                var url = 'queryLinkingList';
                var data = {

                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    this.list = res.data;
                }
            },
            async goContent(item){
               var url = 'insertNumber';
                var data = {
                    name:localStorage.getItem('cardername'),
                    cardNo:localStorage.getItem('cardno'),
                    linkingId:item.id
                }
                var res = await http.post(this,url,data);
                if(res.errcode===0){
                    
                } 
                location.href = item.content;
            }
        },
        created(){
            this.selectList()
        }
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content_item{
    width: 90%;
    padding: 10px;
    box-shadow: 6px 3px 6px 3px rgb(238,237,237), -6px 3px 6px 3px rgb(238,237,237) ;
    margin: 10px auto 0 auto;
    border-radius: 5px;
}
p{
    line-height: 1.5;
}
</style>