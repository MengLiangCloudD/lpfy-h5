<template>
    <div class="erwem">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             小程序二维码
             <div class="tong" @click="gouserInfor()" v-if="type==2">
                患者信息
            </div>
            <div class="tong" @click="gosetImgr()" v-if="type==1">
                上传
            </div>
        </div>
        <div class="content">
                <div class="mycard">
                    <!-- <img src="./../../../../common/imager/avatar.png" alt="" width="50px;" style="vertical-align: middle;margin-left:10px;" >
                    <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
                        <p><span>{{docName}}</span></p>
                        <p><span>{{docCode}}</span></p>
                    </div> -->
                    <div class="er">
                        <img :src="imgers" alt="" width="100%">
                    </div>
                    <p style="text-align: center;">长按扫描二维码进入视频问诊</p>
            </div>
        </div>
    </div>
</template>

<script>
import loading from "@/common/loading";
import http from '@/utils/http'
    export default {
        name:'MaxCard',
        data(){
            return {
                imgers:'',
                docName:'',
                docCode:'',
                tishi:false,
                type:''
            }
        },
        methods:{
            gosetImgr(){
                localStorage.setItem('zixunOrdeno',this.$route.query.orderNo);
                this.$router.push(`/setImg?type=1`);
            },
              //返回上一层
            tobackdetail(){
              history.go(-1);
            },
            //患者信息
            gouserInfor(){
                localStorage.setItem('zixunOrdeno',this.$route.query.orderNo);
                this.$router.push('/zixunCase');
            },
            //查询小程序码
           async QRcode(){
                var that =this;
                var url ="xcxvideo/xcxOrderUserImg";
                var type = that.$route.query.type;
                that.type=type;
                var order_no = that.$route.query.orderNo;
                var data  ={
                    type,
                    order_no
                }
                var res  = await http.post(that,url,data);
                    if(res.errcode==0){
                        that.imgers=res.data;
                    }
                    
                
            }
        },
        mounted(){
            var that = this;
            var timerr = setInterval(() => {
                if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
                    that.QRcode();
                    clearInterval(timerr);
                }
            }, 500);
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
.content{
     height: calc(100% - 50px);
    background: rgb(245, 245, 245);
    border-top:1px solid rgb(245, 245, 245);
}
.erwem{
    height: 100%;
    overflow: auto;
}
.mycard{
    width: 80%;
    height: 350px;
    /* border: 1px solid red; */
    margin: 20% auto;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 5px 5px 3px #999;
}
.er{
    width: 80%;
    margin: 5% auto;
}
.tong{
    position: absolute;
    right: 15px;
    top: 0;
    font-size: 16px;
} 
</style>