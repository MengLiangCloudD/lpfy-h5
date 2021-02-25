<template>
  <div class="RegistrationJianKa-page">
    
    <div class="title">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      身份验证
    </div>
    <div class="log_img">
      <img src="./../../../common/imager/logo.jpg" alt="" class="logo">
    </div>
    <div class="inp">
      <p>
        <label for="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
        <input type="text" name id="name" class="name" placeholder="请输入姓名" v-model="Name"  @input="ischange()" @blur.prevent="inputLoseFocus" >
      </p>
      <p>
        <label for="IdNumber">证件号码</label>
        <input type="text" name id="IdNumber" class="name" placeholder="请输入身份证号码" v-model="IdNumber" @input="ischange()"  @blur.prevent="inputLoseFocus">
      </p>
    </div>
    <div class="inp">
      <p>
        <label for="phoneNumber">联系电话</label>
        <input
          type="number" pattern="\d*"
          name
          id="phoneNumber"
          placeholder="填写就诊人手机号"
          v-model="phoneNumber"
          @input="ischange()"
          @blur.prevent="inputLoseFocus"
          class="name"
        >
        <ul style="text-align: right; padding-right:7%; list-style-type:none;font-size:16px">
      </ul>
      </p>
      <p>
        <label for="authCode">验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>
        <span class="span">
          <input  type="number" pattern="\d*" name id="authCode" class="name" placeholder="填写验证码" v-model="authCode" @input="ischange()" @blur.prevent="inputLoseFocus">
          <button @click="verifyclick()" 
           v-bind:disabled="isSend"
          >
            <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
            <span v-if="!sendMsgDisabled">获取验证码</span></button>
        </span>
      </p>
    </div>
    
   <label for="" style="display:block;color: #28b8a1; margin:30px 10px 0 10px;font-size:16px;"><img src="./../../../common/imager/wen.png" alt="" width="15" style="display: inline-block;vertical-align: middle;margin-right:10px"> <span style="display: inline-block;vertical-align: middle;font-size:16px;">温馨提示：</span> </label>
   
        <p style="border:0;color:rgb(154,154,154);padding:10px 0 ;margin: 0 10px;">
          感谢您的信任，关注本院公众号，请您如实填写上述信息以方便您之后享受我们提供的服务，祝您愉快!</p>
          <div class="butn">
      <button
       class="sub-btn"
       @click="verifyBtn()"
       ref="subBtn"
       v-bind:disabled="isDisabl"
       >提交</button>
    </div>
    <Modal
        v-model="erromodal"
        title="提示">
        <p>该卡已被绑定，请先解绑!</p>
    </Modal>
    <loading v-show="isshowloading"></loading>
  </div>
  
</template>
<script>
import loading from '@/common/loading'
import http from '@/utils/http'
export default {
  name:'authentication',
  components: {
    loading
  },
  mounted(){

  },
  data() {
    return {
      erromodal:false,
      Name: "", //姓名
      IdNumber: "", //证件号码
      phoneNumber: "", //电话
      authCode: "", //验证码
      cuow: "",
      time:60,
      sendMsgDisabled: false,
      isList:[],//控制按钮变色需要的数组
      n:0,//按钮变色变量
      isDisabl:true,
      isSend:false,//控制验证码按钮能不能点击
      //控制加载动画的显示
      isshowloading: false,
      number:1
    };
  },
  methods: {
    //返回上一层
      tobackdetail(){
          var herf = localStorage.getItem('herf');
          window.location.href=herf;
      },
    //val是指输入框的总数量
    ischange:function () {
        let val = 0;
        this.isList[0]=this.Name;
        this.isList[1]=this.IdNumber;
        this.isList[2]=this.phoneNumber;
        this.isList[3]=this.authCode;
        this.isList.forEach(item => {
                ++val;
        });              
        this.n = 0;
        this.isList.forEach(item => {
            //inp框中的值可能被清空
            if(item!==''){
                ++this.n;
            }
        });
        if(this.n>=val){
            this.$refs.subBtn.className='sub-btn sub-btn-greed';
            // --n;
            this.isDisabl = false;
        }else{
            this.$refs.subBtn.className='sub-btn';
            this.isDisabl = true;
        }
    },
    //弹出键盘问题
    inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
    },
    //提交验证
    verifyBtn(){
        var _this = this;
        var Name = _this.Name.replace(/\s*/g,"");
        var IdNumber = _this.IdNumber.replace(/\s*/g,"");
        var phoneNumber = _this.phoneNumber.replace(/\s*/g,"");
        var authCode = _this.authCode.replace(/\s*/g,"");
        if (_this.Name == '') {
              _this.btnTimer("姓名不能为空",0);
              return
          } else if (Name=='') {
              _this.btnTimer("请输入正确的姓名格式",1);
              return
          }else
         if (_this.IdNumber == '') {
              _this.btnTimer("身份证号不能为空",0);
              return
          } else if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(IdNumber)){
              _this.btnTimer("请输入正确的证件格式",1);
              return
          } else
        if (_this.phoneNumber == '') {
              _this.btnTimer("手机号不能为空",0);
              return
          } else if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
              _this.btnTimer("请输入正确的手机号",1);
              return
          } else
        if (_this.authCode == '') {
              _this.btnTimer("验证码不能为空",0);
              return
            } else if (!/^\d{6,6}$/.test(authCode)) {
              // } else if (0) {
              _this.btnTimer("请输入正确的验证码",1);
              return
            } else 
        if(_this.Name == ''||_this.IdNumber == ''||_this.phoneNumber == ''||_this.authCode == ''){
            _this.btnTimer("请将信息填写完整",0);
            return
        }else if(Name==''||!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(IdNumber)||!/^1[3456789]\d{9}$/.test(phoneNumber)||!/^\d{6,6}$/.test(authCode)){
            _this.btnTimer("请输入正确格式的信息",1);
            return
        }
        else{
          _this.docloing();
        }
    },
    //身份验证
    docloing:async function(){
      var that =this;
          var name= that.Name//姓名
          var idno= that.IdNumber//身份证号
          var phone= that.phoneNumber//电话
          var vcode= that.authCode//验证码
          var url ="user/addCard"
          var data = {
            idno,name,phone,vcode
          }
          var res  = await http.post(that,url,data);
          if(res.errcode==0){
            that.$Message.success(res.errmsg);
            var herf = localStorage.getItem('herf');
            window.location.href=herf;
          }else if(res.errcode==3008){
            that.$Message.success(res.errmsg);
            that.$router.push('/HomePage');
          }else{
            that.$Message.warning(res.errmsg);
          }
    },
    //获取验证码
    verifyclick: async function(){
      var that = this;
      var time= that.time;
      var url= "user/sendVcode";
      var phone= that.phoneNumber;
      var data={
        phone
      }
      if (that.phoneNumber == ''||that.IdNumber==''||that.Name=='') {
          that.btnTimer("请现将信息填写完整",0);
      } else if (!/^1[3456789]\d{9}$/.test(that.phoneNumber)) {
          that.btnTimer("请输入正确的手机号",1);
      }else{
        that.send();
        var res  = await http.post(that,url,data);
        if(res.errcode==0){
          that.$Message.success('验证码获取成功');
        }else{
          that.$Message.success('验证码获取失败');
        }
      }
    },
    //倒计时
    send() {
        var me = this;
        if(!me.sendMsgDisabled){
        me.sendMsgDisabled = true;
        me.isSend = true;
        var interval = setInterval(function() {
         if (me.time<= 0) {
          me.time = 60;
          me.sendMsgDisabled = false;
          me.isSend = false;
          clearTimeout(interval);
         }else{
           me.time--
         }
        }, 1000);
      }
      
    },
    //按钮弹窗在点击后1.5秒不能再次弹出（1.5秒是弹窗默认出现消失的时间）
    //第一个text是弹窗内的文本 必须是字符串
    //第二个参数是弹窗类型 0/1/2 警告/错误/成功
    //全局必须有一个控制按钮可不可点击的属性 isDisabl:false,
    btnTimer(text,type){
      //警告窗口
      let timer = null;//控制按钮在弹窗结束前多次点击无效
      let n = 0;
      let _this = this;
      _this.isDisabl = true;
      _this.isSend = true;
        if(_this.isDisabl == true){
           if(type === 0){
             _this.$Message.warning(text);
           }else if(type == 1){
             _this.$Message.error(text);
           }else if(type == 2){
             _this.$Message.success(text);
           }
          timer = setInterval(function(){
            if(n<1){
              _this.isDisabl = true;
              _this.isSend = true;
              n = n+1;
            }else{
              n = 0;
              _this.isDisabl = false;
              _this.isSend = false;
              clearInterval(timer);
            }
          },1400)
        }
    }
  }
};
</script>

<style scoped>
.RegistrationJianKa-page {
  height: 100%;
  overflow: auto;
}
.title {
  background: rgb(255, 255, 255);
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 20px;
  font-family: PingFangSC-regular;
  background: #28b8a1;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.tto{
  position: absolute;
  right: 5%;
}
.nav {
  background: #bbb;
  padding: 10px 0 10px 10px;
  color: #ff9800;
}
label {
  color: #000;
  /* font-weight: 800; */
  font-size: 16px;
}
p > input {
  border: 0;
  position: absolute;
  right: 0%;
  height: 30px;
  font-size: 16px;
  outline: none;
  width: 70%;
  top: 7px;
}
.span {
  position: absolute;
  right: 0;
  /* text-align: right; */
  width: 70%;
}
.span > input {
  font-size: 16px;
  height: 30px;
  width: 60%;
  border: 0;
  outline: none;
}
button {
  font-size: 16px;
  color: #28b8a1;
  outline: none;
  border: 0;
  background: #fff;
  border-left: 1px solid rgb(238,238,238);
  padding-left: 10px;
  position: absolute;
  right: 0;
  z-index: 888;
}
p {
  position: relative;
  padding: 10px 7px;
  text-align: left;
  border-bottom: 1px solid rgb(238,238,238);
}
select {
  position: absolute;
  right: 7%;
  height: 30px;
  font-size: 18px;
  width: 58%;
  border: 0;
  background: #fff;
  outline: none;
  /* float: right; */
  /* height: 40px; */
}
.butn {
  text-align: center;
  margin-top: 40px;
}
/* .btn {
  background: #28b8a1;
  color: #fff;
  padding: 6px 50px;
  border-radius: 20px;
} */
.sub-btn {
  width: 300px;
  height: 40px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  background-color: rgb(127, 127, 127);
  z-index: 99;
  
}
.sub-btn-greed {
  background-color: rgb(40, 184, 161);
}
.log_img{
  /* display: inline-block; */
  width: 30%;
  margin: 20px auto;
}
.logo{
  width: 100%;
}
.inp{
  margin: 0 10px;
}
</style>