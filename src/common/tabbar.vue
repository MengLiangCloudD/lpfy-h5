<template>
    <div class="tabbar">
        <div class="tabitem" :class="{active:currentindex==0}" @click="getpath(0)">
            <img src="./imager/guanwang.png" alt="" class="tubiao" v-if="currentindex==0">
            <img src="./imager/guanwang1.png" alt="" v-else class="tubiao">
            <div class="text" >官网</div>
        </div>
        <div class="tabitem" :class="{active:currentindex==1}" @click.stop="getpath(1)">
            <Badge :count="num" :offset="[10,25]" :overflow-count="99">
                <a href="#" class="demo-badge" style="position: absolute;">
                </a>
            </Badge>
            <img src="./imager/daozhen.png" alt="" class="tubiao" v-if="currentindex==1">
            <img src="./imager/daozhen1.png" alt="" v-else class="tubiao">
            <div class="text">导诊</div>
        </div>
        <div class="tabitem" :class="{active:currentindex==2}" @click.stop="getpath(2)" style="position: relative;">
           
           
            <img src="./imager/zhaoyi.png" alt="" class="tubiao" v-if="currentindex==2">
            <img src="./imager/zhaoyi1.png" alt="" v-else class="tubiao">
            <div class="text">找医生</div>
        </div>
        <div class="tabitem" :class="{active:currentindex==3}" @click.stop="getpath(3)">
            <img src="./imager/wode.png" alt="" v-if="currentindex==3" class="tubiao">
            <img src="./imager/wode1.png" alt="" v-else class="tubiao">
            <div class="text">我的</div>
        </div>
        <Modal v-model="statemodel" title="提示">
        <div class="div">
            该功能暂未开通
        </div>
      </Modal>
    </div>
</template>

<script>
import wechatPay from "@/WXconfig/wechatPay"
import http from '@/utils/http'
    export default {
        data() {
            return {
                currentindex: 2,
                statemodel:false,
                num:0
            }
        },
        methods: {
            //判断选中的是哪一个
            getpath(index) {
                if (index == 0) {
                    // this.$Message.warning('暂未开通该功能');
                    this.$router.push("/ConsultHome");
                } else if (index == 1) {
                    this.$router.push("/reportss");
                } else if (index == 2) {
                    // this.statemodel=true;
                    // this.$Message.warning('暂未开通该功能');
                    this.$router.push("/home");
                } else if (index == 3) {
                    this.$router.push("/HomePage");
                }
            },
            //查询未缴费信息
            async selectNoprice(){
                var that = this;
                var url = 'patTreat/queryNoPayCount'
                var data = {

                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    if(location.hash.indexOf('reportss')!=-1){
                        that.num = 0
                    }else{
                        that.num = res.data;
                    }
                    
                }
            }
        },
        created() {
            //禁止分享按钮
            wechatPay.hideAllNonBaseMenuItem();
            if(location.hash.indexOf('ConsultHome')!=-1){
                this.currentindex=0
            }
            if(location.hash.indexOf('reportss')!=-1){
                this.currentindex=1
            }
            if(location.hash.indexOf('HomePage')!=-1||location.hash.indexOf('MyCard')!=-1||location.hash.indexOf('GuaorderList')!=-1||location.hash.indexOf('Mycase')!=-1||location.hash.indexOf('Myprescription')!=-1||location.hash.indexOf('Myincidentals')!=-1||location.hash.indexOf('Laboratorys')!=-1||location.hash.indexOf('Mycure')!=-1||location.hash.indexOf('MyExamine')!=-1||location.hash.indexOf('Myassay')!=-1||location.hash.indexOf('myCollect')!=-1||location.hash.indexOf('inquiryList')!=-1 ){
                this.currentindex=3
            }
            if(location.hash.indexOf('home')!=-1){
                this.currentindex=2
            }if(location.hash.indexOf('doctorList')!=-1||location.hash.indexOf('docparticular')!=-1||location.hash.indexOf('userNewList')!=-1){
                this.currentindex=2
            }
            var that = this;
            var timer = setInterval(() => {
                if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
                    clearInterval(timer);
                    that.selectNoprice()
                }
                
            }, 500);
            
        },
    }
</script>

<style  scoped>
.tabbar {
  width: 100%;
  height: 50px;
  display: flex;
  background:#fff;
  z-index: 1001;
}
.tabitem {
  padding-top: 5px;
  color: rgb(154,154,154);
  text-align: center;
  flex: 1;
  /* display: flex; */
  flex-direction: column;
}
.text {
  font-size: 14px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* display: inline-block; */
}
.tabicon {
  font-size: 20px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.active {
  color: rgb(40,186,161);
}
.tubiao{
    height:22px;
}
</style>