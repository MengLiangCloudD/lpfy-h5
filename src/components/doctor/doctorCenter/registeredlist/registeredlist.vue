<template>
  <div class="registeredlistpage">
    <!-- 标题 -->
    <div class="title" >
      <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
      挂号患者列表
    </div>

    <!-- 切换按钮 -->
    <div class="btn-warapper">
      <div @click="changetabstatu(false)" :class="{ active: !tabstatu,disactive: tabstatu}">待就诊</div>
      <div @click="changetabstatu(true)" :class="{ active: tabstatu,disactive: !tabstatu }">已就诊</div>
    </div>

    <!-- 已就诊列表 -->
    <div class="list-wrapper" v-if="tabstatu">
      <div class="list-item" v-for="(item,index) in seekedpatientlist" :key="index" >
        <div class="patient-info" >
          <img class="avatar" src="../../../../common/imager/toux.png" width="50" alt>
          <span class="item-name">{{item.name}}</span>
          <div class="sky"></div>
          <span>&nbsp;</span>
          <span class="item-name">{{item.visitdate}}</span>
        </div>
      </div>
    </div>

    <!-- 未就诊列表 -->
    <div class="list-wrapper" v-if="!tabstatu">
      <div class="list-item" v-for="(item,index) in failurepatientlist" :key="index">
        <div class="patient-info" @click="godetail(item)">
          <img class="avatar" src="../../../../common/imager/toux.png" width="50" alt>
          <div class="item-name">
            <p>
              <span>姓名：</span>
               <span class="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</span>
            </p>
            <p>
              <span>就诊时间：</span>
              <span class="">{{item.visitdate}}</span>
            </p>
           
          </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="infomodel"
        title="提示">
        <p>{{infomsg}}</p>
    </Modal>
    <loading v-show="isshowloading"></loading>
  </div>

  
</template>

<script>
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
var time = year + "-" + month + "-" + day;
import loading from '@/common/loading'
import http from '@/utils/http';
export default {
  components:{
    loading
  },
  data() {
    return {
      failurepatientlist:[],
      seekedpatientlist:[],
      tabstatu:false,
      active:true,
      switchcotroll:false,
      infomodel:false,
      infomsg:"",
      isshowloading:false,
      yscode:true,
      visitstatus:false,
      statemodel:false
    };
  },
  mounted() {
    let that=this
    this.isshowloading=true
    setTimeout(function(){
      that.fetchfailurepatientlist();
    },10)
  },
  methods: {
    godetail(item){
      if(item.visitdate.substring(0,10)==time){
        localStorage.setItem('userxinxi',JSON.stringify(item))
        this.$router.push('/detail');
      }else{
        this.$Message.warning('当前时间不是患者就诊时间');
      }
      
    },
     //返回上一层
    tobackdetail(){
      this.$router.push('/Personalcenter');
    },
    changetabstatu(state){
      if(state==this.tabstatu){
        return
      }
      if(state){
        this.$router.push("/Historicpatients");
      }
      this.tabstatu=!this.tabstatu;
    },
    //获取未就诊列表
    async fetchfailurepatientlist() {
      let that = this;
      let url = "docPatVisLis/patientNoVistList";
      var data = {

      }
      var res  = await http.post(that,url,data);
      if(res.errcode==0&&res.data!=null&&res.data!=0&&res.data!=''&&res.data!=undefined&&res.data.length!=0){
        that.tabstatu=false;
        for (var i = 0; i < res.data.length; i++) {
            that.failurepatientlist.push(res.data[i]);
          }
      }
    },
    //个人中心
    goPersonalcenter(){
      this.$router.push('/Personalcenter');
    }
  }
};
</script>

<style scoped>
.registeredlistpage {
  height: 100%;
  overflow: auto;
}
.disactive{
  color: rgb(0, 0, 0);
  background: rgb(160, 165, 170);
}
.active{
  color:white;
  background: rgb(0, 166, 172);
}
.btn-warapper{
  display: flex;
  height: 50px;
}
.btn-warapper div{
  font-size: 16px;
  flex: 1;
  text-align: center;
  line-height: 50px;
}
.quite{
    position: absolute;
    left: 5%;
    top: 3px;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
/* 标题 */
.title {
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
/* 患者列表 */
.list-wrapper {
  margin-top: 5px;
}
.list-item {
  padding:0 5px;
}
.patient-info {
  display: flex;
  height: 50px;
  font-size: 14px;
  align-items: center;
  padding: 30px 20px;
  border-radius: 5px;
  border: 1px solid rgb(178, 178, 178)
}
.avatar{
  border-radius: 50%
}
.item-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0px 0px 0 10px;
}
.sky{
  flex: 1;
  width: 50px;
}
/* 开关 */
.switchopen{
  height: 25px;
  width: 70px;
  border-radius: 15px;
  background: #2d8cf0;
  line-height: 25px;
  font-size: 12px;
  text-align: left;
  padding: 0 10px;
  /* position: absolute;
  top: 12px;
  right: 10px; */
  color: white;
  display: inline-block;

}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right: 8.06667vw
}
.api{
  position: relative;
    text-align: center;
}
.activecircle{
  left: 7.06667vw;
}
.activeswitchopen{
  text-align: right;
  background: rgb(33, 106, 179);
} 
.top,.bottom{
        text-align: center;
    }
</style>