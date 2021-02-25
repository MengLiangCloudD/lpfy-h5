<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon">
              <Icon size="30" type="ios-arrow-back" @click="tobackdetail"/>
            </div>
            {{biao}}
            <div style=" position: absolute;right: 5%;top:15px" @click="goaddattachment(0,1)">
                <svg t="1574489296024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4002" width="24" height="24"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="4003" fill="#ffffff"></path></svg>
            </div>
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
                        <Button type="success" size="small" @click="jiankai(item)">查看</Button>
                        <Button type="error" size="small" @click="test(index)">删除</Button>
                </div>
            </div>
        </div>
        <Modal v-model="modal10" width="360">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>温馨提示</span>
            </p>
            <div style="text-align:center">
              <p>您确认要删除吗</p>
            </div>
            <div slot="footer">
              <Button type="success" size="large" long @click="update()">确定</Button>
            </div>
          </Modal>
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
                biao:'管理的医生',
                modal10:false,
                currentIndex:''
            }
        },
        methods:{
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
          //点击开启弹窗 s删除医生
          test(index) {
            this.currentIndex = index;
            var doc = JSON.parse(localStorage.getItem('docinforItem'))
            if(this.doctorList[index].managedDoctorCode==doc.user_name){
               this.$Message.warning('不能删除自己')
            }else{
              this.modal10 = true;
            }
          },
            //返回上一层
            tobackdetail(){
                 this.$router.push('/doctormanagement');
            },
            //添加
            goaddattachment(){
                this.$router.push('/adddoctor');
            },
            //查询医生
            async docList(){
              var that =this;
              var url = 'adminRefund/queryDoctors'
              var doc = JSON.parse(localStorage.getItem('docinforItem'))
              var doctorCode = doc.user_name;
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
            //移除医生的方法
            async update(){
               var that =this;
               that.modal10 = false;
              var url = 'adminRefund/deleteDoctors'
              var doc = JSON.parse(localStorage.getItem('docinforItem'))
              var manageDoctorCode = doc.user_name;
              var managedDoctorCode = that.doctorList[that.currentIndex].managedDoctorCode
              var data  = {
                  manageDoctorCode,managedDoctorCode
              }
              var res  =  await http.post(that,url,data);
              if(res.errcode==0){
                that.docList()
                that.$Message.success('删除成功')
              }else{
                 that.$Message.error(res.errmsg)
              }
            }
        },
        mounted(){
            this.docList();
            var doc = JSON.parse(localStorage.getItem('docinforItem'))
            this.biao = doc.name + this.biao ;
          
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