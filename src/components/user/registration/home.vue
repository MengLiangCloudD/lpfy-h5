<template>
  <div class="home-wrapper">
    <div class="home-page">
      
      <div class="tittle">找医生</div>
      <div class="hospital-info">
        <img class="logo-img" src="./../../../common/imager/logo.jpg" width="70" height="70" alt>
        <div class="infor_title">
          <p class="h-name">滦平县妇幼保健院</p>
          <p class="other-info"  @click="gomap"><span style="vertical-align: middle;display: inline-block;">地址：滦平镇居安里56号</span>  <span style="vertical-align: middle;padding-left:15px;"><svg t="1595387095934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4440" width="30" height="30"><path d="M501.097 819.37l11.466 11.807 11.469-11.807c0.717-0.717 71.434-73.667 141.172-163.211 95.188-122.172 143.47-216.060 143.47-279.039 0-73.71-31.012-142.91-87.29-194.842-55.839-51.571-130.027-79.971-208.822-79.971-78.814 0-152.979 28.399-208.82 79.97-56.299 51.933-87.291 121.133-87.291 194.842 0 62.979 48.282 156.867 143.468 279.039 69.741 89.545 140.458 162.495 141.177 163.212zM512.561 277.126c56.38 0 102.268 46.546 102.268 103.743 0 57.235-45.888 103.78-102.268 103.78-56.377 0-102.266-46.546-102.266-103.78 0-57.197 45.889-103.743 102.266-103.743zM686.902 753.717l-25.627 25.607c16.793 10.81 26.722 22.895 26.722 34.543 0 32.986-76.142 69.837-178.068 69.837-101.927 0-178.069-36.852-178.069-69.837 0-12.724 11.548-25.967 31.33-37.534l-23.214-27.359c-27.142 17.628-43.077 39.965-43.077 64.853 0 60.028 91.557 105.298 213.030 105.298 121.472 0 213.009-45.231 213.009-105.298-0.038-22.656-13.162-43.278-36.035-60.109z" fill="#d81e06" p-id="4441"></path></svg></span></p>
        </div>
          
      </div>
      <div class="doctor-list">
        <div class="tab-list" id="tab-list">
          <div
            class="tab-item"
            @click="selectItem(index,item)"
            :class="{activeItem:currentIndex==index}"
            v-for="(item,index) in doctorType"
            :key="index"
          >
          <div :class="{tiao:currentIndex==index}"></div>
            <span class="tiao_txt">{{item.depname}}</span>
          </div>
        </div>
        <div class="doctors" v-if="singleDoctorList.length!==0&&singleDoctorList!=='undefine'&&doctorType.length-1!=currentIndex">
          <div
            class="doctor-item"
            v-for="(item,index) in singleDoctorList"
            :key="index"
            @click="toAppointment(item)"
          >
            <!-- <p class="line"></p> -->
            <img class="avatar" src="./../../../common/imager/avatar.png" width="40" height="40" alt v-if="item.head_image==undefined||item.head_image==0||item.head_image==null">
            <img class="avatar" :src="item.head_image" width="40" height="48" alt v-else style="border-radius: 50%;">
            <div class="doctor-info">
              <p>{{item.docname}}</p>
            </div>
            <img src="./../../../common/imager/fanhui.png" class="fanhui" alt="">
          </div>
        </div>
        <div class="doctors" v-if="singleDoctorList.length!==0&&singleDoctorList!=='undefine'&&doctorType.length-1==currentIndex">
          <div
            class="doctor-item"
            v-for="(item,index) in singleDoctorList"
            :key="index"
            @click="toAppointment(item)"
          >
            <!-- <p class="line"></p> -->
            <img class="avatar" src="./../../../common/imager/avatar.png" width="40" height="40" alt>
            <div class="doctor-info">
              <p style="font-size:20px">{{item.clinic_label}}</p>
            </div>
            <img src="./../../../common/imager/fanhui.png" class="fanhui" alt="">
          </div>
        </div>
        <div class="doctors" v-if="singleDoctorList.length==0||singleDoctorList=='undefine'">
          <div class="doctor-info">
            <p>暂无号源</p>
          </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="errormodal"
        title="提示">
        <p>{{infomsg}}</p>
    </Modal>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import tabbar from "@/common/tabbar";
import http from '@/utils/http'
import loading from '@/common/loading'
import wechatPay from "@/WXconfig/wechatPay"
export default {
  name:"homePage",
  components: {
    tabbar,
    loading
  },
  data() {
    return {
      infomsg:"",
      errormodal:false,
      currentIndex: 0, //当前索引值，用来控制当前选中科室的样式
      departmentsinfo: {}, //处理过得请求返回的所有数据，包含各科室和所有的医生
      doctorType: [], //所有科室名称的列表
      singleDoctorList: [], //对应整合之后科室的医生列表
      //扫一扫参数 
      appId: "",
      timestamp: "",
      nonceStr: "",
      signature: "",
      //控制loading组件显示
      isshowloading: false,
      //控制扫一扫显示
      isscan: false,
      key1:"",
      value1:"", 
      key2:"",
      value2:""
    };
  },
  created(){
  },
  mounted() {
    var that = this;
    that.isshowloading=true;
    var timerr = setInterval(() => {
      if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
         that.getDepartments();
          that.qingq();
          clearInterval(timerr);
      }
    }, 500);
    
    
  },

  update() {
    var that = this;
    var timerr = setInterval(() => {
      if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
         that.getDepartments();
          that.qingq();
          clearInterval(timerr);
      }
    }, 500);
  },
  methods: {
    gomap(){
      window.location.href='https://apis.map.qq.com/tools/routeplan/eword=%E6%BB%A6%E5%B9%B3%E5%8E%BF%E5%A6%87%E5%B9%BC%E4%BF%9D%E5%81%A5%E9%99%A2&epointx=40.928110&epointy=117.324980?referer=myapp&key=645BZ-5TQWF-WMFJP-N4QG5-DEWNZ-SNFLI'
    },
    async qingq(){
       if(localStorage.getItem('cardno')==undefined||localStorage.getItem('cardno')==''){
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
    //-----------------------------------------------------------------------------------------------------//
    //跳转到预约页面  跳转页面时确定 医生的名字和编号并保存到vuex仓库
    toAppointment(item) {
      if(this.currentIndex!=this.doctorType.length-1){
        //跳转到对应医生的预约页面
        this.$router.push(
          `/appointment?depCode=${item.deptcode}&docCode=${item.doccode}`
        );
      }else if(this.currentIndex==this.doctorType.length-1){
        localStorage.setItem('mianfee',JSON.stringify(item));
        this.$router.push(
          `/mianAppointmen`
        );
        
      }
      
      
    },
    //科室切换
    selectItem(index,item) {
      if(this.currentIndex==index){
        return
      }
      if(index==this.doctorType.length-1){
        this.forfreedoctors();
        this.currentIndex = index;
      }else{  
        this.searchdoctors(item.depCode);
        this.currentIndex = index;
      }
      
    },
    // 查询免费号医生
    async forfreedoctors(){
      var that = this;
      var data = {

      }
      var url  = 'patientRegister/freeSourceList';
      var res  = await http.post(that,url,data);
      that.singleDoctorList = [];
      if(res.errcode==0&&res.data!==null){
          that.singleDoctorList =res.data;
      }
      return that.singleDoctorList;
    },
    //查询一个科室的医生
    async searchdoctors(depCode) {
     var that = this;
      var deptCode =depCode;
      var url  = 'patientRegister/queryDoctorsByDeptCode';
      var data  ={
        deptCode
      }
      var res  = await http.post(that,url,data);
      that.singleDoctorList = [];
      if(res.errcode==0&&res.data!==null){
          that.singleDoctorList =res.data;
      }
      return that.singleDoctorList;
    },
    //处理获取医生的数据 此方法只在页面加载时触发一次
    _dealdata(data) {
      var _this = this;
      //获取合并之后某个科室的医生（先默认设置为第一个科室）
      //通过doctortype的键值name来查询对应的科室医生
      _this.doctorType=data
      if(_this.$route.query.depCode==undefined||_this.$route.query.depCode==null||_this.$route.query.depCode==''){
        _this.searchdoctors(_this.doctorType[0].depCode);
      }else{
        for(var i = 0;i<_this.doctorType.length;i++){
          if(_this.doctorType[i].depCode==_this.$route.query.depCode){
            _this.currentIndex=i;
          }
          // var timerrss = setInterval(() => {
            
            
          // }, 100);
        }
        setTimeout(() => {
          if(_this.currentIndex>6){
              var ele = document.getElementById('tab-list');
              ele.scrollTop = ele.scrollHeight;
            }
        }, 100);
        _this.searchdoctors(_this.$route.query.depCode);
      }
      
    },
    //获取合并后的科室信息
    getDepartments:async function() {
      var url ="patientRegister/queryAllDept";
      var that = this;
      var data  ={

      }
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
        // 调用合并科室
        that._dealdata(res.data);
        
      }
    },
  },
//   分享的
  activated(){
    var url = `http://lpfy-h5-test.yhtcs.cn/#/home`
      wechatPay.onMenuShareAppMessage(url).then(res=>{
            alert("分享微信好友成功！");
      });
  }
};
</script>

<style scoped>
.loading {
  z-index: 100;
}
.home-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.imgwrapper {
  display: inline-block;
}
.home-page {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}
.tittle {
  background:#28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
  position: relative;
}
/* 个人中心按钮 */
.personicon {
  position: absolute;
  top: 5px;
  right: 20px;
  border-radius: 50%;
}
.hospital-info {
  /* position: relative;
      padding-left: 27.33333vw; */
      text-align: center;
  padding: 10px 0;
}
.h-name {
  color: rgba(16, 16, 16, 1);
  font-size:16px;
  text-align: left;
  font-family: PingFangSC-regular;
  margin: 5px 0;
}
.other-info {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  text-align: left;
  font-family: PingFangSC-regular;
  margin: 5px 0;
}
.qr-code {
  line-height: 2;
}
.qr-code img {
  vertical-align: middle;
  margin-left: 20px;
}
.infor_title{
  display: inline-block;vertical-align: middle;
}
.logo-img {
  /* position: absolute; */
  /* left: 8.33333vw;
  top: 8px; */
  margin-right: 20px;
  vertical-align: middle;
}
.doctor-list {
  flex: 1;
  overflow: auto;
  position: relative;
  background: rgb(234, 234, 234);
  padding-top: 10px;
}
.tab-list {
  position: absolute;
  top: 10px;
  left: 0;
  width: 160px;
  height: 97.4%;
  background: rgb(234, 234, 234);
  overflow: auto;
}
.tab-item {
  /* height: 50px; */
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  padding: 2.66667vw 0;
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
}
.activeItem {
  background: rgb(255, 255, 255);
  color: rgb(40,184,161);
}
.doctors {
  padding-left: 160px;
  overflow: auto;
  height: 100%;
  background: rgb(255, 255, 255);
  text-align: center;
}
.doctor-item:nth-of-type(1){
  border:0;
}
.doctor-item {
  position: relative;
  /* display: flex; */
  background: rgb(255, 255, 255);
  /* padding: 20px; */
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 10px 0;
  margin: 0 20px;
}
.fanhui{
  height: 15px;
  position: absolute;
  right: 20px;
  top: calc(50% - 10px);
}
.avatar {
  border-radius: 50%;
  position: absolute;
  left: 30px;
  top: 16px;
}
.doctor-info {
  margin-left: 10px;
}
.doctor-info p {
    font-size: 18px;
    margin: 10px 0;
      width: 23.66667vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* margin-left: 53px; */
    display: inline-block;
    margin-left: 14.33333vw;
    text-align: left;
}
.line {
  border-bottom: 1px solid rgb(187, 187, 187);
  position: absolute;
  width: 150px;
  bottom: 1px;
  left: 30px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>