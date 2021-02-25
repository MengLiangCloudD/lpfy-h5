<template>
    <div class="qwer">
      <div class="titlei">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             收入明细
        </div>
         <div class="xuanze"  style="position: relative;">
            <div style="display:inline-block;width:100%">
            <span style="color:rgb(40, 184, 161);font-size:16px;">总收入：￥{{tong.money}}</span><br>
            <span style="color:rgb(40, 184, 161);font-size:16px;">共计：{{tong.counts}}笔</span>
            <el-date-picker
                v-model="value1"
                type="month"
                style="width:30%; border:0; position: absolute;right: 5%;top: 15px;"
                placeholder="选择月份"
                :editable="false"
                :clearable="false"
                size="small"
                @change="selecttime()"
                >
            </el-date-picker>
          </div>
          <!-- <p style="margin-left: 5%;color:#aaa">总收入：￥3704.15</p> -->
        </div>
      </div>
      <div class="content">
        <div class="contenter" v-for="(item,index) in payList" :key="index">
          <div class="shou">
             <img class="avatar" src="./../../../common/imager/xian.png" alt="" width="40px;"  >
             <div class="xinxi">
                <p style="font-size:16px;font-weight: 500;">来自{{item.name}}挂号费用</p>
            </div>
            <div style="position: absolute;right:5%;font-size:16px;color:#F4A460;">
              ￥{{item.money}}
            </div>
          </div>
        </div>
        <p v-if="xian" style="padding:10px 0; text-align: center;font-size:16px;color:#ccc">到底了</p>
      </div>
      <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import loading from "@/common/loading";
import http from '@/utils/http'
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+ mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
    export default {
      components: {
        //加载动画
        loading
      },
        data(){
            return {
                value1:currentDay,
                payList:[],
                selectery:'',
                depcode:'',
                tong:{},
                limit:15,
                isshowloading:false,
                offset:1,
                allYe:1,
                xian:false
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               var herf = localStorage.getItem('herf');
              window.location.href=herf;
            },
            //标准时间转换
            datatime(data) {
              var d = data;
              var y = this.p(d.getFullYear());
              var m = this.p(d.getMonth() + 1);
              var t = this.p(d.getDate());
              var resDate = y + "-" + m;
              return resDate;
            },
            p(s) {
              return s < 10 ? "0" + s : s;
            },
            //日期筛选
            selecttime(){
              var that =this;
              that.payList=[];
              that.offset=1;
              that.xian=false
              if(that.selectery==1){
                that.selectke()
              }else if(that.selectery==2){
                that.selectdoc()
              }else if(that.selectery==0){
                that.selectyuan()
              }
                
            },
            //查询科室
            async selectke(){
               var that =this;
                var url = 'adminRefund/deptRegisterList'
                var deptCode = that.depcode;
                var date =that.datatime(that.value1);
                var limit = that.limit;
                var offset = that.offset;
                var data ={
                  limit:10,offset,date,deptCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0 &&res.data.content!=null){
                  if(res.data.total / 10 < 1){
                    that.allYe=1
                  }else{
                  that.allYe= parseInt(res.data.total / 10) + 1 
                  }
                  that.tong=res.data.clinicTotal;
                  for(var i = 0;i<res.data.content.length;i++){
                    that.payList.push(res.data.content[i]);
                  }
                  
                }
            },
            //查询医生
            async selectdoc(){
              var that =this;
                var url = 'adminRefund/doctorRegisterList'
                var doctorCode = that.depcode;
                var date =that.datatime(that.value1);
                var limit = that.limit;
                var offset = that.offset;
                var data ={
                  limit:10,offset,date,doctorCode
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0 &&res.data.content!=null){
                  if(res.data.total / 10 < 1){
                    that.allYe=1
                  }else{
                  that.allYe= parseInt(res.data.total / 10) + 1 
                  }
                  that.tong=res.data.clinicTotal;
                  for(var i = 0;i<res.data.content.length;i++){
                    that.payList.push(res.data.content[i]);
                  }
                  
                }
            },
            //查询医院
            async selectyuan(){
              var that =this;
                var url = 'adminRefund/hospitalRegisterList'
                var date =that.datatime(that.value1);
                var limit = that.limit;
                var offset = that.offset;
                var data ={
                  limit:10,offset,date
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0 &&res.data.content!=null){
                  if(res.data.total / 10 < 1){
                    that.allYe=1
                  }else{
                  that.allYe= parseInt(res.data.total / 10) + 1 
                  }
                  that.tong=res.data.clinicTotal;
                  for(var i = 0;i<res.data.content.length;i++){
                    that.payList.push(res.data.content[i]);
                  }
                  
                }

                // $.ajax({
                //     url: url,
                //     type: "post",
                //     dataType: "json",
                //     timeout: 15000, //通过timeout属性，设置超时时间
                //     data: {month,size},
                //     success:function(data){
                //       that.isshowloading=false;
                //       if(data.code==200){
                //         that.payList=data.data.clinicInfoList;
                //         that.tong=data.data.clinicTotal;
                //       }
                //     },
                //     error:function(data){
                //       that.isshowloading=false;
                //     }
                // })
            },
         },
         created(){
           let that=this
         },
         mounted(){
           let that=this;
           that.selectery=that.$route.query.selectery;
           that.depcode=that.$route.query.depcode;
           const el = document.querySelector('.qwer');
            const offsetHeight = el.offsetHeight;
            setInterval(function(){
              el.onscroll = () => {
                const scrollTop = el.scrollTop;
                const scrollHeight = el.scrollHeight;
                if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                    //每次滚动到底部size+10
                    //每次滚动到底部size+10
                  if(that.offset<that.allYe){
                      that.offset+=1;
                      if(that.selectery==1){
                        that.selectke()
                      }else if(that.selectery==2){
                        that.selectdoc()
                      }else if(that.selectery==0){
                          that.selectyuan();
                      }
                  }else if(that.offset>=that.allYe){
                    that.xian=true;
                  } 
                }else{
                  that.xian=false;
                }
              }
            },1000)
           if(that.selectery==1){
             that.selectke()
           }else if(that.selectery==2){
             that.selectdoc()
           }else if(that.selectery==0){
              that.selectyuan();
           }
         }
    }
</script>

<style scoped>
.qwer{
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
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
.xuanze {
  width: 100%;
  padding: 2vw 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 14px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 999;
}
.content{
  padding-top: 100px;
}
.contenter{
    position: relative;
    
}
.shou{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 10.33333vw 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(230, 230, 230);
  position: relative;
  
}
.xinxi{
  /* font-size: 13px; */
  /* font-weight: bold; */
  margin: 0px 5px 0 20px;
}
.xinxi{
  display: inline-block;
}
.xinxi p{
  line-height:2;
}
</style>