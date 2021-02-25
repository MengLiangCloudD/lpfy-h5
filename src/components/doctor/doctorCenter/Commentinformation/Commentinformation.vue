<template>
    <div class="ping">
      <div>
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             评论中心
        </div>
        <div class="content" v-if="commentList.length>0">
          <div class="comment" v-for="(item,index) in commentList" :key="index">
              <img src="./../../../../common/imager/toux.png" alt width="50px" style=" border-radius:50%; vertical-align: middle">
             <div style="display: inline-block;vertical-align: middle;margin-left:10px;"> 
              <p style="font-size: 16px">{{item.name}}</p>
              <p style="  font-size: 16px;display: inline-block;vertical-align: middle;">
                <span style="text-indent:25px">{{item.created_at}}</span>
              </p>
              <p style="margin-left:10px; display: inline-block; vertical-align: middle;">
                <span style="  font-size: 20px;color:#f37f12;display: inline-block;vertical-align: middle;">{{item.star[0].score}}</span>
                <img src="./../../../../common/imager/_星星1.png" alt="" width="22" style="vertical-align: middle;">
              </p>
            </div>
            
            <p style="text-indent:2rem;font-size:18px;padding:10px 0">{{item.content}}</p>
            
            
          </div>
        </div>
        <div class="content" v-if="commentList.length<=0">
          <p style=" text-align: center;font-size: 20px;padding:40px 0;">暂无数据</p>
        </div>
      </div> 
      <loading v-show="isshowloading"></loading> 
    </div>
</template>

<script>
import loading from '@/common/loading'
import http from '@/utils/http'
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
//当前年月日
var time = year + "-" + month;
    export default {
      components:{
        loading
      },
      data(){
        return {
          commentList:[],
          size:10,
          isshowloading:false
        }
      },
           methods:{
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //评论列表
            async comment(){
              var that =this;
              var url ='evaluate/doctorQueryEvaluate';
              var data = {};
              var res  = await http.post(that,url,data);
               if(res.errcode==0&&res.data!=null){
                    that.commentList=res.data;
               }else{
                    that.commentList=[]
               }
            },
           },
           mounted(){
              var that  = this;
             that.comment();
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
.comment {
  padding: 15px 5%;
  border-bottom: 3px solid #ccc;
  background: #fff;
  position: relative;
  padding-bottom: 20px;
}
.ping{
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>