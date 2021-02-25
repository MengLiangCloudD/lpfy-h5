<template>
  <div class="MyExamine">
      <div class="titlei">
        <div class="title">
           <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
        </div>
          化验结果
          </div>
          <div class="xuanze" style="position: relative;">
            <div style="display:inline-block;width:100%">
              <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部化验</span>
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
      <div class="contenttt">  
        <div class="fee-item" v-if="prescription.length<=0" style="font-size:20px; text-align: center;">
          <p style="padding:20%;font-size:18px;">暂无数据</p>
        </div>
        <div class="fee-item" v-if="prescription!==undefined&&prescription.length>0">
          <div v-for="(item,index) in prescription" :key="index" class="itemes">
            <div class="content" >
                <p>
                  <span>检查号：</span>
                  <span>{{item.test_no}}</span>
                </p>
                 <p>
                <span>患者卡号：</span>
                <span>{{item.patient_id}}</span>
              </p>
                <p>
                  <span>就诊日期：</span>
                  <span>{{formatDates(new Date(item.requested_date_time))}}</span>
                </p>
                <p>
                  <span>项目名称：</span>
                  <span>{{item.item_name}}</span>
                </p>
                <p>
                  <span>项目明细：</span>
                  <span style="color:blue" @click="Testdetails(index)">查看></span>
                </p>
            </div>
          </div>
        </div>
        <div class="jszai" v-if="jiaza">
              <img src="@/common/imager/timg.gif" alt="" height="70">
        </div>
        <p v-if="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
      </div>
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloadings" class="loading"></loading>
  </div>
</template>

<script>
//引入公共底部
import tabbar from "@/common/tabbar";
// 引入下拉刷新
//引人加载动画
import loading from "@/common/loading";
import http from '@/utils/http';
//取当前标准时间
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
// 当月份小于10 默认在前面加0
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当前的日期
//当日期小于10默认在前面加0
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
    //公共底部
    tabbar,
    //加载动画
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
      isshowloadings: false,
      model2:'',
      TestdeList:[],
      size:10,
      jiaza:false,
      allYe:1,
      xian:false,
      offset:1,
    };
  },
  methods: {
    shaixuan(){
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
    qingkong(){
      this.offset=1;
      this.xian=false;
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.prescription=[]
        this.examineList();
      }else{
        
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
    formatDates(now) { 
      var year=now.getFullYear();  //取得4位数的年份
      if(now.getMonth()+1 <10 ){
        var month='0' + (now.getMonth()+1);//取得日期中的月份，其中0表示1月，11表示12月
      }else{
        var month=now.getMonth()+1;//取得日期中的月份，其中0表示1月，11表示12月
      }
      if(now.getDate() < 10){
         var date='0'+ now.getDate();
      }else{
        var date=now.getDate();      //返回日期月份中的天数（1到31）
      }
      
      return year+"-"+month+"-"+date; 
    } ,
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
    //查询化验记录
    async examineList() {
      var that = this;
      var url = "patAssay/getAssayResultTakeNotes";
      var offset = that.offset;
      var requested_date_time = that.value1;
      var data={
        offset,limit:10,requested_date_time
      }
      that.isshowloadings=true;
      var res  = await http.post(that,url,data);
      that.jiaza=false;
      that.isshowloadings=false;
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
    //查看化验明细
    Testdetails(index){
        this.$router.push(`/MyassayInfor?testno=${this.prescription[index].test_no}`);
    }
  },
   //查询患者卡号
  //就诊人
  mounted(){
    let that=this
    that.isshowloadings = true;
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
}
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
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
.fee-item {
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
.content p {
  line-height: 2;
  display: flex;
}
.content p span:nth-of-type(2) {
  text-align: right;
  display: inline-block;
}
.content p span:nth-of-type(1) {
  font-weight: 600;
  display: inline-block;
  flex:1;
}
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #eee;
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
}
.contenttt{
  padding-top: 100px;
}
.jszai{
  text-align: center;
}
.itemes{
    background:#fff;
    margin: 10px;
    border-radius: 10px;
}
</style>