<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            患者权限管理
          </div>
        </div>
        <div class="text">
            <div class="list-content" v-if="deptorList.length>0">
                <div class="item-box" v-for="(item,index) in deptorList" :key="index">
                    <div class="text-content">{{item.deptName}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen':item.patientReport=='1'}" @click="ischangestates(item)">
                        {{item.patientReport=='0'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':item.patientReport=='1'}"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="text" v-if="adminLevel>1&&adminLevel<4">
            <div class="list-content" >
                <div class="item-box" style="background:#00bbbb;color:#fff;border:0">
                    <div class="text-content">{{biao}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen' :allswites=='0'}" @click="ischangestates()">
                        {{allswites=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':allswites=='0'}"></div>
                    </div>
                </div>
            </div>
            <div class="list-content" v-if="doctorList.length>0">
                <div class="item-box" v-for="(item,index) in doctorList" :key="index">
                    <div class="text-content">{{item.name}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen':item.patientReport=='0'}" @click="ischangestate(item)">
                        {{item.patientReport=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':item.patientReport=='0'}"></div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="text" v-if="adminLevel>3">
           <div class="list-content" >
                <div class="item-box" style="background:#00bbbb;color:#fff;border:0">
                    <div class="text-content">患者病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen' :patientReport=='0'}" @click="ischangestate(Administrator)">
                        {{patientReport=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':patientReport=='0'}"></div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="statemodeles"  @on-ok="updatedkequan" title="提示信息">
            <p>请确认是否修改！</p>
        </Modal>
        <loading v-show="isshowloading" class="load"></loading>
    </div>
</template>

<script>
import loading from "@/common/loading";
import http from '@/utils/http'
    export default {
        components: {
        //加载动画
        loading
      },
        data() {
            return {
                Administrator:'',
                adminLevel:'',
                //标题
                biao:'',
                //医生列表
                doctorList:[],
                //打开或关闭
                allswites:'',
                patientReport:'',
                //弹框
                statemodel:false,
                //弹框
                statemodeles:false,
                //选中的
                currentitem:{},
                //科室编码
                deptorList:[],
                isshowloading:false
            }
        },
        methods:{
            ischangestates(item){
                this.currentitem=item
                
                this.statemodeles=true
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
            // 修改科室权限
            async updatedkequan(){
                 var that =this;
                var url ='admin/adminUpdateMedAuth';
                var dept_code = that.currentitem.deptCode;
                var data={
                    dept_code
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$Message.success(res.errmsg);
                     that.DeptInfoList();
                }else{
                    that.$Message.warning(res.errmsg);
                }
                // $.ajax({
                //     url: url,
                //     type: "post",
                //     dataType: "json",
                //     timeout: 15000, //通过timeout属性，设置超时时间
                //     data: {patientReport,deptCode},
                //     success:function(data){
                //          that.isshowloading=false;
                //       if(data.code==200){
                //           if(that.Administrator.adminLevel>1&&that.Administrator.adminLevel<4){
                //             that.selectquan(that.Administrator.deptCode);
                //             that.docList({value:that.Administrator.deptCode});
                //           }else if(that.Administrator.adminLevel<=1){
                //               that.DeptInfoList()
                //           }
                       
                //       }
                //     },
                //     error:function(data){
                //        that.isshowloading=false;
                //     }
                // })
            },
            //科室分类
            _dealdata(data){
                this.deptorList=[]
                //其他没合并的科室
                for (let i = 0; i < data.length; i++) {
                    let dept_name = "";
                    let dept_code = '';
                    var auth=''
                    dept_name = data[i].dept_name;
                    dept_code=data[i].dept_code;
                    auth=data[i].auth
                    // if (deptName != "皮肤科") {
                    let depitem = {
                        //合并科室的名称
                        deptName: dept_name,
                        deptCode:dept_code,
                        patientReport:auth
                    };
                    this.deptorList.push(depitem);
                    // }
                }
                console.log(this.deptorList)
            },
            // 查询科室
            async DeptInfoList(){
                var that =this;
                var url = 'admin/adminQueryMedAuth'
                var data = {

                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that._dealdata(res.data);
                }
                
            }
        },
        mounted(){
            this.DeptInfoList();
        }
    }
</script>

<style scoped>
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
.content{

    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
     position: relative;
}
 .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
   
}
.switchopen1{
position: absolute;
  top: 12px;
  right: 10px;
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
</style>