<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            <span style="font-size:18px;">选择患者</span>
        </div>
        <div class="content">
            <div class="tiao"></div>
            <span class="tiao_txt" style="text-align: left;font-size:20px;padding: 10px 0; font-weight: 900">请选择患者信息 ：</span>
            <div class="content1">
                <div class="Patient"  v-for="(item,index) in Patient" :key="index" @click="selects(index)">
                    <p><span>就诊人：</span><span>{{item.name}}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 性别 ：
                        {{jsGetSex(item.idno)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年龄 ：
                        {{jsGetAge(item.idno)}}
                        
                        <!-- 24岁 -->
                    </span></p>
                    <p><span>就诊卡 ：</span><span>{{item.cardno}}</span></p>
                    <p><span><span>身份证 ：</span>{{item.idno}}</span></p>
                </div>
            </div>
            <div class="content1">
                <div class="Patient1" style="text-align: center;" @click="goauthentication()">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加患者</p>
                </div>
            </div>
            <div class="content1">
                <div class="But">
                    <Button shape="circle" class="circle" @click="goConsulOrder()">确认选择</Button>
                </div>  
                
            </div>
        </div>
    </div>
</template>

<script>
import loading from "@/common/loading";
import tabbar from "@/common/tabbar";
import http from '@/utils/http';
    export default {
        name:"selectionpatients",
        data() {
                return {
                    Patient:[],
                    postermen:{}
                }
        },
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/registeredInfo');
            },
            //选择患者
            selects(index){
                var Patien = document.getElementsByClassName('Patient');
                for(var i = 0;i<Patien.length;i++){
                    Patien[i].style.background = ' #fff';
                    Patien[i].style.color = '#000';
                }
                Patien[index].style.color = '#fff';
                Patien[index].style.background  = ' #28b8a1'
                this.postermen=this.Patient[index];
            },
            //下一步
            async goConsulOrder(){
                var that = this;
                let stats = that.$route.query.stats;
                if(stats==0){
                    localStorage.setItem('cardno',that.postermen.cardno);
                    localStorage.setItem('cardername',that.postermen.name);
                    that.$router.push('/registeredInfo'); 
                }else if(stats==1){
                    var url  = 'user/defaultCard';
                    var data  ={
                        cardno:that.postermen.cardno
                    }
                    var res  = await http.post(that,url,data);
                    if(res.errcode==0){
                        that.$Message.success('修改成功');
                        localStorage.setItem('cardno',that.postermen.cardno);
                        localStorage.setItem('cardername',that.postermen.name);
                        localStorage.setItem('type',0);
                        that.$router.push('/registeredInfo'); 
                    }else{
                        that.$Message.success('修改失败');
                    }
                }
                
                
            },
            //添加就诊人
            goauthentication(){
                 localStorage.setItem('herf',window.location.href);
                this.$router.push('/authentication');
               
            },
            //通过出生日期计算年龄
            jsGetAge(strBirthday) {
                //获取输入身份证号码
                var UUserCard = strBirthday;
                //获取出生日期
                UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                //获取年龄
                var myDate = new Date();
                var month = myDate.getMonth() + 1;
                var day = myDate.getDate();
                var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
                }
                return age
                //年龄 age

            },
            jsGetSex(strBirthday){
                //获取输入身份证号码
                var UUserCard = strBirthday;
                //获取出生日期
                UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                //获取性别
                if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                return "男"
                //是男则执行代码 ...
                } else {
                return "女"
                //是女则执行代码 ...
                }
            }
        },
        mounted(){
            setTimeout(() => {
                var Patien = document.getElementsByClassName('Patient');
                Patien[0].style.background  = ' #28b8a1';
                Patien[0].style.color  = ' #fff';
                this.postermen=this.Patient[0];
            }, 300);
            
        },
       async created(){
             var that = this;
            var url ="user/cardList";
            var data = {

            }
            var res  = await http.post(that,url,data);
            if(res.errcode==0 && res.data.length!==0){
                that.Patient=res.data;
                localStorage.setItem('cardno',res.data[0].cardno);
                localStorage.setItem('cardername',res.data[0].name);
            }else{

            }
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
.content1{
    /* margin-top: 20px; */
    text-align: center;
}
.Patient{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
    margin-top: 20px;
}
.Patient p{
    line-height: 2.3;
}
.Patient p span{
    /* display: inline-block */
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
     margin-top: 20px;
}
.Patient1 p{
    line-height: 1;
}
.circle{
    width: 90%;
    background: #28b8a1;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 0;
}
.But{
    text-align: center;
    padding: 60px 0 40px 0;
    
}
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
</style>