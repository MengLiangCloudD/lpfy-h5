<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             科室展示
        </div>
        <div class="list-content" v-if="visitlist.length>0">
            <div class="item-box" v-for="(item,index) in visitlist" :key="index">
                <div class="text-content">{{item.depname}}</div>
                <div size="large" class="switchopen" :class="{'activeswitchopen':item.status=='1'}" @click="ischangestate(item)">
                    {{item.status=='0'?"开启":"关闭"}}
                    <div class="circle" :class="{'activecircle':item.status=='1'}"></div>
                </div>
            </div>
        </div>
        <Modal
            v-model="infomodel"
            title="提示">
            <p>{{infomsg}}</p>
        </Modal>
        <!-- <Modal v-model="statemodel"  @on-ok="changestate" title="修改出诊时间">
             <div class="div">
                 <p  v-for="(item,index) in inplist" :key="index" @click="chenge(index)">
                     <input type="radio" name="paixu" :id="item.id" :value="item.value"  v-model="checIndex">
                    <label :for="item.id" style="cursor:pointer">{{item.lable}}</label>
                 </p>
            </div>
        </Modal> -->
        <Modal v-model="statemodel"  @on-ok="changestate" title="修改出诊时间">
            <p>请确认是否修改！</p>
        </Modal>
        <Modal v-model="tishi"  title="提示信息">
            <p>当前时间已经超出12:00:00，无法修改为上午</p>
        </Modal>
        <Modal v-model="tishi1"  title="提示信息">
            <p>为了您的方便,请在十二点之后再将其修改</p>
        </Modal>
        <loading v-show="isShowLoading"></loading>
    </div>
</template>

<script>
import loading from '@/common/loading'
import http from '@/utils/http';
var myDate = new Date();
var s = myDate.getHours();
if(s<10){
    s = '0' +  myDate.getHours();
}
var f = myDate.getMinutes(); 
var m = myDate.getSeconds();
var date =  s + ':' + f + ':' + m;
    export default {
        name:"doctorvisit",
        data(){
            return{
                visitlist:[],
                isShowLoading:false,
                infomodel:false,
                infomsg:"",
                statemodel:false,
                currentitem:{},
                checIndex:'',
                inplist:[{
                    value:0,
                    lable:'全天出诊',
                    id:'paixu1'
                },{
                    value:1,
                    lable:'上午出诊',
                    id:'paixu2'
                },{
                    value:2,
                    lable:'下午出诊',
                    id:'paixu3'
                },{
                    value:-1,
                    lable:'不出诊',
                    id:'paixu4'
                }],
                tishi:false,
                tishi1:false
            }
        },
        components:{
            loading
        },
        methods:{
            chenge(index){
                if(index==3){
                    this.checIndex=-1;
                }else{
                    this.checIndex=index;
                }
                
            },
            tobackdetail(){
                this.$router.push('/admin');
            },
            //查询医生是否出诊状态
           async fetchyscode(){
                let that=this
                let url="adminRefund/adminQueryAllDept";
                var data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.visitlist=[];
                    that.visitlist=res.data
                }else{
                    that.$Message.warning(res.errmsg);
                }
            },
            ischangestate(item){
                this.currentitem=item;
                
                this.statemodel=true;
            },
            async changestate(){
                let item=this.currentitem
                let that=this
                const depCode=item.depCode;
                var noon;
                let status;
                if(item.status==0){
                    status=1
                }else if(item.status==1){
                    status=0
                }
                var data = {
                    status,
                    depCode
                }
                let url="adminRefund/adminAdjustDeptList";
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.fetchyscode()
                }else{
                    that.$Message.warning(res.errmsg);
                }
            }
        },
        created(){
            let _this=this
            setTimeout(function(){
                _this.fetchyscode();
            },10)
            
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
.item-box{
    position: relative;
    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
}
.item-box .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
}
/* 开关 */
.switchopen{
  height: 25px;
  width: 70px;
  border-radius: 15px;
  background: #2d8cf0;
  line-height: 25px;
  font-size: 12px;
  text-align: left;
  padding: 0 10px;
  position: absolute;
  top: 12px;
  right: 10px;
  color: white;
}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right:4px;
}
.activecircle{
  left: 4px;
}
.activeswitchopen{
  text-align: right;
  background: rgb(160,165,170);
} 
.div p>input{
    display: none;
    
}
.div p>label{
    position: relative;
    margin-right: 34px;
    display: block;
    line-height: 2;
    
    font-size:16px;
}
.div p>label::before{
    display: inline-block;
    content: "";
    width: 5.26667vw;
    height: 5.26667vw;
    /* border-radius: 50%; */
    border: 1px solid rgb(219, 219, 219);
    margin-right: 6px;
    vertical-align: middle;
}
.div p>input:checked+label::before{
    background-color:#1989fa;
}
.div p>input:checked+label::after{
    display: inline-block;
    content: "";
    width: 2vw;
    height: 2vw;
    /* border-radius: 50%; */
    position: absolute;
    left: 1.7vw;
    bottom: 2.7vw;
    background-color: white;
    
}
</style>