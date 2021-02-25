<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch" class="his">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
              工会福利
        </div>
        <div class="content">
            <img src="./../../../../common/imager/fuli.png" alt="" style="width:100%">
                  <div style="padding:10px">
<!--                      详情：{{welfare}}-->
                    <div v-for="(item,index) in WelfareList" :key="index" style="margin-bottom:10px">
                        <p>*{{item.first_title.union_welfare_first_title}}</p>
                        <p v-for="(item1,index1) in item.second_title" :key="index1">&nbsp; &nbsp; ——{{item1.union_welfare_second_title}}</p>
                    </div>
                  </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
    export default {
        data(){
            return {
                welfare:'',
                WelfareList:[]
            }
        },
        created(){
            this.welfare = localStorage.getItem("welfare");
            this.selectWelfareList()
        },
        methods:{
             //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //查询工会福利
            async selectWelfareList(){
                let that=this
                var data = {
                    
                }
                let url="admin/queryWelfare";
                var res  = await http.post(that,url,data);
                if(res.errcode==0){
                    this.WelfareList = res.data;
                }else{
                    
                }
            }
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
  position: relative;

}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
</style>
