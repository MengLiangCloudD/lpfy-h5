<template>
  <div class="pem">
    <div class="paymentPage">
      <div class="title">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        支付订单
      </div>
      <div class="payment-show">
        <div class="payment-title">支付金额</div>
        <div class="payment-money">￥{{regprice}}</div>
        <p style="line-height:2;color: #fff;
    padding: 5px;" class="b">请在<span class="a" ></span>内完成支付，超时订单自动取消</p>
        <!-- <div class="payment-tips">
          请在
          <span style="color:orange">{{minute}}分{{second}}秒</span>之内支付完成，超时订单自动取消
        </div>-->
      </div>
      <div class="payment-mode">
        <img class="payment-img" src="./../../../common/imager/weix.png" alt>
        <span style="margin-left: 85px;">微信支付</span>
        <img class="duihao-img" src="./../../../common/imager/duihao.png">
      </div>
      <div class="payment-mode" @click="xunaze">
        <img class="payment-img" src="./../../../common/imager/jiuzCard.png" alt>
        <span style="margin-left: 85px;">就诊卡支付</span>
        <!-- <img class="duihao-img" src="./../../../common/imager/xuanze.png"> -->
      </div>
      <div class="btn">
        <div v-if="!payzhaungt"><Button type="success"  v-bind:disabled="isDisabl" class="add-btn" id="getBrandWCPayRequest" @click="onBridgeReady">立即支付</Button></div>
        <div v-if="payzhaungt" @click="tiaozhaun"><Button type="success" class="badd-btn" >跳转</Button></div>
        <p v-if="payzhaungt" style="color: rgba(255, 152, 0, 1);font-size:15px;padding:10px 0"> 未跳转，点击跳转到订单界面，查看您的订单信息</p>
      </div>
      
    </div>
    <Modal
        v-model="issubmit"
        @on-ok='clickets'
        title="提示">
            缴费信息不全，请重新获取提交
        </Modal>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloading"></loading>
  </div>
</template>

<script>
//获取当前时间

import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
import http from '@/utils/http';
import wechatPay from "@/WXconfig/wechatPay"
export default {
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      duihaoFlag: false,
      regprice: null,
      paymentdata: {},
      //加载动画
      isshowloading: false,
      minutes: 5,
      seconds: 0,
      websocket:'',
      isDisabl:false,
      issubmit:false,
      wechatVersion:'',
      payzhaungt:false
    };
  },
 mounted(){ 
    let that = this;
    
    //判断是否需要启动倒计时
      var b=document.getElementsByClassName('b')[0];
      b.innerHTML='';
    if(localStorage.getItem("body")=='微信挂号'){
      var haoyuans  =  JSON.parse(localStorage.getItem('haoyuans'))
       that.regprice = localStorage.getItem('price');
    }else if(localStorage.getItem("body")=='微信处方'){
       that.regprice = localStorage.getItem('price');
    }
    else if(localStorage.getItem("body")=='咨询医生'){
       that.regprice = localStorage.getItem('price');
    }else if(localStorage.getItem("body")=='图文续费'){
       that.regprice = localStorage.getItem('price');
    }
    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
    var wechat = wechatInfo[1] // 获取微信版本号
    that.wechatVersion=wechat.split(".")[0];
    // alert(that.wechatVersion)
  },
  methods: {
    tiaozhaun(){
      if(localStorage.getItem("body")=='微信挂号'){
        this.$router.replace('/GuaorderList')
      }else if(localStorage.getItem("body")=='微信处方'){
        this.$router.replace(`/reportss?stater=0`)
      }
      else if(localStorage.getItem("body")=='咨询医生'){
        this.$router.replace('/inquiryList')
      }else if(localStorage.getItem("body")=='图文续费'){
        this.$router.replace('/inquiryList')
      }
      
    },
    clickets(){
      that.$router.push("/reportss");
    },
    //点击支付挂号
    async onBridgeReady(){
      let that = this;
      if(localStorage.getItem("body")=='微信挂号'){
        var order_no = localStorage.getItem("tradeno"); //用户订单号
        var data ={
          order_no
        }
        let url ="patientRegister/patientRegisterPay";
        var res  = await http.post(that,url,data);
        if(res.errcode==0&&that.wechatVersion>=5){
          // res.data.packages=res.data.package
          // payOrder(data).then(res=>{
            //调用封装的支付函数
            wechatPay.wexinPay(res.data).then(res=>{
               that.isDisabl=false;
              var add = document.getElementsByClassName('add-btn')[0];
              add.style.background="#ccc";
              var herf =localStorage.getItem('herf'); 
              var url  = herf.split('#')[0] + "#/GuaorderList";
              if(localStorage.getItem("body")=='微信挂号'){
                
                that.isDisabl=true;
                that.payzhaungt=true;
                // window.location.replace = ;
                window.location.replace(url);
              }
            }).catch(err=>{
              console.log("支付失败")
            })
        }else if(that.wechatVersion<5){
          alert('微信版本过低，请先升级')
        }
      }else if(localStorage.getItem("body")=='微信处方'){
        var url = 'patientRegister/queryNoPayTotalPrice';
        var recipeIDList = JSON.parse(localStorage.getItem('reportsfang'))
        var data = {
          recipeIDList:JSON.stringify(recipeIDList),
          patientID:localStorage.getItem('cardno')
        }
        var res = await http.post(that,url,data);
        if(res.errcode==0&&that.wechatVersion>=5){
          //  res.data.packages=res.data.package
          // payOrder(data).then(res=>{
            //调用封装的支付函数
            wechatPay.wexinPay(res.data).then(res=>{
                that.isDisabl=false;
                var add = document.getElementsByClassName('add-btn')[0];
                add.style.background="#ccc";
                var herf =localStorage.getItem('herf'); 
                var url  = herf.split('#')[0] + `#/reportss?stater=0`;
              if(localStorage.getItem("body")=="微信处方"){
                      that.isDisabl=true;
                      that.payzhaungt=true;
                      window.location.replace(url);    
                                  
              }
            }).catch(err=>{

              console.log("支付失败")
            })
        }else if(res.errcode==2035){
          that.issubmit =true;
        }else if(that.wechatVersion<5){
          alert('微信版本过低，请先升级')
        }
      }else if(localStorage.getItem("body")=='咨询医生'){
        var url = 'xcxvideo/xcxConsultationPay';
        var type = localStorage.getItem("zxType");
        var order_no = localStorage.getItem("tradeno"); //用户订单号 
        var data = {
          type,order_no
        }
        var res = await http.post(that,url,data);
        if(res.errcode==0&&that.wechatVersion>=5){
          //调用封装的支付函数
            wechatPay.wexinPay(res.data).then(res=>{
              that.isDisabl=false;
              var add = document.getElementsByClassName('add-btn')[0];
              add.style.background="#ccc";
              var herf =localStorage.getItem('herf'); 
              var url
              if(type==2){
                url  = herf.split('#')[0] + "#/inquiryList";
              }else if(type==1){
                url  = herf.split('#')[0] + `#/chatJieMian?orderNo=${order_no}&orderStart=1`;
              }
              if(localStorage.getItem("body")=='咨询医生'){
                that.isDisabl=true;
                that.payzhaungt=true;
                console.log(url)
                window.location.replace(url);    
              }
            }).catch(err=>{
              
              console.log("支付失败")
            })
        }else if(that.wechatVersion<5){
          alert('微信版本过低，请先升级')
        }
      }else if(localStorage.getItem("body")=='图文续费'){
        var url = 'renew/renew';
        var order_no = localStorage.getItem("tradeno"); //用户订单号 
        var data = {
          order_no
        }
        var res = await http.post(that,url,data);
        if(res.errcode==0&&that.wechatVersion>=5){
          //调用封装的支付函数
            wechatPay.wexinPay(res.data).then(res=>{
              that.isDisabl=false;
              var add = document.getElementsByClassName('add-btn')[0];
              add.style.background="#ccc";
              var herf =localStorage.getItem('herf'); 
              var url  = herf.split('#')[0] + `#/chatJieMian?orderNo=${order_no}&orderStart=2`;
              if(localStorage.getItem("body")=='图文续费'){
                that.isDisabl=true;
                that.payzhaungt=true;
                console.log(url)
                window.location.replace(url);    
              }
            }).catch(err=>{
              
              console.log("支付失败")
            })
        }else if(that.wechatVersion<5){
          alert('微信版本过低，请先升级')
        }
      }
    },
    
    //选择支付方式
    xunaze(){
      this.$Message.warning('暂未开通该功能');
    },
    //返回上一层
      tobackdetail(){
         var herf = localStorage.getItem('herf');
         window.location.href=herf;
      },
    //倒计时
      daojis(){
        var that=this;
        setTimeout(function () {
            that.timeFns(localStorage.getItem('time'))
        }, 1000)
      },
      // 计算两个时间差 dateBegin 开始时间 倒计时方法
      timeFns(time) {
          var dateBegin= new Date(time.replace(new RegExp(/-/gm) ,"/")).getTime();
          var dateEnd = new Date();//获取当前时间
          var dateDiff = dateEnd.getTime() - dateBegin;//时间差的毫秒数
          var dayDiff = parseInt(dateDiff / (24 * 3600 * 1000));//计算出相差天数
          var leave1=dateDiff%(24*3600*1000)  //计算天数后剩余的毫秒数
          var hours=parseInt(leave1/(3600*1000))//计算出小时数
          //计算相差分钟数
          var leave2=leave1%(3600*1000)  //计算小时数后剩余的毫秒数
          var minutes=parseInt(leave2/(60*1000))//计算相差分钟数
          //计算相差秒数
          var leave3=leave2%(60*1000)   //计算分钟数后剩余的毫秒数
          var seconds=Math.round(leave3/1000)
          var leave4=leave3%(60*1000)   //计算分钟数后剩余的毫秒数
          var minseconds=Math.round(leave4/1000);
          if(dayDiff==0){
            var a = hours * 60 * 60 + minutes* 60  + seconds; 
            var shengyu = 300 - parseInt(a);
          }else{
            return ''
          }
          var day = parseInt( shengyu/ (24*3600) ); // Math.floor()向下取整 
          var hour = parseInt( (shengyu - day*24*3600) / 3600); 
          var minute = parseInt( (shengyu - day*24*3600 - hour*3600) /60 ); 
          var second = shengyu - day * 24 * 3600 - hour*3600 - minute*60;
          if(shengyu>0){
            this.daojis()
              if(minute<10){
                minute='0' + minute;
              }
              if(second<10){
                second='0' + second;
              }
              var a  = document.getElementsByClassName('a')[0]
              a.innerHTML=minute + ':'+ second
              //  $('.a').html(minute + ':'+ second);
            
          // return minute + ':'+ second;
          }else{
              // b[i].innerHTML='';
              this.isDisabl=true;
              var b= document.getElementsByClassName('b')[0]
              b.innerHTML='支付超时，请重新提交订单'
              // $('.b').html('支付超时，请重新提交订单');
              var add = document.getElementsByClassName('add-btn')[0];
              add.style.background="#ccc"
          }
          
      },
  }
};
</script>

<style scoped>
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.paymentPage {
  overflow: auto;
}
.pem{
 height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.title {
  /* background: #28b8a1; */
  height: 50px;
  text-align: center;
  line-height: 50px;
  /* color: rgb(255, 255, 255); */
  font-size: 16px;
  font-family: PingFangSC-regular;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.payment-show {
  margin: 10px;
  border-radius: 10px;
  padding-top: 20px;
  text-align: center;
  /* border-bottom: 20px solid rgb(204, 204, 204); */
  line-height: 60px;
  background-image: url('./../../../common/imager/beijng.png') ;
    background-repeat: no-repeat;
    background-size:100% 100%; 

}
.payment-title {
 font-family: PingFangSC;
    font-weight: 400;
    font-size: 4.8vw;
    /* color: rgb(16, 16, 16); */
    color: #fff;
    /* padding-bottom: 20px; */
}
.payment-money {
  font-weight: 400;
    font-size: 25px;
    color: #fff;
    /* padding-bottom: 20px; */
    /* border-bottom: 1px dashed #fff; */
}
.payment-tips {
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
}

.add-btn {
  width: 60%;
  border-radius: 40px;
  text-align: center;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  padding: 7px 0;
  border: 0;
  outline: none;
}
.badd-btn {
  width: 60%;
  border-radius: 40px;
  text-align: center;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  padding: 7px 0;
  border: 0;
  outline: none;
}
.btn {
  width: 100%;
  /* position: fixed; */
  text-align: center;
  margin-top: 200px;
}
.payment-mode {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 16px;
  color: rgb(16, 16, 16);
  border-bottom: 1px solid rgb(204, 204, 204);
  /* border-top: 1px solid rgb(204, 204, 204); */
  /* height: 50px; */
  line-height: 50px;
  /* text-align: center; */
  position: relative;
}
.payment-img {
  width: 30px;
  /* height: 40px; */
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
.duihao-img {
  width: 20px;
  /* height: 20px; */
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 100;
}
.duihao-off {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  background: #28b8a1;
  border-radius: 50%;
}
</style>