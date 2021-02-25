<template>
    <div class="MyExamine">
        <div class="titlei">
            <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
            </div>
            报告详情
        </div>
        <div class="content">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
      </div>
      <tabbar class="tabbar"></tabbar>
    </div>
</template>

<script>
import http from '@/utils/http';
//引入公共底部
import tabbar from "@/common/tabbar";
    export default {
        components: {
            //公共底部
            tabbar,
        },
        data () {
            return {
                columns1: [
                    {
                        title: '项目名称',
                        key: 'report_item_name'
                    },
                    {
                        title: '结果',
                        key: 'result'
                    },
                    {
                        title: '提示',
                        key: 'abnormal_indicator'
                    },
                    {
                        title: '参考值',
                        key: 'print_context'
                    }
                ],
                data1: [
                ]
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                history.go(-1)
            },
            //查看化验明细
            async Testdetails(){
                var that = this;
                var url = "patAssay/getAssayResult";
                var testno = that.$route.query.testno;
                var data = {
                    testno
                }
                var res  = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null&&res.data!=''){
                    that.data1=res.data;
                    for(var i = 0;i<that.data1.length;i++){
                        if(that.data1[i].abnormal_indicator=='H'){
                            that.data1[i].abnormal_indicator='↑'
                        }
                        if(that.data1[i].abnormal_indicator=='L'){
                            that.data1[i].abnormal_indicator='↓'
                        }
                        if(that.data1[i].abnormal_indicator=='N'){
                            that.data1[i].abnormal_indicator=''
                        }
                    }
                }
            }
        },
        mounted(){
            this.Testdetails()
        }
    }
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
}
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>