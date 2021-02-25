<template>
    <div style="overflow: auto;-webkit-overflow-scrolling: touch;width:100%;height: 100%;">
        <div class="titlei">
        <div class="title"><div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
        </div>住院清单</div>
        <div class="xuanze" style="position: relative;">
          <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;" >选择日期：</span>
          <!-- <span style="color:rgb(40, 184, 161);font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
          
          <el-date-picker
            v-model="value1"
            type="date"
            style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
            placeholder="选择日期"
            :editable="false"
            :clearable="true"
             size="small"
             @change="selectHospitalList"
            >
          </el-date-picker>
          </div>
        </div>
      </div>
      <div class="content">
            <div class="item" v-for="(item,index) in HospitalList" :key="index">
                <div class="left">
                    <p><span>项目名称：</span><span>{{item.ITEM_NAME}}</span></p>
                    <p><span>项目编码：</span><span>{{item.ITEM_CODE}}</span></p>
                    <p><span>项目类型：</span><span v-if="item.ITEM_CLASS=='C'">化验处方</span><span v-if="item.ITEM_CLASS=='D'">检查处方</span><span v-if="item.ITEM_CLASS=='A'||item.ITEM_CLASS=='B'">药品处方</span></p>
                    <p><span>项目数量：</span><span>{{item.AMOUNT}}</span></p>
                    <p><span>项目单位：</span><span>{{item.UNITS}}</span></p>
                    <p><span>项目价格：</span><span style="color:red">￥{{item.COSTS}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
//获取当前时间
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
//小于10加前面加0
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
//当前年月日
var time = year + "-" + month + "-" + day;
    export default {
        data() {
            return {
                HospitalList:[],
                value1:currentDay
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                this.$router.push('/Hospitalinformation');
            },
            //查询住院清单
            async selectHospitalList(){
                var that = this;
                var url = 'hospitalization/queryPatientList';
                var data = {
                    date:that.datatime(that.value1)
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&& res.data!=null){
                    that.HospitalList = res.data;
                }
            },
            //标准时间转换
            datatime(data) {
                var d = data;
                var y = this.p(d.getFullYear());
                var m = this.p(d.getMonth() + 1);
                var t = this.p(d.getDate());
                var resDate = y + "-" + m + "-" + t;

                return resDate;
            },
            //如果月份 或日期小于10 在其前面加0
            p(s) {
                return s < 10 ? "0" + s : s;
            },
        },
        created() {
            this.selectHospitalList()
        },
    }
</script>

<style scoped>
.title {
  background: rgb(40, 184, 161);
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
.titlei{
  position: fixed;
  width: 100%;
}
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.content{
    padding-top: 100px;
}
.item{
    /* display: flex; */
    padding: 10px 5%;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}
.item p{
    padding: 3px 5px;
}
.left{
    display: inline-block;
}
</style>