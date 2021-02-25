<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;background: rgb(250, 250, 250);" class="MyExamine">
        <div class="tittle" style="background: #00bbbb;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             全部订单
        </div>
        <div class="content">
            <div class="content_text" v-for="(item,index) in orderList" :key="index">
                <div class="text_top">
                     <!-- <img src="@/common/imager/avatar.png" alt="" width="30" style="vertical-align: middle;"> -->
                    <div class="nei">
                        <div class="docNmae">
                            <p></p>
                            <p></p>
                             <p class="ta" v-if="item.order_status==1" style="color:#00bb00">
                                 <span style="margin-right:10px">待接单</span> 
                            </p>
                            <div class="ta" v-if="item.order_status==2">
                               <!-- <span style="margin-right:20.66667vw">正在咨询</span>  -->
                                <div size="large" class="switchopen" :class="{'activeswitchopen':item.order_status=='1'}" @click="ischangestate(item,index)" >
                                    {{item.order_status=='2'?"咨询中":"关闭"}}
                                    <div class="circle" :class="{'activecircle':item.order_status=='1'}"></div>
                                </div>
                                
                            </div>
                             <p class="ta" style="color:#00bb00" v-if="item.order_status==3">
                                已完成
                            </p>
                            <p class="poop" v-if="item.if_unread==1&&item.identity==1" style="background:red"></p>
                                <p class="poop" v-else></p>
                        </div>
                    </div>
                    <div class="text_content">
                        <!-- <div class="xinx">
                            <p>病情描述：</p>
                            <p>感冒发烧无所不能</p>
                        </div> -->
                        <div class="xinx">
                            <p>就&nbsp;&nbsp;诊&nbsp;&nbsp;人：</p>
                            <p><span>{{item.name}}</span>
                            <!-- &nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.age}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.sex}}</span> -->
                            </p>
                        </div>
                        <div class="xinx">
                            <p>订单费用：</p>
                            <p style="color:red;">{{item.total_fee}}</p>
                        </div>
                        <!-- <div class="xinx">
                            <p>预约时间：</p>
                            <p style=" color: darkturquoise;">{{item.created_at}}</p>
                        </div> -->
                        <div class="xinx">
                            <p>下单时间：</p>
                            <p style=" color: darkturquoise;">{{item.created_at}}</p>
                        </div>
                        <div class="xinx">
                            <p>订单类型：</p>
                            <p v-if="item.type==1">图文咨询</p>
                            <p v-if="item.type==2">视频问诊</p>
                        </div>
                    </div>
                </div>
                <!-- <div class="text_bottom">
                    <Button class="btn" type="primary" shape="circle">去咨询</Button>
                </div> -->
                <div class="text_bottom" v-if="item.order_status==1&&item.order_code!=0">
                    <Button class="btn" type="primary" shape="circle" @click="godoctorMian(item)">接诊</Button>
                </div>
                <div class="text_bottom" v-if="item.order_status==2">
                    <Button class="btn" type="primary" shape="circle" @click="godoctorMian(item)">继续咨询</Button>
                </div>
                <div class="text_bottom" v-if="item.order_status==3&&item.type==1">
                    <Button class="btn" type="primary" shape="circle" @click="godoctorMian(item)">查看</Button>
                </div>
            </div>
        </div>
        <Modal v-model="statemodel"  @on-ok="changestate" title="修改出诊时间">
            <p>请确认是否关闭！</p>
        </Modal>
        <loading v-show='isshow'></loading>
    </div>
</template>

<script>
import http from '@/utils/http'
// 加载动画
import loading from "@/common/loading";
    export default {
        components: {
            loading,
        },
        data() {
            return {
                orderList:[],
                swi:true,
                //分页
                offset:1,
                allYe:1,
                statemodel:false,
                currentitem:{},
                currentindex:'',
                isshow:false,
                times:''
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                clearInterval(this.times)
                this.$router.push('/Personalcenter')
            },
            async selectOrderList(){
                var that  = this;
                var url = 'consultation/queryDoctorOrderList';
                var offset= that.offset;
                var limit = 10;
                var data = {
                    offset,limit
                }
                var res  = await http.post(that,url,data);
                 that.isshow=false;
                 console.log(res)
                if(res.errcode==0&&res.data.content!=null){
                    if(res.data.total / 10 < 1){
                        that.allYe=1
                    }else{
                    that.allYe= parseInt(res.data.total / 10) + 1 
                    }
                    for(var i = 0;i<res.data.content.length;i++){
                        that.orderList.push(res.data.content[i]);
                    }
                }
            },
            ischangestate(item,index){
                this.currentitem=item;
                this.currentindex=index;
                this.statemodel=true;
            },
            //结束订单
            async changestate(){
                var that = this;
                that.isshow=true;
                var url = 'downLoad/doctorCompleteOrder'
                var orderNo = that.currentitem.order_no;
                var type = that.currentitem.type;
                var data = {
                    orderNo,type
                }
                 var res  = await http.post(that,url,data);
                 that.isshow=false;
                if(res.errcode==0){
                    that.orderList[that.currentindex].order_status=3;
                }else{
                     that.$Message.warning(res.errmsg)
                }
            },
            //接诊
            async godoctorMian(item){
                 
                clearInterval(this.times)
                if(item.type==1){
                    this.$router.push(`/doctorMian?orderNo=${item.order_no}&orderStart=${item.order_status}`)
                    localStorage.setItem('userZixunNmme',item.name);
                    localStorage.setItem('cardeno_zixun',item.card_no)
                }else if(item.type==2){
                    // 视频接单
                    var that=this;
                    if(item.order_status==1){
                        that.isshow=true;
                        var url = 'xcxvideo/xcxReceiveOrders';
                        var data = {
                            order_no:item.order_no
                        }
                        var res  = await http.post(that,url,data);
                        that.isshow=false;
                        if(res.errcode==0){
                            
                        }
                        that.$router.push(`/appletCard?orderNo=${item.order_no}&type=2`);
                    }else{
                        that.$router.push(`/appletCard?orderNo=${item.order_no}&type=2`);
                    }
                    
                }
                
            },
            //查询是否有红点
            async selectRedList(){
                var that = this;
                var url = 'consultation/queryRedPointStatus'
                var list = [];
                for(var i=0;i<that.orderList.length;i++){
                    if(that.orderList[i].order_status==2){
                        list.push({orderNo:that.orderList[i].order_no})
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
                            for(var y = 0;y<that.orderList.length;y++){
                                if(data[i].orderNo==that.orderList[y].order_no&&data[i].status==1&&data[i].identity==1){
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
             var timerr = setInterval(() => {
                 if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
                     clearInterval(timerr);
                     that.selectOrderList()
                     console.log(1)
                 }
             },500)
        },
        mounted(){
            var that  = this;
            const el = document.querySelector('.MyExamine');
            const offsetHeight = el.offsetHeight;
            setInterval(function(){
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                        if(that.offset<that.allYe){
                            that.offset+=1;
                            that.selectOrderList();
                            console.log(0)
                        }
                    }else{
                        
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

<style  scoped>
.ta{
    color:#f00; 
    font-size:15px;
    display: block; 
    margin: 2px;
    position: absolute;
    right: 10px;
    top: 10px;
}
.tittle {
    width: 100%;
    z-index: 999;
    position: fixed;
     top: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  /* position: relative; */
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content{
    padding:  50px 5% 50px 5%;
}
.nei{
    display: inline-block;
} 
.content_text{
    position: relative;
    background: #fff;
    padding: 10px 0 0 0;
    border-radius: 5px;
    margin: 10px 0;
}
.text_top{
     padding: 0 10px;
    border-bottom: 1px solid #ccc;
}
.docNmae p{
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
}
.docNmae p:nth-of-type(1){
     margin-left: 15px;
    font-size: 18px;
    font-weight: 700;
}
.docNmae p:nth-of-type(2){
    font-size: 18px;
    font-weight: 700;
}
.text_content{
    padding: 10px;
    font-size: 14px;
}
.text_content .xinx p{
    display: inline-block
}
.text_content .xinx{
    padding: 2px 0;
}
.text_content .xinx p:nth-of-type(1){
    color: #000;
}
.text_content .xinx p:nth-of-type(2){
    color:#bbb;
   
}
.text_bottom{
    text-align: right;
    /* padding: 10px; */
}
.text_bottom .btn{
    margin: 13px 10px;
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
  position: absolute;
  top: 0.2vw;
  right: 20px;
  color: white;
}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right:4px;
}
.activecircle{
  left: 4px;
}
.activeswitchopen{
  text-align: right;
  background: rgb(160,165,170);
} 
.poop{
    background:#fff;width:10px;height:10px;border-radius: 50%;
        position: absolute;
    
    right: 1.66667vw;
    top: 3.66667vw;

}
.poop1{
    background: #f00;width:10px;height:10px;border-radius: 50%;
}
</style>