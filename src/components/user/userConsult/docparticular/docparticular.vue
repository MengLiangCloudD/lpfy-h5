<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;background: rgb(250, 250, 250);">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
              医生主页
        </div>
        <div class="content">
            <div class="nav">
                <div class="nav_top">
                    <img src="@/common/imager/avatar.png" alt="" width="70"  height="70" style="border-radius: 50%;" v-if="docParticularslist.head_image==undefined">
                    <img :src="docParticularslist.head_image" alt="" width="70" height="70" style="border-radius: 50%;" v-else>
                    <div class="docxiang">
                        <div class="docNmae">
                            <p>{{docParticularslist.name}}</p>
                            <p>{{docParticularslist.title}}</p>
                            <!-- <p >
                                <img src="./../../../common/imager/zan.png" alt="" width="20" style="vertical-align: middle;">
                                <span class="baifen">{{item.reputation_num}}</span>
                            </p> -->
                             <p >
                                <span class="baifen">{{docParticularslist.dept_name}}</span>
                            </p>
                        </div>
                        <div class="yuan">
                            <p>滦平县妇幼保健院</p>
                        </div>
                    </div>
                </div>
                <div class="nav_bottom">
                    <div class="shuju">
                        <p>好评率</p>
                        <p v-if="docParticularslist.reputation_rate!=null&&docParticularslist.reputation_rate!=undefined&&docParticularslist.reputation_rate!=''">{{docParticularslist.reputation_rate}}%</p>
                        <p v-else>100%</p>
                    </div>
                    <div class="shuju">
                        <p>接诊人数</p>
                        <p>{{docParticularslist.consult_num}}</p>
                    </div>
                    <div class="shuju">
                        <p>好评人数</p>
                        <p v-if="docParticularslist.reputation_num!=null">{{docParticularslist.reputation_num}}</p>
                        <p v-else>0</p>
                    </div>
                </div>
            </div>
            <div class="introduce">
                <!-- <div class="shancang">
                    <img src="@/common/imager/04.png" alt="" width="30" style="vertical-align: middle;">
                    <p class="shanc"><span></span><span class="neif" :class="{'neif1':type=='1'}"><span style="font-weight: 600;">擅长：</span> {{docParticularslist.good_at}}</span> </p>
                </div>
                <div class="xiala" @click="dia" v-if="docParticularslist.good_at!=undefined&&docParticularslist.good_at!=null&&docParticularslist.good_at!=''">
                    <p v-if="!type"><Icon type="ios-arrow-down" /></p> 
                    <p v-if="type"><Icon type="ios-arrow-up" /></p> 
                </div> -->
                <div class="feature">
                    <div class="featureTitle">
                        <div class="tiao"></div>
                        <span class="tiao_txt" style="text-align: left;font-size:18px;padding: 10px 0;">擅长</span>
                    </div>
                    <div class="tuwn">
                        <div class="left">
                            <img src="@/common/imager/06.png" alt="" width="40" style="vertical-align: middle;">
                            <div class="left_ch">
                                <p style="display: inline-block;">图文问诊</p>
                                <p style="display: inline-block;margin-left: 10px;">￥{{changeTwoDecimal_f(docParticularslist.graphic_consultation_price)}}/次({{docParticularslist.tuwen_time}}分钟)</p>
                            </div>
                        </div>
                        <div class="right">
                            <Button type="primary" shape="circle"  :class="textButon?'btn1':'btn'" :disabled='textButon' @click="PatientIfFirstVisit(1)">去咨询<Icon size="20" type="ios-arrow-forward" style="vertical-align: middle;"/></Button>
                        </div>
                    </div>
                    <div class="tuwn">
                        <div class="left">
                            <img src="@/common/imager/08.png" alt="" width="40" style="vertical-align: middle;">
                            <div class="left_ch">
                                <p style="display: inline-block;">视频问诊</p>
                                <p style="display: inline-block;margin-left: 10px;">￥{{changeTwoDecimal_f(docParticularslist.consult_price)}}/次({{docParticularslist.xcx_shipin_time}}分钟)</p>
                            </div>
                        </div>
                        <div class="right">
                            <Button type="primary" class="btn" :class="videoButon?'btn1':'btn'" :disabled='videoButon' shape="circle" @click="PatientIfFirstVisit(2)">去咨询<Icon size="20" type="ios-arrow-forward" style="vertical-align: middle;"/></Button>
                        </div>
                    </div>
                </div>
                <div class="pingjia">
                    <div class="pingjia_top">
                        <div class="featureTitle">
                            <div class="tiao"></div>
                            <span class="tiao_txt" style="text-align: left;font-size:18px;padding: 10px 0;">患者评价 ({{docParticularslist.counts}})</span>
                        </div>
                        <div @click="goevaluationtent()">
                            <span>
                                好评率
                            </span>
                            <span style="color:orange">
                               {{docParticularslist.reputation_rate}}%
                            </span><Icon type="ios-arrow-forward" />
                        </div>
                    </div>
                    <div class="pingjia_nav" style="border:0">
                        <div class="nei">解答详细({{docParticularslist.jdxx}})</div>
                        <div class="nei">态度良好({{docParticularslist.tdlh}})</div>
                        <div class="nei">回复及时({{docParticularslist.fujs}})</div>
                    </div>
                    <div class="pingjia_nav" >
                        <div class="nei">医术精湛({{docParticularslist.jsjz}})</div>
                        <div class="nei">有耐心({{docParticularslist.ynx}})</div>
                        <div class="nei">循序渐进({{docParticularslist.xujj}})</div>
                    </div>
                </div>
                <div class="pingjia_conttent">
                    <div class="pingja_comm" v-for="(item,index) in evaluateList" :key="index">
                        <p style="display:inline-block;vertical-align: middle;color:black">{{item.name}}</p>
                        <div class="xing"  style="display:inline-block;vertical-align: middle;margin-left:10px;" >
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;"  v-if="item.evaluation_number>=2">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=3">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=4">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=5">
                        </div>
                        <div class="neirong">
                            {{item.evaluation_content}}
                        </div>
                        <div class="pingjia_bottom">
                            <div v-if="item.type==1">
                                [图文问诊]
                            </div>
                            <div v-if="item.type==2">
                                [视频问诊]
                            </div>
                            <div>
                                {{item.created_at}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="model"  title="温馨提示" @on-ok="gopayment()">
            <p>根据国家规定，系统检测您未曾在本医院进行过线下就诊，点击确定继续咨询，点击取消返回页面。</p>
        </Modal>
        <Modal v-model="errmsg"  title="温馨提示" @on-ok="goinquiryList()">
            <p>您已有一个订单正在咨询，请前往继续。</p>
        </Modal>
        <tabbar class="pubtabbar"></tabbar>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
import http from '@/utils/http'
import tabbar from "@/common/tabbar";
import loading from '@/common/loading'
    export default {
        components: {
            //公共底部
            tabbar,
            loading
        },
        data() {
            return {
                isshowloading:false,
                type:false,
                docParticularslist:{},
                evaluateList:[],
                videoButon:false,
                textButon:false,
                model:false,
                errmsg:false
            }
        },
        methods: {
            goinquiryList(){
                this.$router.push('/inquiryList')
            },
            //返回上一层
            tobackdetail(){
                var herf = localStorage.getItem('herf');
                if(herf==window.location.href){
                this.$router.push("/home");
                }else{
                window.location.href=herf;
                }
            },
            //小数点后两位
             changeTwoDecimal_f(x) { 
                　　var f_x = parseFloat(x); 
                　　if (isNaN(f_x)) 
                　　{ 
                　　　　return 0; 
                　　} 
                　　var f_x = Math.round(x*100)/100; 
                　　var s_x = f_x.toString(); 
                　　var pos_decimal = s_x.indexOf('.'); 
                　　if (pos_decimal < 0) 
                　　{ 
                　　　　pos_decimal = s_x.length; 
                　　s_x += '.'; 
                　　} 
                　　while (s_x.length <= pos_decimal + 2) 
                　　{ 
                　　　　s_x += '0'; 
                　　} 
                　　return s_x; 
            },
            //点击展开医生简介
            dia(){
                this.type=!this.type
            },
            //查询医生详细信息
            async selectParticulars(){
                var that = this;
                var url = 'consultation/queryDoctorInfoByDoctorCode';
                var doctorCode = localStorage.getItem('doctorCode');
                var data =  {
                    doctorCode
                }
                var res  =await http.post(that,url,data);
                if(res.errcode==0){
                        that.docParticularslist=res.data;
                        if(that.docParticularslist.consult_status==0){
                            that.videoButon=false
                        }else if(that.docParticularslist.consult_status==1){
                            that.videoButon=true
                        }
                        if(that.docParticularslist.graphic_status==0){
                            that.textButon=false
                        }else if(that.docParticularslist.graphic_status==1){
                            that.textButon=true
                        }

                    }else{
                        that.docParticularslist=[]
                    }
            },
            //判断是否为第一次
            async PatientIfFirstVisit(type){
                var that = this;
                that.type=type;
                var url ='hospitalization/queryPatientIfFirstVisit';
                var data = {

                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    if(res.data==0){
                        that.model=true;
                    }else{
                        that.gopayment();
                    }
                }
            },
            //前往支付
            async gopayment(type){
                //存储医生id
                var doctor_id = localStorage.getItem('doctor_id');
                var that = this;
                var type = that.type;
                var url = 'prepaidOrder/consultPrepaidOrder';
                var data  ={
                    doctor_id,type
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    if(type==1){
                        localStorage.setItem('userZixunNmme',that.docParticularslist.name);
                        var item = {}
                        item.total_fee=that.docParticularslist.graphic_consultation_price
                        item.order_no= res.data;
                        item.type = type;
                        localStorage.setItem('Itemprice',JSON.stringify(item))
                        localStorage.setItem("body", '咨询医生');
                        localStorage.setItem("price",that.docParticularslist.graphic_consultation_price);
                        localStorage.setItem("tradeno", res.data);
                        localStorage.setItem('zxType',type);
                        localStorage.setItem('herf',window.location.href);
                        that.$router.push("/payment"); //跳到支付页面
                    }else if(type==2){
                        localStorage.setItem("body", '咨询医生');
                        localStorage.setItem("price",that.docParticularslist.consult_price);
                        localStorage.setItem("tradeno", res.data);
                        localStorage.setItem('zxType',type);
                        localStorage.setItem('herf',window.location.href);
                        that.$router.push("/payment"); 
                    }
                }else if(res.errcode==2036){
                    that.errmsg=true;
                }else{
                    that.$Message.warning(res.errmsg);
                }
            },
            //查询评价前两条
            async selectevaluate(){
                var that = this;
                var url = 'consultation/queryConsultEvalTwo';
                var doctor_id = localStorage.getItem('doctor_id');
                var data = {
                    doctor_id
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.evaluateList=res.data;
                }
            },
            //全部评价
            goevaluationtent(){
                this.$router.push('/evaluationtent')
            }
        },
        created() {
            this.selectParticulars();
            this.selectevaluate();
        },
    }
</script>

<style scoped>
.tiao{
  width: 3px;
  height: 15px;
  background: rgb(40,184,161);
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  margin-left: 5%;
}
.tiao_txt{
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
.tittle {
  /* height: 50px; */
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.content{
    padding-bottom: 50px;
}
.nav{
    padding: 15px 3% 15px 3%;
    background:#28b8a1;
    color: white;
    padding-bottom: 65px;
    position: relative;
}
.nav_top{
    text-align: center;
}
.docxiang{
    /* display: inline-block; */
    vertical-align: top;
}
.baifen{
    font-size:18px;
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
    /* font-weight: 700; */
}
.docNmae p,.yuan p{
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
}
.docNmae p:nth-of-type(1){
    font-size: 18px;
    /* font-weight: 700; */
}
.docNmae p:nth-of-type(2){
    font-size: 18px;
    /* font-weight: 700; */
}
.yuan p{
    font-size: 16px;
}
.nav_bottom{
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    width:94%;
    flex-wrap: wrap;
    padding: 10px 0;
    font-size: 16px;
    overflow: auto;
    border-radius: 5px;
    margin:1.66667vw  0;
        position: absolute;
    z-index: 999;
    color: #343434;
    bottom: -50px;
    left: 3%;
}
.shuju{
   display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:33%;
    padding-top: 10px;
    padding-bottom: 10px;
}
.shuju p:nth-of-type(2){
    font-size: 18px;
}
.introduce{
    margin: 65px 3% 0 3%;
    background: #fff;
    border-radius: 5px;
}
.shancang{
    padding: 6px 0;
}
.shanc{
    display: inline-block;
    width:calc(100% - 45px);
    vertical-align: middle;
    
}
.neif{
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 2;    
    overflow: hidden;
    margin-left: 15px;
}
.neif1{
 margin-left: 15px;
 display: inline-block;
}
.xiala{
    text-align: center;
    padding: 5px 0;
    color: #000;
}
.tuwn{
    display: flex;
    padding: 10px 10px 10px 10px;
    border-bottom: 1px solid rgb(245, 245, 245);
}
.left,.right,.left_ch{
    display: inline-block;
    vertical-align: middle;
}
.left{
    flex: 1;
}
.right{
    vertical-align: middle;
    line-height: 35px;
    font-size: 14px;
}
.left_ch{
    margin-left: 10px;
    text-align: center;
    font-size: 14px;
}

.left_ch p:nth-of-type(1){
    font-size: 14px;
    
}
.feature{
    /* background: #fff; */
    padding: 10px 0 0 0;
    /*  */
    /* box-shadow: rgb(240, 240, 240) 0px 0px 0px 0.5px; */
}
.pingjia_top {
    display: flex;
    padding: 10px 0;
}
.pingjia_top div{
    display: inline-block;
}
.pingjia_top div:nth-of-type(1){
    flex: 1;
}
.pingjia_top div:nth-of-type(1) span:nth-of-type(1){
    font-size: 18px;
    /* font-weight: 900; */
}
.pingjia_top div:nth-of-type(2){
    line-height: 10.33333vw;
}
.pingjia_nav{
    display: flex;
    align-items: center;
    width:100%;
    flex-wrap: wrap;
    padding: 10px 0;
    font-size: 16px;
    overflow: auto;
    border-radius: 5px;
    margin:1.66667vw  0;
    border-bottom: 1px solid rgb(230, 230, 230);
}
 
.nei{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:30%;
    padding: 5px 0;
    background: PowDerBlue;
    margin:0 1%;
    border-radius: 20px;
}
.pingja_comm{
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
}
.pingja_comm p {
    font-size: 16px;
}
.neirong{
    padding: 5px 0;
}
.pingjia_bottom {
    display: flex;
    /* padding: 10px 0; */
    color: #ccc;
}
.pingjia_bottom div{
    display: inline-block;
}
.pingjia_bottom div:nth-of-type(1){
    flex: 1;
}
.btn{
    background: rgb(40,184,161);
    border: 0;
}
.btn1{
    background: rgb(238,238,238);
    border: 0;
    color: #ccc;
}
</style>