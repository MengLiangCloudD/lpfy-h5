<template>
  <div style=" height: 100%;overflow: auto;">
    <div slot="list" class="myCard">
      <div class="card-title">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        电子健康卡
        </div>
      <div class="card-group">
        <div class="card-back">
          <div class="card" v-for="(item,index) in myCardType" :key="index" >
           <div v-if="item.cardno!==''">
            <p class="bina" @click="bina(index)"><svg t="1585895402523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4346" width="20" height="20"><path d="M754.176 870.4H292.352c-46.421333 0-84.309333-36.693333-84.309333-81.92V271.701333c0-45.226667 37.888-81.92 84.309333-81.92h331.264c18.773333 0 34.133333 15.36 34.133333 34.133334s-15.36 34.133333-34.133333 34.133333H292.352c-8.874667 0-16.042667 6.144-16.042667 13.653333V788.48c0 7.509333 7.168 13.653333 16.042667 13.653333h461.824c8.874667 0 16.042667-6.144 16.042667-13.653333v-114.858667c0-18.773333 15.36-34.133333 34.133333-34.133333s34.133333 15.36 34.133333 34.133333v114.858667c0 45.226667-37.888 81.92-84.309333 81.92z" p-id="4347"></path><path d="M486.229333 686.421333a34.2016 34.2016 0 0 1-24.064-58.368l383.317334-383.317333c13.312-13.312 34.986667-13.312 48.298666 0s13.312 34.986667 0 48.298667L510.464 676.522667c-6.656 6.656-15.36 9.898667-24.234667 9.898666z" p-id="4348"></path></svg></p>
            <img class="card-img" :src="headimgurl" alt width="50px;">
            <!-- <img src="./../../../../common/imager/toux.png" class="card-img" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;" > -->
            <div class="card-news">
              <div class="card-bold">
                <span>{{item.name}}</span>
                <span class="mo" v-if="item.default_flag==1">默认</span>
              </div>
              
              <div class="card-bold">
                <span>卡号：</span>
                <span>{{item.cardno}}</span>
              </div>

              <div class="card-easy">
                <span>身份证号：</span>
                <span>{{item.idno}}</span>
              </div>
              <svg :class="'barcode'+index"></svg>
            </div>
            <div class="card-btn">
              <!-- <span class="recharge" @click.stop="gorecharge()">充值</span> -->
              <!-- <span @click="removeCard(index)">解绑</span> -->
              
            </div>
            </div>
          </div>
          <div class="add_card">
            <div class="btn" @click="toBindCard()">新建电子卡</div>
          </div>
        </div>
      </div>
      <Modal v-model="statemodel"  @on-ok="changestate" title="设为默认卡">
        <div class="div">
          <p style="font-size:18px;">
            将该卡设为默认卡
          </p>
        </div>
      </Modal>
    </div>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import tabbar from "@/common/tabbar";
import JsBarcode from "jsbarcode";
//引入加载动画
import loading from "@/common/loading";
import http from '@/utils/http';
export default {
  components: {
    //公共底部
    tabbar,
    //加载动画
    loading,
  },
  data() {
    return {
      cardAccor: true,
      //返回回来的数据
      myCardType: [{}, {}, {}],
      modal10: false,
      currentIndex: "",
      headimgurl: "",
      isshowloading:false,
      statemodel:false,
      carderdar:''
    };
  },
 async mounted() {
    //查询患者就诊卡
      var url ="user/cardList";
      var that = this;
      var data = {

      }
      var res  = await http.post(that,url,data);
      //返回回来的数据
      if(res.errcode==0 && res.data.length!==0){
        that.myCardType = res.data;
      }else if(res.data.length==0){
        that.myCardType=[];
      }
      //调用生成条形码的方法
      this.$nextTick(function(){
      that.setBarcode();
    })
    if(localStorage.getItem("avatar")!=undefined){
        var headimgurl= localStorage.getItem("avatar");
        this.headimgurl  = headimgurl;
    }
  },
  methods: {
    // 弹框
    bina(index){
      if(this.myCardType[index].default_flag!=1){
        this.statemodel=true;
        this.carderdar=this.myCardType[index].cardno;
      }else{
        this.$Message.success('该卡已被设为默认卡');
      }
      
    },
    //设置默认卡
   async changestate(){
        var url  = 'user/defaultCard';
        var that = this;
        var data  ={
          cardno:that.carderdar
        }
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          this.loging()
          this.$Message.success('修改成功');
        }else{
          this.$Message.success('修改失败');
        }
    },
    async loging(){
          var url ="user/cardList";
          var that = this;
          var data = {
            
          }
          var res  = await http.post(that,url,data);
          //返回回来的数据
          if(res.errcode==0 && res.data.length!==0){
            that.myCardType = res.data;
            localStorage.setItem('cardno',res.data[0].cardno);
            localStorage.setItem('cardername',res.data[0].name);
          }else if(res.data.length==0){
            that.myCardType=[];
          }
    },
    //前往充值界面
    gorecharge(){
      // this.$router.push('/recharge')
    },
    //生成条形码
    setBarcode() {
      var that = this;
      for (var i = 0; i < that.myCardType.length; i++) {
        JsBarcode(".barcode" + i, that.myCardType[i].cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
      }
    },
    //新建电子卡
    toBindCard() {
      localStorage.setItem('herf',window.location.href);
      this.$router.push("/authentication");
      
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
  },
  computed: {}
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.barcode-wraaper {
  padding: 0 20px;
  height: 50px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
.myCard {
  /* height: 100%; */
  overflow: auto;
}
.card-title {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-family: PingFangSC-regular;
  border-bottom: 1px solid #ccc;
  background-color: #28b8a1;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
}
/* .card-group {
  overflow: auto;
  padding: 0 0 70px 0;
} */
.card-back {
  background: rgb(244, 244, 244);
}
.card {
  border-bottom: 1px solid #ccc;
  position: relative;
  background: #fff;
}
.card-img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 13%;
  left: 5%;
  border-radius: 50%;
}
.card-news {
  width: 60%;
  margin-left: 20%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.card-bold {
  font-family: SFUIText;
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
  margin: 10px 0;
}
.card-easy {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 12px;
  /* color: rgb(175, 175, 175); */
  color: #000;
  margin: 10px 0;
}
.card-btn {
  position: absolute;
  top: 50%;
  right: 4%;
  transform: translateY(-50%);

  font-weight: 400;
  font-size: 18px;
  color: rgba(40, 184, 161, 1);
}
.card-btn span {
  margin: 0 6px;
}
.btn {
      line-height: 13.33333vw;
    height: 13.33333vw;
    width: 65%;
    border-radius: 44px;
    text-align: center;
    background-color:#28b8a1;
    font-family: PingFangSC;
    font-weight: 400;
    font-size: 4.26667vw;
    color: rgba(255, 255, 255, 1);
    display: inline-block;
}
.add_card {
      width: 100%;
    text-align: center;
    /* position: fixed; */
    bottom: 16vw;
    background: #fff;
    padding: 40px 0 80px 0;
}
.mo{
  background:#f00;
  color:#fff;
  display:inline-block;
  padding:1px 3px;
  border-radius:3px;
}
.bina{
  position:absolute;
  display:inline-block;
  right:20px;
  top:20px;
}

</style>