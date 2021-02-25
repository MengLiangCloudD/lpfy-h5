<template>
  <div class="pinglun" style="height: 100%;
    overflow: auto; -webkit-overflow-scrolling: touch;">
    <div slot="list"  class="myCard">
      <div class="card-title">
         <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        关注的医生
        </div>
      <div class="card-back" v-for="(item,index) in attentionList" :key="index">
        <div class="card">
          <img class="card-img" src="./../../../../common/imager/avatar.png" alt>
          <div class="card-news">
            <div class="card-bold">
              <span>{{item.doctorName}}</span>
              <span style="color:#000">主治医生</span>
              <Button class="noCollect" @click="follow(item.doctorCode)">取消关注</Button>
            </div>
            <div class="hos-info">
              <!-- <span>{{item.deptName}}</span> -->
              <span>滦平县妇幼保健院</span>
            </div>
            <div class="star-class">
              <span>{{item.deptName}}</span>
              <Button class="noCollect" type="success" @click="goappointment(index)">去找医生</Button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
     <Modal
          title="提示"
          v-model="modal10"
          class-name="vertical-center-modal"
          @on-ok="unfollow"
          >
            <p>您确认要取消关注吗</p>
      </Modal>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
import http from '@/utils/http'
export default {
  components: {
    tabbar,
    loading,
  },
  data() {
    return {
      //动画加载
      attentionList: [],
      //医生编号
      doccode: "",
      isshowloading:false,
      size:10,
      modal10:false,
      doccodeser:''
    };
  },
  methods: {
    //去挂号
    goappointment(index){
      var that = this;
      that.$router.push(`/appointment?depCode=${that.attentionList[index].deptCode}&docCode=${that.attentionList[index].doctorCode}`);
    },
    //加载关注列表
    async attention() {
      var that = this;
      //拿到openid
      var data={

      }
      // 定义url地址
      var url = "follow/getPatientFollowList";
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
        that.attentionList = res.data;
      }
    },
    follow(doccode){
      this.modal10=true;
      this.doccodeser=doccode
    },
    //取消关注
    async unfollow() {
      //开启加载动画
      // this.$Loading.start();
      var that = this;
      var doctor_code= that.doccodeser;
      var data = {
        doctor_code
      }
      //定义url地址
      var url ="follow/deletePatientFollow";
      var res  = await http.post(that,url,data);
      if(res.errcode==0){
         that.$Message.info('取消成功');
          that.attention();
      }
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/HomePage');
    },
  },
  mounted() {
    var that  = this;
    //调用渲染的方法
    that.attention();
  }
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.noCollect {
  position: absolute;
  right: 5%;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.myCard {
  overflow: auto;
  padding: 0 0 70px 0;
  
}
.card-title {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-regular;
  border-bottom: 1px solid #ccc;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
}

.card-back {
  background: rgba(201, 111, 111, 0);
}
.card {
  border-bottom: 1px solid #ccc;
  position: relative;
  background: #fff;
}
.card-img {
  width: 50px;
  position: absolute;
  top: 13%;
  left: 5%;
  border-radius: 50%;
}
.card-news {
  margin-left: 24%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.card-bold {
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
  margin: 10px 0;
  position: relative;
}
.hos-info {
  font-weight: 400;
  font-size: 12px;
  color: #000;
  /* margin: 10px 0 10px 10px; */
}
.card-easy {
  font-weight: 400;
  font-size: 12px;
  color: #000;
  margin: 10px 0;
  margin-right: 20px;
}
.star-class {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 14px;
  /* color: #ff9800; */
  margin: 10px 0;
  position: relative;
}
.star-img {
  width: 16px;
  height: 16px;
}
.easy-label {
  margin: 10px 0;
  color: rgb(40, 184, 161);
}
.easy-label span {
  padding: 1px 3px;
  border: 1px solid rgb(40, 184, 161);
  border-radius: 10px;
}
</style>