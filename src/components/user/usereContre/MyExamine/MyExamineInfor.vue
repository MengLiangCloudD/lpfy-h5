<template>
    <div  class="MyExamine">
        <div class="titlei">
            <div class="title">
                    <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                    项目详情
            </div>
      </div>
      <div class="content" style="padding:10px">
          <!-- <Table :columns="columns1" :data="CheckItemResultList" border ></Table> -->
          <div style="font-size:16px;">
                        <p style=" font-weight:600;">初步诊断：</p>
                        <p>{{CheckItemResultList.impression}}</p>

                        <p style=" font-weight:600;">项目描述：</p>
                        <p>{{CheckItemResultList.description}}</p>
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
        data() {
            return {
                CheckItemResultList:[],
                columns1:[{
                        title: '初步诊断',
                        key: 'impression'
                    },
                    {
                        title: '项目描述',
                        key: 'description'
                    },]
            }
        },
        mounted() {
            this.selectCheckItemResult()
        },
        methods: {
             //查询描述
                async selectCheckItemResult(){
                    var that = this;
                    var url = 'patCheck/queryCheckItemResult';
                    var data ={
                        exam_no:that.$route.query.examNo
                    }
                    var res = await http.post(that,url,data);
                    if(res.errcode==0&&res.data!=null){
                        // that.CheckItemResultList.push(res.data)
                        that.CheckItemResultList=res.data;
                        // that.CheckItemResultList.impression=that.CheckItemResultList.impression.split("\r\n    ")
                    }
                },
                //返回上一层
            tobackdetail(){
                // this.$router.push('/MyExamine1')
                history.go(-1)
            },
        },
    }
</script>

<style scoped>
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
}
.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
</style>