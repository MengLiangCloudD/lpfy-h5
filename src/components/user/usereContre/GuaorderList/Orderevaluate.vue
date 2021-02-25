<template>
  <div style="height: 100%; overflow: auto;">
    <div class="evaluate-page">
      <div class="title">
         <div class="arrow-icon1" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
         </div>
        <span>评价医生</span>
      </div>
      <div class="nav">
        <div class="content">
          <div class="content_left">
            <img src="./../../../../common/imager/toux.png" alt width="62">
          </div>
          <div class="content_right">
            <p style="padding:5px 10px">{{docName}}</p>
            <p>{{depname}}主治医师</p>
            <p>滦平县妇幼保健院</p>
          </div>
        </div>
        <div class="contenter">
          <button v-if="flage">已关注</button>
          <button v-if="flage==false" @click="attention()">关注</button>
        </div>
      </div>
      <div class="ping">
        <div class="comment">
          <!-- <textarea placeholder="请输入" @input="descInput" v-model="desc"/> -->
          <textarea
            cols="50"
            rows="8"
            id="textarea"
            placeholder="请输入您的评价内容，不超过100个字"
            v-model="content"
            maxlength="100"
            @input="descInput"
          ></textarea>
          <p class="numberV" style="text-align:right;width:80%">{{txtVal}}/100</p>
        </div>
      </div>
      <div class="ping">
        <div class="anonymity">
          <!-- <p>
            <Checkbox v-model="single" size="large">匿名</Checkbox>
          </p> -->
          <!-- <p>您的评价可以帮助到其他小伙伴</p> -->
        </div>
      </div>
      <div class="footer">
        <div class="footer_footer">
          <div v-for="(item,index1) in depList" :key="index1">
              <div class="footer_left">
              <p  >{{item.deptname}}</p>
            </div>
            <div class="footer_right">
              <div class="div">
                <li
                  v-for="index of item.score"
                  :key="index"
                  class="star-item star-itemy"
                  @click="stars(index,index1)"
                ></li>
                <li
                  v-for="index2 of  scoreqwe - item.score"
                  :key="index2"
                  class="star-item star-itemn"
                  @click="starss(index2,index1)"
                ></li>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="bttn">
        <button class="btn" @click="submitContent()">提交</button>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import http from '@/utils/http'
import tabbar from "@/common/tabbar";
import loading from "@/common/loading";
export default {
  components: {
    tabbar,
    loading
  },
  data() {
    return {
      scoreqwe:5,
      content: "",
      //默认态度星级
      score: 1,
      deletion: "",
      flage: false,
      txtVal: 0,
      //医生姓名
      docName: "",
      //所属科室
      depname: "",
      isshowloading:false,
      depList:[],
    };
  },
  computed: {
    
    // //计算属性
    // itemClasses() {
    //   let result = []; // 返回的是一个数组,用来遍历输出星星
    //   let score = Math.floor(this.score * 2) / 2; // 计算所有星星的数量
    //   let hasDecimal = score % 1 !== 0; // 非整数星星判断
    //   let integer = Math.floor(score); // 整数星星判断
    //   for (let i = 0; i < integer; i++) {
    //     // 整数星星使用on
    //     result.push("on"); // 一个整数星星就push一个CLS_ON到数组
    //   }
    //   if (hasDecimal) {
    //     // 非整数星星使用half
    //     result.push("half"); // 类似
    //   }
    //   while (result.length < 5) {
    //     // 余下的用无星星补全,使用off
    //     result.push("off");
    //   }
    //   return result;
    // },
  },
  methods: {
    //返回上一层
    tobackdetail(){
        this.$router.push('/GuaorderList');
    },
    //判断评价星级
    stars: function(index,index1) {
      this.depList[index1].score=index;
    },
    starss: function(index,index1){
      this.depList[index1].score=this.depList[index1].score+index;
    },
    //限制评论字数
    descInput() {
      this.txtVal = this.content.length;
    },
    //提交评价
    async submitContent() {
      var obj = {};
      var that = this;
      var url ="evaluate/patientEvaluateDoctor";
      obj.order_no=localStorage.getItem('order_no');
      obj.content = that.content;
      obj.star= JSON.stringify(that.depList);
      var data = obj;
      //判断是否有评论内容
      if (obj.content != "" && obj.star != ""&& obj.content.replace(/\s+/g, "").length !==0) {
          var res  = await http.post(that,url,data);
          if(res.errcode==0){
              that.$Message.success(res.data);
              that.$router.push('/HomePage')
          }else{
              that.$Message.warning(res.errmsg);
          }

        
      } else if (obj.content == "" || obj.tdpj == "" || obj.zdpj == ""||obj.content.replace(/\s+/g, "").length ==0) {
        that.$Message.warning("请填写评价内容，并评分");
      }
    },
    //关注医生
    async attention() {
      var that = this;
      var url ="follow/patientFollowDoctor";
        //医生编号
        var doctor_code = localStorage.getItem("docCode");
        var doctor_name = that.docName;
        var user_name = localStorage.getItem("cardername");
        var data = {
          doctor_code,doctor_name,user_name
        }
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          that.$Message.success("关注成功");
          that.flage = true;
        }else{
              that.$Message.error(res.errmsg);
            }
    },
    //查询是否已经关注
    async select() {
        var that = this;
        var url  ='follow/queryIfFollow';
        var doctor_code = localStorage.getItem("docCode");
        var data = {
            doctor_code
        }
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
            if(res.data==1){
            that.flage = true;
            }else{
            that.flage = false;
            }
        }
    },
    //查询信息
    async selecterPing(){
      var that = this;
        var url  ='evaluate/getEvaluationDay';
        var doctor_code = localStorage.getItem("docCode");
        var data = {

        }
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          var lister=[];
          for(var i = 0;i<res.data.length;i++){
            lister.push({
              deptname:res.data[i],
              score:5
            })
          }
          that.depList=lister
        }
    }
  },
  mounted() {
    this.select();
    //获取到所评论的医生姓名
    this.docName = localStorage.getItem('doctorName')
    //获取到所评论的医生科室
    this.depname = localStorage.getItem('dept_name')
    this.selecterPing()
  }
};
</script>

<style scoped>
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.evaluate-page {
  height: 100%;
  overflow: auto;
  padding-bottom: 70px;
}
.title {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
}
.arrow-icon1{
  position: absolute;
  left: 5px;
  top: 0px;
}
.arrow-icon{
  position: absolute;
  font-size: 16px;
  right: 10px;
  top: 0px;
}
.nav {
  width: 100%;
  padding: 15px 5%;
  position: relative;
}
.content_left {
  display: inline-block;
  vertical-align: middle;
}
.content_right {
  vertical-align: middle;
  display: inline-block;
}
.content_right p {
  color: #000;
  padding: 0 10px;
}
.content {
  vertical-align: middle;
  display: inline-block;
}
.contenter {
  vertical-align: middle;
  display: inline-block;
  position: absolute;
  right: 10%;
  top: 33px;
}
button {
  background: #28b8a1;
  border: 1px solid #fff;
  color: #fff;
  padding: 5px 20px;
  border-radius: 20px;
  outline: none;
}
.ping {
  width: 100%;
  text-align: center;
}
.comment {
  width: 100%;
  display: inline-block;
  padding: 15px 0;
  text-align: center;
  /* margin-top: 20px; */
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
textarea {
  width: 80%;
  border: 0;
  outline: none;
}
.anonymity {
  width: 80%;
  display: inline-block;
  padding: 20px 0;
  /* border-bottom: 2px solid #ccc; */
  position: relative;
}
.anonymity p {
  display: inline-block;
  vertical-align: middle;
}
.anonymity p:nth-child(2) {
  position: absolute;
  right: 0;
  top: 10px;
}
.anonymity p:nth-child(1) {
  position: absolute;
  left: 0;
  top: 10px;
}
.footer {
  width: 100%;
  background: #28b8a1;
  text-align: center;
  padding: 15px 0;
  /* margin-top: 20px; */
}
.footer_footer {
  width: 80%;
  display: inline-block;
  text-align: left;
  position: relative;
}
.footer_footer p {
  line-height: 3;
  color: #fff;
}
.footer_left {
  display: inline-block;
  vertical-align: middle;
}
.footer_right {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right: 0;
}
.footer_right .div {
  line-height: 3;
}
.btn {
    width: 60%;
    font-size: 4.8vw;
    padding: 2.66667vw;
    margin-top: 9.33333vw;
    border-radius: 50px;
}
.bttn {
  text-align: center;
}
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 1rem;
  height: 1rem;
  margin-left: 0.27rem;
  background-size: 100%;
 
}
.star-itemy {
  background-image: url(./../../../../common/imager/_星星1.png);
}
.star-itemn{
  background-image: url(./../../../../common/imager/_星星0.png);
}
</style>