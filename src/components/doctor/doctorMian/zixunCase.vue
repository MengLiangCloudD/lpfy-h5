<template>
  <div class="MyExamine">
    
    <!-- <pull-refresh :next="refresh">
      <div slot="list"> -->
        <div class="titlei">
          <div class="title" style="background: rgb(0, 187, 187);">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            患者病历
            <div class="tong" @click="gosetImgr()">
                资料
            </div>
          </div>
          <div class="xuanze" style="position: relative;">
            <div style="display:inline-block;width:100%">
            <span style="color:rgb(0, 187, 187);font-size:20px;" @click="qingkong">全部病历</span>
            <!-- <span style="color: rgb(0, 187, 187);;font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
            <el-date-picker
              v-model="value1"
              type="month"
              style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
              @change="shaixuan"
              placeholder="选择月份"
              :editable="false"
              :clearable="true"
              size="small"
              >
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="fee-item" v-if="caseList.length<=0">
            <div style="text-align:center;font-size: 20px;margin: 50px;">暂无数据</div>
          </div>
          <div class="fee-item" v-if="caseList!==undefined&&caseList.length>0">
            <div
              v-for="(item,index) in caseList"
              :key="index"
              style=" border-bottom: 1px solid #ccc"
              class="pan"
            >
              <div style="text-align: center;font-size:18px;color: rgb(0, 187, 187);padding:10px">
               <span>—— 病历{{total - index}} ——</span>
              </div>
              <div slot="content fee-item">
                <p v-if="item.visitdate!==undefined">
                  <span>就诊时间：</span>
                  <span >{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(datatrans(item.visitdate))[0]}}</span>
                </p>
                <p v-if="item.visitno!==undefined">
                  <span>就诊序号：</span>
                  <span >{{item.visitno}}</span>
                </p>
                <p v-if="item.patientid!==undefined">
                  <span>患者卡号：</span>
                  <span>{{item.patientid}}</span>
                </p>
                <p v-if="item.docName!==undefined">
                  <span>医生姓名：</span>
                  <span>{{item.doctor}}</span>
                </p>
                <p v-if="item.docName!==undefined">
                  <span>医生编码：</span>
                  <span>{{item.doctorno}}</span>
                </p>
                <!-- <div v-if="item.diagdesc!==undefined&&item.diagdesc.length>=12">
                    <p> <span>诊断结果：</span></p>
                    <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.diagdesc}}</p>
                </div> -->
                <div v-if="item.diagdesc!==undefined">
                    <p><span>诊断结果：</span><span>{{item.diagdesc}}</span></p>
                </div>
                <!-- <div v-if="item.illnessdesc!==undefined&&item.illnessdesc.length>=12">
                    <p><span>医生主诉：</span></p>
                    <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.illnessdesc}}</p>
                </div> -->
                <div v-if="item.illnessdesc!==undefined">
                    <p><span>医生主诉：</span><span>{{item.illnessdesc}}</span></p>
                </div>
                
                <!-- <div v-if="item.advice!==undefined&&item.advice.length>=12">
                  <p><span>医生建议：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.advice}}</p>
                </div> -->
                <div v-if="item.advice!==undefined">
                  <p><span>医生建议：</span><span>{{item.advice}}</span></p>
                </div>
                <!-- <div v-if="item.memo!==undefined&&item.memo.length>=12">
                  <p><span>医生备注：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.memo}}</p>
                </div> -->
                <div v-if="item.memo!==undefined">
                  <p><span>医生备注：</span><span>{{item.memo}}</span></p>
                </div>
                <!-- <div  v-if="item.maternitl!==undefined&&item.maternitl.length>=12">
                  <p> <span>婚孕历史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.maternitl}}</p>
                </div> -->
                <div  v-if="item.maternitl!==undefined">
                  <p> <span>婚孕历史：</span><span>{{item.maternitl}}</span></p>
                </div>
                <!-- <div  v-if="item.menses!==undefined&&item.menses.length>=12">
                  <p> <span>月经历史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.menses}}</p>
                </div> -->
                <div  v-if="item.menses!==undefined">
                  <p> <span>月经历史：</span><span>{{item.menses}}</span></p>
                </div>
                <!-- <div  v-if="item.maternitl!==undefined&&item.maternitl.length>=12">
                  <p> <span>既往病史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.maternitl}}</p>
                </div> -->
                <div  v-if="item.anamnesis!==undefined">
                  <p> <span>既往病史：</span><span>{{item.anamnesis}}</span></p>
                </div>
                <!-- <div  v-if="item.individual!==undefined&&item.individual.length>=12">
                  <p> <span>个人病史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.individual}}</p>
                </div> -->
                <div  v-if="item.individual!==undefined">
                  <p> <span>个人病史：</span><span>{{item.individual}}</span></p>
                </div>
                <!-- <div  v-if="item.familyill!==undefined&&item.familyill.length>=12">
                  <p> <span>家族病史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.familyill}}</p>
                </div> -->
                <div  v-if="item.familyill!==undefined">
                  <p> <span>家族病史：</span><span>{{item.familyill}}</span></p>
                </div>
                <!-- <div  v-if="item.medhistory!==undefined&&item.medhistory.length>=12">
                  <p> <span>现在病史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.medhistory}}</p>
                </div> -->
                <div  v-if="item.medhistory!==undefined">
                  <p> <span>现在病史：</span><span>{{item.medhistory}}</span></p>
                </div>
                <!-- <div  v-if="item.marrital!==undefined&&item.marrital.length>=12">
                  <p> <span>婚姻历史：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.marrital}}</p>
                </div> -->
                <div  v-if="item.marrital!==undefined&&item.marrital.length<12">
                  <p><span>婚姻历史：</span><span>{{item.marrital}}</span></p>
                </div>
              </div>
            </div>
          </div>
           <div class="jszai" v-if="jiaza">
              <img src="@/common/imager/timg.gif" alt="" height="70">
            </div>
          <p v-show="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
        </div>
      <!-- </div>
    </pull-refresh> -->
    <Modal
        v-model="erromodal"
        title="提示">
        <p>{{errormsg}}</p>
    </Modal>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import loading from "@/common/loading";
import http from '@/utils/http'
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
let month = currentDay.getMonth() + 1;
//获取当天日期
let day = currentDay.getDate();
//当前年月日
var time = year + "-" + month ;
export default {
  components: {
    loading
  },
  data() {
    return {
      errormsg:'',
      erromodal:false,
      caseList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [], //存放所有的绑定卡，没有激活的卡不算
      //当前时间
      value1:'',
      isshowloading:false,
      size:10,
      jiaza:false,
      allYe:1,
      xian:false,
      offset:1,
      total:''
    };
  },
  methods: {
    gosetImgr(){
      this.$router.push(`/setImg?type=2`);
    },
    tobackdetail(){
        this.$router.push('/userOrderList')
      },
    changepanel(value) {
    },
    //时间转换
    datatrans(data) {
      let date = new Date(data);
      var Y = date.getFullYear();
      var m = date.getMonth() + 1;
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
      var t = Y + "-" + m + "-" + d + "-" + " " + H + ":" + i;
      if (t !== "NaN-NaN-NaN- NaN:NaN"){
        return t;
      } else {
        return "";
      }
    },
    //正则截取
    execs(data) {
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(data)[0];
    },
     //正则截取
    execsss(data) {
      return /\d{4}-\d{1,2}/g.exec(data)[0];
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
    //小于十前面默认加0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //清空
    qingkong(){
      this.offset=1;
      this.xian=false;
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.caseList=[]
        this.examineList();
      }else{
        
      }
    },
    shaixuan(){

     this.xian=false;
      this.offset=1;
      if(this.value1==null){
         this.value1= '';
      }else{
          this.value1= this.datatime(this.value1);
      }
      this.caseList=[]
      this.examineList()
    },
    //请求列表
    async examineList() {
      var that = this;
      var url ="docMedRec/queryPatientConSultaAll";
      let order_no=localStorage.getItem('zixunOrdeno');
      var offset = that.offset;
      var visitdate = that.value1;
      var data = {
        order_no,limit:10,offset,visitdate
      }
      that.jiaza=false;
      var res = await http.post(that,url,data);
        if(res.errcode==0&&res.data.content!=null){
          that.total=res.data.total;
          if(res.data.total / 10 < 1){
              that.allYe=1
          }else{
            that.allYe= parseInt(res.data.total / 10) + 1 
          }
          for(var i = 0;i<res.data.content.length;i++){
            that.caseList.push(res.data.content[i]);
          }
        }else{
          //  that.$Message.error(res.errmsg)
        }
    }
  },
  //就诊人
  mounted(){
    var that  = this;
    const el = document.querySelector('.MyExamine');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
        if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            if(that.offset<that.allYe){
                that.offset+=1;
                that.jiaza=true;
                that.examineList();
            }else if(that.offset>=that.allYe&&that.offset!=1){
              // that.xian=true;
            }
        }else{
          //  that.xian=false;
           
        }
    },1000)
    that.examineList();
  }
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.title {
  background: rgb(40, 184, 161);
  color: white;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  position: relative;
}
.fee-item {
  /* display: flex; */
  padding: 5px 10px;
  font-size: 14px;
}
.pan {
  padding: 10px;
}
.text-box {
}

.fee-item p {
  line-height: 2;
 
}
.fee-item p span:nth-of-type(2) {
  width: 62%;
  text-align: right;
  display: inline-block;
}
.fee-item span:nth-of-type(1) {
  font-weight: 600;
  margin-left: 5%;
}
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.ivu-select {
  /* margin-left: 18%; */
}
.ivu-select-selection {
  color: rgb(40, 184, 161);
}
.ivu-date-picker {
  /* margin-left: 10%; */
}
.ivu-select-dropdown {
  position: absolute !important; /* will-change: top, left; */
  transform-origin: center top !important;
  top: 188px !important;
  right: 100px !important;
}
.fee-item p {
  line-height: 2;
 
}
.fee-item p span:nth-of-type(2) {
  width: 70%;
  text-align: left;
  /* padding-left: 2%; */
  display: inline-block;
  vertical-align: top;
  /* text-indent: 1rem; */
}
.fee-item span:nth-of-type(1) {
  font-weight: 600;
  margin-left: 5%;
  vertical-align: top;
}
.titlei{
  position: fixed;
  width: 100%;
}
.content{
  padding-top: 100px;
}
.jszai{
  text-align: center;
}
.tong{
    position: absolute;
    right: 15px;
    top: 0;
    font-size: 16px;
}
</style>