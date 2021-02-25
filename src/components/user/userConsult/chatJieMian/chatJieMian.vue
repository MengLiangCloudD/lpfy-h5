<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;" class="liao">
        <div class="tittle" style="background: #00bbbb;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
              {{name}}医生
        </div>
        <div class="content">
            <p class="nav" v-if="jiezhenstate==1">剩余咨询时间还有{{timer}}分钟</p>
            <p class="nav" v-if="jiezhenstate==0">未开始计时，等待医生接单</p>
            <p  class="nav" v-if="jiezhenstate==2">咨询已达对话时间上限</p>
            <div class="message" v-for="(item,index) in comtent" :key='index'>
                <div class="receipt comment" v-if="item.identity!=='1'">
                    <p style="padding:5px 20px;font-size: 16px" v-if="item.identity=='2'">{{name}}</p>
                    <p style="padding:5px 20px;font-size: 16px" v-else>助诊医师{{parseInt(item.identity) - 3}}</p>
                    <img src="@/common/imager/avatar.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;border-radius:50%;" />
                    <div class="text yinpin" v-if="item.type=='0'">
                        <p>{{item.content}}</p>
                    </div>
                    <div class="text yinpin" v-if="item.type=='1'" style="box-sizing: border-box;width:150px;height:45px; position: relative;" @click="begins(index,item)">
                        <div class="playing" >
                                <span class="playing__bar playing__bar1"></span>
                                <span class="playing__bar playing__bar2"></span>
                                <span class="playing__bar playing__bar3"></span>
                            </div>
                            <!-- <div class="playing" v-if="!begin">
                                <span class=" playing__bar1"></span>
                                <span class=" playing__bar2"></span>
                                <span class=" playing__bar3"></span>
                            </div> -->
                            <p>{{item.time}}s</p>
                    </div>
                    <div class="text yinpin" style="background:rgb(255,255,255);padding-left:0;text-align:center;" v-if="item.type=='2'">
                            <img style="margin-left:5px;"  @click="previewimage(item)" :src="item.content" alt="" width="150">
                    </div>
                </div>
                <div class="send comment" v-else>
                    <img src="@/common/imager/toux.png" alst="" width="40px;" style="vertical-align: top;margin:0 15px;float: right;border-radius:50%;" />
                    <div class="text1 yinpin" v-if="item.type=='0'">
                             <p>{{item.content}}</p> 
                    </div>
                    <div class="text1 yinpin" v-if="item.type=='1'" style="box-sizing: border-box;width:150px;height:45px; position: relative;" @click="begins(index,item)">
                            <div class="playing">
                                <span class="playing__bar playing__bar1"></span>
                                <span class="playing__bar playing__bar2"></span>
                                <span class="playing__bar playing__bar3"></span>
                            </div>
                            <!-- <div class="playing" v-if="!begin">
                                <span class=" playing__bar1"></span>
                                <span class=" playing__bar2"></span>
                                <span class=" playing__bar3"></span>
                            </div> -->
                            <p style="text-align: right;padding: 0 5px;">{{item.time}}s</p>
                    </div>
                    <div class="text1 yinpin" style="background:rgb(255,255,255);padding-right:0;text-align:right" v-if="item.type=='2'">
                            <img :class="'item'+index" @click="previewimage(item)"  :src="item.content" alt="" width="150">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-if="isDisabl">
            <div class="footer1">
                 <!-- 切换到语音 -->
                <span v-if="!toggleState" @click="toggle">
                   <Icon type="md-mic"  size="30" color="rgb(204,204,204)"/>
                </span>
                <!-- 点击切换到输入文字  -->
                <span v-if="toggleState" @click="toggle">
                   <Icon type="ios-keypad" size="30" color="rgb(204,204,204)"/>
                </span>
                <!-- 输入文字 -->
                 <span v-if="!toggleState" class="inputbox" style="position:relative"> 
                     <input 
                      ref="input"
                      v-model="value" 
                      placeholder="" 
                      style=" vertical-align: middle;background:rgb(253,253,253);border:1px solid rgb(244,244,244);outline:none;-webkit-appearance: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" 
                      @blur.prevent="inputLoseFocus"
                      />
                     <button :style="{background:value?'rgb(0,200,171)':'rgb(204,204,204)'}" style="outline: none;background:rgb(0,200,171);position: absolute;top:2px;right:5px;color:rgb(255,255,255);height:35px;padding:2px;font-size:12px;border-radius:20px;border:none;width:60px;" @click="sendmsg('0',1)">发送</button>
                </span> 
                <!-- 录入语音 -->
                <input class="inputvoice"
                    value="按住说话"
                    type="button"
                    v-if="toggleState" 
                    @touchstart.prevent="startvoice" 
                    @touchend="endvoice" 
                    @touchmove.prevent='movedong'
                    style="height:40px; border:none;vertical-align: middle;display: inline-block; padding: 10px;border-radius:20px;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;"
                    :style="{background:bgacol}"
                 >
                <!-- 视频 -->
                <!-- <a >
                    <Icon type="ios-videocam-outline" size="30" color="rgb(204,204,204)"/>
                </a>  -->
                <!-- 上传图片 -->
                 <span @click="chooseimg">
                     <Icon type="md-image" size="30" color="rgb(204,204,204)"/>
                 </span>
            </div>
            <div class="cartoon" v-if="voiceCartoon">
                <div class="tu" v-if="!orEnd">
                    <img src="./../../../../common/imager/cartoon.png" alt="">
                    <img :src="img" alt="">
                </div>
                <div class="tu" v-if="orEnd">
                    <img src="./../../../../common/imager/quxiao.png" alt="">
                </div>
                <div class="shuoming" v-if="!orEnd">
                    手指上划取消发送
                </div>
                <div class="shuoming" v-if="orEnd">
                    松开手指取消发送
                </div>
            </div>
            
        </div>
        <Modal v-model="tishi"  title="提示信息" @on-ok="goHome" @on-cancel="goHome">
            <p>问诊结束</p>
        </Modal>
        <Modal v-model="xufei"  title="提示信息" @on-ok="gopayment" ok-text="续费">
            <p>剩余时间已不足三分钟，您是否需要续费？</p>
        </Modal>
        <audio ref="audio" src="" ></audio>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import {webSocket} from '@/Websocket/Websocket'
import wechatPay from "@/WXconfig/wechatPay"
import http from '@/utils/http';
import loading from "@/common/loading";
    export default {
        components: {
            loading
        },
        data() {
            return {
                xufei:false,
                //剩余时间
                tamaer:'',
                timer:'',
                isshowloading:false,
                comtent:[
                    {
                        identity:'2',
                        content:'你好',
                        type:'0'
                    },{
                        identity:'1',
                        content:'',
                        type:'0'
                    },{
                        identity:'2',
                        content:'',
                        type:'0'
                    },{
                        identity:'1',
                        content:'你好',
                        type:'0'
                    },
                    {
                        identity:'2',
                        content:'你好',
                        type:'0'
                    },{
                        identity:'1',
                        content:'',
                        type:'0'
                    },{
                        identity:'2',
                        content:'',
                        type:'0'
                    },{
                        identity:'1',
                        content:'',
                        type:'0'
                    },
                    {
                        identity:'2',
                        content:'你好',
                        type:'1'
                    },{
                        identity:'1',
                        content:'你好',
                        type:'0'
                    },{
                        identity:'2',
                        content:'你好',
                        type:'0'
                    },{
                        identity:'1',
                        content:'你好',
                        type:'0'
                    },
                ],
                // 切换文字或语音
                toggleState:false,
                value:'',
                bgacol:"rgb(244,244,244)",
                //发送语音动画
                voiceCartoon:false,
                img:require('./../../../../common/imager/dong_9.png'),
                temar:'',
                //手滑距离取消
                posMove:0,
                posStart:0,
                //是否取消
                orEnd:false,
                // 是否上传语音
                uploading:false,
                websocketobj:'',
                begin:false,
                cindex:'',
                END:'',
                START:'',
                name:'',
                orderNo:'',
                isDisabl:false,
                tishi:false,
                orer:false,
                jiezhenstate:2
            }
        },
        mounted() {
            var ele = document.getElementsByClassName("liao")[0];
            //判断元素是否出现了滚动条
            if(ele.scrollHeight > ele.clientHeight) {
                setTimeout(function(){
                    //设置滚动条到最底部
                    ele.scrollTop = ele.scrollHeight;
                    ele.style.opacity = 1;
                },500);
            }
            
        },
        created() {
            var that = this;
            that.orderNo = that.$route.query.orderNo;
            var orderStart = that.$route.query.orderStart;
            if(orderStart==2||orderStart==1){
                webSocket(that.orderNo,'1',that);
                that.isDisabl = true
            }else{
                that.isDisabl = false
            }
            that.name = localStorage.getItem('userZixunNmme');
            that.selectrecord()
        },
        methods: {
            //续费
            gopayment(){
                
                var that = this;
                var item =JSON.parse(localStorage.getItem('Itemprice')) 
                if(item.type==1){
                    localStorage.setItem("body", '图文续费');
                }else if(item.type==2){
                    localStorage.setItem("body", '咨询医生');
                }
                localStorage.setItem("price",item.total_fee);
                localStorage.setItem("tradeno", item.order_no);
                localStorage.setItem('zxType',item.type);
                localStorage.setItem('herf',window.location.href);
                that.$router.push("/payment"); //跳到支付页面
            },
            //问诊结束
            goHome(){
                this.$router.replace('/inquiryList');
            },
            playvoice(){
               
            },
            //查询聊天记录
            async selectrecord(){
                var that = this;
                var url = 'downLoad/getChatRecord';
                var data = {
                    orderNo:that.orderNo
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.comtent=res.data;
                }else{
                    that.comtent=[]
                }
            },
            //第一条播放
            firstbegin(index,item){
                // debugger
                var time = item.time;
                var daojis;
                this.begin=true;
                var yinpin = document.getElementsByClassName('comment');
                this.cindex = index;
                for(var i = 0;i<yinpin.length;i++){
                    if(i==index){
                        yinpin[i].className += ' begin';
                    }else{
                            yinpin[i].className = 'comment';
                    }
                }
                this.$refs.audio.src=item.content;
                this.$refs.audio.play();
                daojis = setInterval(() => {
                    if(time>0){
                        time --
                    }else{
                        var yinpin = document.getElementsByClassName('comment')[index];
                        yinpin.className = 'comment';
                        clearInterval(daojis);
                    }
                }, 1000);
            },
            //开始播放
            begins(index,item){
                
                if(!this.begin){
                    this.firstbegin(index,item)
                        
                }else if(this.begin){
                    this.begin=false;
                    if(this.cindex==index){
                        var yinpin = document.getElementsByClassName('comment')[index];
                        yinpin.className = 'comment';
                        this.$refs.audio.src=item.content;
                        this.$refs.audio.pause();
                    }else{
                        this.firstbegin(index,item);
                    }
                        
                }
                
            },
            //键盘弹出问题
            inputLoseFocus(){
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    }, 100);
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/inquiryList')
            },
            //切换键盘
            toggle(){
                this.toggleState=!this.toggleState
            },
            //发送消息
            sendmsg(type,content,time){
                var that = this;
                var json = {}
                var orderNo=that.orderNo;
                json.identity='1';
                json.orderNo=orderNo;
                if(type=='0'){
                    if(that.value.replace(/\s*/g,"")!=''){
                        json.type=type;
                        json.content=that.value;
                        json.time=0;
                    }else{
                        that.$Message.warning('不能发送空白消息');
                        return
                    }
                    
                }else if(type=='1'){
                    json.type=type;
                    json.content=content;
                    json.time=time;
                     console.log(time)
                }else if(type=='2'){
                    json.type=type;
                    json.content=content;
                    json.time=0;
                }
                that.websocketobj.send(JSON.stringify(json));
                var obj = {

                }
                if(type=='0'){
                    obj.content=that.value;
                    obj.identity='1';
                    obj.type='0';
                    obj.time=0;
                    that.value=''
                }else if(type == '1'){
                    obj.content=content;
                    obj.identity = '1';
                    obj.time=time;
                    obj.type= '1';
                }else if(type=='2'){
                    obj.content=content;
                    obj.identity = '1';
                    obj.time=0;
                    obj.type= '2';
                }
                that.comtent.push(obj)
                var ele = document.getElementsByClassName("liao")[0];
                //判断元素是否出现了滚动条
                if(ele.scrollHeight > ele.clientHeight) {
                    setTimeout(function(){
                        //设置滚动条到最底部
                        ele.scrollTop = ele.scrollHeight;
                    },500);
                }
            },
            //上传图片
            chooseimg(){
                var that = this;
                wechatPay.chooseimg().then(res=>{
                    that.downloadImage(res.serverId);
                })
            },
            //调用后台下载图片接口
            async downloadImage(serverId){
                var that  = this;
                var url = 'downLoad/downLoadFiles';
                //取到sreverId
                var data = {
                    serverId
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    console.log(res);
                    var imager  = res.data;
                    that.sendmsg('2',imager)
                }
            },
            //查看预览图片
            previewimage(item){
                var href = item.content;
                var imgArr=[]
                imgArr.push(href) 
                wechatPay.previewImage(item,imgArr);
                
            },
            //按住开始录音
            startvoice(value){
                var that = this;
                that.posStart = value.touches[0].pageY;//获取起点坐标
                that.voiceCartoon=true;
                var a=1
                that.temar = setInterval(() => {
                    if(a>=9){
                        a=1
                    }
                    that.img = require(`./../../../../common/imager/dong_${a++}.png`);
                    console.log('录音')
                }, 200);
                that.uploading=false;
                that.START = new Date().getTime();
                wechatPay.beginRecord();
                wechatPay.onVoiceRecordEnd(that).then(res=>{
                    //上传录音完毕拿到serverId调用后台下载录音接口
                    that.uploadVoice(res.serverId);
                })
            },
            //停止录音
            endvoice(){
                var that = this;
                clearInterval(that.temar);
                that.voiceCartoon=false;
                that.END = new Date().getTime();
                wechatPay.stopRecord(that).then (res=>{
                     //上传录音完毕拿到serverId调用后台下载录音接口
                     if((that.END - that.START) > 300){
                         that.uploadVoice(res.serverId);
                     }else{
                         that.$Message.warning('按键时间过短');
                     }
                    
                })
            },
            
            //调用后台下载录音接口
            async uploadVoice(serverId){
                var that  = this;
                var url = 'downLoad/downLoadVoice';
                //取到sreverId
                var data = {
                    serverId
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    console.log(res);
                    var time = res.data.time;
                    var resultPath = res.data.resultPath
                    that.sendmsg('1',resultPath,time)
                }
            },
            //移动取消
            movedong(value){
                // console.log(value)
                var that = this;
                that.posMove = value.targetTouches[0].pageY
                if (that.posStart - that.posMove < 200) {
                    console.log('继续')
                    that.orEnd=false;
                    that.uploading=false;
                } else {
                    console.log('取消')
                    clearInterval(that.temar);
                    that.orEnd=true;
                    that.uploading=true;
                }

            }
        },
        destroyed(){
            this.orer=true;
            this.websocketobj.close(); 
            clearInterval(this.tamaer)
        }
    }
</script>

<style scoped>
.inputvoice{
    flex: 1;
    
    margin: 0 10px;
}
.tittle {
  /* height: 50px; */
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  position: fixed;
  top: 0%;
  width: 100%;
  z-index: 999;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.nav{
    padding: 10px 0;
    text-align: center;
    background: rgba(0,0,0,0.5);
    font-size: 16px;
    color: #fff;
    position: fixed;
    top: 49px;
    left: 0;
    width: 100%;
    z-index: 999;

}
.comment img,.comment .text{
    display: inline-block;
    vertical-align: top;
} 
.text1 {
    position:relative;
    background:rgb(237,247,245);
    border-radius:20px; /* 圆角 */
    border-top-right-radius: 0px;
    margin: 0 1px;
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    padding:10px 5px;
    float: right;
    max-width: 50%;
    font-size: 16px;
}
.text{
    text-align: left;
    position:relative;
    background:rgb(240, 214, 214);
    border-radius:20px; /* 圆角 */
    border-top-left-radius: 0;
    /* margin:30px auto 0; */
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    max-width: 50%;
    padding:10px 5px;
    font-size: 16px;
}
.comment{
    overflow: hidden;
    margin: 21px 0;
}
.inputbox{
    flex: 1;
    margin: 0 5px;
}
.inputbox input{
    height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 10px;
    width: 100%;
}
.footer{
    width: 100%;
    bottom: 0;
    background: rgb(255, 255, 255);
    vertical-align:middle;
    position: fixed;
    bottom: 0;
    left: 0;
    
}
.footer1{
    text-align: center;
    margin: 10px 0;
    display: flex;
    align-items: center;
    
}
.content{
    flex:1;
    overflow: auto;
    padding: 80px 0 50px 0;
}
.tu{
    vertical-align: middle;
    display: inline-block;
}
.cartoon{
    background:rgba(0,0,0,0.5);
    display: inline-block;
    text-align: center;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    width: 160px;
    height: 160px;
    position: fixed;
    top: 45%;
    left: calc(50% - 80px);
}
.liao{
    opacity:0
}

.playing {
  /* background: rgba(255, 255, 255, 0.1); */
  width: 3rem;
  height: 3rem;
  border-radius: .3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: .5rem;
  box-sizing: border-box;
  position: absolute;
  top: -5px;
  left: 30%;
}
.begin .playing__bar {
  display: inline-block;
  background: #ccc;
  width: .5rem;
  height: 100%;
  -webkit-animation: up-and-down 1.3s ease infinite alternate;
    animation: up-and-down 1.3s ease infinite alternate;
}
.playing__bar1 {
    width: .5rem;
    background: #ccc;
  height: 60%;
}

.playing__bar2 {
    width: .5rem;
    background: #ccc;
    height: 30%;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
}

.playing__bar3 {
    width: .5rem;
    background: #ccc;
    height: 75%;
    -webkit-animation-delay: -3.7s;
    animation-delay: -3.7s;
}

@-webkit-keyframes up-and-down {
  10% {
    height: 30%;
  }
  30% {
    height: 100%;
  }
  60% {
    height: 50%;
  }
  80% {
    height: 75%;
  }
  100% {
    height: 20%;
  }
}

@keyframes up-and-down {
  10% {
    height: 30%;
  }
  30% {
    height: 100%;
  }
  60% {
    height: 50%;
  }
  80% {
    height: 75%;
  }
  100% {
    height: 20%;
  }
}
</style>