<template>
  <div class="home-page">
    <div class="appointmentPage">
      <div class="tittle">
        <!-- <p class="pp">咨询</p> -->
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
        医生预约
      </div>
      <div class="doctorInfo">
        <!-- <p class="doctorName">{{this.$store.getters.getDocName}}</p> -->
        <div class="otherinfo">
          <p class="otherinfo-title">姓名：</p>
          <p class="otherinfo-text">{{name}}&nbsp;&nbsp;{{job}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">科室：</p>
          <p class="otherinfo-text">{{deptname}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">服务人数：</p>
          <p class="otherinfo-text">{{patient_num}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">好评率：</p>
          <p class="otherinfo-text">100%</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">职称：</p>
          <p class="otherinfo-text">{{title}}</p>
        </div>
        
        <Poptip  class="avatar" placement="bottom-start" width="300">
            <img class="avatar1" src="./../../../common/imager/avatar.png" alt v-if="head_image==''">
            <img class="avatar1" :src="head_image" alt v-else >
          <div class="api" slot="content">
              <div  v-for="(item,index) in docxiang" :key="index">
                <!-- <img src="./../../../common/imager/avatar.png" alt="" width="50px;"  style="vertical-align: top;z-index:999" v-if="head_image==''"> -->
                <!-- <img :src="head_image" alt width="50px;"  style="vertical-align: top;z-index:999" v-else >
                <div style="vertical-align: top;" class="po">
                  <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                  <p><span>医生编码：</span><span>{{item.username}}</span></p>
                  <p><span>医生职位：</span><span>{{item.job}}</span></p>
                  <p><span>医生职称：</span><span>{{item.title}}</span></p>
                </div> -->
              </div>
            </div>
        </Poptip>
        <Button shape="circle" style="padding: 3px;width: 70px;position: absolute;left: 8vw;top: 29.3333vw;backgroung: #fff;color:rgba(40, 184, 161, 1);border:1px solid rgba(40, 184, 161, 1); " v-if="flage">已关注</Button>
      <Button shape="circle" style="padding: 3px;width: 70px;position: absolute;left: 8vw;top: 29.3333vw;backgroung: #fff;color:rgba(40, 184, 161, 1);border:1px solid rgba(40, 184, 161, 1);" v-if="flage==false" @click="attention()">关注</Button>
      </div>
      
      <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);" v-if="!play">
          <span class="otherinfo-title" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;" @click="disp">简介：{{jiajie}}</span> 
        </div>
        <div class="otherinfo1"  style="border-bottom: 1px solid rgba(187, 187, 187, 1);"  v-if="play"  @click="disp">
          <span class="otherinfo-title" >简介：</span>
          <span class="otherinfo-text">{{jiajie}}</span>
        </div>
      <div class="divid-line"></div>
      <div class="select-table">
        <div class="zhou" style="padding-right:50px">
          <div v-for="(item,index) in time" :key="index" class="xuanqi" @click="xuanzeriq(index)">
            <p>{{item.week}}</p>
            <p>{{item.times.substring(item.times.length-5,item.times.length)}}</p>
            <!-- <p v-if="item.start==0" style="color:red">无号</p> -->
          </div>
          <!-- <div></div> -->
          <!-- <div class="left_hua" style="border-radius: 0;border:0;border-left: 1px solid #ddd;width: 30px;">

          </div> -->
        </div>
        <div v-if="fannghao">
          <div style="border-bottom: 1px solid rgba(187, 187, 187, 1);background:#fff; margin:0 10px; border-radius: 5px;">
            <p class="select-item item-color" :class="{pmstate:pmstate=='暂无号源'||pmstate=='未出诊'}">剩余号源：{{pmstate}}</p>
            <div>
              <div style="padding:10px 20px;margin:5px 0px; border-bottom: 1px solid #ccc;">
                <div class="pmoram" size="large"  style="display:flex;padding: 5px;font-size: 16px;">
                  <p style="flex:1;font-size:16px;padding: 8px 0;">上午号源</p> 
                  <Button :disabled="amyuyue" @click="amRegistered(1)" size="small" type="primary"  v-if="pmstate=='未约满'" :class="pmyuyue==false?'yuyueBtn':'yuyueBtn1'">立即预约</Button>
                  <Button  :disabled="amyuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'" :class="pmyuyue==false?'yuyueBtn':'yuyueBtn1'">立即预约</Button>
                </div>
              </div>
              <div style="padding:0 20px;margin:5px 0px; ">
                <div class="pmoram" size="large"   style="display:flex;padding: 5px; font-size: 16px;">
                  <p style="flex:1;font-size:16px;padding: 8px 0;">下午号源</p> 
                  <Button :disabled="pmyuyue" @click="amRegistered(2)" size="small" type="primary"  v-if="pmstate=='未约满'" :class="pmyuyue==false?'yuyueBtn':'yuyueBtn1'" >立即预约</Button>
                  <Button  :disabled="pmyuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'" :class="pmyuyue==false?'yuyueBtn':'yuyueBtn1'">立即预约</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="button_info">
            <p @click="goZixun()" style="display:flex">
              <span style="flex:1">咨询</span> 
              <span><img src="./../../../common/imager/fanhui.png" alt="" height="15"></span>
            </p>
            <p style="display:flex" @click="goQita()">
              <span style="flex:1">住院</span>
              <span><img src="./../../../common/imager/fanhui.png" alt="" height="15"></span>
            </p>
            <p style="display:flex" @click="goQita()">
              <span style="flex:1">复诊</span>
              <span><img src="./../../../common/imager/fanhui.png" alt="" height="15"></span>
            </p>
          </div>
        </div>
        <div class="rentSsase" v-if="!fannghao">
          <p>放号时间：次日00:00</p>
        </div>
      </div>
    </div>
    <Modal
        v-model="modal1"
        title="温馨提示" 
        @on-ok="ok">
        <p>距离医生下班时间已不足半小时，请问您是否继续。</p>
    </Modal>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloadings"></loading>
  </div>
</template>
<script>
import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
import wechatPay from "@/WXconfig/wechatPay"
import http from '@/utils/http'
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+ mon;
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

if( currentDay.getHours()<10){
  var mon =  currentDay.getHours();
  var Hours = '0'+mon;
}else{
  var Hours = currentDay.getHours(); 
}
if( currentDay.getMinutes()<10){
  var mon =  currentDay.getMinutes();
  var Minutes = '0'+mon;
}else{
  var Minutes = currentDay.getMinutes(); 
}
var shjianTime = currentDay.toLocaleTimeString('chinese', { hour12: false });
//当前年月日
var time = year + "-" + month;
var dantian = year+ "-" + month + "-" + day;
export default {
  name:"appointment",
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      modal1:false,
      //返回的医生详细信息
      doctor: [],
      //pmstate 号源剩余的状态
      pmstate: "",
      //控制加载动画的显示
      isshowloadings: false,
      docxiang:[],
      jiajie:'',
      RegID:'',
      play:false,
      time:[],
      title:'',
      haoyuan:[],
      job:'',
      name:'',
      deptname:'',
      numeer:1,
      doctorRole:'',
      amyuyue:true,
      pmyuyue:true,
      fuzhen:true,
      zixun:true,
      flage:false,
      noon:'',
      head_image:'',
      fannghao:true,
      currentDay:'',
      guahaoIndex:'',
      patient_num:''
    };
  },
  created(){
    this.tab(8);
    let docCode = this.$route.query.docCode;
    localStorage.setItem('docCode',docCode);
    let depCode= this.$route.query.depCode;
    localStorage.setItem('depCode',depCode);
    var url = `http://lpfy-h5-test.yhtcs.cn/#/appointment?depCode=${depCode}&docCode=${docCode}`
      wechatPay.onMenuShareAppMessage(url).then(res=>{
            alert("分享微信好友成功！");
      });
  },
  //在mounted钩子里去获取医生的信息 保存支付费用 存储号源编码
 async mounted() {
      var that = this;
      that.isshowloadings=true;
      var timerr = setInterval(async() => {
        if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
           clearInterval(timerr);
          that.doctorxinxi();
          var url ="patientRegister/queryDoctorScheduling";
          var doctorCode =localStorage.getItem('docCode');
          var deptCode = localStorage.getItem('depCode');
          var data  ={
            deptCode,doctorCode
          }
          var res  = await http.post(that,url,data);
          var arr =JSON.parse(res)
          if(arr.status==1){
            that.haoyuan=arr.data;
          }
          var xuanqi = document.getElementsByClassName('xuanqi');
          xuanqi[0].style.background='rgba(40, 184, 161, 1)';
          xuanqi[0].style.color='#fff';
          that.xuanzeriq(0);
          that.orguandoc();
         
        }
      }, 500)
  },
 async beforeDestroy(){
      //只在页面加载时执行一次
      //定义url地址
      if(!localStorage.getItem('cardno')){
        var url ="user/cardList";
        var data = {

        }
        var that = this;
        var res  = await http.post(that,url,data);
        if(res.errcode==0 && res.data.length!==0){
          localStorage.setItem('cardno',res.data[0].cardno);
          localStorage.setItem('cardername',res.data[0].name);
        }else{

        }
      }
  },
  methods: {
    goQita(){
      this.$Message.info('暂未开通')
    },
    //去咨询
    goZixun(){
      var that = this;
      //存储医生id
        localStorage.setItem('doctorCode',that.docxiang[0].username);
        localStorage.setItem('doctor_id',that.docxiang[0].doctor_id);
        localStorage.setItem('herf',window.location.href);
        this.$router.push("/docparticular");
    },
    //关注医生
    async attention() {
      var that = this;
      //取地openid
      if(localStorage.getItem('cardno')!=undefined&& localStorage.getItem('cardno')!=''){
        var url ="follow/patientFollowDoctor";
        //医生编号
        var doctor_code = localStorage.getItem("docCode");
        var doctor_name = that.name;
        var user_name = localStorage.getItem("cardername");
        var data = {
          doctor_code,doctor_name,user_name
        }
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          that.$Message.success("关注成功");
          that.flage = true;
        }else{
              that.$Message.error(res.errmsg);
            }
      }else{
        localStorage.setItem('herf',window.location.href);
        that.$router.push("/authentication");
        
      }
    },
    tab(dayNum){
        var oDate = new Date();   //获取当前时间
        var dayArr = [oDate];     //定义一个数组存储所以时间
        var arr = []
        for(var i=0;i<dayNum;i++){
            dayArr.push(new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate() + i));   //把未来几天的时间放到数组里
        }
        for(var i=0;i<dayArr.length;i++){
            var y = dayArr[i].getFullYear();
            var m = dayArr[i].getMonth() + 1;
            if(m<10){
              m ='0'+m
            }
            var d = dayArr[i].getDate();
            if(d<10){
              d ='0'+d
            }
            var h = dayArr[i].getHours();
            var f = dayArr[i].getMinutes();
            // var s = dayArr[i].getSeconds();
            var week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[dayArr[i].getDay()];
            arr.push({times:y+"-"+m+"-"+ d,week:week});
        }
        arr.shift();
        arr[0].week='今日'
        this.time=arr;  
    },
    //选择挂号时间
    xuanzeriq(index){
      
        var xuanqi = document.getElementsByClassName('xuanqi');
        for(var i =0;i<xuanqi.length;i++){
          xuanqi[i].style.background='#fff'
          xuanqi[i].style.color='#000'
        }
        xuanqi[index].style.background='rgba(40, 184, 161, 1)'
        xuanqi[index].style.color='#fff'
        if(index==7){
          this.fannghao=false;
        }else{
          this.fannghao=true;
          this.savedoctorinfo(index);
        }
        
      // }else{
      //   // this.pmstate = '暂无号源';
      //   // this.yuyue=true;
      // }
      
    },
    disp(){
        this.play=!this.play
    },
    //返回上一层
    tobackdetail(){
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
    //去挂号 存储当天日期到vuex仓库 如果有预约号了就跳到确认挂号页，如果没有有预约号就跳弹窗提示
    amRegistered(index){
      if (this.pmstate == "约满"||this.pmstate == "暂无号源") {
        //弹出名额已满的提示信息。
        this.$Modal.info({
          title: "提示信息",
          content: "暂无号源!"
        });
        return;
      } else {
        //判断当前时间与医生下班时间
        if(this.currentDay==dantian){
          if(shjianTime>"11:30:00"&&shjianTime<"12:00:00"){
              if(index==1){
                this.modal1=true;
              }else{
                localStorage.setItem('noon',index)
                this.pandun();  
              }
                this.guahaoIndex=index
          }else if(shjianTime>"17:00:00"&&shjianTime<"17:30:00"){
                 if(index==2){
                  this.modal1=true;
                }
                this.guahaoIndex=index
          }else{
            localStorage.setItem('noon',index)
            this.pandun();  
          }
        }else{
          localStorage.setItem('noon',index)
          this.pandun();  
        }
      }
    },
    ok(){
      localStorage.setItem('noon',this.guahaoIndex)
      this.pandun();  
    },
    //判断是否有卡
    pandun(){
      //开启加载动画
      let _this = this;
      if(localStorage.getItem('docCode')==null||localStorage.getItem('docCode')=='null'||localStorage.getItem('docCode')==undefined||localStorage.getItem('depname')==null||localStorage.getItem('depname')=='null'||localStorage.getItem('depname')==undefined||localStorage.getItem('depCode')==null||localStorage.getItem('depCode')=='null'||localStorage.getItem('depCode')==undefined||localStorage.getItem('docName')==null||localStorage.getItem('docName')=='null'||localStorage.getItem('docName')==undefined){
      _this.$Modal.warning({//超时提示：网络不稳定
          title: '友情提示',
          content: '获取信息异常，请重新获取',
      });
        _this.$router.push("/home");      
        return              
      }else{
         localStorage.setItem('herf',window.location.href);
        _this.$router.push("/registeredInfo");
        
       
      }
    },
    //存储医生信息
    savedoctorinfo(index) {
      let that = this;
      that.isshowloadings=false;
      let currentDay=that.time[index].times;
      that.currentDay=currentDay;
      //把返回的医生详细信息的费用 号源源码 号源名称保存到vuex
      var haoyuans='';
      for(var i = 0;i<that.haoyuan.length;i++){
        if(that.getcurrentday(that.haoyuan[i].clinicdate)==currentDay){
          haoyuans=that.haoyuan[i];
        }
      }
      var a = 0;
      if(haoyuans!==''){
        if(haoyuans.ghzt!=1){
            var str = haoyuans.cliniclabel;
            if(str.indexOf(that.name) !== -1){
                a = 1
                var yua = JSON.stringify(haoyuans);
                localStorage.setItem('haoyuans',yua)
                that.pmstate = '未约满';
                // that.doctorRole=JSON.parse(haoyuans.doctorrole);
                //判断权限 是否有挂号 咨询 复诊权限
                // for(var i =0;i<that.doctorRole.length;i++){
                  // try{
                    
                    // if(that.doctorRole[i]==2){
                      that.amyuyue=false;
                      that.pmyuyue=false;
                      // if(currentDay==dantian){
                        // if(shjianTime>'12:00:00'){
                          // that.amyuyue=true;
                        // }
                        // if(shjianTime>'17:30:00'){
                          // that.amyuyue=true;
                          // that.pmyuyue=true;
                        // }
                      // }
                    // }
                  // }catch(err){
                  //   console.log(err)
                  //   console.log(err.message);
                  // }
                // }
            }
        }else{
          that.pmstate = '未出诊';
         that.amyuyue=true;
         that.pmyuyue=true;
        }
      }else{
        that.pmstate = '暂无号源';
        that.amyuyue=true;
        that.pmyuyue=true;
      }
      if(that.numeer==1){
        
      }
     console.log(that.pmyuyue);
    },
    //查看医生详细信息
    async doctorxinxi(){
      // $(".zhe").css("display","block");
      var that = this;
      var url = "patientRegister/queryDoctorInfoByDoctorCode";
      var doctorCode=localStorage.getItem('docCode')
      var deptCode=localStorage.getItem('depCode')
      var data ={
        doctorCode,
        deptCode
      }
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
        that.docxiang=res.data;
        that.title = that.docxiang[0].title;
        that.name = that.docxiang[0].name;
        if(that.docxiang[0].head_image){
           that.head_image=that.docxiang[0].head_image
        }
        localStorage.setItem('docName',that.name);
        that.deptname=that.docxiang[0].deptname;
        localStorage.setItem('depname',that.deptname);
        that.job = that.docxiang[0].job;
       that.patient_num=that.docxiang[0].patient_num; 
        if(res.data[0].expertjob!==undefined){
            that.jiajie=res.data[0].expertjob;
        }else{
          that.jiajie='无'
        }
      }
    },
    //判断是否关注该医生
    async orguandoc(){
      var that = this;
      var url  ='follow/queryIfFollow';
      var doctor_code = localStorage.getItem("docCode");
      var data = {
        doctor_code
      }
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
        if(res.data==1){
          that.flage = true;
        }else{
          that.flage = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.ivu-poptip-popper{
  top: 45px !important;
    left: 0px !important;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}

.appointmentPage {
  overflow: auto;
  padding: 0 0 70px 0;
}
.home-page {
  height: 100%;
  overflow: auto;
  background: rgb(238,238,238);
}
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
.pp{
   position: absolute;
  right: 10px;
  top: 0px;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.doctorInfo {
  padding-left: 120px;
  position: relative;
  padding-top: 20px;
  /* display: inline-block; */
  vertical-align: middle;
  background: #fff;
  margin: 0 10px;
  margin-top: 5px;
  border-radius: 5px 5px 0 0;
}
.doctorInfo .doctorName,
.doctorInfo .otherinfo {
  padding-bottom: 6px;
}
.doctorName {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  font-weight: bolder;
}
.po{
  line-height: 2;
  display: inline-block;
  padding-left: 10px;
}
.otherinfo {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  display: flex;
}
.otherinfo1{
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  background: #fff;
  margin: 0 10px;
  border-radius: 0 0 5px 5px;
  padding: 0 18px 18px 120px ; 
}
.otherinfo .otherinfo-title {
  flex-shrink: 0;
}
.otherinfo .otherinfo-text {
  padding-right: 18px;
}
.avatar {
  border-radius: 50%;
  top: 20px;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 18px;
  top: 25px;
}
.avatar1 {
  border-radius: 50%;
    width: 13.33333vw;
    height: 13.33333vw;
    position: absolute;
    left: 4.8vw;
    top: 4.33333vw;
}
 
.date {
  display: flex;
  margin: 18px 0;
}
.date .date-left {
  display: flex;
  padding-right: 20px;
  margin: 0 10px;
  overflow: auto;
}
.date .date-left .dateitem {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: rgba(40, 184, 161, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}
.date .date-left .dateitem p {
  text-align: center;
  color: white;
}
.date-right {
  flex: 1;
  padding-top: 6px;
}
.date-right .text {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  margin: 5px 0;
  text-align: center;
}
.date-right .iconwrraper {
  text-align: center;
}
.date-right .icon {
  display: inline-block;
  border-top: 9px solid rgba(187, 187, 187, 1);
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
}
.select-item {
  font-size: 14px;
  font-family: PingFangSC-regular;
  margin-top: 10px;
  padding:  10px 20px;
  background: #fff;
  /* height: 60px; */
  /* line-height: 60px; */
  /* border-bottom: 1px solid rgba(187, 187, 187, 1); */
}
.calendar {
  text-align: center;
}
.weekwrraper {
  display: inline-block;
  text-align: left;
}
.weekwrraper > div {
  display: inline-block;
}
.weekwrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.daywrraper {
  display: inline-block;
}
.daywrraper > div {
  text-align: left;
  display: inline-block;
  width: 350px;
}
.daywrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.item-color {
  /* color: green; */
  color: rgb(34,34,34);
  border-radius: 5px;
  
}
.amstate {
  color: red;
}
.pmstate {
  color: red;
}
.zhou{
     display: -webkit-box;
    display: -ms-flexbox;
    /* display: flex; */
    -ms-flex-pack: distribute;
    justify-content: space-around;
    width: 100%;
    margin: 2.66667vw 0 0 0;
    
    overflow-x: auto;
}
.zhou::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
.zhou div{
  text-align: center;
    padding: 2.66667vw 2.13333vw;
    /* display: inline-block; */
    border: 1px solid #ccc;
    margin: 0 5px;
    border-radius: 1.33333vw;
}

.div>input{
    display: none;
    
}
.div>label{
    position: relative;
    margin-right: 34px;
    display: block;
    /* line-height: 2; */
    font-size:16px;
}
.div>label::before{
    display: inline-block;
    content: "";
    width: 5.26667vw;
    height: 5.26667vw;
    /* border-radius: 50%; */
    border: 1px solid rgb(219, 219, 219);
    margin-right: 6px;
    vertical-align: bottom;
}
.div>input:checked+label::before{
    background-color:#1989fa;
}
.div>input:checked+label::after{
    display: inline-block;
    content: "";
    width: 2vw;
    height: 2vw;
    /* border-radius: 50%; */
    position: absolute;
    left: 1.7vw;
    bottom: 1.7vw;
    background-color: white;
    
}

.pmoram{
  font-size:14px;
  background: #fff;
  color: #000;
  padding: 10px;
  /* border-radius: 5px; */
  /* text-align: center; */
  
}
.pqw{
  font-size:14px;
  background: rgb(40, 184, 161);
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}
.activeswitchopen{
  background:#eee !important;
  color:#ccc !important;
}
.left_hua{
   position: absolute;
    box-shadow: 0 0 10px  #ddd;
    
    background: #fff;
    right: -2px;
    top: -2.66667vw;
    height: 70px;
    
}
.select-table{
  position: relative;
}
.rentSsase{
  text-align: center;
  margin: 15px 0;
  border-top: 1px solid #ccc;
  padding: 15px ;
  font-size: 18px;
  color:  rgba(40, 184, 161, 1);;
}
.yuyueBtn{
  background: rgb(40,181,161);border-radius: 20px;padding: 1px 4.86667vw 0.53333vw;
border: 0;
}
.yuyueBtn1{
  background:#eee;border-radius: 20px;padding: 1px 4.86667vw 0.53333vw;
border: 0;
}
.button_info{
  background: #fff;
  margin: 10px;
  border-radius: 5px;
}
.button_info p {
  padding: 10px 20px;
  border-bottom: 1px solid rgb(238,238,238);
  font-size: 3.73333vw
}
</style>