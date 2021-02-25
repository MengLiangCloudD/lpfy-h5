<template>
    <div class="orderLists">
        <div class="titlei">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div
      >问诊列表
      </div>
      <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
         <span style="color:rgb(40, 184, 161);font-size:20px;"  @click="qingkong">全部订单</span>
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:35%; border:0; position: absolute;right: 5%;top: 7px;"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
             @change="selecter"
            >
          </el-date-picker>
          </div>
      </div>
    </div>
        <div class="content">
            <div class="item" v-for="(item,index) in consultOrderList" :key="index">
                <p>
                    <span>滦平县妇幼保健院</span>
                    <span v-if="item.order_status==1" style="color:green">待接诊</span>
                    <span v-if="item.order_status==0" style="color:red">待支付</span>
                    <span v-if="item.order_status==2" style="color:green;margin-right:10px">已接单</span>
                    
                    <span v-if="item.order_status==3" style="color:#ccc">已完成</span>
                     <span v-if="item.order_status==4" style="color:#ccc">已取消</span>
                     <span class="poop" style="background:red;"  v-if="item.if_unread==1&&item.order_status==2&&item.identity==2"></span>
                     <span class="poop" v-else></span>
                </p>
                <p>
                    <span>订单号</span>
                    <span>{{item.order_no}}</span>
                </p>
                <p>
                    <span>下单时间</span>
                    <span>{{item.created_at}}</span>
                </p>
                <p>
                    <span>医生姓名</span>
                    <span>{{item.name}}</span>
                </p>
                <p>
                    <span>咨询费用</span>
                    <span style="color:red">￥{{item.total_fee}}</span>
                </p>
                <p>
                    <span>订单类型</span>
                    <span v-if="item.type==2">视频咨询</span>
                    <span v-if="item.type==1">图文咨询</span>
                </p>
                <p style="padding:15px 0">
              <span></span>
              <span>
                <Button type="success" @click="supament(item)" v-if="item.order_status==0" >去支付</Button>
                <Button type="info" @click.stop="goelePingja(item)" v-if="item.order_status==3&&item.evaluation_status==0" >评价</Button>
                
                <Button type="success" @click.stop="addclick(item)" v-if="item.order_status==3&&item.type==1" >查看</Button>
                <Button type="info" @click.stop="addclick(item)" v-if="item.order_status==2||(item.order_status==1&&item.type==1)">去咨询</Button>
                <Button type="primary" @click.stop="addprice(item)" v-if="(item.order_status==2||item.order_status==3)&&item.type==1">续费</Button>
                <Button type="primary" @click.stop="addprice(item)" v-if="item.order_status==2&&item.type==2">续费</Button>
                <p v-if="item.order_status==1&&item.type==2" style="font-weight: 900;">注意查收通知，等待医生接诊</p>
              </span>
            </p>
            </div>
        </div>
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

    export default {
        components: {
            tabbar,
            loading,
        },
        data() {
            return {
                //订单列表
                consultOrderList:[],
                //分页
                offset:1,
                allYe:1,
                isshow:false,
                times:'',
                value1:''
            }
        },
        methods: {
            //续费
            addprice(item){
                var that = this;
                clearInterval(that.times);
                if(item.type==1){
                    localStorage.setItem("body", '图文续费');
                }else if(item.type==2){
                    localStorage.setItem("body", '咨询医生');
                }
                localStorage.setItem("price",item.total_fee);
                localStorage.setItem("tradeno", item.order_no);
                localStorage.setItem('zxType',item.type);
                localStorage.setItem('herf',window.location.href);
                that.$router.push("/payment"); //跳到支付页面
            },
            //去咨询
            addclick(item){
                clearInterval(this.times);
                if(item.type==1){
                    this.$router.push(`/chatJieMian?orderNo=${item.order_no}&orderStart=${item.order_status}`)
                    localStorage.setItem('userZixunNmme',item.name);
                    localStorage.setItem('Itemprice',JSON.stringify(item))
                }else if(item.type==2){
                    // localStorage.setItem('videoZxunItem',JSON.stringify(item))
                    this.$router.push(`/appletCard?orderNo=${item.order_no}&type=1`);
                }
            },
            //返回上一层
            tobackdetail(){
                clearInterval(this.times);
                this.$router.push('/HomePage');
            },
            //清空
            qingkong(){
                this.offset=1;
                this.xian=false;
                if(this.value1!= ''&&this.value1!=null ){
                    this.value1= '';
                    this.consultOrderList=[]
                    this.isshow=true;
                    this.orderList();
                }else{

                }
            },
            selecter(){
                this.xian=false;
                this.offset=1;
                if(this.value1==null){
                    this.value1= '';
                    
                    
                }else{
                    this.value1= this.datatime(this.value1);
                }
                this.consultOrderList=[]
                this.isshow=true;
                this.orderList()
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
            async orderList(){
                var that  = this;
                var url = 'consultation/queryPatientConsultOrdersList';
                var offset= that.offset;
                var month=that.value1;
                var limit = 10;
                var data = {
                    offset,limit,month
                }
                var res  = await http.post(that,url,data);
                 that.isshow=false;
                if(res.errcode==0&&res.data.content!=null){
                    if(res.data.total / 10 < 1){
                        that.allYe=1
                    }else{
                    that.allYe= parseInt(res.data.total / 10) + 1 
                    }
                    for(var i = 0;i<res.data.content.length;i++){
                        that.consultOrderList.push(res.data.content[i]);
                    }
                }
            },
            //评价
            goelePingja(item){
                clearInterval(this.times);
                localStorage.setItem('pjDocname',item.name)
                 this.$router.push(`/elePingja?orderNo=${item.order_no}&doctorid=${item.doctor_id}`);

            },
            // 去支付
            supament(item){
                var that = this;
                clearInterval(that.times);
                localStorage.setItem("body", '咨询医生');
                localStorage.setItem("price",item.total_fee);
                localStorage.setItem("tradeno", item.order_no);
                localStorage.setItem('zxType',item.type);
                localStorage.setItem('herf',window.location.href);
                that.$router.push("/payment"); //跳到支付页面
            },
            //查询是否有红点
            async selectRedList(){
                var that = this;
                var url = 'consultation/queryRedPointStatus'
                var list = [];
                for(var i=0;i<that.consultOrderList.length;i++){
                    if(that.consultOrderList[i].order_status==2||that.consultOrderList[i].order_status==1){
                        list.push({orderNo:that.consultOrderList[i].order_no})
                    }
                }

                var data = {
                    list:JSON.stringify(list)
                }
                if(list.length>0){
                    var res = await http.post(that,url,data);
                    if(res.errcode==0&&res.data!=null){
                        var data = res.data;
                        for(var i = 0;i<data.length;i++){
                            for(var y = 0;y<that.consultOrderList.length;y++){
                                if(data[i].orderNo==that.consultOrderList[y].order_no&&data[i].status==1&&data[i].identity==2){
                                    var poop = document.getElementsByClassName('poop')[y];
                                    poop.style.background="#f00";
                                }
                            }
                        }
                    }
                }
            }
        },
        created() {
            var that = this;
            that.isshow=true;
            setTimeout(() => {
                that.orderList();
            },500)
            
        },
        mounted() {
            var that  = this;
                const el = document.querySelector('.orderLists');
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
                            that.orderList();
                        }else if(that.offset>=that.allYe){

                        }
                    }else{
                    //  that.xian=false;
                    
                    }
                }
                },1000)
                that.times = setInterval(() => {
                    that.selectRedList()
                }, 2000);
        },
        destroyed(){
            if(this.times) { //如果定时器在运行则关闭
                clearInterval(this.times); 
            }
        }
    }
</script>

<style scoped>
.orderLists{
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 50px;
  overflow: auto;
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
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
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
.content{
    padding-top: 100px;
}
.item {
    padding: 10px 5%;
    border-bottom: 1px solid #ccc;
}
.item p{
    display: flex;
    padding: 3px 0;
    font-size: 14px;
}
.item p span:nth-child(1){
    flex: 1;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.poop{
    background:#fff;width:10px;height:10px;border-radius: 50%;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 888
}
</style>