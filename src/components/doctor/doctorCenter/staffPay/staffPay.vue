<template>
    <div class="qwer">
      <div class="titlei">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             职工薪资
        </div>
         <div class="xuanze"  style="position: relative;">
            <div style="display:inline-block;width:100%;">
              <span style="color:rgb(40, 184, 161);font-size:20px;" v-if="xiak">总计：{{payList['总计']}}</span><br>
              <span style="color:rgb(40, 184, 161);font-size:20px;"  v-if="!xiak">总计：</span><br>
              <el-date-picker
                  v-model="value1"
                  type="month"
                  style="width:35%; border:0; position: absolute;right: 5%;top: 7px;"
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
      <div class="content" v-if="xiak">
          <div class="monted">
            <p >
                <span>职员名称</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['职员名称']}}
                </span>
            </p>
            <p>
                <span>岗位工资</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['岗位工资']}}
                </span>
            </p>
            <p>
                <span>薪级工资</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['薪级工资']}}
                </span>
            </p>
            <p>
                <span>艰边补贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['艰边补贴']}}
                </span>
            </p>
            <p>
                <span>基础绩效工资</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['基础绩效工资']}}
                </span>
            </p>
            <p>
              <span>物业补贴</span>
              <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['物业补贴']}}
                </span>
            </p>
            <p>
                <span>特岗津贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['特岗津贴']}}
                </span>
            </p>
            <p>
                <span>加班补贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['加班补贴']}}
                </span>
            </p>
            <p>
                <span>夜班补贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                    {{payList['夜班补贴']}}
                </span>
            </p>
            <p>
                <span>下乡补贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['下乡补贴']}}
                </span>
            </p>
            <p>
                <span>基础工资小计</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['基础工资小计']}}
                </span>
            </p>
            <p>
                <span>工作数量奖金</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['工作数量奖金']}}
                </span>
            </p>
            <p>
                <span>工作质量奖金</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['工作质量奖金']}}
                </span>
            </p>
            <p>
                <span>岗位津贴</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['岗位津贴']}}
                </span>
            </p>
            <p>
                <span>参照扣除</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['参照扣除']}}
                </span>
            </p>
            <p>
                <span>科室消耗</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['科室消耗']}}
                </span>
            </p>
            <p>
              <span>绩效工资小计</span>
              <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['绩效工资小计']}}
                </span>
            </p>
            <p>
                <span>合计</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['合计']}}
                </span>
            </p>
            <p>
                <span>工会会费</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['工会会费']}}
                </span>
            </p>
            <p>
                <span>纳税</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['纳税']}}
                </span>
            </p>
            <p>
                <span>本月“三险二金”</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['本月“三险二金”']}}
                </span>
            </p>
            <p>
                <span>总计</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                  {{payList['总计']}}
                </span>
            </p>
        </div>
      </div>
      <div class="content" v-if="!xiak" style="text-align: center;font-size: 20px;padding-top: 39.66667vw;">
            暂无数据
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
                isshowloading:false,
                xiak:true
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
              this.$router.push('/Personalcenter')
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
                that.selectdoc()

            },
            //查询工资
            async selectdoc(){
              console.log("jmm")
              var that =this;
                var url = 'docPerCen/querySalary'
                var month =that.datatime(that.value1);
                var data ={
                  month
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0 &&res.data!=null){
                    that.payList=res.data
                   that.xiak=true;
                }else{
                  that.xiak=false;
                }
            },
         },
         created(){
           let that=this
         },
         mounted(){
           let that=this;
           that.selectdoc()
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
  padding: 10px 0 0 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 16px;
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
.monted{
    /* border-top: 1px solid #ddd; */
    padding-bottom: 50px;
    font-size: 14px;
}
.monted p{
     position: relative;
}
.monted p svg {
  vertical-align: middle;
}
.monted p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.monted p {
  padding: 15px 10% 15px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
}
</style>
