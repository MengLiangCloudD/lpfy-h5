<template>
  <div class="pem">
    <div class="registeredInfo">
      <div class="tittle">
        预约详情
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
      </div>
      <div class="peopleNameTitle">
        <div>
          <div class="tiao"></div>
            <span class="tiao_txt">就诊信息 ：</span>
          <!-- <span style="margin-left:20px;color:rgb(187,187,187)" v-if="isshowlist">请添加就诊人</span> -->
        </div>
        <div class="peopleList">
          <div class="list-item">
            <div class="people-info">
              <div class="people-info-top">
                <div class="name"><span>就诊人：</span>{{name}}<span></span></div>
                <div class="carno"><span>就诊卡：</span><span>{{cardno }}</span> <span></span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="addPeople" @click="addPeople">
        <Icon type="ios-add-circle" style="margin-right:5px"/>添加/选择其他就诊人信息
      </div>
      <div class="registeredInfo-wrraper">
        <div class="registeredInfo-title">
          <div class="tiao"></div>
            <span class="tiao_txt">挂号信息 ：</span>
          
        </div>
        <p class="registeredInfo-item" style="margin-top:15px;">
          <span class="item-title">就诊医院</span>
          <span class="item-text">滦平县妇幼保健院</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">就诊科室</span>
          <span class="item-text">{{depname}}</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">医事服务费</span>
          <span class="item-text">￥{{regprice}}</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">就诊日期</span>
          <span class="item-date">{{regDate}}</span>
        </p>
        <div class="warning-info">
          <!-- <img src="../../../common/imager/jing.png" alt width="18"> -->
          <span>* 不支持工伤，特病患者微信挂号</span>
        </div>
      </div>
      
      <div class="tip" @click="goNotice()">
        挂号须知
        <div class="icon"></div>
      </div>
      <Modal v-model="ispayment"  @on-ok="toorderlist" title="挂号提示信息">
        <p>您有一个未支付的挂号订单</p>
      </Modal>
      <Modal v-model="paymented"  @on-ok="toorderlist" title="挂号提示信息">
        <p>您已存在一个支付成功的挂号订单</p>
      </Modal>
      <Modal v-model="weika"  @on-ok="weikas" @on-cancel='goHome' title="提示信息">
        <p>请先添加就诊卡</p>
      </Modal>
      <Modal v-model="chongfu"  @on-ok="addchongfu" @on-cancel='addchongfu' title="提示信息">
        <p>您有多张就诊卡，请你进行确认</p>
      </Modal>
      <div class="bttn">
        <div class="btn" @click="topayment">确认挂号</div>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloading"></loading>
  </div>
</template>
<script>
import loading from "@/common/loading";
import tabbar from "@/common/tabbar";
import http from '@/utils/http';

export default {
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      paymented:false,
      ispayment:false,
      //loading动画
      isshowloading: false,
      //科室
      depname: "",
      //就诊日期
      regDate: "",
      //就诊费用
      regprice: null,
      //确认挂号按钮是否可点击的状态
      clickstate: false,
      name:'',
      cardno:'',
      weika:false,
      chongfu:false
    };
  },
  
  async mounted() {
    if(localStorage.getItem('cardno')==undefined||localStorage.getItem('cardno')==''){
        var url ="user/cardList";
        var data = {

        }
        var that = this;
        var res  = await http.post(that,url,data);
        if(res.errcode==0 && res.data.length!==0){
          localStorage.setItem('cardno',res.data[0].cardno);
          localStorage.setItem('cardername',res.data[0].name);
          //type 判断是否需要调用判断重复卡
          // localStorage.setItem('type',0)
        }else{
           that.weika = true;
        }
      }
      if((localStorage.getItem('type')==undefined||localStorage.getItem('type')==null||localStorage.getItem('type')=='')){
            localStorage.setItem('type',1)
          }
    var haoyuans  =  JSON.parse(localStorage.getItem('haoyuans'))
    if(haoyuans.free_type==0){
      this.regDate = this.getcurrentday(haoyuans.clinicdate);
      this.regprice = haoyuans.price;
      this.depname = localStorage.getItem('depname');
    }else if(haoyuans.free_type==1){
      this.regDate = this.getcurrentday(Number(haoyuans.CLINIC_DATE));
      this.regprice = 0;
       this.depname =haoyuans.CLINIC_LABEL;
    }
    
    // this.regprice = haoyuans.price;
    
    this.name= localStorage.getItem('cardername');
    this.cardno=localStorage.getItem('cardno');
    
  },
  methods: {
    //挂号须知
    goNotice(){
      this.$router.push("/notice");
    },
    //取消跳转到首页
    goHome(){
       this.$router.push("/home");
    },
     //获取当天日期
    getcurrentday(te) {
      let currentDay = new Date(te);
      let year = currentDay.getFullYear();
      if((currentDay.getMonth() + 1)<10){
         var  month = '0' + (currentDay.getMonth() + 1);
      }else{
        var month = currentDay.getMonth() + 1;
      }
      if((currentDay.getDate())<10){
        var day = '0' + (currentDay.getDate());
      }else{
        var day = currentDay.getDate();
      }
      let time = year + "-" + month + "-" + day;
      return time;
    },
    //返回上一层
      tobackdetail(){
        var herf = localStorage.getItem('herf');
        if(herf==window.location.href){
          this.$router.push("/home");
        }else{
          window.location.href=herf;
        }
        
      },
      //去往建卡界面
    weikas(){
      localStorage.setItem('herf',window.location.href);
      this.$router.push("/authentication");
      
    },
    //选择就诊人
    addPeople() {
      //去添加一张新卡
        this.$router.push(`/selectuser?stats=0`);
    },
    //确认就诊人
    addchongfu(){
      this.$router.push(`/selectuser?stats=1`);
    },
    //有一个未支付订单去往订单界面
    toorderlist(){
      this.ispayment=false
      this.paymented=false
      this.timeContro=false
      this.$router.push("/GuaorderList");
    },
    //点击确认挂号按钮触发
    async topayment() {
      var that = this;
        //开始插卡改成true，表示在clickstate为true的时候禁止用户再次点击
        if (!that.clickstate) {
          that.clickstate=true;
          var type = localStorage.getItem('type');
          if(type==1){
            var url = 'patientRegister/cardHint';
            var data = {}
            var res  = await http.post(that,url,data);
            if(res.errcode==0){
              if(res.data.type==0){
                that.insertcardinfo();
              }else if(res.data.type==1){
                that.chongfu = true;
              }
            }
          }else{
            that.insertcardinfo();
          }
        } else {
          //这时clickstate的状态为true，禁止向后台发出请求
          return;
        }
      // }
    },
    //向后台传入信息
    async insertcardinfo() {
      let that = this;
      var data = {};
      var haoyuans  =  JSON.parse(localStorage.getItem('haoyuans'))
      if(haoyuans.free_type==0){
        data.regDate = haoyuans.clinicdate; //就诊日期
        data.cardNo = localStorage.getItem('cardno'); //患者卡号
        data.regname = haoyuans.cliniclabel; //号源名称
        data.regcode = haoyuans.cliniclabel; //号源编码
        data.time_region = haoyuans.amorpm; //白天昼夜
        data.noon=localStorage.getItem('noon');
         data.deptcode =  haoyuans.deptcode;
      }else if(haoyuans.free_type==1){
        data.regDate = haoyuans.CLINIC_DATE; //就诊日期
        data.cardNo = localStorage.getItem('cardno'); //患者卡号
        data.regname = haoyuans.CLINIC_LABEL; //号源名称
        data.regcode = haoyuans.CLINIC_LABEL; //号源编码
        data.time_region = haoyuans.TIME_REGION; //白天昼夜
        data.noon=localStorage.getItem('noon');
        data.deptcode =  haoyuans.deptcode;
      }
      // data.body = "微信挂号";
      //定义url地址
      var url ="patientRegister/generateRegisterOrder";
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
        if(res.data.free_type==0){
          localStorage.setItem("tradeno", res.data.order_no); //保存订单号
          localStorage.setItem("time", that.getNowFormatDate());
          that.clickstate = false;
          localStorage.setItem("body", '微信挂号');
          localStorage.setItem("price",that.regprice);
          localStorage.setItem('herf',window.location.href);
          that.$router.push("/payment"); //跳到支付页面
        }else if(res.data.free_type==1){
          that.clickstate = false;
           that.$router.push("/GuaorderList"); //跳到支付页面
        }
        
      }else if(res.errcode==2019){
        setTimeout(() => {
           that.clickstate = false;
          }, 5000);
          that.ispayment=true;
      }else{
        setTimeout(() => {
           that.clickstate = false;
          }, 5000);
        that.$Message.warning(res.errmsg);
      }
    },
    getNowFormatDate() {//获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
    },
    }
};
</script>
<style  scoped>
.pem{
   -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
  background: rgb(238,238,238);
}
.registeredInfo-wrraper {
  padding: 10px 0;
  background: #fff;
  margin: 0 10px;
  margin-top: 8px;
  border-radius: 5px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.registeredInfo {
  overflow: auto;
  padding: 0 0 70px 0;
}
.duihao-off {
  display: inline-block;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  background: #28b8a1;
  border-radius: 50%;
  margin-top: 15px;
}
/* 患者就诊卡列表样式 */
.list-item {
  display: flex;
 
}
.people-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.people-info .card-name {
  color: rgba(132, 132, 132, 1);
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
  margin-top: 5px;
}
.people-info-top {
  color: rgba(16, 16, 16, 1);
  line-height: 20px;
  height: 20px;
}
.people-info-top .name {
  padding: 0 12px;
  /* font-weight: bold; */
  /* border-right: 1px solid rgb(160, 158, 158); */
  line-height: 20px;
  height: 20px;
  margin-bottom: 5px;
}
.people-info-top .carno {
  padding: 0 12px;
  line-height: 20px;
  height: 20px;
  color: rgb(43, 43, 43);
}
.select-icon {
  color: rgba(16, 16, 16, 1);
  width: 50px;
}
.select-icon img {
  margin-top: 15px;
}

/* .registeredInfo {
  overflow: auto;
} */
.tittle {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
/* 个人中心按钮 */
.personicon {
  position: absolute;
  top: 5px;
  right: 20px;
  border-radius: 50%;
}
.peopleNameTitle {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  /* padding: 10px 0; */
  position: relative;
   border-bottom: 1px solid rgba(238, 238, 238, 1);
   background: #fff;
   margin: 5px 10px 0;
   border-radius: 5px 5px 0 0;
}
.peoplelistwraaper {
  display: flex;
}
.tiptext {
  flex: 1;
  margin: 0 10px;
  color: rgba(255, 152, 0, 1);
  font-size: 12px;
  font-family: PingFangSC-regular;
  padding: 0 20px;
  text-align: center;
}
.btnicon {
  width: 60px;
  position: relative;
}
.btnicon img {
  width: 50px;
  position: absolute;
  top: -12px;
  left: 0;
}
.peopleList {
  /* width: 100%; */
  display: inline-block;
  margin-top: 15px;
  /* text-align: right; */
}
.peopleList > div {
  height: 50px;
  /* text-align: center; */
  color: white;
}
.addPeople {
  color: rgba(40, 184, 161, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  text-align: center;
  /* border-bottom: 9px solid rgb(187, 187, 187); */
  
  padding: 9px 0;
  margin: 0 10px 0;
  border-radius: 0 0 5px 5px;
  background: #fff;
  /* line-height: 9px; */
}
.registeredInfo-item {
  padding: 3px 0;
}
.registeredInfo-item {
  font-size: 14px;
}
.registeredInfo-title {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  margin-left: 15px;
  font-family: PingFangSC-regular;
}
.item-title {
  display: inline-block;
  width: 100px;
}
.item-text {
  color: rgba(16, 16, 16, 1);
  font-size: 12px;
  font-family: PingFangSC-regular;
}
.item-date {
  /* color: rgba(255, 152, 0, 1); */
  font-size: 14px;
  font-family: PingFangSC-regular;
}
.registeredInfo-item {
  /* color: rgba(127, 127, 127, 1); */
  font-size: 14px;
  margin-left: 15px;
  font-family: PingFangSC-regular;
}
.item-text {
  font-size: 14px;
}
.warning-info {
  margin-left: 15px;
  color: rgba(154, 154, 154, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  background: #fff;
  padding: 7px;
}
.tip {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  position: relative;
  font-family: PingFangSC-regular;
  padding: 15px 0;
  padding-left: 15px;
  background: #fff;
  margin:  10px;
  border-radius: 5px;
}
.icon {
  display: inline-block;
  border-top: 9px solid transparent;
  border-left: 9px solid rgba(187, 187, 187, 1);
  border-bottom: 9px solid transparent;
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 14px；;
}
.btn {
  background: #28b8a1;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-family: PingFangSC-regular;
  width: 100%;
  padding: 10px 0;
  z-index: 4;
  width: 80%;
  display: inline-block;
  border-radius: 30px;
}
.bttn {
  width: 100%;
  position: relative;
  text-align: center;
  margin: 50px 0;
}
.ivu-btn {
  opacity: 0;
}
.tiao{
  width: 3px;
  height: 15px;
  background: rgb(40,184,161);
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  
}
.tiao_txt{
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
</style>