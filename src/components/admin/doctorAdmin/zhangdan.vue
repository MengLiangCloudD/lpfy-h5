<template>
    <div style="height:100%;overflow: auto;">
        <div style="background: rgb(0, 187, 187);color:white" class="contents">
            <div class="tittle" style="background: rgb(0, 187, 187);color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                {{biao}}
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
        <div class="content3" v-for="(item,index) in docxiang" :key="index">
            <p @click="Detailed"> 
                <span>
                    <svg t="1565314076918" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="24" height="24"><path d="M688.808081 479.159596c-128 0-231.951515 104.080808-231.951515 231.951515S560.937374 943.191919 688.808081 943.191919 920.759596 839.111111 920.759596 711.240404c0-128-104.080808-232.080808-231.951515-232.080808z m0 419.814141c-103.563636 0-187.862626-84.29899-187.862626-187.862626 0-103.563636 84.29899-187.862626 187.862626-187.862626 103.563636 0 187.862626 84.29899 187.862626 187.862626 0 103.692929-84.29899 187.862626-187.862626 187.862626z m0 0" fill="#00BBBB" p-id="4107"></path><path d="M147.458586 854.884848V147.781818c0-12.153535 9.955556-22.109091 22.109091-22.109091h574.448485c12.153535 0 22.109091 9.955556 22.109091 22.109091v265.179798h44.218181V147.781818c0-36.589899-29.737374-66.327273-66.327272-66.327273H169.567677C132.977778 81.454545 103.240404 111.191919 103.240404 147.781818v707.10303c0 36.589899 29.737374 66.327273 66.327273 66.327273h265.179798v-44.218182H169.567677c-12.282828 0-22.109091-9.955556-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4108"></path><path d="M213.656566 258.19798h508.250505v44.218182H213.656566v-44.218182z m0 220.961616h243.070707v44.218182h-243.070707v-44.218182z m0 220.961616H368.290909v44.218182H213.656566v-44.218182z m563.587878-28.315151h-50.941414l44.476768-44.476768c8.662626-8.662626 8.662626-22.626263 0-31.288889-8.662626-8.662626-22.626263-8.662626-31.288889 0l-50.682828 50.682828-50.682828-50.682828c-8.662626-8.662626-22.626263-8.662626-31.288889 0-8.662626 8.662626-8.662626 22.626263 0 31.288889l44.476767 44.476768h-50.941414c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.10909h66.327273v28.315152h-33.09899c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.109091h33.09899V810.666667c0 12.153535 9.826263 22.109091 22.109091 22.109091 12.153535 0 22.109091-9.955556 22.109091-22.109091v-22.109091h33.09899c12.153535 0 22.109091-9.955556 22.109091-22.109091 0-12.153535-9.826263-22.109091-22.109091-22.109091H710.917172v-28.315152h66.327272c12.153535 0 22.109091-9.955556 22.109091-22.10909-0.129293-12.153535-9.955556-22.109091-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4109"></path></svg>
                </span>
                <span>收入明细</span>
                <span >
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span>医生姓名</span>
                <span>{{item.name}}</span>
            </p>
            <p>
                <span>医生编码</span>
                <span>{{item.username}}</span>
            </p>
            <!-- <p>
                <span>所属科室：</span>
                <span>{{ysdepname}}</span>
            </p> -->
            <p>
                <span>医生职位</span>
                <span>{{item.job}}</span>
            </p>
            <p>
                <span>医生职称</span>
                <span>{{item.title}}</span>
            </p>
            <p @click="goMaxCard">
                <span>医生二维码</span>
                <span>
                    <svg t="1576227430958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" width="20" height="20"><path d="M384 64H134.4c-51.2 0-89.6 41.6-89.6 89.6v227.2c0 51.2 41.6 89.6 89.6 89.6H384c51.2 0 89.6-41.6 89.6-89.6V153.6c0-48-38.4-89.6-89.6-89.6z m44.8 316.8c0 25.6-19.2 44.8-44.8 44.8H134.4c-25.6 0-44.8-19.2-44.8-44.8V153.6c0-25.6 19.2-44.8 44.8-44.8H384c25.6 0 44.8 19.2 44.8 44.8v227.2zM192 192h134.4v134.4H192V192z m185.6 352h-243.2c-48 0-86.4 38.4-86.4 89.6v220.8c0 48 38.4 89.6 86.4 89.6h243.2c48 0 86.4-38.4 86.4-89.6V633.6c3.2-51.2-38.4-89.6-86.4-89.6z m44.8 307.2c0 25.6-19.2 44.8-44.8 44.8h-243.2c-25.6 0-44.8-19.2-44.8-44.8v-220.8c0-25.6 19.2-44.8 44.8-44.8h243.2c25.6 0 44.8 19.2 44.8 44.8v220.8z m-230.4-182.4h131.2v131.2H192v-131.2z m441.6-198.4h249.6c51.2 0 89.6-41.6 89.6-89.6V153.6c0-51.2-41.6-89.6-89.6-89.6h-249.6c-51.2 0-89.6 41.6-89.6 89.6v227.2c0 51.2 41.6 89.6 89.6 89.6zM588.8 153.6c0-25.6 19.2-44.8 44.8-44.8h249.6c25.6 0 44.8 19.2 44.8 44.8v227.2c0 25.6-19.2 44.8-44.8 44.8h-249.6c-25.6 0-44.8-19.2-44.8-44.8V153.6z m112 38.4h134.4v134.4h-134.4V192z m-128 524.8h137.6c12.8 0 22.4-9.6 22.4-22.4V556.8c0-12.8-9.6-22.4-22.4-22.4h-137.6c-12.8 0-22.4 9.6-22.4 22.4v137.6c0 12.8 9.6 22.4 22.4 22.4z m313.6-153.6v38.4c0 12.8 12.8 25.6 25.6 25.6h38.4c12.8 0 25.6-12.8 25.6-25.6V563.2c0-12.8-12.8-25.6-25.6-25.6h-38.4c-12.8 0-25.6 9.6-25.6 25.6z m-304 380.8h48c12.8 0 22.4-9.6 22.4-22.4v-48c0-12.8-9.6-22.4-22.4-22.4h-48c-12.8 0-22.4 9.6-22.4 22.4V921.6c0 12.8 9.6 22.4 22.4 22.4z m361.6-240H844.8a28.68224 28.68224 0 0 0-28.8 28.8v44.8H768c-19.2 0-32 12.8-32 32V908.8c0 16 12.8 28.8 28.8 28.8l179.2 3.2c16 0 28.8-12.8 28.8-28.8v-179.2c0-16-12.8-28.8-28.8-28.8z" fill="#00bbbb" p-id="4023"></path></svg>
                </span>
                <span >
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span >医生简介</span>
                <span style="width:75%; text-align: right;" @click="gomodal11">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.expertjob}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>
            </p>
            <p @click="gozixunxinx">
                <span>医生咨询信息</span>
                <span >
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <Modal v-model="modal11" fullscreen title="个人简介"  @on-ok="tomodify()">
                <div>
                     <Input v-model="value8" :disabled="true" :maxlength="300" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="个人简介"/>
                </div>
            </Modal>
        </div>
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
                doctor:'',
                isshowloading:false,
                currentDay:time,
                Monthmoney:'',
                daymoney:'',
                yearmoney:"",
                counts:'',
                docxiang:'',
                modal11:false,
                txtVal:'',
                value8:''
            }
        },
         methods:{
             // 信息
             gozixunxinx(){
                 this.$router.push(`/zixunxinx?depcode=${this.doctor}`);
             },
             //医生二维码
            goMaxCard(){
                let _this=this
                var url = _this.$store.getters.getUrl + "getDoctorSourceInfo.do";
                var doccode=_this.doctor;
                _this.$router.push('/docCard');
               
            },
             //修改个人简介
            gomodal11(){
                this.modal11=true;
                var text  = document.getElementsByClassName('text')[0];
                this.value8 = text.innerHTML;
                this.txtVal = this.value8.length;
            },
             //查询医生详细信息
            async doctorxinxi(){
              var that = this;
              var url = "patientRegister/queryDoctorInfoByDoctorCode";
              //医生编码
              var doc =JSON.parse(localStorage.getItem('docItem')) ;
              var doctorCode=that.doctor;
              var deptCode = doc.dept_code;
              var data ={
                doctorCode,
                deptCode
              }
              var res  = await http.post(that,url,data);
              if(res.errcode==0&&res.data!=null){
                that.docxiang=res.data;
              }
            },
            //查询医生挂号收入
            async selectrenshou(){
                var that =this;
                var url = 'adminRefund/doctorIncome'
                var day = that.currentDay;
                var doctorCode =  that.doctor;
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
            //返回上一层
            tobackdetail(){
               var herf = localStorage.getItem('herf');
               window.location.href=herf;
            },
            //进入明细目录
            Detailed(){
                 localStorage.setItem('herf',window.location.href);
                 this.$router.push(`/particulars?depcode=${this.doctor}&selectery=2`);
            }
         },
         created(){
            let that=this
            that.biao =  that.$route.query.name;
            that.doctor =  that.$route.query.doctor;
            var doc =JSON.parse(localStorage.getItem('docItem')) ;
            that.doctor =  doc.user_name;
            that.biao = doc.name + '的信息';
            that.doctorxinxi();
            that.selectrenshou();
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


.content3{
    padding-bottom: 50px;
    font-size: 14px;
}
.content3 p{
     position: relative;
}
.content3 p svg {
  vertical-align: middle;
}
.content3 p span:nth-child(1) {
    flex:1;
}
.content3 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.content3 p {
  padding: 16px 10% 16px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
  display: flex;
}
</style>