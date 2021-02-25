<template>
  <div class="orderLists">
    
      <!-- <div  class="orderList-page"> -->
    <div class="titlei">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div
      >挂号列表
      </div>
      <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
         <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部订单</span>
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:35%; border:0; position: absolute;right: 5%;top: 7px;"
            @change="selecter"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
            >
          </el-date-picker>
          </div>
      </div>
    </div>
    <!-- <pull-refresh :refreshing="isRefreshing" :on-refresh="onRefresh" > -->
    <div  class="contenttt">
      <div  v-if="orderListes.length<=0">
        <p style="text-align: center;font-size:18px;margin-top:30px;">您还未创建订单</p>
      </div>
      <div class="content" v-for="(item,index) in orderListes" :key="index" >
        <div class="lineItem" v-if="orderListes.length!==0">
          <div>
            <p>
              <span>滦平县妇幼保健院</span>
              <span v-if="item.order_status==1" class="green">待就诊</span>
              <span v-if="item.order_status==0" style="color:red">待支付</span>
              <span v-if="item.order_status==2" style="color:#ccc">已完成</span>
              <span v-if="item.order_status==3" style="color:#ccc">已取消</span>
              <span v-if="item.order_status==4" style="color:red">退款中</span>
            </p>
            <p>
            <span>订单号</span>
            <span>{{item.order_no}}</span>
          </p>
            <p>
              <span>卡号</span>
              <span>{{item.card_no}}</span>
            </p>
            <p>
              <span>患者姓名</span>
              <span>{{item.name}}</span>
            </p>
            <p>
              <span>挂号时间</span>
              <span>{{item.created_at}}</span>
            </p>
            <p>
              <span>医生姓名</span>
              <span>{{item.doctorName}}</span>
            </p>
            <p>
              <span>挂号费用</span>
              <span style="color:red">￥{{item.total_fee}}</span>
            </p>
            <p>
              <span>科室名称</span>
              <span>{{item.dept_name}}</span>
            </p>
            <p>
              <span>就诊时间</span>
              <span>{{item.regTime}}</span>
            </p>
            <p style="padding:15px 0">
              <span></span>
              <span>
                <Button type="success" @click.stop="payment(item)" v-if="item.order_status==0" v-bind:disabled="isDisabl" >去支付</Button>
                <Button type="info" @click.stop="test(index)" v-if="item.order_status==1||item.order_status==0" v-bind:disabled="isDisabl" >取消订单</Button>
                <Button type="info" @click.stop="evaluate(item)" v-if="item.order_status==2&&(item.evaluate_status==0||item.evaluate_status==-1)" >评价</Button>
                <Modal v-model="modal10" width="360">
                  <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>取消挂号</span>
                    
                  </p>
                  <p style="padding:10px 0">请您描述退号原因</p>
                  <div style="text-align:center">
                    
                    <Input v-model="dosAge" type="text" @on-blur.prevent="inputLoseFocus"/>
                  </div>
                  <div slot="footer">
                    <Button type="success" size="large" long @click="topayment()">确定</Button>
                  </div>
                </Modal>
              </span>
            </p>
          </div>
          </div>
          
      </div>
      <div class="jszai" v-if="jiaza">
              <img src="./../../../../common/imager/timg.gif" alt="" height="70">
            </div>
      <p v-if="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
    </div>
    <!-- </div> -->
  <!-- </pull-refresh> -->
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show='isshow'></loading>
  </div>
</template>
<script>
import http from '@/utils/http'
//底部公共组件
import tabbar from "@/common/tabbar";
// 加载动画
import loading from "@/common/loading";
//引入下拉刷新
import pullRefresh from "@/common/scrollRefresh";
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0' + mon;
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
var tiemr = year + "-" + month+ "-" + day
//当前年月日
export default {
  components: {
    tabbar,
    loading,
    pullRefresh
  },
  data() {
    return {
      isRefreshing: false,
      isshow:false,
      //顶单列表
      orderListes:[],
      //卡号
      cardno: "",
      //订单号
      tradeno: "",
      //弹出框
      modal10: false,
      modal101:false,
      isDisable: false,
      currentIndex: "",
      miaomi:0,
      times:'',
      isDisabl:false,
      value1:'',
      isDisables:false,
      time:tiemr,
      size:10,
      onlytotal:1,
      allYe:1,
      xian:false,
      dosAge:'',
      jiaza:false,
    };
  },

  methods: {
     onRefresh() {
       var that =this;
              that.isRefreshing = true;
              setTimeout(() => {
                this.onlytotal=1;
                this.xian=false;
                this.value1= '';
                this.orderList();
              },0)
        },
   //弹出键盘问题
    inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
    //点击开启弹窗 取消挂号
    test(index) {
      this.currentIndex = index;
      this.modal10 = true;
    },
    //清空
    qingkong(){
      this.onlytotal=1;
      this.xian=false;
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.orderListes=[]
        this.isshow=true;
        this.Tobeevaluated();
      }else{

      }
    },
    selecter(){
      this.xian=false;
      this.onlytotal=1;
      if(this.value1==null){
        this.value1= '';
        
        
      }else{
          this.value1= this.datatime(this.value1);
      }
      this.orderListes=[]
      this.isshow=true;
      this.Tobeevaluated()
    },
    refresh(){
      this.xian=false;
      this.onlytotal=1;
      this.orderListes=[];
      this.isshow=true;
      this.Tobeevaluated();
    },
    //标准时间转换
    datatime(data) {
      if(data!==''){
        var d = data;
      }else{
        var d = currentDay;
      }
      
      var y = this.p(d.getFullYear());
      var m = this.p(d.getMonth() + 1);
      var t = this.p(d.getDate());
      var resDate = y + "-" + m;
      return resDate;
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //获取订单列表
    async orderList(){
        var that = this;
        var url = "patientRegister/queryOrdersByUserID";
        var offset = that.onlytotal;
        var month =that.value1;
        var data ={
         limit:10,offset,month
        }
        that.jiaza=false;
        var res  = await http.post(that,url,data);
        if(res.errcode==0 ){
           that.isshow=false;
          if(res.data.total / 10 < 1){
            that.allYe=1
          }else{
           that.allYe= parseInt(res.data.total / 10) + 1 
          }
          that.orderListes=res.data.content
          // for(var i = 0;i<res.data.content.length;i++){
          //   that.orderListes.push(res.data.content[i]);
          // }
        }else{
          that.isshow=false;
        }
    },
    //获取订单列表
    async Tobeevaluated(){
        var that = this;
        var url = "patientRegister/queryOrdersByUserID";
        var offset = that.onlytotal;
        var month =that.value1;
        var data ={
         limit:10,offset,month
        }
        that.jiaza=false;
        var res  = await http.post(that,url,data);
        if(res.errcode==0 ){
           that.isshow=false;
          if(res.data.total / 10 < 1){
            that.allYe=1
          }else{
           that.allYe= parseInt(res.data.total / 10) + 1 
          }
          for(var i = 0;i<res.data.content.length;i++){
            that.orderListes.push(res.data.content[i]);
          }
        }else{
          that.isshow=false;
        }
    },
    //取消挂号 并退款
    async refund() {
      let that = this;
      //判断点的是第几个
      let index = that.currentIndex;
      var url =  "patientRegister/patientApplyRefund";
      var order_no =that.orderListes[index].order_no;
      var refund_reason=that.dosAge;
      var mesg;
      if(that.orderListes[index].order_status==1){
        mesg ='取消成功' 
      }else if(that.orderListes[index].order_status==0){
        mesg ='取消成功' 
      }
      var  data  = {
        order_no,
        refund_reason
      }
      that.modal10 = false;
      that.isloading=true;
      var res  = await http.post(that,url,data);
       that.isDisable = false;
      if(res.errcode==0){
        that.$Message.success(mesg);
        that.orderListes=[];
        that.refresh();
      }else{
        that.$Message.warning(res.errmsg);
        that.orderListes=[];
        that.refresh();
      }
    },
    //点击取消时触发
    topayment() {
      //开始退款改为true，表示在isDisable为true的时候禁止用户再次点击
      if (!this.isDisable) {
        //如果isDisable为false，将它改为true
        this.isDisable = true;
        //调用取消订单的方法
        this.refund();
      } else {
        //这时isDisable为true禁止用户再次点击
        return;
      }
    },
    //进入评价页面
    evaluate(item) {
      if(item!=undefined&&item!=null&&item!=''){
        localStorage.setItem('doctorName',item.doctorName);
        localStorage.setItem('dept_name',item.dept_name);
        localStorage.setItem('order_no',item.order_no);
        localStorage.setItem('docCode',item.doctor_code);
        //跳转到评论页面
        this.$router.push("/Orderevaluate");
      }
      
    },
    //前往支付页面
    payment(item) {
      var that =this;
      if(item!=undefined&&item!=null&&item!=''){
         //将localStorage里的订单号替换
          localStorage.setItem("tradeno", item.order_no);
          localStorage.setItem("body", '微信挂号');
          localStorage.setItem("price", item.total_fee);
          localStorage.setItem('herf',window.location.href);
          that.$router.push('/payment');
      }
    },
     //按钮弹窗在点击后1.5秒不能再次弹出（1.5秒是弹窗默认出现消失的时间）
    //第一个text是弹窗内的文本 必须是字符串
    //第二个参数是弹窗类型 0/1/2 警告/错误/成功
    //全局必须有一个控制按钮可不可点击的属性 isDisabl:false,
    btnTimer(text,type){
      //警告窗口
      let timer = null;//控制按钮在弹窗结束前多次点击无效
      let _this = this;
      _this.isDisabl = true;
        if(_this.isDisabl == true){
           if(type === 0){
             _this.$Message.warning(text);
           }else if(type == 1){
             _this.$Message.error(text);
           }else if(type == 2){
             _this.$Message.success(text);
           }
          timer = setInterval(function(){
              _this.isDisabl = false;
              clearInterval(timer);
          },1400)
        }
    },
  },
  mounted(){
    let that=this
    that.isshow = true;
    const el = document.querySelector('.orderLists');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
         const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
         if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            if(that.onlytotal<that.allYe){
              that.jiaza=true;
                that.onlytotal+=1;
               that.Tobeevaluated();
            }else if(that.onlytotal>=that.allYe){
              that.xian=true;
            }
        }else{
           that.xian=false;
        }
      }
    },1000)
  },
  //调用渲染
  created() {
    //请求数据列表
    var that=this
    setTimeout(() => {
      that.Tobeevaluated();
    }, 500);
  }
};
</script>
<style scoped>
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
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.orderLists{
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 50px;
  overflow: auto;
}
.orderList-page {
  height: 100%;
  overflow: auto;
  /* padding: 0 0 70px 0; */
}
.tittle {
  background: rgb(40, 184, 161);
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  font-weight: 900;
      position: relative;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.content {
  width: 100%;
  display: inline-block;
  padding: 10px 5%;
  border-bottom: 1px solid #ccc;
  -webkit-overflow-scrolling: touch;
  
}
.PersonSeekingMedicalService {
  position: relative;
  padding: 20px 0;
  font-size: 18px;
}
.PersonSeekingMedicalService span:nth-child(2) {
  position: absolute;
  right: 10%;
  font-size: 18px;
}
.PersonSeekingMedicalService span:nth-child(2) a {
  text-decoration: none;
  color: #28b8a1;
}
.lineItem p {
  padding: 5px 0;
  position: relative;
}
.lineItem p:nth-of-type(1) {
  position: relative;
}
.lineItem p:nth-of-type(1) span:nth-of-type(2) {
  position: absolute;
  right: 0%;
  font-weight: 900;
}
.lineItem p:nth-of-type(10) span:nth-of-type(2) {
  display: inline-block;
  position: absolute;
  right: 0%;
  bottom: 0px;
}
.green {
  position: absolute;
  right: 0%;
  color: #28b8a1;
  font-weight: 900;
}
.lineItem p:nth-of-type(1) span:nth-of-type(1) {
  font-weight: 600;
}
.lineItem p span:nth-of-type(1) {
  display: inline-block;
  color: #7f7f7f;
  width: 29%;
}

.lineItem p:nth-of-type(2) span:nth-of-type(2) {
  display: inline-block;
  padding: 0 0 0 15px;
  font-weight: 600;
}
.lineItem p:nth-of-type(3) span:nth-of-type(1) {
  display: inline-block;
  padding: 0 15px 0 0;
  color: #7f7f7f;
}
.lineItem p:nth-of-type(3) span:nth-of-type(2) {
  display: inline-block;
  padding: 0 0 0 15px;
  font-weight: 600;
}

#select {
  color: #28b8a1;
  background: white;
}
option {
  color: #28b8a1;
}
.lineItem p span:nth-of-type(2) {
  display: inline-block;
  text-align: left;
  padding: 0 !important;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 888
}
.contenttt{
  padding-top: 100px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  /* z-index: 911; */
  background: #fff;
  /* overflow: auto; */
   /* height: 100%; */
}
</style>