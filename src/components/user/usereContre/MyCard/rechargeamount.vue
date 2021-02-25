<template>
    <div style="height: 100%;overflow: auto;">
        <div style="background: #28b8a1;color:white" class="contents">
            <div class="tittle" style="background: #28b8a1;color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">充值中心</span>
                </div>
            </div>
            <div class="content">
                <p>请确认卡号：</p>
                <p style="font-size:30px;border-bottom: 1px solid #eee;">16020130</p>
            </div>
        </div>
        <div class="jine">充值金额(￥)：</div>
        <div class="mianzhi">
            <p class="ten" @click="ten">10</p>
            <p class="twenty" @click="twenty" >20</p>
            <p class="thirty" @click="thirty">30</p>
        </div>
        <div class="mianzhi">
            <p class="fifty" @click="fifty">50</p>
            <p class="onehundred" @click="onehundred">100</p>
            <p contenteditable="true" class="custom" data-placeholder="自定义" @click="custom"></p>
        </div>
        <div class="annui">
            <p class="btn" @click="gomoney">充值</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                money:''
            }
        },
        methods: {
             //返回上一层
            tobackdetail(){
               this.$router.push('/recharge');
            },
            //选择金额10
            ten(){
                 this.money =10;
                 $('.ten').addClass('t');
                 $(".twenty").attr("class","twenty");
                 $(".thirty").attr("class","thirty");
                 $(".fifty").attr("class","fifty");
                 $(".onehundred").attr("class","onehundred");
                 $(".custom").attr("class","custom");
            },
            //选择金额20
            twenty(){
                 this.money =20;
                 $('.twenty').addClass('t');
                 $(".ten").attr("class","ten");
                 $(".thirty").attr("class","thirty");
                 $(".fifty").attr("class","fifty");
                 $(".onehundred").attr("class","onehundred");
                 $(".custom").attr("class","custom");
            },
            //选择金额30
            thirty(){
                 this.money =30;
                 $('.thirty').addClass('t');
                 $(".twenty").attr("class","twenty");
                 $(".ten").attr("class","ten");
                 $(".fifty").attr("class","fifty");
                 $(".onehundred").attr("class","onehundred");
                 $(".custom").attr("class","custom");
            },
            //选择金额50
            fifty(){
                 this.money =50;
                 $('.fifty').addClass('t');
                 $(".twenty").attr("class","twenty");
                 $(".ten").attr("class","ten");
                 $(".thirty").attr("class","thirty");
                 $(".onehundred").attr("class","onehundred");
                 $(".custom").attr("class","custom");
            },
           //选择金额100
            onehundred(){
                 this.money =100;
                 $('.onehundred').addClass('t');
                 $(".twenty").attr("class","twenty");
                 $(".ten").attr("class","ten");
                 $(".thirty").attr("class","thirty");
                 $(".fifty").attr("class","fifty");
                 $(".custom").attr("class","custom");
            },
            //选择金额
            custom(){
                 this.money =0;
                 $('.custom').addClass('t');
                  $(".twenty").attr("class","twenty");
                 $(".ten").attr("class","ten");
                 $(".thirty").attr("class","thirty");
                 $(".fifty").attr("class","fifty");
                 $(".onehundred").attr("class","onehundred");
            },
            //充值
            gomoney(){
                var a;
                if(this.money==0){
                    a = parseInt($('.custom').html());
                }else{
                    a = this.money
                }
            }
        },
    }
</script>

<style scoped>
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
.content{
    background:#28b8a1;
    color:white;
    padding: 15px ;
    font-size: 16px;
    
}
.mianzhi{
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    width: 100%;
    /* background-color: lightgrey; */
    /* border-top: 5px solid #ddd; */
    padding: 10px 10px;
}
.mianzhi p{
     text-align: center;
    font-size: 18px;
    border: 1px solid #ccc;
    width: 100px;
    padding: 20px 0;
    border-radius: 5px;
}
.jine{
    padding: 10px 15px;;
    font-size: 16px;
}
.annui{
    width: 100%;
    text-align: center;
    padding: 40px 0;
}
.btn{
    width: 70%;
    display: inline-block;
    padding: 10px;
    border-radius: 20px;
    background: #28b8a1;
    font-size: 16px;
    color: #fff;
}
.custom{
    display: inline-block;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    border: 1px solid #ccc;
    width: 100px;
}
.custom:empty:before{
    content: attr(data-placeholder);
    color:#bbb;
}
.t{
    border: 1px solid  #28b8a1 !important;
}
</style>