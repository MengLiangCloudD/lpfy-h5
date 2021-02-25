<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             医生评价
        </div>
        <div class="nav">
            <div class="content">
                <div class="content_left">
                    <img src="./../../../../common/imager/avatar.png" alt width="62">
                </div>
                <div class="content_right">
                    <p>{{docname}}</p>
                    <div class="div">
                    <li v-for="(itemClass,index) in itemClasses"
                    :class="itemClass"
                    class="star-item"
                    @click="stars(index)"
                    track-by="index"
                    :key="index"
                    ></li>
                    </div>
                </div>
            </div>
        </div>
        <div class="neirong">
            <div class="pingjia_nav" style="border:0">
                    <div class="nei" :class="{'nei1':jdxx==1}" @click="atjdxx()">解答详细</div>
                    <div class="nei" :class="{'nei1':tdlh==1}" @click="attdlh()">态度良好</div>
                    <div class="nei" :class="{'nei1':hfjs==1}" @click="athfjs()">回复及时</div>
            </div>
            <div class="pingjia_nav" >
                <div class="nei" :class="{'nei1':ysjz==1}" @click="atysjz()">医术精湛</div>
                <div class="nei" :class="{'nei1':ynx==1}"  @click="atynx()">有耐心</div>
                <div class="nei" :class="{'nei1':xxjj==1}" @click="atxxjj()">循序渐进</div>
            </div>
            <div class="pjnei">
                <textarea
                    cols="50"
                    rows="8"
                    id="textarea"
                    placeholder="请输入您的评价内容，不超过100个字"
                    v-model="content"
                    maxlength="100"
                    @input="descInput"
                ></textarea>
                
            </div>
            <p class="numberV" style="text-align:right;width:80%">{{txtVal}}/100</p>
        </div>
        <div class="bttn">
            <button class="btn" @click="submitContent()">提交</button>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        mounted() {
            this.docname = localStorage.getItem('pjDocname')
        },
        data() {
            return {
                //默认态度星级
                score: 5,
                //解答详细
                jdxx:0,
                //态度良好
                tdlh:0,
                //回复及时
                hfjs:0,
                // 技术精湛
                ysjz:0,
                //循序渐进
                xxjj:0,
                //有耐心
                ynx:0,
                txtVal: 0,
                content:'',
                docname:''
            }
        },
        computed: {
            //计算属性
            itemClasses() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                let score = Math.floor(this.score * 2) / 2; // 计算所有星星的数量
                let hasDecimal = score % 1 !== 0; // 非整数星星判断
                let integer = Math.floor(score); // 整数星星判断
                for (let i = 0; i < integer; i++) {
                    // 整数星星使用on
                    result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                }
                if (hasDecimal) {
                    // 非整数星星使用half
                    result.push("half"); // 类似
                }
                while (result.length < 5) {
                    // 余下的用无星星补全,使用off
                    result.push("off");
                }
                return result;
            },
            itemClassese() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                let scores = Math.floor(this.scores * 2) / 2; // 计算所有星星的数量
                let hasDecimal = scores % 1 !== 0; // 非整数星星判断
                let integer = Math.floor(scores); // 整数星星判断
                for (let i = 0; i < integer; i++) {
                    // 整数星星使用on
                    result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                }
                if (hasDecimal) {
                    // 非整数星星使用half
                    result.push("half"); // 类似
                }
                while (result.length < 5) {
                    // 余下的用无星星补全,使用off
                    result.push("off");
                }
                return result;
            }
        },
        methods: {
            atjdxx(){
                if(this.jdxx==0){
                    this.jdxx=1
                }else if(this.jdxx==1){
                    this.jdxx=0
                }
            },
            attdlh(){
                if(this.tdlh==0){
                    this.tdlh=1
                }else if(this.tdlh==1){
                    this.tdlh=0
                }
            },
            athfjs(){
                if(this.hfjs==0){
                    this.hfjs=1
                }else if(this.hfjs==1){
                    this.hfjs=0
                }
            },
            atysjz(){
                if(this.ysjz==0){
                    this.ysjz=1
                }else if(this.ysjz==1){
                    this.ysjz=0
                }
            },
            atynx(){
                if(this.ynx==0){
                    this.ynx=1
                }else if(this.ynx==1){
                    this.ynx=0
                }
            },
            atxxjj(){
                if(this.xxjj==0){
                    this.xxjj=1
                }else if(this.xxjj==1){
                    this.xxjj=0
                }
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/inquiryList');
            },
            //判断评价星级
            stars: function(index) {
                this.score = index + 1;
            },
            //限制评论字数
            descInput() {
                this.txtVal = this.content.length;
            },
            // 提交评价
            async submitContent(){
                var that = this;
                var orderNo=that.$route.query.orderNo;
                var doctorid=that.$route.query.doctorid;
                var url = 'consultation/goEvalConsultDoctor';
                var data = {
                    doctor_id:doctorid,	
                    order_no:orderNo,
                    evaluation_content:that.content,	
                    evaluation_number:that.score,	
                    jdxx:that.jdxx,		
                    tdlh:that.tdlh,				
                    hfjs:that.hfjs,			
                    ysjz:that.ysjz,		
                    ynx:that.ynx,			
                    xxjj:that.xxjj,		
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$Message.info('操作成功');
                    that.content='';
                    that.$router.push('/inquiryList');
                }else{
                    that.$Message.error(res.errmsg);
                    that.content=''
                }
            }
        },
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.div {
  line-height: 3;
}
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.27rem;
  background-size: 100%;
}
.star-item.on {
  background-image: url(./../../../../common/imager/_星星1.png);
}
.star-item.half {
  background-image: url(./../../../../common/imager/_星星0.png);
}
.star-item.off {
  background-image: url(./../../../../common/imager/_星星0.png);
}
.content_left{
    display: inline-block;
    vertical-align: middle;
}
.content_right{
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
    font-size: 14px;
}
.nav{
    padding: 10px 5%;
    border-bottom: 5px solid #eee;
}
.pingjia_nav{
    display: flex;
    align-items: center;
    width:100%;
    flex-wrap: wrap;
    padding: 10px 0;
    font-size: 16px;
    overflow: auto;
    border-radius: 5px;
    margin:1.66667vw  0;
    border-bottom: 1px solid rgb(230, 230, 230);
}
 
.nei{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:30%;
    padding: 5px 0;
    background: #eee;
    margin:0 1%;
    border-radius: 20px;
}
.nei1{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:30%;
    padding: 5px 0;
    background:PowDerBlue;
    margin:0 1%;
    border-radius: 20px;
}
.pjnei{
    text-align: center;
    border-bottom: 1px solid #ccc;
}
textarea {
  width: 80%;
  border: 0;
  outline: none;
}
.btn {
    width: 60%;
    font-size: 4.8vw;
    padding: 2.66667vw;
    margin-top: 9.33333vw;
    border-radius: 50px;
    background:  #28b8a1;
    color: #fff;
    outline: none;
}
button {
  background: #28b8a1;
  border: 1px solid #fff;
  color: #fff;
  padding: 5px 20px;
  border-radius: 20px;
  outline: none;
}
.bttn {
  text-align: center;
}
</style>