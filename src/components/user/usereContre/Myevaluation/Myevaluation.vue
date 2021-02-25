<template>
  <div style="height: 100%;overflow: auto; -webkit-overflow-scrolling: touch;" class="his">
    <div slot="list" class="Myevaluation">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      我的评价</div>
      <div class="coo">
        <Modal
            title
            v-model="modal10"
            class-name="vertical-center-modal"
            @on-ok="deleteEvaluation()"
          >
            <p>您确认要删除吗</p>
          </Modal>
        <div class="content" v-for="(item,index) in commentList" :key="index">
          <!-- <img src=".././assets/x.png" alt width="20" class="sha" @click.stop="test(index)"> -->
          <div>
          </div>
          <p style="display: inline-block;vertical-align: middle;"> 
            <span>
              <img src="./../../../../common/imager/avatar.png" alt width="50px" style=" border-radius:50%; vertical-align: middle">
            </span>
            <!-- <span style="font-size:18px">{{item.docname}}</span> -->
          </p>
          <p style="font-size: 16px;display: inline-block;vertical-align: middle;">
            <span style="font-size: 18px">{{item.name}}</span><br>
            <span >{{ /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.created_at)[0]}}</span>
            <!-- <span >{{item.order_no}}</span> -->
            <span style="  font-size: 20px;color:#f37f12;display: inline-block;vertical-align: middle;">{{item.star[0].score}}</span><img src="./../../../../common/imager/_星星1.png" alt="" width="22" style="vertical-align: middle;">
          </p>
          <p style="text-indent:25px;font-size:18px;padding: 3.53333vw 2.66667vw;">{{item.content}}</p>
          <!-- <div v-for="(item1,index1) in item.star" :key="index1">
            <p style="display: flex;">
              <span style="flex:1;font-size: 14px;color:#f37f12;display: inline-block;vertical-align: middle;">{{item1.deptname}}：</span>{{item1.score}}<img src="./../../../../common/imager/_星星1.png" alt="" width="22" style="vertical-align: middle;">
            </p>
          </div> -->
        </div>
      </div>
      
    </div>
    <loading v-show="isShowLoading"></loading>
    <tabbar class="pubtabbar"></tabbar>
  </div>
</template>

<script>
import loading from '@/common/loading'
import tabbar from "@/common/tabbar";
import http from '@/utils/http';
export default {
  components: {
    tabbar,
    loading
  },
  data() {
    return {
      modal10: false,
      commentList: [],
      testno: "",
      username:'',
      isShowLoading:false,
      size:10
    };
  },
  methods:{
    //显示弹框 确认信息
    test(index) {
      this.currentIndex = index;
      this.modal10 = true;
    },
    //计算平均评分
    calculate(index){
      //态度评价
      var a = this.commentList[index].tdpj;
      //诊断评价
      var b = this.commentList[index].zdpj;
      //平均计分
      var c = (a + b)*0.5;
      return c
    },
    //我的评价
    async evaluate() {
      var that = this;
      //url地址
      var url = "evaluate/patientQueryEvaluate";
      var data = {

      }
      var res  = await http.post(that,url,data);
      if(res.errcode==0&&res.data!=null){;
          var commentList = [];
          //获取评论列表数据
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].deletion != 0) {
              res.data[i].star=JSON.parse(res.data[i].star)
              commentList.push(res.data[i]);
            }
          }
          that.commentList = commentList;

      }else{
          that.commentList = [];
      }
      // var size = that.size;
      // //请求开始 开启加载动画
      // // that.$Loading.start();
      // that.isShowLoading=true;
      // let ajaxTimeOut = $.ajax({
      //   url: url,
      //   type: "post",
      //   dataType: "json",
      //    timeout: 15000, //通过timeout属性，设置超时时间
      //   // async: false,
      //   data: {
      //     //传送openid
      //     cardno: cardno,
      //     size:size
      //     // openid: "oD2QnwHr_9SiDAQCDj969CGXTCy4"
      //   },
      //   success: function(data) {
      //     that.isShowLoading=false;
      //     //关闭加载动画进度条
      //     // that.$Loading.finish();
      //     var commentList = [];
      //     //获取评论列表数据
      //     for (var i = 0; i < data.data.length; i++) {
      //       if (data.data[i].deletion != 0) {
      //         commentList.push(data.data[i]);
      //       }
      //     }
      //     that.commentList = commentList;
      //     //取得订单号
      //     that.testno = data.data;
      //   },
      //   error: function(data) {
      //     //关闭加载动画进度条
      //     // that.$Loading.finish();
      //     that.isShowLoading=false;
      //   },
      //   complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
      //       if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
      //         ajaxTimeOut.abort(); //取消请求
              
      //         that.$Modal.warning({     //超时提示：网络不稳定
      //           title: '友情提示',
      //           content: '请求超时',
      //         });
      //       }
      //     }
      // });
    },
    tobackdetail(){
        this.$router.push('/HomePage');
    },
    //删除评价
    deleteEvaluation() {
      var that = this;
      // var url = "http://192.168.33.159:8080/evaluate/deleteEvalate.do";
      var url = this.$store.getters.getUrl + "evaluate/deleteEvalate.do";
      var patientid = that.commentList[that.currentIndex].patientid;
      var doccode = that.commentList[that.currentIndex].doccode;
      var pjdate = that.commentList[that.currentIndex].pjdate;
      var clinicno = that.commentList[that.currentIndex].clinicno;
      let ajaxTimeOut =  $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        timeout: 15000, //通过timeout属性，设置超时时间
        // async: false,
        data: {
          patientid:patientid,
          doccode:doccode,
          pjdate:pjdate,
          clinicno:clinicno
        },
        success: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
          //刷新数据
          that.evaluate();
        },
        error: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
        },
        complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
            if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
              ajaxTimeOut.abort(); //取消请求
              
              that.$Modal.warning({     //超时提示：网络不稳定
                title: '友情提示',
                content: '请求超时',
              });
            }
          }
      });
    }
  },
  mounted() {
    var that  = this;
    const el = document.querySelector('.his');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
          //每次滚动到底部size+10
          that.size+=10;
          that.evaluate();
      }
     }
    },1000)
    //调用方法加载我的评论数据
    this.evaluate();
  }
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.Myevaluation {
  overflow: auto;
  padding: 0 0 70px 0;
  background: rgb(255, 255, 255);
  /* height: 100%; */
  
}
.tittle {
  background: #fff;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  font-weight: 900;
  background: #28b8a1;
  position: relative;
  
}
.coo {
  margin-top: 15px;
}
.content {
  padding: 15px 5%;
  border-bottom: 3px solid #ccc;
  background: #fff;
  position: relative;
  padding-bottom: 20px;
}
.sha {
  position: absolute;
  right: 3%;
}
.sha1 {
  position: absolute;
  right: 3%;
  bottom: 10px;
}
.sha1 span,.sha1 img{
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  color: #f37f12
}
.content p span {
  display: inline-block;
  vertical-align: middle;
  padding: 3px 0;
}
.content p {
  padding: 2px 10px;
}
.content p:nth-child(3) {
  color: #000;
}
.content p:nth-child(1) {
  font-weight: 700;
}
.content p:nth-child(3) {
  line-height: 1;
}
</style>