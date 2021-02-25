<template>
    <div style="height:100%;overflow: auto;">
        <div style="background: rgb(0, 187, 187);color:white" class="contents">
            <div class="tittle" style="background: rgb(0, 187, 187);color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                {{biao}}的收入
                <div class="cai" @click="tomodal">
                    <svg t="1574728881844" class="icon" viewBox="0 0 1261 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="30" height="30"><path d="M99.586991 99.586991m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4633" fill="#ffffff"></path><path d="M307.814335 33.950111h953.836439v131.27376H307.814335z" p-id="4634" fill="#ffffff"></path><path d="M99.586991 511.838333m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4635" fill="#ffffff"></path><path d="M307.814335 446.201452h953.836439v131.273761H307.814335z" p-id="4636" fill="#ffffff"></path><path d="M99.586991 924.089675m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4637" fill="#ffffff"></path><path d="M307.814335 858.452794h953.836439v131.273761H307.814335z" p-id="4638" fill="#ffffff"></path></svg>
                </div>
            </div>
            <div class="content">
                <p>今日收入(元)</p>
                <p style="font-size:50px;">{{daymoney}}</p>
            </div>
            <div class="content1">
                <div class="gong">
                    <p>今年累计收入(元)</p>
                    <p style="font-size:25px;">{{yearmoney}}</p>
                </div>
                <div class="gong">
                    <p>当月收入(元)</p>
                    <p style="font-size:25px;" >{{Monthmoney}}</p>
                </div>    
                <div class="gong">
                    <p>今日挂号人数(个)</p>
                    <p style="font-size:25px;">{{counts}}</p>
                </div>
            </div>
        </div>
        <div class="monted">
            <p @click="Detailed"> 
                <span>
                    <svg t="1565314076918" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="24" height="24"><path d="M688.808081 479.159596c-128 0-231.951515 104.080808-231.951515 231.951515S560.937374 943.191919 688.808081 943.191919 920.759596 839.111111 920.759596 711.240404c0-128-104.080808-232.080808-231.951515-232.080808z m0 419.814141c-103.563636 0-187.862626-84.29899-187.862626-187.862626 0-103.563636 84.29899-187.862626 187.862626-187.862626 103.563636 0 187.862626 84.29899 187.862626 187.862626 0 103.692929-84.29899 187.862626-187.862626 187.862626z m0 0" fill="#00BBBB" p-id="4107"></path><path d="M147.458586 854.884848V147.781818c0-12.153535 9.955556-22.109091 22.109091-22.109091h574.448485c12.153535 0 22.109091 9.955556 22.109091 22.109091v265.179798h44.218181V147.781818c0-36.589899-29.737374-66.327273-66.327272-66.327273H169.567677C132.977778 81.454545 103.240404 111.191919 103.240404 147.781818v707.10303c0 36.589899 29.737374 66.327273 66.327273 66.327273h265.179798v-44.218182H169.567677c-12.282828 0-22.109091-9.955556-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4108"></path><path d="M213.656566 258.19798h508.250505v44.218182H213.656566v-44.218182z m0 220.961616h243.070707v44.218182h-243.070707v-44.218182z m0 220.961616H368.290909v44.218182H213.656566v-44.218182z m563.587878-28.315151h-50.941414l44.476768-44.476768c8.662626-8.662626 8.662626-22.626263 0-31.288889-8.662626-8.662626-22.626263-8.662626-31.288889 0l-50.682828 50.682828-50.682828-50.682828c-8.662626-8.662626-22.626263-8.662626-31.288889 0-8.662626 8.662626-8.662626 22.626263 0 31.288889l44.476767 44.476768h-50.941414c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.10909h66.327273v28.315152h-33.09899c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.109091h33.09899V810.666667c0 12.153535 9.826263 22.109091 22.109091 22.109091 12.153535 0 22.109091-9.955556 22.109091-22.109091v-22.109091h33.09899c12.153535 0 22.109091-9.955556 22.109091-22.109091 0-12.153535-9.826263-22.109091-22.109091-22.109091H710.917172v-28.315152h66.327272c12.153535 0 22.109091-9.955556 22.109091-22.10909-0.129293-12.153535-9.955556-22.109091-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4109"></path></svg>
                </span>
                <span>收入明细</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
        </div>
        <Modal v-model="modal11" fullscreen :title="title">
            <div>
                <!-- <p style="font-size:20px;">全部医生</p> -->
                <div class="content3" v-if="permission>1&&zhaungt==0">
                    <div>
                        <p class="qunabu" style="font-size:20px;color:rgb(0, 187, 187);font-weight: 600; " @click="selectquan">全部科室</p>
                        <Select class="a" v-model="model1" style="border:0; position: absolute;right: 3%;top: 5px;width:30%;"  :label-in-value="true" placeholder="医生科室" @on-change="socListess">
                            <Option v-for="item in depList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <RadioGroup  v-model="index" size="large" style="width:100%;">
                        <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                            <div class="doctor" >
                                <img class="avatar" src="./../../../common/imager/avatar.png" alt="" width="40px;"  >
                                <div class="xinxi">
                                    <p><span>科室名称：</span><span>{{item.depname}}</span></p>
                                    <p><span>科室编码：</span><span>{{item.depCode}}</span></p>
                                </div>
                                <p class="pped" @click="seledoctor(index)"></p>
                                <Radio :label="index" class="rad"><span style="display:none;"></span></Radio>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
                <div class="content3" v-if="(permission==1)||zhaungt==1" style="position: relative;">
                    <div v-if="zhaungt==1">
                        <p class="qunabu" style="font-size:20px;color:rgb(0, 187, 187);font-weight: 600; " @click="selectquan">全部科室</p>
                    <Select class="a" v-model="model1" style="border:0; position: absolute;right: 3%;top: 5px;width:30%;"  :label-in-value="true" placeholder="选择医生科室" @on-change="socListess">
                    <Option v-for="item in depList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    </div>
                    <p v-if="zhaungt==0" style="font-size:20px;color:rgb(0, 187, 187);font-weight: 600; text-align: right;" @click="selectquan">全部医生</p>
                    <RadioGroup  v-model="index" size="large" style="width:100%;">
                        <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                            <div class="doctor" @click=" seledoctor(index)">
                                <img class="avatar" src="./../../../common/imager/avatar.png" alt="" width="40px;"  >
                                <div class="xinxi">
                                    <p><span>医生姓名：</span><span>{{item.docname}}</span></p>
                                    <p><span>医生职称：</span><span>{{item.deptname}}</span></p>
                                </div>
                                <Radio :label="index" class="rad"><span style="display:none;"></span></Radio>
                            </div>
                            
                        </div>
                    
                    </RadioGroup>
                </div>
            </div>
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
var time = year + "-" + month + "-" + day;
    export default {
        components: {
        //加载动画
        loading
      },
        data() {
            return {
                biao:'',
                Administrator:'',
                index:'',
                single:false,
                modal11:false,
                doctorList:[],
                title:'',
                adminLevel:'',
                currentDay:time,
                moneyDate:{},
                Monthmoney:'',
                daymoney:'',
                yearmoney:"",
                counts:'',
                selectery:0,
                depcode:'',
                isshowloading:false,
                depList:[],
                model1:'',
                zhaungt:0,
                permission:''
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/admin');
            },
            async socListess(value){
                var that =this;
                var url = 'patientRegister/queryDoctorsByDeptCode'
                var deptCode;
                if(value!=undefined){
                    that.zhaungt=1;
                   deptCode =value.value
                var data  ={
                    deptCode
                }
                var res  = await http.post(that,url,data);
                that.doctorList=[]
                if(res.errcode==0&&res.data!=null){
                     that.index=''
                    that.doctorList=res.data;
                }
                }else{
                  deptCode=''
                }
            },
            //进入明细目录
            Detailed(){
                localStorage.setItem('herf',window.location.href);
                 this.$router.push(`/particulars?depcode=${this.depcode}&selectery=${this.selectery}`);
                 
            },
            //打开弹框
            tomodal(){
                this.modal11=true;
            },
            //全部医生
            selectquan(){
                
                if(this.permission==1&&this.zhaungt==0){
                    this.modal11=false;
                    this.index='';
                    this.biao=localStorage.getItem('dept_name');
                    this.selectkeshou(localStorage.getItem('dept_code'));
                    this.selectery=1;
                }
                if(this.permission>1||this.zhaungt==1){
                     this.modal11=false;
                     this.index='';
                     this.biao='医院';
                     this.selectyiyuan();
                     this.selectery=0;
                     if(this.zhaungt==1){
                        this.zhaungt=0;
                        this.DeptInfoList();
                        this.model1=''
                     }
                }
            },
            //选择医生
            seledoctor(index,item){
                if((this.permission==1)||this.zhaungt==1){
                    this.index=index;
                    this.modal11=false;
                    this.title='选择医生';
                    this.biao=this.doctorList[index].docname
                    this.selectrenshou(this.doctorList[index].doccode);
                    this.selectery=2;
                    this.depcode=this.doctorList[index].doccode;
                }
                if(this.permission>1&&this.zhaungt==0){
                    this.index=index;
                    this.modal11=false;
                    this.title='选择科室';
                    this.biao=this.doctorList[index].depname.split('.', 1)[0];
                    this.selectkeshou(this.doctorList[index].depCode);
                    this.selectery=1;
                    this.depcode=this.doctorList[index].depCode;
                }
                 
            },
            //科室分类
            _dealdata(data){
                // debugger
                // // var data = JSON.parse(data)
                // var _this = this;
                // //获取合并之后科室的名称存入数组
                // //["depmentname":"产科门诊"]
                // _this.doctorList = [];
                // _this.doctorList.push({ depname: "妇科门诊", gynaecology:data.gynaecology,depCode:'100101'});
                // _this.doctorList.push({ depname: "产科门诊", obstetrics:data.obstetrics,depCode:'100102'});
                // _this.doctorList.push({ depname: "儿科门诊", pediatrics:data.pediatrics,depCode:'100103'});
                // for (let j = 0; j < data.other.length; j++) {
                //     if (data.other[j].depname == "皮肤科") {
                //     _this.doctorList.push({depname: "皮肤科",depCode:data.other[j].depCode});
                //     }
                // }
                // //其他没合并的科室
                // for (let i = 0; i < data.other.length; i++) {
                //     let depname = "";
                //     let depCode = ''
                //     depname = data.other[i].depname;
                //     depCode=data.other[i].depCode;
                //     if (depname != "皮肤科") {
                //     let depitem = {
                //         //合并科室的名称
                //         depname: depname,
                //         depCode:depCode
                //     };
                //     _this.doctorList.push(depitem);
                //     }
                // }
                this.doctorList=data;
                 this.depList=[]
                for(var i =0;i<this.doctorList.length;i++){
                  let depname = "";
                  let depCode = ''
                  depname = this.doctorList[i].depname;
                  depCode=this.doctorList[i].depCode;
                  let depitem = {
                      //合并科室的名称
                      label: depname,
                      value:depCode
                    };
                    this.depList.push(depitem)
                }
            },
            // 查询科室
            async DeptInfoList(){
                var url ="patientRegister/queryAllDept";
                var that = this;
                var data  ={

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    // 调用合并科室
                    that._dealdata(res.data);
                }
                
            },
            //查询医生
            async docList(value){
              var that =this;
                var url = 'patientRegister/queryDoctorsByDeptCode'
                var deptCode;
                if(value!=undefined){
                   deptCode =value.value
                }else{
                  deptCode=''
                }
                var data  ={
                    deptCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.doctorList=res.data;
                }
                
            },
            //查询科室收入
            async selectkeshou(value){
                var that =this;
                var url = 'adminRefund/deptIncome'
                var day = that.currentDay;
                var deptCode = value;
                var data = {
                    deptCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    var moneyDate = res.data;
                    that.moneyDate=res.data;
                    if(moneyDate.totalYear.money){
                        that.yearmoney=moneyDate.totalYear.money
                    }else{
                        that.yearmoney='0.00'
                    }
                    if(moneyDate.totalDay.money){
                        that.daymoney=moneyDate.totalDay.money
                    }else{
                        that.daymoney='0.00'
                    }
                    if(moneyDate.totalDay.counts){
                        that.counts=moneyDate.totalDay.counts
                    }else{
                        that.counts='0'
                    }
                    if(moneyDate.totalMonth.money){
                        that.Monthmoney=moneyDate.totalMonth.money
                        }else{
                        that.Monthmoney='0.00'
                    }
                }
                
            },
            //查询医生挂号收入
            async selectrenshou(value){
                var that =this;
                var url = 'adminRefund/doctorIncome'
                var day = that.currentDay;
                var doctorCode = value;
                var data = {
                    doctorCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    var moneyDate = res.data;
                    that.moneyDate=res.data;
                    if(moneyDate.totalYear.money){
                        that.yearmoney=moneyDate.totalYear.money
                    }else{
                        that.yearmoney='0.00'
                    }
                    if(moneyDate.totalDay.money){
                        that.daymoney=moneyDate.totalDay.money
                    }else{
                        that.daymoney='0.00'
                    }
                    if(moneyDate.totalDay.counts){
                        that.counts=moneyDate.totalDay.counts
                    }else{
                        that.counts='0'
                    }
                    if(moneyDate.totalMonth.money){
                        that.Monthmoney=moneyDate.totalMonth.money
                    }else{
                        that.Monthmoney='0.00'
                    }
                }
               
            },
            //查询医院挂号收入
            async selectyiyuan(){
                var that =this;
                var url = 'adminRefund/hospitalIncome'
                var day = that.currentDay;
                var data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    var moneyDate = res.data;
                    that.moneyDate=res.data;
                    if(moneyDate.totalYear.money){
                        that.yearmoney=moneyDate.totalYear.money
                    }else{
                        that.yearmoney='0.00'
                    }
                    if(moneyDate.totalDay.money){
                        that.daymoney=moneyDate.totalDay.money
                    }else{
                        that.daymoney='0.00'
                    }
                    if(moneyDate.totalDay.counts){
                        that.counts=moneyDate.totalDay.counts
                    }else{
                        that.counts='0'
                    }
                    if(moneyDate.totalMonth.money){
                        that.Monthmoney=moneyDate.totalMonth.money
                    }else{
                        that.Monthmoney='0.00'
                    }
                }else{
                    that.$Message.warning(res.errmsg);
                }
            }
         },
         mounted(){
             if(localStorage.getItem('permission')!=undefined&&localStorage.getItem('permission')!=''){
                 this.permission= localStorage.getItem('permission');
                 if(localStorage.getItem('permission')>1){
                     this.biao = '医院';
                     this.title='选择科室'
                     this.selectery=0;
                     this.DeptInfoList();
                     this.selectyiyuan();
                 }else if(localStorage.getItem('permission')==1){
                     var deptCode = localStorage.getItem('dept_code')
                     this.depcode=deptCode;
                     this.selectkeshou(deptCode);
                     this.docList({value:deptCode});
                     this.biao =localStorage.getItem('dept_name');
                     this.selectery=1;
                     this.title='选择医生';
                 }
             }
            //  if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
            //         this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
            //         this.adminLevel=this.Administrator.adminLevel;
            //         if(this.Administrator.adminLevel>1&&this.Administrator.adminLevel<4){
            //             this.biao =this.Administrator.deptName.split('.', 1)[0];
            //             //查询医生
            //             this.title='选择医生'
            //             this.docList({value:this.Administrator.deptCode});
            //             this.selectkeshou(this.Administrator.deptCode);
            //             this.depcode=this.Administrator.deptCode;
            //             this.selectery=1;
            //         }
            //         if(this.Administrator.adminLevel>3 && this.Administrator.adminLevel<5){
            //             this.biao = this.Administrator.name;
            //             this.selectrenshou(this.Administrator.userName);
            //             this.depcode = this.Administrator.userName;
            //             this.selectery=2;
            //         }
            //         if(this.Administrator.adminLevel<=1){
            //              this.biao = '医院';
            //              this.title='选择科室'
            //              this.selectery=0;
            //              this.DeptInfoList();
            //              this.selectyiyuan();
            //         }
            // }
         },
         created(){

         }
    }
</script>

<style scoped>
.tittle {
  height: 50px;
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
.cai{
  position: absolute;
  right: 5%;
  top: 5px;
}
.content{
    text-align: center;
    background:rgb(0, 187, 187);
    color:white;
    padding: 25px 0;
    font-size: 16px;
}
.content1{
     display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    width: 100%;
    /* background-color: lightgrey; */
    /* border-top: 5px solid #ddd; */
    padding: 10px 0;
    
}
.gong{
    text-align: center;
    font-size: 14px;
}
.monted{
    border-top: 1px solid #ddd;
    padding-bottom: 50px;
    font-size: 14px;
}
.monted p{
     position: relative;
     
}
.monted p svg {
  vertical-align: middle;
}
.monted p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.monted p {
  padding: 18px 10% 18px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.contenter{
    position: relative;
}
.doctor{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 30px 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(178, 178, 178);
  
}
.xinxi{
  /* font-size: 13px; */
  /* font-weight: bold; */
  margin: 0px 5px 0 20px;
}
.xinxi{
  display: inline-block;
}
.xinxi p{
  line-height: 1.5;
}
.avatar{
  border-radius: 50%
}
.operate{
    position: absolute;
    right: 5%;
    top: 30%;
}
.rad{
    position: absolute;
    right: 5%;
    top: 30%;
}
.pped{
    position: absolute;
    right: 8%;
    top: 30%;
    display: inline-block;
    width: 20px;
    height: 20px;
    z-index: 888;
}
.content3{
    position: relative;
    padding: 10px 0;
}
.qunabu{
    /* position: absolute;
    left: 10%; */
    display:inline-block;
}
</style>