<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;background: rgb(250, 250, 250);" class="MyExamine">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
              评价内容
        </div>
        <div class="content">
                <div class="pingjia_conttent">
                    <div class="pingja_comm" v-for="(item,index) in evaluateList" :key="index">
                        <p style="display:inline-block;vertical-align: middle;color:black">{{item.name}}</p>
                        <div class="xing"  style="display:inline-block;vertical-align: middle;margin-left:10px;" >
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;"  v-if="item.evaluation_number>=2">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=3">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=4">
                            <img src="@/common/imager/09.png" alt="" width="20" style="display:inline-block;vertical-align: middle;" v-if="item.evaluation_number>=5">
                        </div>
                        <div class="neirong">
                            {{item.evaluation_content}}
                        </div>
                        <div class="pingjia_bottom">
                            <div v-if="item.type==1">
                                [图文问诊]
                            </div>
                            <div v-if="item.type==2">
                                [视频问诊]
                            </div>
                            <div>
                                {{item.created_at}}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
import http from '@/utils/http'
import loading from '@/common/loading'
    export default {
        components: {
            loading
        },
        data() {
            return {
                allYe:1,
                offset:1,
                evaluateList:[],
                isshowloading:false
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                this.$router.push('/docparticular')
            },
            //查询评价
            async evaluaList(){
                var that =this;
                var url = 'consultation/queryConsultEvalList';
                var doctor_id =localStorage.getItem('doctor_id');
                var limit=10;
                var offset = that.offset;
                var data = {
                    doctor_id,limit,offset
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data.content!=null){
                    if(res.data.total / 10 < 1){
                        that.allYe=1
                    }else{
                        that.allYe= parseInt(res.data.total / 10) + 1 
                    }
                    for(var i = 0;i<res.data.content.length;i++){
                        that.evaluateList.push(res.data.content[i]);
                    }
                }
            }
        },
        created() {
            this.evaluaList()
        },
        mounted(){
            var that  = this;
            const el = document.querySelector('.MyExamine');
            const offsetHeight = el.offsetHeight;
            setInterval(function(){
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                        if(that.offset<that.allYe){
                            that.offset+=1;
                            that.evaluaList();
                        }
                    }else{
                        
                    }
                }
            },1000)
        }
    }
</script>

<style scoped>
.tittle {
  /* height: 50px; */
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: fixed;
  width: 100%;
  top: 0;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content{
    padding: 0 5%;
    padding-top: 50px;
}
.pingjia_top {
    display: flex;
    padding: 10px 0;
}
.pingjia_top div{
    display: inline-block;
}
.pingjia_top div:nth-of-type(1){
    flex: 1;
}
.pingjia_top div:nth-of-type(1) span:nth-of-type(1){
    font-size: 18px;
    font-weight: 900;
}
.pingjia_top div:nth-of-type(2){
    line-height: 8.33333vw;
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
    background: PowDerBlue;
    margin:0 1%;
    border-radius: 20px;
}
.pingja_comm{
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
}
.pingja_comm p {
    font-size: 16px;
}
.neirong{
    padding: 5px 0;
}
.pingjia_bottom {
    display: flex;
    /* padding: 10px 0; */
    color: #ccc;
}
.pingjia_bottom div{
    display: inline-block;
}
.pingjia_bottom div:nth-of-type(1){
    flex: 1;
}
</style>