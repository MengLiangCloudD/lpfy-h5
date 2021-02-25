<template>
    <div class="settingup">
        <div class="titlei" >
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            {{title}}
          </div>
        </div>
        
        <div class="content">
           <div class="content1">
                <div class="Patient1" style="text-align: center;" v-for="(item,index) in imagers" :key="index" >
                    <img :src="item" alt="" width="100%" @click="previewimage(item)">
                </div>
            </div>
           <div class="content1" v-if="type==1">
                <div class="Patient1" style="text-align: center;" @click="shngchua">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加图片</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wechatPay from "@/WXconfig/wechatPay"
import http from '@/utils/http';
    export default {
        data() {
                return {
                    imagers:[],
                    type:'',
                    title:'',
                }
            },
        methods:{         
            //返回上一层
            tobackdetail(){
                history.go(-1)
            },
            shngchua(){
                 var that = this;
                wechatPay.chooseimg().then(res=>{
                    that.downloadImage(res.serverId)
                })
            },
            //调用后台下载图片接口
            async downloadImage(serverId){
                var that  = this;
                var url = 'downLoad/xcxDownLoadFiles';
                var orderNo = localStorage.getItem('zixunOrdeno');
                //取到sreverId
                var data = {
                    serverId,
                    orderNo
                }
                
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.imagers.push(res.data);
                    // that.imager  = res.data;
                }
            },
            //查看预览图片
            previewimage(item){
                var href = item;  
                var imgArr=[]
                imgArr.push(href) 
                wechatPay.previewImage(item,imgArr);
                
            },
            //查询图片
            async selectImg(){
                var that = this;
                var url = 'downLoad/xcxCheckImages';
                var orderNo = localStorage.getItem('zixunOrdeno');
                var data  = {
                    orderNo
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.imagers=res.data;
                }
            }
        },
        created() {
            this.type=this.$route.query.type;
            if(this.type==1){
                this.title='上传给医生';
            }else if(this.type==2){
                this.title='患者资料';
            }
            this.selectImg()
        },
    }
</script>

<style scoped>
.settingup{
    height:100%;
    overflow: auto;
}
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
.content1{
    text-align: center;
    padding-bottom: 20px;
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    position: relative;
    margin-top: 15px;
}
.Patient1 p{
    line-height: 1;
    
}
.Patient3 p{
    line-height: 1;
    
}
.Patient3{
   width: 100%;
   height: 100%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    /* margin-top: 15px;  */
    color:#fff;
}
.content{
    padding-top: 100px;
}
.content p{
    padding: 10px;
    font-size:18px;
}
.contenter p{
    padding: 10px;
    font-size:18px;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #bbb
}
</style>