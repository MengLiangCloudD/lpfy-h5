<template>
  <div class="home-page">
    <div class="appointmentPage">
      <div class="tittle">
        <!-- <p class="pp">咨询</p> -->
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
        滦平县妇幼保健院诊疗平台
      </div>
      <div class="doctorInfo">
        <!-- <p class="doctorName">{{this.$store.getters.getDocName}}</p> -->
        <div class="otherinfo">
          <p class="otherinfo-title">号源名称：</p>
          <p class="otherinfo-text">{{name}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">门诊科室：</p>
          <p class="otherinfo-text">{{deptname}}</p>
        </div><!-- 
        <div class="otherinfo">
          <p class="otherinfo-title">医生职位：</p>
          <p class="otherinfo-text">{{job}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">医生职称：</p>
          <p class="otherinfo-text">{{title}}</p>
        </div> -->
        
        <Poptip  class="avatar" placement="bottom-start" width="300">
          <img class="avatar1" src="./../../../common/imager/avatar.png" alt>
          <!-- <div class="api" slot="content">
              <div  v-for="(item,index) in docxiang" :key="index">
                <img src="./../../../common/imager/avatar.png" alt="" width="50px;"  style="vertical-align: top;z-index:999">
                <div style="vertical-align: top;" class="po">
                  <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                  <p><span>医生编码：</span><span>{{item.username}}</span></p>
                  <p><span>医生职位：</span><span>{{item.job}}</span></p>
                  <p><span>医生职称：</span><span>{{item.title}}</span></p>
                </div>
              </div>
            </div> -->
        </Poptip>
      </div>
      <!-- <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);padding: 0 18px 10px 18px;" v-if="!play">
          <span class="otherinfo-title" style="padding-left: 16.8333vw;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;" @click="disp">医生简介：{{jiajie}}</span> 
        </div>
        <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);padding: 0 18px 18px 18px ; "  v-if="play"  @click="disp">
          <span class="otherinfo-title" style="padding-left: 16.3333vw;" >医生简介：</span>
          <span class="otherinfo-text">{{jiajie}}</span>
        </div> -->
      <div class="divid-line"></div>
      <div class="select-table">
        <div class="zhou" style="padding-right:50px">
          <div v-for="(item,index) in time" :key="index" class="xuanqi"  @click="xuanzeriq(index)">
            <p>{{item.week}}</p>
            <p>{{item.times.substring(item.times.length-5,item.times.length)}}</p>
            <!-- <p v-if="item.start==0" style="color:red">无号</p> -->
          </div>
        </div>
        <div v-if="fannghao">
        <div style="border-bottom: 1px solid rgba(187, 187, 187, 1)">
          <p class="select-item item-color" :class="{pmstate:pmstate=='暂无号源'||pmstate=='未出诊'}">剩余号源：{{pmstate}}</p>
          <div>
            <div style="padding:10px 20px;margin:5px 0px; border-bottom: 1px solid #ccc;">
              <div class="pmoram" size="large"  style="display:flex;padding: 5px;font-size: 16px;">
                <p style="flex:1;color:rgba(40, 184, 161, 1);font-size:16px;padding: 8px 0;">上午号源</p> 
                <Button :disabled="yuyue" @click="amRegistered(1)" size="small" type="primary"  v-if="pmstate=='未约满'">立即预约</Button>
                <Button  :disabled="yuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'">立即预约</Button>
              </div>
            </div>
            <div style="padding:0 20px;margin:5px 0px; ">
              <div class="pmoram" size="large"   style="display:flex;padding: 5px; font-size: 16px;">
                <p style="flex:1;color:rgba(40, 184, 161, 1);font-size:16px;padding: 8px 0;">下午号源</p> 
                <Button :disabled="yuyue" @click="amRegistered(2)" size="small" type="primary"  v-if="pmstate=='未约满'">立即预约</Button>
                <Button  :disabled="yuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'">立即预约</Button>
              </div>
            </div>
            <!-- <p style="padding:0 20px;margin:20px 0px;flex:1">
              <Button :disabled="zixun" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
            </p> -->
          </div>
        </div>
        <div style="display:flex">
          <p style="padding:0 20px;margin:10px 0px;flex:1">
              <Button @click="goZixun()"  size="large" type="primary" long>咨询</Button>
            </p>
            <p style="padding:0 20px;margin:10px 0px;flex:1">
              <Button disabled size="large" type="primary" long>住院</Button>
            </p>
            <p style="padding:0 20px;margin:10px 0px;flex:1">
              <Button  disabled size="large" type="primary" long>复诊</Button>
            </p>
          
        </div>
        </div>
        <div class="rentSsase" v-if="!fannghao">
          <p>放号时间：次日00:00</p>
        </div>
      </div>
      
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloadings"></loading>
  </div>
</template>
<script>
import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
import http from '@/utils/http'
export default {
  name:"appointment",
  components: {
    loading,
    tabbar
  },
  data() {
    return {
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
      yuyue:true,
      fuzhen:true,
      zixun:true,
      flage:false,
      noon:'',
      fannghao:true,
      currentDay:'',
      guahaoIndex:''
    };
  },
  created(){
    this.tab(8);
    // let docCode = this.$route.query.docCode;
    // localStorage.setItem('docCode',docCode);
    // let depCode= this.$route.query.depCode;
    // localStorage.setItem('depCode',depCode);
    var mianfee=JSON.parse(localStorage.getItem('mianfee'));
    this.name = mianfee.clinic_label;
    this.deptname = mianfee.deptname;
  },
  //在mounted钩子里去获取医生的信息 保存支付费用 存储号源编码
 async mounted() {
      var that = this;
      that.isshowloadings=true;
      var timerr = setInterval(async() => {
        if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
           clearInterval(timerr);
          var url ="patientRegister/queryFreeSourceDetails";
          var mianfee=JSON.parse(localStorage.getItem('mianfee'));
          var deptcode =mianfee.deptcode;
          var clinic_label = mianfee.clinic_label;
          var data  = {
            deptcode,clinic_label
          }
          var res  = await http.post(that,url,data);

          if(res.errcode==0){
            that.haoyuan=res.data.list;
          }
          var xuanqi = document.getElementsByClassName('xuanqi');
          xuanqi[0].style.background='rgba(40, 184, 161, 1)';
          xuanqi[0].style.color='#fff';
          that.xuanzeriq(0);
         
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
        
        // if(arr[0].week=='周一'){
        //   for(var i = 0;i<arr.length;i++){
        //     // if(arr[i].week=='周一'){
        //       // arr[i].start = 0;
        //     // }else{
        //       arr[i].start = 1;
        //     // }
        //   }
        // }else if(arr[0].week=='周二'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }else if(arr[0].week=='周三'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'||arr[i].week=='周二'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }else if(arr[0].week=='周四'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'||arr[i].week=='周二'||arr[i].week=='周三'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }else if(arr[0].week=='周五'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'||arr[i].week=='周二'||arr[i].week=='周三'||arr[i].week=='周四'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }else if(arr[0].week=='周六'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'||arr[i].week=='周二'||arr[i].week=='周三'||arr[i].week=='周四'||arr[i].week=='周五'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }else if(arr[0].week=='周日'){
        //   for(var i = 0;i<arr.length;i++){
        //     if(arr[i].week=='周一'||arr[i].week=='周二'||arr[i].week=='周三'||arr[i].week=='周四'||arr[i].week=='周五'||arr[i].week=='周六'){
        //       arr[i].start = 0;
        //     }else{
        //       arr[i].start = 1;
        //     }
        //   }
        // }
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
      var a  = Number(te)
      let currentDay = new Date(a);
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
      // if (this.pmstate == "约满"||this.pmstate == "暂无号源") {
      //   //弹出名额已满的提示信息。
      //   this.$Modal.info({
      //     title: "提示信息",
      //     content: "暂无号源!"
      //   });
      //   return;
      // } else {
        localStorage.setItem('noon',index)
        this.pandun();
      // }
    },
    //判断是否有卡
    pandun(){
      //开启加载动画
      let _this = this;
      // if(localStorage.getItem('docCode')==null||localStorage.getItem('docCode')=='null'||localStorage.getItem('docCode')==undefined||localStorage.getItem('depname')==null||localStorage.getItem('depname')=='null'||localStorage.getItem('depname')==undefined||localStorage.getItem('depCode')==null||localStorage.getItem('depCode')=='null'||localStorage.getItem('depCode')==undefined||localStorage.getItem('docName')==null||localStorage.getItem('docName')=='null'||localStorage.getItem('docName')==undefined){
      // _this.$Modal.warning({//超时提示：网络不稳定
      //     title: '友情提示',
      //     content: '获取信息异常，请重新获取',
      // });
      //   _this.$router.push("/home");      
      //   return              
      // }else{
         localStorage.setItem('herf',window.location.href);
        _this.$router.push("/registeredInfo");
        
       
      // }
    },
    //存储医生信息
    savedoctorinfo(index) {
      let that = this;
      that.isshowloadings=false;
      let currentDay=that.time[index].times;
      //把返回的医生详细信息的费用 号源源码 号源名称保存到vuex
      var haoyuans='';
      for(var i = 0;i<that.haoyuan.length;i++){
        if(that.getcurrentday(that.haoyuan[i].CLINIC_DATE)==currentDay){
          haoyuans=that.haoyuan[i];
        }
      }
      var a = 0;
      if(haoyuans!==''){
        // if(haoyuans.ghzt!=1){
            // var str = haoyuans.cliniclabel;
            // if(str.indexOf(that.name) !== -1){
                // a = 1
                var yua = JSON.stringify(haoyuans);
                localStorage.setItem('haoyuans',yua)
                that.pmstate = '未约满';
                // that.doctorRole=JSON.parse(haoyuans.doctorrole);
                //判断权限 是否有挂号 咨询 复诊权限
                // for(var i =0;i<that.doctorRole.length;i++){
                //   if(that.doctorRole[i]==2){
                    that.yuyue=false;
                //   }
                  // if(that.doctorRole[i]==1){
                  //   that.zixun=false;
                  // } 
                  // if(that.doctorRole[i]==0){
                    // that.fuzhen=false;
                  // }
                // }
            // }
        // }else{
        //   that.pmstate = '未出诊';
        //  that.yuyue=true;
        // }
      }else{
        
        that.pmstate = '暂无号源';
        that.yuyue=true;
      }
      if(that.numeer==1){
      }
    },
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
  padding-left: 80px;
  position: relative;
  margin-top: 20px;
  display: inline-block;
  vertical-align: middle;
  padding-bottom: 10px;
}
.select-table{
    padding-top: 5px;
    border-top: 1px solid #ccc;
}
.doctorInfo .doctorName,
.doctorInfo .otherinfo {
  margin-bottom: 6px;
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
    top: 5.33333vw;
    width: 13.33333vw;
    height: 13.33333vw;
    position: absolute;
        left: -0.2vw;
    top: -11.66667vw;
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
  padding: 10px 20px;
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
  color: green;
  
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
.zhou div{
  text-align: center;
    padding: 2.66667vw 2.13333vw;
    /* display: inline-block; */
    border: 1px solid #ccc;
    margin: 0 5px;
    border-radius: 1.33333vw;
}
.zhou::-webkit-scrollbar {
      display: none; /* Chrome Safari */
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
.rentSsase{
  text-align: center;
  margin: 15px 0;
  border-top: 1px solid #ccc;
  padding: 15px ;
  font-size: 18px;
  color:  rgba(40, 184, 161, 1);;
}
</style>