<template>
  <div class="MyExamine">
    <!-- <pull-refresh :next="refresh">
      <div slot="list" style="padding-bottom:60px"> -->
    <div class="titlei">
      <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            检查处方
      </div>
        <div class="xuanze" style="position: relative;">
         <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部检查</span>
          <!-- <span style="color:rgb(40, 184, 161);font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
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
          <div class="ecipeList" v-if="ecipeList.length==0" style="text-align: center;font-size:18px; padding:20% 0;" > 
            暂无数据
          </div>
           <div class="ecipeList"  v-if="ecipeList.length!==0" style=" padding: 10px; ">
             <div class="xiang"  v-for="(item,index) in ecipeList"  :key="index" >
               <div class="examList"  v-if="item.check.length!=0">
                 <div style="border-bottom: 1px solid #ccc;">
                   <p><span>处方类型：</span><span>检查处方</span></p>
                  <!-- <p><span>就诊序号：</span><span>{{item.check[0].visitno}}</span></p>              -->
                  <p><span>生成时间：</span><span>{{formatDate(new Date(item.check[0].visitdate))}}</span></p>
                  <p><span>项目详情：</span><span style="color:blue" @click="modal2(index)">查看></span></p>
                  <p><span>合计金额：</span><span style="color:red;font-size:18px;">￥{{checkMoney(index)}}</span></p>
                  <p><span>检查结果：</span><span style="color:blue" @click="lookover(item.check[0].rcptno)">查看></span></p>
                 </div>
                  
                   <Modal v-model="mod2" fullscreen title="项目详情">
                  <div class="ecipeList" v-for="(item1,index1) in examList" :key="index1" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px 0;font-weight: 650;">
                    <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item1.itemname}}</div>
                    <p><span>编码：</span><span>{{item1.itemcode}}</span></p>
                    <p><span>数量：</span><span>{{item1.amount}}</span></p>
                    <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item1.charges}}</span></p>
                    <p><span>规格：</span><span>{{item1.itemspec}}</span></p>
                    <p><span>单位：</span><span>{{item1.units}}</span></p>
                  </div>
                </Modal>
              </div>
             
             </div>
            <div class="" v-if="ecipeList[0].check.length==0">
                 <p style="font-size:18px; margin:20% 0;text-align:center;">暂无数据</p>
              </div>
              <div class="jszai" v-if="jiaza">
                <img src="@/common/imager/timg.gif" alt="" height="70">
              </div>
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
    tabbar,
    loading
  },
  data() {
    return {
      ecipeList: [],
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
      mod1:false,
      mod2:false,
      mod3:false,
      assaysList:[],
      examList:[],
      drug:[],
      size:10,
      num:0,
      jiaza:false,
      jixu:true,
      allYe:1,
      xian:false,
      offset:1,
    };
  },
  methods: {
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
          return year+"-"+month+"-"+date; 
    },
    //检查合计金额
    checkMoney(index){
      var tofee=0;
     var check= this.ecipeList[index].check;
     for(var i=0;i<check.length;i++){
       tofee+=parseFloat(check[i].charges); 
     }
     return tofee.toFixed(2);
    },
    //检查明细弹窗
    modal2(index){
      this.mod2=true;
      this.examList= this.ecipeList[index].check
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
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
    //改变就诊人
    selectcard(value) {
      this.examtList(value);
    },
    //清空
    qingkong(){
       this.offset=1;
      this.xian=false;
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.ecipeList=[]
        this.examtList();
      }else{
        
      }
    },
    shaixuan(){
     if(this.value1==null){
        this.value1= '';
        this.size=10;
      }else{
          this.value1= this.datatime(this.value1);
      }
     this.examtList();

      this.xian=false;
      this.offset=1;
      if(this.value1==null){
         this.value1= '';
      }else{
          this.value1= this.datatime(this.value1);
      }
      this.ecipeList=[]
      this.examtList()
    },
    //检查明细
    async examtList() {
      var that = this;
     var url ="patPersc/queryCheckOrAssay";
      var cardno = localStorage.getItem("cardno");
      var billdate =that.value1;
      var offset=that.offset;
      var data = {
        cardno,type:'month',itemtype:'D',billdate,offset,limit:10
      }
      var res  = await http.post(that,url,data);
       that.isshowloadings = false;
       that.jiaza=false;
       if(res.errcode==0&&res.data!=null){
          //关闭加载动画
        if(res.data.total / 10 < 1){
              that.allYe=1
          }else{
            that.allYe= parseInt(res.data.total / 10) + 1 
          }
          var arr = res.data.content;
        var data=[]
        for(var i = 0;i<arr.length;i++){
          var obj={}
          if(arr[i].length>0){
             obj.visitno = arr[i][0].visitno;
            obj.check =arr[i];
            data.push(obj);
          }
           
        }
        for(var i = 0;i<data.length;i++){
            that.ecipeList.push(data[i])
          }
       }
    },
    //查看结果
    lookover(item){
      this.$router.push(`/MyExamine?rcptno=${item}`)
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
                that.examtList();
            }else if(that.offset>=that.allYe){
              that.xian=true;
            }
        }
      }
    },1000)
    that.examtList();
  }
};
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
.ecipeList p{
   line-height: 2;
    font-size: 14px;
    display: flex;
    padding: 0 20px;
  
}
.ecipeList p span {
  display: inline-block;
 
  /* width: 38%; */
}
.ecipeList p span:nth-of-type(1) {
  /* margin-left: 8%; */
   flex:1;
  font-weight: 650;
}
.ecipeList p span:nth-of-type(2) {
  text-align: right;
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
</style>