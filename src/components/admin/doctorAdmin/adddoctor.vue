<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon">
              <Icon size="30" type="ios-arrow-back" @click="tobackdetail"/>
            </div>
            选择医生
            <div style=" position: absolute;right: 5%;top:15px" @click="submitDoctor()">
                <!-- <svg t="1574489296024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4002" width="24" height="24"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="4003" fill="#ffffff"></path></svg> -->
                <svg t="1587956997262" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4293" width="24" height="24"><path d="M411.26318 832.243675 958.005448 285.502429 858.986247 186.484252 411.076938 634.393561 162.61717 385.93277 63.785234 484.765729Z" p-id="4294" fill="#ffffff"></path></svg>
            </div>
          </div>
        </div>
        <div class="content">
            <CheckboxGroup v-model="fruit" @on-change="ss"> 
                <div class="doctor" v-for="(item,index) in doctorList" :key="index">
                    <Checkbox :label="index"  size="large"></Checkbox>
                    <img class="avatar" src="./../../../common/imager/avatar.png" alt="" width="50px;"  >
                    <div class="xinxi">
                        <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                        <p><span>科室名称：</span><span>{{item.dept_name}}</span></p>
                    </div>
                </div>
                <!-- <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox> -->
            </CheckboxGroup>
        </div>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import loading from "@/common/loading";
import http from '@/utils/http'
    export default {
      components: {
        //加载动画
        loading
      },
        data() {
            return {
                fruit:[],
                doctorList:[],
                isshowloading:false
                
            }
        },
        methods: {
            ss(value){
            },
            //返回上一层
            tobackdetail(){
                 this.$router.push('/adminDowndoc');
            },
            //查询所有医生
            async selectdoctor(){
              var that = this;
              var url = 'adminRefund/queryUnmanagedDoctors';
              var doc = JSON.parse(localStorage.getItem('docinforItem'))
              var doctorCode =  doc.user_name;
              var data  = {
                doctorCode
              }
              var res  =  await http.post(that,url,data);
              if(res.errcode==0&&res.data!=null){
                  that.doctorList=res.data;
              }else{
                   that.doctorLis=[];
              }
            },
            //提交
            async submitDoctor(){
              var that = this;
              var url  = 'adminRefund/insertDoctorJurisdiction'
              var doc = JSON.parse(localStorage.getItem('docinforItem'))
              //医生编码
              var manageDoctorCode=doc.user_name;
              //医生姓名
              var manageDoctorName=doc.name;
              //科室名称
              var manageDoctorDeptName=doc.dept_name;
              //科室编码
              var manageDoctorDeptCode=doc.dept_code
              //选择的医生
              var item=[]
              for(var i = 0;i<that.fruit.length;i++){
                item.push(that.doctorList[that.fruit[i]])
              }
              var managedDoctorList = JSON.stringify(item);
              var data = {
                manageDoctorCode,manageDoctorName,manageDoctorDeptName,manageDoctorDeptCode,managedDoctorList
              }
              var res  =  await http.post(that,url,data);
              if(res.errcode==0){
                that.$Message.success('操作成功')
                that.$router.push('/adminDowndoc')
              }else{
                that.$Message.error(res.errmsg)
              }
            }
        },
        mounted() {
          this.selectdoctor()
        },
    }
</script>

<style scoped>
.title {
 background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.doctor{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 30px 40px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(178, 178, 178);
  
}
.avatar{
  border-radius: 50%
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
.doctor label{
    color: rgba(0,0,0,0);
}

</style>