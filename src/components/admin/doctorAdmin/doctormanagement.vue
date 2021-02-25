<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            {{biao}}
          </div>
          <div class="xuanze" style="position: relative;" v-if="Administrator.adminLevel<=1&&starter!=5">
            <div style="display:inline-block;width:100%">
              <span style="color:rgb(0, 187, 187);font-size:20px;" @click="qingkong">全部医生</span>
              <Select class="a" v-model="model1" style="border:0; position: absolute;right: 5%;top: 7px;width:30%;"  :label-in-value="true" placeholder="选择科室" @on-change="docList">
                    <Option v-for="item in depList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
          </div>
        </div>
        <div class="content" style="padding-top: 50px;">
            <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                <div class="doctor" >
                    <img class="avatar" src="./../../../common/imager/avatar.png" alt="" width="40px;"  >
                    <div class="xinxi">
                        <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                        <p><span>医生职称：</span><span>{{item.dept_name}}</span></p>
                    </div>
                </div>
                <div class="operate" >
                        <Button type="success" size="small" @click="goaddDoctor(item)">授权</Button>
                        <Button type="primary" size="small" @click="jiankai(item)">查看</Button>
                </div>
                <!-- <div class="operate" v-if="start==0">
                      <Button type="success" size="small" @click="goaddDoctor(item,5)">设置管理权限</Button>
                </div> -->
                
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
                modal11:false,
                model1:'',
                doctorList:[],
                depList:[],
                content:'',
                isshowloading:false,
                biao:'医生管理',
                start:1,
                docxiang:[],
                play:false,
                Administrator:'',
                starter:''
            }
        },
        methods:{
            disp(){
              this.play=!this.play;
            },
            //查询全部医生
            qingkong(){
              this.model1='';
              this.docList('');
            },
            //返回上一层
            tobackdetail(){
              if(this.starter==5){
                 this.$router.push('/administrativemanagement');
              }else{
                 this.$router.push('/admin');
              }
            },
            //修改医生
            goaddDoctor(item){
                localStorage.setItem('docinforItem',JSON.stringify(item));
                this.$router.push(`/adminDowndoc`);
            },
            //查看医生信息账单
            jiankai(item){
              localStorage.setItem('docItem',JSON.stringify(item));
              localStorage.setItem('herf',window.location.href);
              this.$router.push(`/zhangdan`);
            },
            //科室分类
            _dealdata(data){
                var that = this;
                //妇科
                var gynaecology=[];
                //产科
                var obstetrics=[];
                //儿科
                var pediatrics=[];
                var other=[];
                for(var i = 0;i<data.length;i++){
                    if(data[i].deptCode.substring(0,6)=='100101'){
                        gynaecology.push(data[i]);
                    }else if(data[i].deptCode.substring(0,6)=='100102'){
                        obstetrics.push(data[i]);
                    }else if(data[i].deptCode.substring(0,6)=='100103'){
                        pediatrics.push(data[i]);
                    }else {
                        other.push(data[i]);
                    }
                }
                 var deptorList = []
                deptorList.push({ deptName: "妇科门诊", gynaecology:gynaecology,deptCode:'100101'});
                deptorList.push({ deptName: "产科门诊", obstetrics:obstetrics,deptCode:'100102'});
                deptorList.push({ deptName: "儿科门诊", pediatrics:pediatrics,deptCode:'100103'});
                for (let j = 0; j < other.length; j++) {
                    if (other[j].deptName == "皮肤科") {
                      deptorList.push({deptName: "皮肤科",deptCode:other[j].deptCode});
                    }
                }
                //其他没合并的科室
                for (let i = 0; i < other.length; i++) {
                    let deptName = "";
                    let deptCode = ''
                    deptName = other[i].deptName;
                    deptCode=other[i].deptCode;
                    if (deptName != "皮肤科") {
                    let depitem = {
                        //合并科室的名称
                        deptName: deptName,
                        deptCode:deptCode
                    };
                      deptorList.push(depitem);
                    }
                }
                for(var i =0;i<deptorList.length;i++){
                  let depname = "";
                  let depCode = ''
                  depname = deptorList[i].deptName;
                  depCode=deptorList[i].deptCode;
                  let depitem = {
                      //合并科室的名称
                      label: depname,
                      value:depCode
                    };
                    that.depList.push(depitem)
                    
                }
            },
            //查询科室
            DeptInfoList(){
                var that =this;
                var url = 'admin/dept/getDeptList.do';
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: '',
                    success:function(data){
                      that.isshowloading=false;
                        if(data.code=='200'){
                            that._dealdata(data.data);
                        }
                    },
                    error:function(data){
                      that.isshowloading=false;
                    }
                })
            },
            //查询医生
            async docList(value){
              var that =this;
              var url = 'adminRefund/queryAllDoctors'
              var data  = {

              }
              var res  =  await http.post(that,url,data);
              if(res.errcode==0&&res.data!=null){
                  that.doctorList=res.data;
              }else{
                   that.doctorLis=[];
              }
            },
        },
        mounted(){
        //   if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
        //     this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
        //     if(this.Administrator.adminLevel>1){
        //       this.docList({value:this.Administrator.deptCode});
        //     }else{
        //       if(this.$route.query.start==5){
        //         this.docList({value:this.$route.query.deptCode});
        //         this.biao=`${this.$route.query.deptName}医生`
        //         this.starter = this.$route.query.start;
        //       }else{
                this.docList();
                // this.DeptInfoList();
        //       }
        //     }
        //   }
          
          
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