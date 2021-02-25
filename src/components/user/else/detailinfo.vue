<template>
    <div class="reportpage">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            {{title}}详情
        </div>
        <div class="content">
            <div class="item" v-for="(item,index) in paymodellist" :key="index">
                <div v-if="title!=='药品'">
                    <div class="item_title">
                        <div class="titbiao"></div>
                        <div class="titxt">{{item.itemname}}</div>
                    </div>
                    <div class="item_info">
                        <span>编码：</span>
                        <span>{{item.itemcode}}</span>
                    </div> 
                    <div class="item_info">
                        <span>数量：</span>
                        <span>{{item.amount}}</span>
                    </div>
                    <div class="item_info">
                        <span>单价：</span>
                        <span>￥{{item.charges.toFixed(2)}}</span>
                    </div>
                    <div class="item_info">
                        <span>规格：</span>
                        <span>{{item.itemspec}}</span>
                    </div>
                    <div class="item_info">
                        <span>单位：</span>
                        <span>{{item.units}}</span>
                    </div>
                </div>
                <div v-else>
                    <div class="item_title">
                        <div class="titbiao"></div>
                        <div class="titxt">{{item.drugname}}</div>
                    </div>
                    <div class="item_info">
                        <span>编码：</span>
                        <span>{{item.drugcode}}</span>
                    </div> 
                    <div class="item_info">
                        <span>数量：</span>
                        <span>{{item.amount}}</span>
                    </div>
                    <div class="item_info">
                        <span>规格：</span>
                        <span>{{item.drugspec}}</span>
                    </div>
                    <div class="item_info">
                        <span>单位：</span>
                        <span>{{item.units}}</span>
                    </div>
                    <div class="item_info">
                        <span>用法：</span>
                        <span>{{item.administration}}</span>
                    </div>
                     <div class="item_info">
                        <span>频次：</span>
                        <span>{{item.frequency}}</span>
                    </div>
                    <div class="item_info">
                        <span>总价：</span>
                        <span>￥{{item.costs.toFixed(2)}}</span>
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
                paymodellist:[],
           }
       },
       created(){
            this.title = localStorage.getItem('itemListName');
            this.paymodellist = JSON.parse(localStorage.getItem('paymodellist'));
        },
        methods:{
            tobackdetail(){
                this.$router.push('/inforreport');
            },
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
</style>