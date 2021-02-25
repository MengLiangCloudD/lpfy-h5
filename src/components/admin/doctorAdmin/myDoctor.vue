<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            我管理的医生
          </div>
        </div>
        <div class="content" style="padding-top: 50px;">
            <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                <div class="doctor" >
                    <img class="avatar" src="./../../../common/imager/avatar.png" alt="" width="40px;"  >
                    <div class="xinxi">
                        <p><span>医生姓名：</span><span>{{item.managedDoctorName}}</span></p>
                        <p><span>所属科室：</span><span>{{item.managedDoctorDeptName}}</span></p>
                    </div>
                </div>
                <div class="operate" >
                        <Button type="primary" size="small" @click="jiankai(item)">查看</Button>
                </div>
                
            </div>
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
                doctorList:[],
                isshowloading:false,
            }
        },
        methods:{
            tobackdetail(){
                this.$router.push('/admin')
            },
            //查询医生
            async docList(){
              var that =this;
              var url = 'adminRefund/queryDoctorsByDoctorID'
              var data  = {

              }
              var res  =  await http.post(that,url,data);
              if(res.errcode==0&&res.data!=null){
                  that.doctorList=res.data;
              }else{
                   that.doctorLis=[];
              }
            },
            //查看医生信息账单
            jiankai(item){
              var obj ={}
              obj.user_name=item.managedDoctorCode
              obj.name=item.managedDoctorName
              obj.dept_code=item.managedDoctorDeptCode
              obj.dept_name=item.managedDoctorDeptName
              localStorage.setItem('docItem',JSON.stringify(obj));
              localStorage.setItem('herf',window.location.href);
              this.$router.push(`/zhangdan`);
            },
        },
        mounted(){
            this.docList();
        }
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
.operate{
    position: absolute;
    right: 5%;
    top: 30%;
}
.xuan{
    padding: 10px 5%;
    border-bottom: 3px solid #ccc;
    position: relative;
}
.sou{
    display: inline-block;
    position: absolute;
    right: 5%;
    
}
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  /* position: fixed; */
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 999;
}
.userssss{
    padding: 10px 0;
    position: relative;
}
.user{
    padding-left: 10px;
    font-size: 16px;
}
.user p,.otherinfo1 {
    /* color: rgb(0, 0, 0); */
    line-height: 1.7;
}
.user p span:nth-of-type(1){
  font-weight: 600;
}
.user p span:nth-of-type(2){
  padding-left: 15px;
}
.avatar1 {
   border-radius: 50%;
    top: 2.33333vw;
    width: 13.33333vw;
    height: 13.33333vw;
    position: absolute;
    left: 0.8vw;
}
</style>