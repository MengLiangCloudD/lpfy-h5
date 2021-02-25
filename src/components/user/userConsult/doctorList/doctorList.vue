<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             {{class_name}}医生列表
        </div>
         <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">选择医生</p>
        <div class="content">
            <div class="content2">
                <div class="docctor" v-for="(item,index) in docList" :key="index"  @click="goDocparticular(item)">
                    <div style="flex:1">
                        <img :src="item.head_image" alt=""  style="width:60px;height:60px;border-radius: 50%;" v-if="item.head_image!=undefined&&item.head_image!=''">
                        <img src="@/common/imager/avatar.png" alt=""  style="width:60px;height:60px;border-radius: 50%;" v-else>
                    </div> 
                    
                    <div class="docxiang">
                        <div class="docNmae">
                            <p>{{item.name}}</p>
                            <p>{{item.title}}</p>
                             <p >
                                <!-- <img src="@/common/imager/zan.png" alt="" width="20" style="vertical-align: middle;"> -->
                                <!-- <span class="baifen">99%</span> -->
                            </p>
                        </div>
                        <div class="yuan">
                            <p>滦平县妇幼保健院</p>
                            <p>{{item.dept_name}}</p>
                        </div>
                        <div class="shanchang">
                            <p style="width:285px;">擅长：{{item.good_at}}</p>
                            <!-- <p>擅长：呼吸系统疾病、消化系统疾病、新生儿黄疸、过敏性疾病、手足口病、疱疹性口炎、疱疹性咽峡炎、猩红热、川崎病、传单等</p> -->
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
        <tabbar class="pubtabbar"></tabbar>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
import tabbar from "@/common/tabbar";
import http from '@/utils/http'
import loading from '@/common/loading'
    export default {
        components:{
            tabbar,
            loading
        },
        data() {
            return {
                docList:[],
                class_name:'',
                isshowloading:false
            }
        },
        methods: {
            //进入医生介绍页
            goDocparticular(item){
                //存储医生id
                localStorage.setItem('doctorCode',item.user_name);
                localStorage.setItem('doctor_id',item.doctor_id);
                this.$router.push('/docparticular');
            },
             //返回上一层
            tobackdetail(){
                this.$router.push('/ConsultHome')
            },
            //查询医生接口
            async selectdoc(){
                 var that = this;
                 var deptCode = localStorage.getItem('class_id');
                var url  = 'consultation/queryDoctorsByDeptCode';

                var data={
                    deptCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.docList=res.data;
                }else{
                    that.docList=[]
                }
            },
        },
        created() {
            this.selectdoc();
            this.class_name=localStorage.getItem('class_name');
            
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
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.content{
    padding: 0 0 50px 0;
}
.docxiang{
    width: calc(100% - 60px);
    display: inline-block;
    vertical-align: top;
}
.baifen{
    color:#FF7F00;
    font-size:17px;
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
}
.docNmae p,.yuan p{
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
}
.docNmae p:nth-of-type(1){
     margin-left: 15px;
    font-size: 18px;
    font-weight: 700;
}
.docNmae p:nth-of-type(2){
    font-size: 18px;
    font-weight: 700;
}
.yuan p:nth-of-type(1){
     margin-left: 15px;
    font-size: 16px;
    color: black;
}
.yuan p:nth-of-type(1){
    font-size: 16px;
    color: black;
}
.yuan p:nth-of-type(2){
    font-size: 16px;
    color: black;
}
.shanchang{
    margin: 3px;
      margin-left: 15px;
      font-size: 16px;
      
}
.shanchang p{
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.docctor{
    padding: 10px 5%;
    border-bottom: 1px solid #eee;
    display: flex;
}
.docNmae p,.yuan p{
    display: inline-block;
    vertical-align: middle;
    margin: 2px;
}
.docNmae p:nth-of-type(1){
     margin-left: 15px;
    font-size: 18px;
    font-weight: 700;
}
.docNmae p:nth-of-type(2){
    font-size: 18px;
    
    font-weight: 700;
}
</style>