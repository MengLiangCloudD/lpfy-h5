<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch" class="his">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
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
        <div class="xuanze"  style="position: relative;" v-if="tabstatu">
         <div style="display:inline-block;width:100%">
          <span style="color: rgb(0, 187, 187);font-size:20px;" @click="qingkong">全部患者</span>
          <el-date-picker
            v-model="value1"
            @change="select"
            type="month"
            style="width:35%; border:0; position: absolute;right: 5%;top: 7px;"
            placeholder="选择月份"
            :editable="false"
            :clearable="true"
             size="small"
            >
          </el-date-picker>
          </div>
        </div>
        <div class="content" v-if="HistoricpatientsList.length>0">
            <div class="list-item" v-for="(item,index) in HistoricpatientsList" :key="index"   @click="todetail(item)">
              <div class="patient-info">
                <img class="avatar" src="../../../../common/imager/toux.png" width="50" alt  >
                <div class="user item-name">
                  <p><span>姓名：</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</span></p>
                  <p><span>就诊日期：</span><span>{{item.visitdate}}</span></p>
                </div>
              </div>
            </div>
            <p v-if="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
        </div>
        <div class="content" v-if="HistoricpatientsList.length<=0">
          <p style=" text-align: center;font-size: 20px;padding:40px 0;">暂无数据</p>
        </div>
        <loading v-show="isshowloading" class="load"></loading>
        
    </div>
    
</template>

<script>
import loading from "@/common/loading"
import http from '@/utils/http';
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
var dantian = year + "-" + month + "-" + day;
    export default {
       components:{
          loading
       },
        data(){
            return {
                value1:'',
                HistoricpatientsList:[],
                isshowloading:false,
                size:15,
                tabstatu:true,
                size:10,
                onlytotal:1,
                allYe:1,
                xian:false
            }
        },
        methods:{
           changetabstatu(state){
              if(state==this.tabstatu){
                return
              }
              if(!state){
                this.$router.push("/registeredlist");
              }
              this.tabstatu=!this.tabstatu
            },
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //标准时间转换
            datatime(data) {
              var d = data;
              var y = this.p(d.getFullYear());
              var m = this.p(d.getMonth() + 1);
              var t = this.p(d.getDate());
              var resDate = y + "-" + m;
              return resDate;
            },
            p(s) {
              return s < 10 ? "0" + s : s;
            },
            //清空
          qingkong(){
            this.onlytotal=1;
            this.xian=false;
            if(this.value1!= ''&&this.value1!=null ){
              this.value1= '';
              this.HistoricpatientsList=[]
              this.Querypatients();
            }else{
              
            }
          },
            select(){
              this.xian=false;
              this.onlytotal=1;
              if(this.value1==null){
                this.value1= '';
              }else{
                  this.value1= this.datatime(this.value1);
              }
              this.onlytotal=1;
              this.HistoricpatientsList=[]
              this.Querypatients();
            },
            //查询患者信息
           async Querypatients(){
              var that = this;
              var url = 'docPatVisLis/patientVistedList';
              var visitdate =that.value1;
              var offset = that.onlytotal;
              var data = {
                limit:10,offset,visitdate 
              }
              var res  = await http.post(that,url,data);
              if(res.errcode==0&&res.data.content!=null){
                if(res.data.total / 10 < 1){
                    that.allYe=1
                  }else{
                    that.allYe= parseInt(res.data.total / 10) + 1 
                  }
                for (var i = 0; i < res.data.content.length; i++) {
                  that.HistoricpatientsList.push(res.data.content[i]);
                }
              }
            },
            //查看患者详情
            todetail(item){
              if(item.visitdate.substring(0,10)>=dantian){
                localStorage.setItem('userxinxi',JSON.stringify(item))
                this.$router.push("/detail");
              }else{
                localStorage.setItem('userxinxi',JSON.stringify(item))
                 localStorage.setItem('tiao',0);
                this.$router.push("/doctorckeck");
              }
               
              // }
            },
            //时间转换
            datatransss(data) {
              let date = new Date(data);
              //年份
              var Y = date.getFullYear();
              //月份
              var m = date.getMonth() + 1;
              //日期
              var d = date.getDate();
              var H = date.getHours();
              var i = date.getMinutes();
              if (m < 10) {
                m = "0" + m;
              }
              if (d < 10) {
                d = "0" + d;
              }
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              var t = Y + "-" + m + "-" + d;
              if (t !== "NaN-NaN-NaN") {
                return t;
              } else {
                return "";
              }
            },
        },
        mounted(){
          //查询历史患者
          var that  = this;
          const el = document.querySelector('.his');
         const offsetHeight = el.offsetHeight;
         setInterval(function(){
           el.onscroll = () => {
            const scrollTop = el.scrollTop;
            const scrollHeight = el.scrollHeight;
            if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                //每次滚动到底部size+10
              if(that.onlytotal<that.allYe){
                  that.onlytotal+=1;
                that.Querypatients();
              }else if(that.onlytotal>=that.allYe){
                that.xian=true;
              }
            }else{
              that.xian=false;
            }
          }
         },1000)
          that.Querypatients();
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
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
/* 患者列表 */
.content {
  margin-top: 5px;
}
.list-item {
  padding:0 5px;
  position: relative;
}
.poop{
  position: absolute;
  right: 5%;
  top: 5px;
}
.patient-info {
  display: flex;
  height: 50px;
  font-size: 14px;
  align-items: center;
  padding: 30px 20px;
  border-radius: 5px;
  border: 1px solid rgb(178, 178, 178);
  /* padding: 40px 0; */
}
.avatar{
  border-radius: 50%
}
.item-name {
  font-size: 13px;
  font-weight: bold;
  margin: 0px 5px 0 20px;
}
.sky{
  flex: 1;
  width: 50px;
}
.user{
  display: inline-block;
}
.user p{
  line-height: 1.5;
}
</style>