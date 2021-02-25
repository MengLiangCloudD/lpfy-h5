<template>
  <div class="MyExamine">
    <!-- <pull-refresh :next="refresh">
      <div slot="list" style="padding-bottom:60px"> -->
      <div class="titlei">
        <div class="title">
          患者检查结果
          <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
          </div>
        </div>
        <div class="xuanze"  style="position: relative;">
           <div style="display:inline-block;width:100%">
            <span style="color:rgb(0, 187, 187);font-size:20px;" @click="qingkong">全部检查结果</span>
            <!-- <span style="color:rgb(0, 187, 187);font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
          
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
      <div class="contenttt">
        <div class="fee-item" v-if="prescription.length<=0" style="font-size:20px; text-align: center;">
          <p style="padding:50px;">暂无数据</p>
        </div>
        <div class="fee-item" v-if="prescription!==undefined&&prescription.length>0">
          <div v-for="(item,index) in prescription" :key="index">
            <div class="content" >
                <p>
                  <span>申请序号</span>
                  <span>{{item.exam_no}}</span>
                </p>
                 <p>
                <span>患者卡号</span>
                <span>{{item.patient_id}}</span>
              </p>
                <p>
                  <span>就诊日期</span>
                  <span>{{formatDates(new Date(item.report_date_time))}}</span>
                </p>
                <p>
                  <span>项目名称</span>
                  <span>{{item.exam_item}}</span>
                </p>
                 <p>
                  <span>项目详情</span>
                  <span style="color:blue" @click="mode(index)">查看></span>
                </p>
                <Modal v-model="modal11" fullscreen title="项目详情">
                    <div style="font-size:18px;">

                <div v-if="item.impression.length>=15">
                  <p style="display: inline-block;width: 39%; font-weight:600;"><span>初步诊断</span> </p>
                  <div class="qq">
                    <p v-for="(item,index) in impression.trim().split(/\s+/)" :key="index">{{item}}</p>

                  </div>
                  
                </div>
                <p>
                  <span style=" font-weight:600;">项目描述</span>
                </p>
                <p style="text-indent:2rem">{{description}}</p>
                    </div>
               </Modal>
               
            </div>
          </div>
        </div>
      </div>
      <!-- </div>
    </pull-refresh> -->
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import loading from "@/common/loading";
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
export default {
  components: {
    loading
  },
  data() {
    return {
      prescription: [],
      drugList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [],
      //弹出框
      modal11: false,
      //当前时间
      value1: '',
      //控制loading组件显示
      isshowloading: false,
      model2:'',
      impression:'',
      description:'',
      size:10,
      jiaza:false,
      allYe:1,
      xian:false,
      offset:1,
    };
  },
  methods: {
    //this.modal11 = true;
    //打开弹窗
    tobackdetail(){
      this.$router.push('/doctorckeck')
    },
    mode(index){
      this.modal11 = true;
      this.impression=this.prescription[index].impression;
       this.description=this.prescription[index].description
    },
    //切割时间
    incisionTime(data) {
      var RecipeDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(data);
      return RecipeDate[0];
    },
    //切割时间
    incisionTimess(data) {
      var RecipeDate = /\d{4}-\d{1,2}/g.exec(data);
      return RecipeDate[0];
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
    formatDates(now) { 
          var year=now.getFullYear();  //取得4位数的年份
          var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          var date=now.getDate();      //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month+"-"+date; 
    } ,
    p(s) {
      return s < 10 ? "0" + s : s;
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
      if (t !== "NaN-NaN-NaN- NaN:NaN") {
        return t;
      } else {
        return "";
      }
    },
    //清空
    qingkong(){
      // if(this.value1!= ''&&this.value1!=null ){
      //   this.value1= '';
      //   this.examineList();
      // }else{
        
      // }

      this.offset=1;
      this.xian=false;
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.prescription=[]
        this.examineList();
      }else{
        
      }
    },
    shaixuan(){
    //   if(this.value1==null){
    //     this.value1= '';
    //     this.size=10;
    //   }else{
    //       this.value1= this.datatime(this.value1);
    //   }
    //  this.examineList();

     this.xian=false;
      this.offset=1;
      if(this.value1==null){
         this.value1= '';
      }else{
          this.value1= this.datatime(this.value1);
      }
      this.prescription=[]
      this.examineList()
    },
    async examineList() {
      var that = this;
      // var url = "http://192.168.33.139:8080/HisCloud/repice/getordermaster.do";
      var url = "docCheck/checkResult";
      var data = {

      }
      let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
      data.cardNo =patientinfo.cardNo//订单号
      data.offset = that.offset;
      data.reporttime =that.value1;
      data.limit=10
      var res  = await http.post(that,url,data);
      that.jiaza=false;
      if(res.errcode==0&&res.data.content!=null){
        if(res.data.total / 10 < 1){
            that.allYe=1
        }else{
          that.allYe= parseInt(res.data.total / 10) + 1 
        }
        for(var i = 0;i<res.data.content.length;i++){
            that.prescription.push(res.data.content[i]);
        }
      }
    },
    formatDate(now) { 
          var year=now.getFullYear();//取得4位数的年份
          if(now.getMonth()+1<10){
            var mon=now.getMonth()+1;
            var month='0'+mon;
          }else{
             var month=now.getMonth()+1;
          }
           //取得日期中的月份，其中0表示1月，11表示12月
          if(now.getDate()<10){
            var da=now.getDate();
            var date='0'+da;
          }else{
            var date=now.getDate();
          }
          //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month;
    },
  },
   //查询患者卡号
  //就诊人
  mounted(){
    let that=this
    that.isshowloading = true;
    const el = document.querySelector('.MyExamine');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
        const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
        //  if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
        //     //每次滚动到底部size+10
        //     that.size+=5;
        //     that.examineList();
        // }
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
    this.examineList();
  }
};
</script>

<style scoped>
.qq{
  width: 58%;
    display: inline-block;
    vertical-align: top;
}

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
  background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
}
.fee-item {
  /* display: flex; */
  padding: 5px 10px;
  font-size: 14px;
}
.box {
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 10px;
}
.box p {
  line-height: 2;
}
.box p span:nth-of-type(2) {
  width: 50%;
  display: inline-block;
  text-align: right;
  vertical-align: top;
}
.box p span:nth-of-type(1) {
  margin-left: 10%;
  display: inline-block;
  vertical-align: top;
  font-weight: 600;
}
.yao {
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  line-height: 2;
}
.fee-item {
  padding: 0 !important;
}
.content {
  text-align: center;
}
.content p {
  line-height: 2;
}
.content p span:nth-of-type(2) {
  width: 70%;
  text-align: right;
  display: inline-block;
  /* margin-left: 20%; */
}
.content p span:nth-of-type(1) {
  font-weight: 600;
}
.MyExamine {
  height: 100%;
   overflow: auto;
   padding-bottom: 50px;
  -webkit-overflow-scrolling: touch;
}
.content {
  padding: 5px 5%;
  border-bottom: 1px solid #ccc;
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
  color: rgb(0, 187, 187);
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
}
.contenttt{
  padding-top: 100px;
}
</style>