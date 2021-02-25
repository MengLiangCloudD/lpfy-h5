<template>
    <div style="overflow: auto;-webkit-overflow-scrolling: touch;width:100%;height: 100%;">
        <div class="title">
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
        住院患者信息
        </div>
        <div class="content"  v-if="JSON.stringify(hospUserInfor) !== '{}'">
            <div class="item">
                <div class="left">
                    <p><span>患者姓名：</span><span>{{hospUserInfor.name}}</span></p>
                    <p><span>患者性别：</span><span>{{hospUserInfor.SEX}}</span></p>
                    <p><span>出生日期：</span><span>{{hospUserInfor.birthday}}</span></p>
                    <p><span>患者床号：</span><span>{{hospUserInfor.bedNumber}}</span></p>
                   
                </div>
                <div class="right">
                    <p><span>患者卡号：</span><span>{{hospUserInfor.patientID}}</span></p>
                    <p><span>住院号：&nbsp;&nbsp;&nbsp;</span><span>{{hospUserInfor.hospitalizationNumber}}</span></p>
                    <p><span>预交金：&nbsp;&nbsp;&nbsp;</span><span style="color:red;font-size:16px">￥{{hospUserInfor.AdvancePayment}}</span></p>
                    <p><span>累计金额：</span><span style="color:red;font-size:16px">￥{{hospUserInfor.AccumulatedAmount}}</span></p>  
                </div>

                    <p><span>病情诊断：</span><span>{{hospUserInfor.zhenDuan}}</span></p>
            </div>
            <div class="btn">
                <div>
                    <Button type="success" class="add-btn" @click="goHospitalmingxi" >查看住院清单</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data() {
            return {
                hospUserInfor:{}
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                this.$router.push('/HomePage');
            },
            //查询患者个人信息
            async selectUserInfor(){
                var that  = this;
                var url = 'hospitalization/queryPatientBasicInfo';
                var data = {

                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.hospUserInfor=res.data;
                    that.hospUserInfor.birthday=res.data.birthday.substring(0,10)
                }
            },
            goHospitalmingxi(){
                this.$router.push('/Hospitalmingxi')

            }
        },
        created() {
            this.selectUserInfor()
        },
    }
</script>

<style scoped>
.title {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: PingFangSC-regular;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.item{
    /* display: flex; */
    padding: 10px 5%;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}
.item p{
    padding: 5px;
}
.left{
    display: inline-block;
    /* width: 49%; */
}
.right{
    /* display: inline-block; */
    /* width: 49%; */
}
.btn {
  width: 100%;
  /* position: fixed; */
  text-align: center;
  margin-top: 100px;
}
.add-btn {
  width: 60%;
  border-radius: 40px;
  text-align: center;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  padding: 7px 0;
  border: 0;
  outline: none;
}
</style>