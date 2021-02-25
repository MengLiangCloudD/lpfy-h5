<template>
  <div class="MyExamine" >
    <div class="titlei">
      <div class="title">
          <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
          药品处方
      </div>
        <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部药品</span>
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
    <div class="contenttt">
          <div class="ecipeList" v-if="ecipeList.length==0" style="text-align: center;font-size:18px; padding:20% 0;" > 
               暂无数据
          </div>
           <div class="ecipeList"  v-if="ecipeList.length!==0">
             <div class="xiang"  v-for="(item,index) in ecipeList"  :key="index" >
               <div class="chufang"   v-if="item.drug.length!=0" >
                  <p style="padding:10px 5.33333vw;">药品处方单</p>
                  <!-- <p><span>处方类型：</span><span>药品处方</span></p>          -->
                  <p><span>开方时间：</span><span>{{formatDate(new Date(item.drug[0].visitdate))}}</span></p>
                  <p><span>就诊医院：</span><span>滦平妇幼保健院</span></p>
                  <!-- <p><span>项目详情：</span><span style="color:blue" @click="modal(index)">查看></span></p> -->
                  <p style="padding-bottom: 10px;"><span>缴费总额：</span><span style="color:red;font-size:18px;">￥{{totalMoney(index)}}</span></p>
                  <div class="yaopin" style="padding: 10px 5.33333vw;border-top: 1px solid #ccc;" v-if="item.type==1">
                      <p >缴费明细：</p>
                      <div class="ecipeListmodal" v-for="(item1,index1) in drug" :key="index1" >
                        <p class="yaoic" style="display:flex">
                          <span style="padding:0 10px;margin:5px 0px;width:60%;">{{item1.drugname}}</span>
                          <span style="padding:0 10px;margin:5px 0px;flex:1">{{item1.drugspec}}</span>
                          <span style="padding:0 10px;margin:5px 0px;flex:1;color:#f00;">￥{{item1.costs.toFixed(2)}}</span>
                        </p>
                      </div>
                  </div>
                <!-- <Modal v-model="mod1" fullscreen title="项目详情">
                  <div class="ecipeListmodal" v-for="(item1,index1) in drug" :key="index1" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px 0;font-weight:650;">
                    <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item1.drugname}}</div>
                    <p><span class="titletip">编码：</span><span>{{item1.drugcode}}</span></p>
                    <p><span class="titletip">数量：</span><span>{{item1.amount}}</span></p>
                    <p><span class="titletip">规格：</span><span>{{item1.drugspec}}</span></p>
                    <p><span class="titletip">单位：</span><span>{{item1.units}}</span></p>
                    <p><span class="titletip">用法：</span><span>{{item1.administration}}</span></p>
                    <p><span class="titletip">频次：</span><span>{{item1.frequency}}</span></p>
                    <p><span class="titletip">价格：</span><span style="color:red;font-size:18px;">￥{{item1.costs.toFixed(2)}}</span></p>
                  </div>
                </Modal> -->
               </div>
               <div class="biaoji" v-if="item.type==1" @click="modal(index)">
                    <svg t="1595231190705" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3564" width="20" height="20"><path d="M488.624 312.4L152.976 668.8a29.36 29.36 0 0 0 0 42.352 31.408 31.408 0 0 0 43.552 0L512 376.24l315.36 334.912a31.408 31.408 0 0 0 43.552 0 29.36 29.36 0 0 0 0-42.352L535.264 312.4a36.32 36.32 0 0 0-46.64 0z" p-id="3565"></path></svg>
                </div>
                <div class="biaoji" v-if="item.type==0"  @click="modal(index)">
                    <svg t="1595231254662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4296" width="20" height="20"><path d="M944.083879 289.536302c14.264888 18.286482 15.462157 41.208541 2.670829 51.196009l-417.191704 325.421604c-2.885723 2.261507-12.156878 7.828292-13.732769 9.578146-15.544021 17.181311-37.893029 22.338774-49.947576 11.461029l-392.908648-354.309538c-12.054547-10.887978-9.271154-33.666774 6.272867-50.889017 15.544021-17.21201 37.893029-22.349007 49.988508-11.471262l357.584118 322.443783 408.258241-318.463122C907.910005 264.516466 929.84969 271.260054 944.083879 289.536302z" p-id="4297"></path></svg>
                </div>
             </div>
              <div class="chufang" v-if="ecipeList[0].drug.length==0">
                <p style="font-size:18px; padding:20% 0;text-align: center;">暂无数据</p>
             </div>
             <div class="jszai" v-if="jiaza">
              <img src="@/common/imager/timg.gif" alt="" height="70">
            </div>
           </div>
    </div>
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloadings" class="loading"></loading>
  </div>
</template>

<script>
//引入公共底部
import tabbar from "@/common/tabbar";
//引入下拉刷新
//引入加载动画
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
      //所有数据
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
      size:15,
      num:0,
      jiaza:false,
      jixu:true
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
    //药品合计金额
    totalMoney(index){
      var tofee=0;
     var drug= this.ecipeList[index].drug;
     for(var i=0;i<drug.length;i++){
       tofee+=parseFloat((drug[i].costs).toFixed(2)); 
     }
     //取小数点后两位
     return tofee.toFixed(2);
    },
    //药品明细弹窗
    modal(index){
      
        if(this.ecipeList[index].type==0){
          for(var i=0;i<this.ecipeList.length;i++){
            this.ecipeList[i].type=0
          }
          this.ecipeList[index].type=1;
        }else{
          this.ecipeList[index].type=0;
        }
      
      this.drug = this.ecipeList[index].drug;
      
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
    // 返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
    //清空
    qingkong(){
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.GetRecipeList();
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
     this.GetRecipeList();
    },
    //药品明细
    async GetRecipeList(){
      var that = this;
      that.modal11 = true;
      //打开加载动画
      var url = "patPersc/queryDrugRecipeList";
      var cardno =localStorage.getItem("cardno");
      var visitdate =that.value1
      var size  = that.size;
      var data  = {
        type:'month',size,cardno,visitdate,doccode:''
      }
      var res  = await http.post(that,url,data);
      that.isshowloadings=false;
      that.jiaza=false;
      that.ecipeList=[]
      if(res.errcode==0&&res.data!=null){
          if(res.data.length<that.size){
            that.jixu=false;
          }
            for(var i=0;i<res.data.length;i++){
              that.ecipeList.push(res.data[i]);
            }
            //检查 化验 药品 集合
            var e = that.ecipeList;
            var visilist=[]
            for(let i=0;i<e.length;i++){
                visilist.push(e[i].visitno)
            }
            let visisublist=[]
            for(let i=0;i<visilist.length;i++){
                if(visisublist.length==0){
                  visisublist.push(visilist[0])
                }else{
                  let str=visilist[i]
                  if(visisublist.indexOf(str)==-1){
                    visisublist.push(str)
                  }
                }
            }
            //分类
            var arr=[]
            for(let i=0;i<visisublist.length;i++){
              arr.push({visitno:visisublist[i],subarr:[]})
            }

            for(let i=0;i<e.length;i++){
              let index=visisublist.indexOf(e[i].visitno) 
              arr[index].subarr.push(e[i])
            }

            for(let i=0;i<arr.length;i++){
              arr[i].drug=[]
            }
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].subarr.length;j++){
                    if(arr[i].subarr[j].itemclass=="A"||arr[i].subarr[j].itemclass=="B"){
                      arr[i].drug.push(arr[i].subarr[j])
                    }
                }
            }
            if(arr.length<7){
                if(that.num!==arr.length){
                  that.num=arr.length
                  that.size+=15;
                  that.GetRecipeList();
                }  
            }
            if(arr.length>=7){
              arr.splice(arr.length-1,1)
              for(var i = 0;i<arr.length;i++){
                  arr[i].type=0;
              }
              that.ecipeList=arr;
            }else{
              for(var i = 0;i<arr.length;i++){
                  arr[i].type=0;
              }
              that.ecipeList=arr;
            }
      }
     
    },
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
            if(that.jixu){
              that.size+=5;
              that.jiaza=true;
              that.GetRecipeList();
            }
            
        }
      }
    },1000)
    that.GetRecipeList();
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
.ecipeList p{
   line-height: 1.7;
  font-size: 15px;
  display: flex;
}
.ecipeList p span {
  display: inline-block;
 
}
.ecipeList p span:nth-of-type(1) {
   padding: 0 20px;
   color: #aaa;
  /* flex:1; */
}
.ecipeList p span:nth-of-type(2) {
  text-align: right;
}
.ecipeListmodal p{
  font-size: 14px;
  padding: 0 0px;
  display: flex;
}
.titletip{
  flex: 1
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
.xiang{
    margin: 10px;
    padding:10px;
    background: #fff;
    border-radius: 10px;
} 
.yaoic span{
  padding: 0;
  padding-right: 20px;
  font-size: 13px;
}
.biaoji{
  text-align: center;
}
</style>