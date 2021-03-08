<template>
  <div style="height:100%">
    <div class="Myaccount-pag">
        <div class="title" style="background: rgb(40, 184, 161);font-size: 20px;color: white;padding: 10px 0;text-align: center;">我的</div>
      <div class="nav"> 
        <div class="nav_item"  @click="changestate()">医生</div>
        <div class="nav_item nav_item1">用户</div>
        <div class="nav_item"  @click="changguan()">管理员</div>
      </div>
      <div class="content">
        <div class="zhe" style="width:100%;background: rgb(255, 255, 255);height: 100%;position: absolute;z-index: 900;" v-show="isshowmask" @click="clicusers()" ></div>
        <div class="header" style="z-index:910;position:relative">
          <div class="userssss"  style="padding-left: 5%; border-bottom:1px solid #ccc;">
            <img :src="headimgurl" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;" >
            <!-- <img src="./../../../common/imager/toux.png" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;" > -->
            <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
              <p><span>用户姓名：</span><span>{{name}}</span></p>
              <p><span>身份证号：</span><span>{{idno}}</span></p>
              <p><span>用户卡号：</span><span>{{cardno}}</span></p>
              <svg :class="'barcodea'"></svg>
            </div>
            <div style="position: absolute;right: 7%;top: 35px;">
              <img src="./../../../common/imager/fanhui拷贝2.png" alt="" width="20;" @click="clicusers()">
            </div>
          </div>
          <div class="userss" style="display:none;position:absolute;z-index:100;width:100%;padding-bottom:50px;" v-show="showuserlist">
            <RadioGroup  v-model="tindex" size="large" style="width:100%;">
              <div class="users" v-for="(item,index) in carderList"  :key="index" style="border-bottom:1px solid #ccc;padding-left: 5%;background:#fff;" @click="seledoctor(index)" >
                <img :src="headimgurl" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;">
                 <!-- <img src="./../../../common/imager/toux.png" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;" > -->
                <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
                  <p><span>用户姓名：</span><span>{{item.name}}</span></p>
                  <p><span>身份证号：</span><span>{{item.idno}}</span></p>
                  <p><span>用户卡号：</span><span>{{item.cardno}}</span></p>
                  <svg :class="'barcode'+ index"></svg>
                </div>
                <!-- <Radio :label="index" style="float:right;margin-top:20px;margin-right: 8%;"><span style="display:none;"></span></Radio> -->
              </div>
            </RadioGroup>
            <div class="add_card">
              <div class="btn" @click="toBindCard()">新建电子卡</div>
            </div>
          </div>
        </div>
        <p class="dang"></p>
      </div>
      <div class="content2">
        <p @click="goOrderList" style="position: relative;">
          <img src="./../../../common/imager/guahao.png" alt width="24">
          <span>我的挂号</span>
          <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goConsultingorderList" style="position: relative;">
          <img src="./../../../common/imager/wenzhen.png" alt width="24">
          <span>我的问诊</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <!-- <p @click="gotuwenList" v-if="false">
          <img src="./../../../common/imager/carder.png" alt width="24">
          <span>我的图文问诊订单</span>
        </p> -->
        <!-- <p @click="goMyCard">
          <img src="./../../../common/imager/carder.png" alt width="24">
          <span>我的就诊卡</span>
        </p> -->
        <p @click="goMycase" style="position: relative;">
          <img src="./../../../common/imager/bingli(1).png" alt width="24">
          <span>我的病历</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
         <p @click="goMyprescription" style="position: relative;">
          <img src="./../../../common/imager/yaopin.png" alt width="24">
          <span>我的药品</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goMyincidentals" style="position: relative;">
          <img src="./../../../common/imager/jiancha.png" alt width="24">
          <span>我的检查</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goMyassay" style="position: relative;">
          <img src="./../../../common/imager/huayan.png" alt width="24">
          <span>我的化验</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goMycure" style="position: relative;">
          <img src="./../../../common/imager/zhiliao.png" alt width="24">
          <span>我的治疗</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goHospitalinformation" style="position: relative;">
          <img src="./../../../common/imager/jian.png" alt width="24">
          <span>住院信息</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <!-- <p @click="goMyassay">
          <img src="./../../../common/imager/hua.png" alt width="24">
          <span>我的化验结果</span>
        </p> -->
          <!-- <p @click="goPostpartumassessment">
            <svg t="1572313482168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="24" height="24"><path d="M512.32 97.2c22.64 0 41.83 16.91 44.63 39.34 1.87 15.01 14.64 26.28 29.77 26.28h310.56v769.99H127.29V162.82h310.64c15.13 0 27.89-11.27 29.77-26.28 2.8-22.43 21.98-39.34 44.62-39.34m0-30c-38.24 0-69.78 28.63-74.4 65.62H127.29c-16.57 0-30 13.43-30 30v769.99c0 16.57 13.43 30 30 30h769.99c16.57 0 30-13.43 30-30V162.82c0-16.57-13.43-30-30-30H586.72c-4.62-36.99-36.16-65.62-74.4-65.62z" fill="#28b8a1" p-id="4675"></path><path d="M267.76 388.14c-3.98 0-7.79-1.58-10.61-4.39L205.3 331.9c-5.86-5.86-5.86-15.36 0-21.21 5.86-5.86 15.35-5.86 21.21 0l41.24 41.24 72.83-72.83c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.21l-83.44 83.44c-2.8 2.81-6.61 4.39-10.59 4.39zM335.46 629.42c-3.84 0-7.68-1.46-10.61-4.39L218.1 518.28c-5.86-5.86-5.86-15.36 0-21.21 5.86-5.86 15.36-5.86 21.21 0l106.75 106.75c5.86 5.86 5.86 15.36 0 21.21a14.913 14.913 0 0 1-10.6 4.39z" fill="#28b8a1" p-id="4676"></path><path d="M228.71 629.42c-3.84 0-7.68-1.46-10.61-4.39-5.86-5.86-5.86-15.36 0-21.21l106.75-106.75c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.21L239.32 625.03a14.953 14.953 0 0 1-10.61 4.39zM760.35 346.42H444.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h315.61c8.28 0 15 6.72 15 15s-6.71 15-15 15zM760.35 576.05H444.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h315.61c8.28 0 15 6.72 15 15s-6.71 15-15 15z" fill="#28b8a1" p-id="4677"></path><path d="M760.35 794.22H224.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h535.61c8.28 0 15 6.72 15 15s-6.71 15-15 15z" fill="#28b8a1" p-id="4678"></path></svg>
            <span>产后评估</span>
          </p> -->
        <p @click="govideo" style="position: relative;">
          <img src="./../../../common/imager/guanzhu.png" alt width="24">
          <span>我的课程</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goMyCollect" style="position: relative;">
          <img src="./../../../common/imager/guanzhu.png" alt width="24">
          <span>我的关注</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
        <p @click="goMyValuation" style="position: relative;">
          <img src="./../../../common/imager/wodepingjia.png" alt width="24">
          <span>我的评价</span>
           <img src="./../../../common/imager/fanhui.png" alt width="10" style="position: absolute;top: calc(50% - 10px);right: 7%;">
        </p>
      </div>
        <Modal v-model="shifou"  title="提示信息">
            <p>抱歉您并不是医生，请勿操作</p>
        </Modal>
         <Modal v-model="jiak" @on-ok='goauthentication' @on-cancel='goHome' title="提示信息">
            <p>请先添加就诊卡</p>
        </Modal>
        <Modal v-model="pingjistate" @on-ok='pingState' title="提示信息">
            <p>您有新的订单未评价，请问是否需要去评价</p>
        </Modal>
    </div>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "./../../../common/tabbar";
//引入底部公共组件
// import tabbar from "../../common/tabbar";
import JsBarcode from "jsbarcode";
//引人加载动画
import loading from "../../../common/loading";
// import {hidemenu} from "../../../common/js/hide"
import http from '@/utils/http'
export default {
  components: {
    tabbar,
    loading
  },
  created:async function(){
    var url = 'evaluate/queryorderNo';
    var that = this;
    var data = {
      
    }
    var res  = await http.post(that,url,data);
    if(res.errcode==0&&res.data!=null){
      if(res.data.evaluate_status==0){
        localStorage.setItem('order_no',res.data.order_no);
        localStorage.setItem('doctorName',res.data.NAME);
        localStorage.setItem('dept_name',res.data.regname);
        localStorage.setItem('docCode',res.data.doctor_code);
        that.pingjistate=true
      }
      
    }else{
      that.pingjistate=false
    }

  },
  mounted:async function(){
    this.isshowloading=true;
    var url ="user/cardList";
      var that = this;
      var data = {

      }
    var treimr = setInterval( async () => {
      if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
        clearInterval(treimr);
        var res  = await http.post(that,url,data);
        //返回回来的数据
        if(res.errcode==0 && res.data.length!==0){
          that.myCardType = res.data;
          var lister = JSON.parse(JSON.stringify(that.myCardType));
          var cardno = localStorage.getItem('cardno');
          if(cardno!=''&&cardno!=undefined){
            for(var i = 0;i<lister.length;i++){
              if(lister[i].cardno==cardno){
                that.cardno= lister[i].cardno;
                that.idno= lister[i].idno;
                that.name=lister[i].name;
                localStorage.setItem('cardno',lister[i].cardno);
                localStorage.setItem('cardername',lister[i].name);
                lister.splice(i,1);
              }
            }
            that.carderList=lister;
          }else{
            lister.splice(0,1);
            that.carderList=lister;
          }
        }else if(res.data.length==0){
          that.$Message.warning('请先新建就诊卡');
          that.jiak=true;
        }
      
        if(localStorage.getItem("avatar")!=null&&localStorage.getItem("avatar")!=undefined){
        var headimgurl= localStorage.getItem("avatar");
        that.headimgurl  = headimgurl; 
        }
        if(that.myCardType[0].cardno!=undefined){
          // if(localStorage.getItem('usernums')==''||localStorage.getItem('usernums')==undefined){
            that.cardno= that.myCardType[0].cardno;
            that.idno= that.myCardType[0].idno;
            that.name=that.myCardType[0].name;
            localStorage.setItem('cardno',that.myCardType[0].cardno);
            localStorage.setItem('cardername',that.myCardType[0].name);
            that.tindex=0;
          // 调用生成条形码的方法
          this.setBarcode();
          this.setBarcodea();
        }else{

        }
      }
    }, 500);
  },
  data() {
    return {
      pingjistate:false,
      jiak:false,
      //loading动画
      isshowloading: false,
      //用户名称
      username: "",
      //用户电话
      phone: "",
      // 用户头像
      headimgurl: "",
      carderList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      //用户就诊卡数据
      myCardType:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      // 姓名
      name:'',
      //卡号
      cardno:'',
      //身份证号
      idno:'',
      tindex:0,
      //控制出现
      showuserlist:false,
      isshowmask:false,//控制遮罩的显示,
      value2: true,
      visitstatus:true,
      statemodel:false,
      shifou:false
    };
  },
  methods: {
    govideo(){
       this.$router.push('/video');
    },
    pingState(){
      this.$router.push('/Orderevaluate');
    },
    goHome(){
       this.$router.push("/home");
    },
    goauthentication(){
       localStorage.setItem('herf',window.location.href);
      this.$router.push("/authentication");
     
    },
    //切换管理员
    async changguan(){
      // var that  = this;
      var permission = localStorage.getItem('permission');
      // if(permission>0){
      //   that.$router.push('/admin');
      // }else{
        var that = this;
        that.visitstatus=false;
        var url  = "system/doctorLogin";
        var data  ={
          
        }
        var res = await http.post(that,url,data);
        if(res.errcode==0||permission>0){
          that.$router.push('/admin');
        }else if(res.errcode==3001){
          that.$Modal.warning({
            title: '提示警告',
            content: '抱歉您并不是管理员，请勿操作'
          });
        }
      // }
    },
    //切换医生身份
    changestate:async function(){
      var that = this;
      that.visitstatus=false;
      var url  = "system/doctorLogin";
      var that = this;
      var data  ={
        
      }
      var res = await http.post(that,url,data);
      if(res.errcode==0){
        that.$router.push('/Personalcenter')
      }else if(res.errcode==3001){
        that.$Modal.warning({
          title: '提示警告',
          content: '抱歉您并不是医生，请勿操作'
        });
      }
    },
    //跳转到我的挂号订单页
     //新建电子卡
    toBindCard() {
      localStorage.setItem('herf',window.location.href);
      this.$router.push("/authentication");
      
    },
    goOrderList() {
      this.$router.push("/GuaorderList");
    },
    //跳到咨询列表
    goConsultingorderList(){
      this.$router.push("/inquiryList");
    },
    gotuwenList(){
      this.$router.push("/tuwenList");
    },
    //跳转到我的就诊卡
    goMyCard() {
      this.$router.push("/MyCard");
    },
    //跳转到我的关注页面
    goMyCollect() {
      this.$router.push("/myCollect");
    },
    goMyValuation() {
      this.$router.push("/Myevaluation");
    },
    //跳转到我的检查页面
    goHospitalinformation() {
      this.$router.push("/Hospitalinformation");
    },
    //跳转到我的病例
    goMycase() {
      this.$router.push("/Mycase");
    },
    //药品处方
    goMyprescription() {
      this.$router.push("/Myprescription");
    },
    //我的化验
    goMyassay(){
      this.$router.push("/Myassay");
    },
    //检查处方
    goMyincidentals(){
      this.$router.push("/MyExamine");
    },
    //化验处方
    goLaboratory(){
      this.$router.push("/Laboratorys");
    },
    //治疗处方
    goMycure(){
      this.$router.push("/Mycure");
    },
    //产后评估
    goPostpartumassessment(){
      
      this.$router.push("/Postpartumassessment");
    },
     //生成条形码集合
    setBarcode() {
      var that = this;
      for (var i = 0; i < that.myCardType.length; i++) {
        JsBarcode(".barcode" + i, that.myCardType[i].cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
      }
    },
    //单个的生成条形码
    setBarcodea(){
      
       JsBarcode(".barcodea" , this.cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
    },
    
      //点击出现
    clicusers(){
      this.showuserlist=!this.showuserlist;
      this.isshowmask=!this.isshowmask;
    },
    //点击选择患者
    async seledoctor(index){
       var that = this;
      that.isshowmask=false;//隐藏遮罩层
      var data  ={
          cardno:that.carderList[index].cardno
        }
        var url  = 'user/defaultCard';
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          that.$Message.success('修改成功');
        }else{
          that.$Message.success('修改失败');
        }
      var lister = JSON.parse(JSON.stringify(that.myCardType));
      for(var i= 0;i<lister.length;i++){
        if(lister[i].cardno==that.carderList[index].cardno){
           that.cardno=that.carderList[index].cardno;
          that.idno=that.carderList[index].idno;
          that.name=that.carderList[index].name;
          that.tindex=index;
          // that.$store.commit("setusernums", that.tindex);
          localStorage.setItem('cardno',that.cardno);
          localStorage.setItem('cardername',that.name);
          that.showuserlist=!that.showuserlist;
          lister.splice(i,1);
        }
      }
      that.carderList=lister;
      that.setBarcodea();
    },
    //用户个人中心
    userCentre() {}
  }
};
</script>

<style scoped>
.mask{
  height: 100%;
  width:100%;
  background: red;
  z-index: 95;
  position:absolute;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.Myaccount-pag {
  height: 100%;
  overflow: auto;
  padding: 0 0 50px 0;
  
}
.user p{
  line-height: 1.8;
}
.tittle {
  height: 50px;
  /* text-align: center; */
  padding-left: 10%;
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-regular;
  display:-webkit-box;
  display:flex;
  display:-ms-flex;
  display:-webkit-flex;
}
.headerimage {
  vertical-align: middle;
  border-radius: 50%;
}
.name {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
.right {
  padding-left: 10%;
}
/* .header {
  padding-left: 10%;
} */
.header img,
header span {
  display: inline-block;
  vertical-align: middle;
}
.dang {
  padding-left: 62px;
}
.content {
border-top: 2px solid rgb(238,238,238);
  padding-top: 10px;
  /* padding-bottom: 10px; */
}
.content2{
    padding-bottom: 50px;
}
.content2 p img {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
}
.content2 p {
  padding: 16px 10% 16px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.footer {
  text-align: center;
}
.ivu-switch .ivu-switch-large{
  color: #f00;
  background: #f00;
}
/* 开关 */
.switchopen{
 flex:1;
    -ms-flex:1;
    -webkit-flex:1;
        -webkit-box-flex:1;
        position: relative;
        text-align:center;

}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 4.8vw;
  right: 1.06667vw;
}
.api{
  position: relative;
    text-align: center;
    
}
.activecircle{
  left: 1.06667vw;
}
.activeswitchopen{
  text-align: right;
  /* background: rgb(33, 106, 179); */
} 
.top,.bottom{
        text-align: center;
    }
    .add_card {
      width: 100%;
    text-align: center;
    /* position: fixed; */
    bottom: 16vw;
    background: #fff;
    padding: 40px 0 80px 0;
}
.btn {
      line-height: 13.33333vw;
    height: 13.33333vw;
    width: 65%;
    border-radius: 44px;
    text-align: center;
    background-color:#28b8a1;
    font-family: PingFangSC;
    font-weight: 400;
    font-size: 4.26667vw;
    color: rgba(255, 255, 255, 1);
    display: inline-block;
}
.nav{
  display: flex;
             flex-wrap: wrap;
}
.nav_item{
  text-align: center;
  padding: 15px 0;
  width: 33%;
}
.nav_item1{
  border-bottom: 2px solid rgb(40,184,161);
  color: rgb(40,184,161);;
}
</style>
