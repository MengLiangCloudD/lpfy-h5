<template>
    <div class="reportpage">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            {{title}}
        </div>
        <div class="content" v-if="title!=='病历'">
            <div class="item" v-for="(item,index) in listItem" :key="index">
                <div >
                    <div class="item_title">
                        <div class="titbiao"></div>
                        <div class="titxt">{{title}}</div>
                        <div  class="right" @click="showdetaillist(item)">
                            <span class="tit_right_txt">查看详情</span>
                            <img src="./../../../common/imager/fanhui.png"  class="tit_right_img" alt="">
                        </div>
                        
                    </div>
                    <div class="item_info">
                        <span>处方类型：</span>
                        <span>{{title}}处方</span>
                    </div>
                    <div class="item_info">
                        <span>就诊序号：</span>
                        <span>{{item.visitno}}</span>
                    </div> 
                    <div class="item_info">
                        <span>就诊时间：</span>
                        <span>{{item.list[0].visitdate}}</span>
                    </div>
                    <div class="item_info">
                        <span>检查地址：</span>
                        <span v-if="title!=='药品'">{{item.list[0].position}}</span>
                        <span v-else>一楼大厅药房</span>
                    </div>
                    <div class="item_info">
                        <span>合计金额：</span>
                        <span>￥{{sumprice(item.list)}}</span>
                    </div>
                </div>  
            </div>
        </div>
        <div class="content"  v-else>
            <div v-if="recordlist.length!==0">
                <div class="item">
                    <div>
                        <div class="item_title">
                            <div class="titbiao"></div>
                            <div class="titxt">{{title}}</div>
                        </div>
                        <div class="item_info" v-if="recordlist.visitdate!==undefined">
                            <span>就诊时间：</span>
                            <span>{{recordlist.visitdate}}处方</span>
                        </div>
                        <div class="item_info"  v-if="recordlist.visitno!==undefined">
                            <span>就诊序号：</span>
                            <span>{{recordlist.visitno}}</span>
                        </div> 
                        <div class="item_info" v-if="recordlist.doctor!==undefined">
                            <span>医生姓名：</span>
                            <span>{{recordlist.doctor}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.diagdesc!==undefined&&recordlist.diagdesc!==null">
                            <span>诊断结果：</span>
                            <span>{{recordlist.diagdesc}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.illnessdesc!==undefined&&recordlist.illnessdesc!==null">
                            <span>医生主诉：</span>
                            <span>{{recordlist.illnessdesc}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.advice!==undefined&&recordlist.advice!==null">
                            <span>医生建议：</span>
                            <span>{{recordlist.advice}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.memo!==undefined&&recordlist.memo!==null">
                            <span>医生备注：</span>
                            <span>{{recordlist.memo}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.maternity!==undefined&&recordlist.maternity!==null">
                            <span>婚孕历史：</span>
                            <span>{{recordlist.maternity}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.menses!==undefined&&recordlist.menses!==null">
                            <span>月经历史：</span>
                            <span>{{recordlist.menses}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.anamnesis!==undefined&&recordlist.anamnesis!==null">
                            <span>既往病史：</span>
                            <span>{{recordlist.anamnesis}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.individual!==undefined&&recordlist.individual!==null">
                            <span>个人病史：</span>
                            <span>{{recordlist.individual}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.familyill!==undefined&&recordlist.familyill!==null">
                            <span>家族病史：</span>
                            <span>{{recordlist.familyill}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.medhistory!==undefined&&recordlist.medhistory!==null">
                            <span>现在病史：</span>
                            <span>{{recordlist.medhistory}}</span>
                        </div>
                        <div class="item_info" v-if="recordlist.marrital!==undefined&&recordlist.marrital!==null">
                            <span>婚姻历史：</span>
                            <span>{{recordlist.marrital}}</span>
                        </div>
                    </div> 
                </div>
            </div>
                
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title:'',
                listItem:[],
                paymodellist:[],
                recordlist:{}
            }
        },
        created(){
            this.title = localStorage.getItem('itemListName');
            this.listItem = JSON.parse(localStorage.getItem('itemListItem'));
            this.recordlist = JSON.parse(localStorage.getItem('itemListItem'));
        },
        methods:{
            tobackdetail(){
                this.$router.push('/reportss');
            },
            //转换时间
            formatDate(now) { 
                  var year=now.getFullYear();//取得4位数的年份
                  var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                  var date=now.getDate();      //返回日期月份中的天数（1到31）
                  var hour=now.getHours();     //返回日期中的小时数（0到23）
                  var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                  var second=now.getSeconds(); //返回日期中的秒数（0到59）
                  return year+"-"+month+"-"+date; 
            },
            //计算已缴费总价
            sumprice(items){
              let sum=0
              for(let i=0;i<items.length;i++){
                sum+=items[i].costs
              }
              return sum.toFixed(2)
            },
            showdetaillist(item){
                localStorage.setItem("paymodellist",JSON.stringify(item.list));
                localStorage.setItem("itemListName",this.title);
                
                 this.$router.push('/detailinfo');
            }
        }
    }
</script>

<style scoped>
.reportpage{
    height: 100%;
   overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.title {
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
.content{
    position: absolute;
    width: 100%;
    height: calc(100% - 50px);
    background: rgb(238,238,238);
     overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.item{
    width: 90%;
    background: #fff;
    margin: 10px auto;
    padding: 10px;
    font-size: 14px;
    border-radius: 3px;
    margin-bottom: 10px;
}
.item_info{
    margin-left: 10px;
    line-height: 22px;
}

.item_title{
    position: relative;
    margin-bottom: 10px;
}
.titbiao{
    width: 3px;
    height: 15px;
    background: #28b8a1;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.titxt{
    display: inline-block;
    vertical-align: middle;
}
.right{
position: absolute;
    right: 0;
    top: 0;
}
.tit_right_txt{
display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    margin-right: 5px;
}
.tit_right_img{
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 15px;
}
</style>