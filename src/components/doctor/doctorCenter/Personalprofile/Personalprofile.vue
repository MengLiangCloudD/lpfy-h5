<template>
    <div style="height:100%;overflow: auto;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             个人中心
        </div>
        <div class="content" v-for="(item,index) in docxiang" :key="index">
            <p style=" padding: 10px 10% 10px 5%;" @click="ReplacePicture()">
                <span style="line-height: 50px;">更换头像</span>
                <span>
                    <img :src="imager" alt="" width="50" height="60" style="display: inline-block;vertical-align: middle;border-radius: 50%">
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span>医生姓名</span>
                <span>{{item.name}}</span>
            </p>
            <p @click="goMaxCard">
                <span>二维码名片</span>
                <span><svg t="1565246373675" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6630" width="20" height="20"><path d="M424.3 426.8V101.4H99v325.4h59.2V486h59.2v-59.2h206.9z m-266.2-59.2v-207h207v207h-207z" fill="#00BBBB" p-id="6631"></path><path d="M217.3 219.7H306v88.7h-88.7v-88.7z m384.5-118.3v325.4h325.4V101.4H601.8zM868 367.6H661v-207h207v207z" fill="#00BBBB" p-id="6632"></path><path d="M720.1 219.7h88.7v88.7h-88.7v-88.7zM99 485.9h59.2v59.2H99v-59.2z m118.3 0h59.2v59.2h-59.2v-59.2z" fill="#00BBBB" p-id="6633"></path><path d="M276.4 604.2H99v325.4h325.4V604.2h-88.7V545h-59.2v59.2z m88.8 59.2v207h-207v-207h207z" fill="#00BBBB" p-id="6634"></path><path d="M217.3 722.5H306v88.7h-88.7v-88.7zM483.5 131h59.2v88.7h-59.2V131z m0 147.9h59.2V338h-59.2v-59.1z m0 118.3h59.2v88.7h-59.2v-88.7z m-147.9 88.7h147.9v59.2H335.6v-59.2z m382.9-3.8c-132.1 0-239.1 107-239.1 239.1s107 239.1 239.1 239.1 239.1-107 239.1-239.1-107-239.1-239.1-239.1z m138.2 337.2c0 35.7-68.4 43.8-132.6 43.8s-133.4-8.2-133.4-43.8v-9.9c0-26.3 47.3-52.9 87.5-67.3 3-1 16.9-8.7 9-29.1-20-20.4-35-53.4-35-85.9 0-49.8 32.9-75.9 71.5-75.9 38.5 0 71.7 26.1 71.7 75.9 0 32.4-15.1 65.2-35 85.8h0.2c-7.7 23.1 4.5 28.7 6.4 29.2 42.3 13.9 89.8 40.4 89.8 67.3l-0.1 9.9z m28.8-99.8h-26.2l0.1 26c0 7-5.9 12.6-13.2 12.6-7.3 0-13.2-5.6-13.2-12.6v-26.1h-26.6c-7.3 0-13.2-5.6-13.2-12.6s5.9-12.2 13.2-12.2l26.7-0.1v-25.7c0-7 5.9-12.6 13.2-12.6 7.3 0 12.8 5.6 12.8 12.6l0.1 25.7 26.3-0.1c7.3 0 13.2 5.6 13.2 12.6-0.1 6.9-6 12.5-13.2 12.5z" fill="#00BBBB" p-id="6635"></path></svg> </span>
                <span>
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span>医生编码</span>
                <span>{{item.username}}</span>
            </p>
            <p>
                <span>医生职位</span>
                <span>{{item.job}}</span>
            </p>
            <p>
                <span>医生职称</span>
                <span>{{item.title}}</span>
            </p>
            <p>
                <span >医生简介</span>
                <span style="width:75%; text-align: right;" @click="gomodal11">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.expertjob}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>
            </p>
            <p >
               <span >图文价格</span>
                <span style="width:75%; text-align: right;" @click="updatePrice(1)">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">￥{{tuPrice}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>  
            </p>
            <p>
               <span >视频价格</span>
                <span style="width:75%; text-align: right;" @click="updatePrice(2)">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">￥{{videoPrice}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>  
            </p>
            <p>
               <span >图文出诊</span>
                <span style="width:75%; text-align: right;" >
                    <span class="text" style="width:80%; text-alsign: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        <Switchs size="large" v-model="SwitText" @on-change="uptadeSwitchText">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </Switchs>
                    </span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>  
            </p>
            <p>
               <span >视频出诊</span>
                <span style="width:75%; text-align: right;" >
                    <span class="text" style="width:80%; text-alsign: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        <Switchs size="large" v-model="SwitVideo" @on-change="uptadeSwitchVideo">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </Switchs>
                    </span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>  
            </p>
            <p>
               <span>接诊时间</span>
                <span style="width:75%; text-align: right;" @click="updatePrice(3)">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{register_interval_time}}分钟</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>  
            </p>
            <Modal v-model="modal11" fullscreen title="个人简介"  @on-ok="tomodify()">
                <div>
                     <Input v-model="value8" @input="descInput" :maxlength="300" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="个人简介"/>
                      <p class="numberV" style="text-align:right;width:100%">{{txtVal}}/300</p>
                </div>
            </Modal>
            <Modal v-model="modal10" fullscreen title="修改价格"  @on-ok="updatesprices(1)">
                <div>
                      <Input v-model="value1"/>
                </div>
            </Modal>
            <Modal v-model="modal12" fullscreen title="修改价格"  @on-ok="updatesprices(2)">
                <div>
                      <Input v-model="value2"/>time
                </div>
            </Modal>
            <Modal v-model="modal13" fullscreen title="修改时间"  @on-ok="updatetime()">
                <div>
                      <Input v-model="value3" type="number"/>
                </div>
            </Modal>
        </div>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
import http from '@/utils/http'
import wechatPay from "@/WXconfig/wechatPay"
import loading from "@/common/loading";
    export default {
        name:'Personalprofile',
        components: {
            loading,
        },
        data(){
            return {
                modal11:false,
                modal10:false,
                modal12:false,
                //医生简介
                value8:'',
                txtVal:0,
                //医生详细信息
                docxiang:[],
                //图文费用
                tuPrice:'',
                //视频费用
                videoPrice:'',
                value1:'',
                value2:'',
                isshowloading:false,
                imager:'',
                SwitText:'',
                SwitVideo:'',
                value3:'',
                modal13:false,
                register_interval_time:''
            }
        },
        mounted(){
            let that=this
            //获取医生详情
            this.doctorxinxi();
            this.selectprice();

        },
        methods:{
            async updatetime(){
                var that = this
                var url = 'docDeta/updateIntervalTime'
                var data = {
                    register_interval_time:that.value3
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.selectprice()
                }
            },
            updatePrice(index){
                var that = this
                if(index==1){
                    that.modal10= true;
                }else if(index==2){
                    that.modal12=true;
                }   else if(index==3){
                    that.modal13=true;
                }
                
            },
            //小数点后两位
             changeTwoDecimal_f(x) { 
                　　var f_x = parseFloat(x); 
                　　if (isNaN(f_x)) 
                　　{ 
                　　　　return 0; 
                　　} 
                　　var f_x = Math.round(x*100)/100; 
                　　var s_x = f_x.toString(); 
                　　var pos_decimal = s_x.indexOf('.'); 
                　　if (pos_decimal < 0) 
                　　{ 
                　　　　pos_decimal = s_x.length; 
                　　s_x += '.'; 
                　　} 
                　　while (s_x.length <= pos_decimal + 2) 
                　　{ 
                　　　　s_x += '0'; 
                　　} 
                　　return s_x; 
            },
            //修改价格
            async updatesprices(index){
                var that = this;
                var url = 'consultation/editDoctorConsultPrice';
                var type
                var price
                if(index==1){
                    type=1;
                    price=that.changeTwoDecimal_f(that.value1);
                }else if(index==2){
                    type=2
                    price=that.changeTwoDecimal_f(that.value2);
                }
                var data = {
                    type,price
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.selectprice()
                }
            },
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //修改个人简介
            gomodal11(){
                this.modal11=true;
                var text = document.getElementsByClassName('text')[0]
                
               this.value8= text.innerHTML;
                // this.value8 = $('.text').html();
                this.txtVal = this.value8.length;
            },
            //我的二维码
            goMaxCard(){
                this.$router.push('/MaxCard');
            },
             //修改个人简介
            async tomodify(){
                var that = this;
                var url = "docPerCen/updateDoctorExpertJob";
                //修改内容
                var expertJob = that.value8;
                var data={
                    expertJob
                }
                if(that.value8!=that.docxiang[0].expertjob){
                     var res  = await http.post(that,url,data);
                     if(res.errcode==0){
                         that.$Message.info('修改成功！')
                         var text = document.getElementsByClassName('text')[0];
                         text.innerHTML=that.value8;
                        that.docxiang[0].expertjob=that.value8;
                     }else{
                         that.$Message.warning(res.errmsg);
                     }
                }
               
            },
            //限制字数
            descInput() {
                this.txtVal = this.value8.length;
            },
            //查询医生详细信息
             //查询医生详细信息
            async doctorxinxi(){
                var that = this;
                var url ="docPerCen/queryDoctorInfo";
                var data ={
                   
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.docxiang=res.data;
                    localStorage.setItem('ysdoccode',res.data[0].doctorno);
                    localStorage.setItem('ysdocname',res.data[0].name);
                    that.imager  = res.data[0].head_image;
                    if(res.data[0].expertjob==undefined||res.data[0].expertjob==null){
                        that.docxiang[0].expertjob='无'
                    }
                }
            },
            //查询咨询价格
            async selectprice(){
                var that = this;
                var url  = 'downLoad/doctorQueryPrice'
                var data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    that.tuPrice =that.changeTwoDecimal_f(res.data.graphic_consultation_price);
                    that.value1 = that.changeTwoDecimal_f(res.data.graphic_consultation_price);
                    that.videoPrice = that.changeTwoDecimal_f(res.data.consult_price);
                    that.value2 =  that.changeTwoDecimal_f(res.data.consult_price);
                    that.value3=res.data.register_interval_time
                    that.register_interval_time=res.data.register_interval_time
                    if(res.data.consult_status==1){
                        that.SwitVideo=false
                    }else if(res.data.consult_status==0){
                        that.SwitVideo=true
                    }
                    if(res.data.graphic_status==1){
                        that.SwitText=false
                    }else if(res.data.graphic_status==0){
                        that.SwitText=true
                    }
                }
            },
            //上传头像
            ReplacePicture(){
                var that = this;
                wechatPay.chooseimg().then(res=>{
                    that.downloadImage(res.serverId)
                })
            },
            //调用后台下载图片接口
            async downloadImage(serverId){
                var that  = this;
                var url = 'docPerCen/editDoctorHeadImage';
                //取到sreverId
                var data = {
                    serverId
                }
                
                var res = await http.post(that,url,data);
                console.log(res)
                if(res.errcode==0){
                    that.imager  = res.data;
                }
            },
            //修改出诊状态
            async uptadeSwitchText(value){
                var that = this;
                var url = 'consultation/doctorUpdateGraphicStatus';
                var status
                if(that.SwitText==true){
                    status=0
                }else if(that.SwitText==false){
                    status=1
                }
                var data ={
                    status
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$Message.success('操作成功')
                }else{
                    that.selectprice();
                }
            },
            //修改出诊状态
            async uptadeSwitchVideo(value){
                var that = this;
                var url = 'consultation/doctorUpdateConsultStatus';
                var status
                if(that.SwitVideo==true){
                    status=0
                }else if(that.SwitVideo==false){
                    status=1
                }
                var data ={
                    status
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$Message.success('操作成功')
                }else{
                    that.selectprice();
                }
            }
        }
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
.content{
    padding-bottom: 50px;
    font-size: 14px;
}
.content p{
     position: relative;
}
.content p svg {
  vertical-align: middle;
}
.content p span:nth-child(1) {
    flex:1;
}
.content p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.content p {
  padding: 16px 10% 16px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
  display: flex;
}
</style>