<template>
    <div style="height:100%;overflow: auto;">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            患者个人基本信息
        </div>
        <div class="header" style="z-index:910;position:relative">
          <div class="users"  style="padding-left: 5%;">
            <img src="./../../../common/imager/toux.png" alt="" width="50px;" style="vertical-align: top;" >
            <div class="user" style="display: inline-block;vertical-align: top;margin-left:10px;">
              <p><span>患者姓名：</span><span>{{name}}</span></p>
              <p><span>患者卡号：</span><span>{{cardno}}</span></p>
              <!-- <p><span>身份证号：</span><span>{{idno}}</span></p> -->
              <!-- <svg :class="'barcodea'"></svg> -->
            </div>
          </div>
        </div>
        <div class="content2">
            <p @click="record">
            <img src="./../../../common/imager/bing.png" alt width="24">
            <span>患者病历</span>
            </p>
            <p @click="check">
                <img src="./../../../common/imager/za.png" alt width="24">
                <span>检查处方</span>
            </p>
            <p @click="test">
                <img src="./../../../common/imager/huayan.png" alt width="24">
                <span>化验处方</span>
            </p>
            <p @click="drug">
                <img src="./../../../common/imager/chu.png" alt width="24">
                <span>药品处方</span>
            </p>
            
            <p @click="checkres">
                <img src="./../../../common/imager/jian.png" alt width="24">
                <span>检查结果</span>
            </p>
            
            <p @click="testres">
                <img src="./../../../common/imager/hua.png" alt width="24">
                <span>化验结果</span>
            </p>
            <p @click="rescure" v-if="false">
                <img src="./../../../common/imager/hua.png" alt width="24">
                <span>产后评估</span>
            </p>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                name:"",
                cardno:"",
                namem:''
            }
        },
       methods:{
            rescure(){
              this.$router.push('/rescure')
            },
           checkres(){
               this.$router.push('/doctorckeckjcresult')
           },
           testres(){
               this.$router.push('/doctorckecktestresult')
           },
           tobackdetail(){
             if(this.namem==0){
                this.$router.push('/Historicpatients');
             }else if(this.namem==4){
               history.go(-1)
             }else{
               this.$router.push('/detail');
             }
           },
            check(){
                this.$router.push('/doctorckeckjc')
            },
            test(){
                this.$router.push("/doctorckecktest")
            },
            drug(){
                this.$router.push("/doctorckeckdrug")
            },
            record(){
                this.$router.push("/doctorckeckrec")
            }
       },
       mounted(){
            let _this=this
            let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
            this.namem=localStorage.getItem('tiao')
            this.name=patientinfo.name
            this.cardno=patientinfo.cardNo//卡号
       },
    }
</script>

<style scoped>
.title{
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
.content2{
    margin-top: 20px;
    padding-bottom: 50px;
    border-top: 1px solid #aaa;
}
.content2 p img {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
}
.content2 p {
  padding: 16px 10% 16px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
  
}
.users{
    display: flex;
    height: 50px;
    margin: 20px 0;
}
.header img,
header span {
  display: inline-block;
  vertical-align: middle;
}
.headerimage {
  vertical-align: middle;
  border-radius: 50%;
}
.name {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
.user p{
  line-height: 1.8;
}
</style>