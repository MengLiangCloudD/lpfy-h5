<template>
  <div class="MyExamine">
    <!-- <pull-refresh :next="refresh">
      <div slot="list"> -->
        <div class="titlei">
          <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            我的病历
          </div>
          <div class="xuanze" style="position: relative;">
            <div style="display:inline-block;width:100%">
              <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部病历</span>
              <!-- <span style="color:rgb(40, 184, 161);font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
              <el-date-picker
                v-model="value1"
                type="month"
                style="border:0; position: absolute;right: 5%;top: 7px;width:30%; "
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
            <div style="text-align: center;font-size:18px;padding:20% ">暂无数据</div>
          </div>
          <div class="fee-item" v-if="caseList!==undefined&&caseList.length>0">
              <div
               v-for="(item,index) in caseList"
              :key="index"
              class="pan"
              >
                <p>病历单</p>
                <div class="item" @click="goMycase(item)">
                    <div class="item_conent">
                        <p><span>医院名称：</span><span>滦平县妇幼保健院</span></p>
                        <p><span>患者卡号：</span><span>{{item.patientid}}</span></p>
                        <p><span>就诊时间：</span><span>{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(datatrans(item.visitdate))[0]}}</span></p>
                        <p><span>就诊序号：</span><span>{{item.visitno}}</span></p>
                        <p><span>诊断结果：</span><span>{{item.diagdesc}}</span></p>
                        <div v-if="item.type==1">
                            <p v-if="item.doctor!==undefined&&item.doctor!==null">
                                <span>医生姓名：</span>
                                <span>{{item.doctor}}</span>
                            </p>
                                <p v-if="item.doctorno!==undefined&&item.doctorno!==null">
                                <span>医生编码：</span>
                                <span>{{item.doctorno}}</span>
                                </p>
                                <div v-if="item.illnessdesc!==undefined&&item.illnessdesc!==null">
                                    <p><span>医生主诉：</span><span>{{item.illnessdesc}}</span></p>
                                </div>
                                <div v-if="item.advice!==undefined&&item.advice!==null">
                                <p><span>医生建议：</span><span>{{item.advice}}</span></p>
                                </div>
                                <div v-if="item.memo!==undefined&&item.memo!==null">
                                <p><span>医生备注：</span><span>{{item.memo}}</span></p>
                                </div>
                                <div  v-if="item.maternitl!==undefined&&item.maternitl!==null">
                                <p> <span>婚孕历史：</span><span>{{item.maternitl}}</span></p>
                                </div>
                                <div  v-if="item.menses!==undefined&&item.menses!==null">
                                <p> <span>月经历史：</span><span>{{item.menses}}</span></p>
                                </div>
                                <div  v-if="item.anamnesis!==undefined&&item.anamnesis!==null">
                                <p> <span>既往病史：</span><span>{{item.anamnesis}}</span></p>
                                </div>
                                <div  v-if="item.individual!==undefined&&item.individual!==null">
                                <p> <span>个人病史：</span><span>{{item.individual}}</span></p>
                                </div>
                                <div  v-if="item.familyill!==undefined&&item.familyill!==null">
                                <p> <span>家族病史：</span><span>{{item.familyill}}</span></p>
                                </div>
                                <div  v-if="item.medhistory!==undefined&&item.medhistory!==null">
                                <p> <span>现在病史：</span><span>{{item.medhistory}}</span></p>
                                </div>
                                <div  v-if="item.marrital!==undefined&&item.marrital!==null">
                                <p><span>婚姻历史：</span><span>{{item.marrital}}</span></p>
                                </div>
                        </div>
                        
                    </div>
                    <div class="biaoji" v-if="item.type==1">
                        <svg t="1595231190705" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3564" width="20" height="20"><path d="M488.624 312.4L152.976 668.8a29.36 29.36 0 0 0 0 42.352 31.408 31.408 0 0 0 43.552 0L512 376.24l315.36 334.912a31.408 31.408 0 0 0 43.552 0 29.36 29.36 0 0 0 0-42.352L535.264 312.4a36.32 36.32 0 0 0-46.64 0z" p-id="3565"></path></svg>
                    </div>
                    <div class="biaoji" v-if="item.type==0">
                        <svg t="1595231254662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4296" width="20" height="20"><path d="M944.083879 289.536302c14.264888 18.286482 15.462157 41.208541 2.670829 51.196009l-417.191704 325.421604c-2.885723 2.261507-12.156878 7.828292-13.732769 9.578146-15.544021 17.181311-37.893029 22.338774-49.947576 11.461029l-392.908648-354.309538c-12.054547-10.887978-9.271154-33.666774 6.272867-50.889017 15.544021-17.21201 37.893029-22.349007 49.988508-11.471262l357.584118 322.443783 408.258241-318.463122C907.910005 264.516466 929.84969 271.260054 944.083879 289.536302z" p-id="4297"></path></svg>
                    </div>
                </div>
              </div>
                <div class="jszai" v-if="jiaza">
                <img src="@/common/imager/timg.gif" alt="" height="70">
                </div>
                <p v-if="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
          </div>
          
        </div>
          
      <!-- </div>
    </pull-refresh> -->
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloadings" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
import http from '@/utils/http';
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
    tabbar,
    loading
  },
  data() {
    return {
      caseList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [], //存放所有的绑定卡，没有激活的卡不算
      //当前时间
      value1:'',
      isshowloadings:false,
      size:10,
      jiaza:false,
      allYe:1,
      xian:false,
      offset:1,
      total:''
    };
  },
  methods: {
      //跳转
        goMycase(item){
            if(item.type==1){
                item.type=0;
            }else{
                item.type=1;
            }
            
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
      if ( t !== "NaN-NaN-NaN NaN:NaN") {
        return t;
      } else {
        return "";
      }
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
      var url = "patMedReco/queryHistoryMedicalrecords";
      var visitdate =  that.value1;
      // var cardno = localStorage.getItem("cardno");
      var offset = that.offset;
      var data = {
        visitdate,limit:10,offset
      }
      var res  = await http.post(that,url,data);
      that.isshowloadings=false;
      that.jiaza=false;
      if(res.errcode==0&&res.data.content!=null){
        that.total=res.data.total;
        if(res.data.total / 10 < 1){
            that.allYe=1
        }else{
          that.allYe= parseInt(res.data.total / 10) + 1 
        }
        for(var i = 0;i<res.data.content.length;i++){
            res.data.content[i].type=0;
            that.caseList.push(res.data.content[i]);
        }
      }
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
  },
  mounted(){
   var that  = this;
   that.isshowloadings=true;
    const el = document.querySelector('.MyExamine');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
         const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
        if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            if(that.offset<that.allYe){
                that.offset+=1;
                that.jiaza=true;
                that.examineList();
            }else if(that.offset>=that.allYe){
              that.xian=true;
            }
        }else{
          //  that.xian=false;
           
        }
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
.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.fee-item {
  /* display: flex; */
  padding: 5px 10px;
  font-size: 14px;
}
.pan {
  margin: 10px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 15px;
  position: relative;
  z-index: 0;
}
.pan >p{
    padding:0px 0 10px 0;
}
.item_conent{
    display: inline-block;
    vertical-align: middle;
   
}
.item_conent span:nth-of-type(1){
    color: #ccc;
    margin-right: 15px;
}
.biaoji{
   /* display: inline-block;  */
   /* position: absolute; */
   /* right: 10px; */
   /* top: 45%; */
   text-align: center;
}
.fee-item p {
  line-height: 1.7;
}

.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #eee;
}
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  /* position: fixed; */
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
.titlei{
  position: fixed;
  width: 100%;
  z-index: 99;
}
.content{
  padding: 100px 0 0 0;
}
.jszai{
  text-align: center;
}
</style>