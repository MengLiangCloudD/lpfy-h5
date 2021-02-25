<template>
  <div class="doctorcheckjc">
    <div class="title">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      患者检查信息
    </div>
    <div class="tipinfo" v-if="checklist.length==0">
        暂无数据
    </div>
    <div v-if="checklist.length>0" >
      <div v-for="(items,index) in checklist" :key="index" class="items">
        <div  v-for="(item,key) in items.items" :key="key">
          <div class="item">
            <div class="itemname">项目名称</div>
            <div style="flex:1;text-align:right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.itemname}}</div>
          </div>
          <div class="item">
            <div class="itemname" >费用</div>
            <div style="text-align:right;flex:1">{{item.costs}}元</div>
          </div>
          
        </div>
        <div class="btn">
          <div @click="isdelet(items,index)">撤销</div>
        </div>
      </div>
    </div>
    <Modal
        v-model="erromodal"
        title="提示">
        <p>{{errormsg}}</p>
    </Modal>
    <Modal
        v-model="tipmodal"
        title="提示"
        @on-ok="delet()">
        <p>是否撤销此订单？</p>
    </Modal>
    <loading v-show="isshowloading" class="load"></loading>
  </div>
</template>

<script>
import loading from "@/common/loading"
import http from '@/utils/http'
  export default {
    components:{
      loading
    },
    methods:{
      tobackdetail(){
        this.$router.push('/doctorckeck')
      }
    },
    data(){
      return{
        isshowloading:false,
        delitem:null,
        delindex:0,
        tipmodal:false,
        errormsg:'',
        erromodal:false,
        checklist:[]
      }
    },
    created(){
      //请求检查数据
      let _this=this
      setTimeout(function(){
        _this.fetchchecklist()
      },10)
      
    },
    methods:{
      tobackdetail(){
        this.$router.push('/doctorckeck')
      },
      newdate(){
        let _this=this
          let now=new Date();
          let y = now.getFullYear();
          let m = now.getMonth() + 1;
          let d = now.getDate();
          if(m<10){
              m='0'+m
          }
          if(d<10){
              d="0"+d
          }
          return y+'-'+m+'-'+d;
      },
      isdelet(item,index){
        this.delitem=item.items[0]
        this.delindex=index
        this.tipmodal=true
      },
      async delet(){
        let that=this
        var data = {

        }
        'serialno，card_no，dept_code，doctorName，doctor_code，visitno，visitdate，clinicno'
        let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
        data.serialno=that.delitem.serialno;
        data.card_no=patientinfo.cardNo;
        data.dept_code=patientinfo.deptcode;
        data.doctorName=patientinfo.hosdocname;
        data.doctor_code=patientinfo.doctor;
        data.visitno=that.delitem.visitno;
        data.visitdate=patientinfo.visitdate;
        data.clinicno=patientinfo.clinicno;
        var url ="docCheck/removeCheckItem";
        var res = await http.post(that,url,data);
        if(res.errcode==0){
            that.$Message.info('撤销成功！');
              that.checklist.splice(that.delindex,1);
        }else{
            that.$Message.error(res.errmsg)
        }
      },
      dealcheckresult(data){
        let numarr=[]
        for(let i=0;i<data.length;i++){
          let res=numarr.includes(data[i].serialno)
          if(!res){
            numarr.push(data[i].serialno)
          }
        }
        let _checklist=[]
        for(let i=0;i<numarr.length;i++){
          _checklist.push({serialno:numarr[i],items:[]})
        }
        for(let i=0;i<data.length;i++){
          let index=numarr.indexOf(data[i].serialno)
          _checklist[index].items.push(data[i])
        }
        this.checklist=_checklist
      },
      async fetchchecklist(){
        var that =this;
        var url =  "docCheck/queryBeforeOneCheckNoPay";
        var data = {}
        let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
        data.cardNo =patientinfo.cardNo;
        data.doctorNo =patientinfo.doctor;
        data.deptCode =patientinfo.deptcode;
        // let reqdeptcode=yspatientinfo.registerdept;
        // let doctorcode=yspatientinfo.doctor;
        // var cardno = yspatientinfo.patientid;
        var res = await http.post(that,url,data);
        if(res.errcode==0&&res.data.length>0&&res.data!=null){
          that.dealcheckresult(res.data)
        }else{
          //  that.$Message.error(res.errmsg)
        }
        // //打开加载动画
        // let ajaxTimeOut =  $.ajax({
        //   url: url,
        //   type: "post",
        //   dataType: "json",
        //   timeout: 15000, //通过timeout属性，设置超时时间
        //   async: true,
        //   data: {
        //     cardno,
        //     doctorcode,
        //     reqdeptcode
        //   },
        //   success: function(data) {
        //     if(data.status=='1'){
        //       that.dealcheckresult(data.data)
        //     }else if(data.status!='0'){
        //       that.errormsg='数据查询失败！'
        //       that.erromodal=true
        //     }
        //   },
        //   error: function(data){
        //     that.errormsg='请求发送失败!'
        //     that.erromodal=true
        //   },
        //   complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
        //     if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
        //       ajaxTimeOut.abort(); //取消请求
              
        //       that.$Modal.warning({     //超时提示：网络不稳定
        //         title: '友情提示',
        //         content: '请求超时',
        //       });
        //     }
        //   }
        // });
      }
    }
  }
</script>

<style scoped>
.doctorcheckjc{
  height: 100%;
  overflow: auto;
}
.title{
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.tbody{
  border:1px solid rgb(205,205,205);
  border-bottom: none;
  margin: 5px;
}
.theard{
  display: flex;
  height: 50px;
  background: rgb(0, 187, 187);
  color: rgb(255,255,255)
}
.theard>div{
  flex: 1;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(205,205,205);
  padding-left: 5px;
  padding-right: 5px;
}
.items{
  margin: 5px 0;
  border-bottom: 1px solid rgb(204, 204, 204);
  /* border-top: 1px solid rgb(204, 204, 204); */
  padding: 0 20px;
}
.item{
  display: flex;
  height: 30px;
  line-height: 30px;
}
.item>div{
  font-size: 16px;
  /* text-align: right; */
}
.itemname{
  width: 80px;
  font-size: 16px;
  font-weight: bold;
  /* text-align: left; */
}
.btn{
  margin: 10px 0;
  font-size: 16px;
}
.btn>div{
  text-align: center;
  background: rgb(0, 187, 187);
  padding: 10px 0;
  color: rgb(255,255,255);
  border-radius: 5px;
}
.tipinfo{
  text-align: center;
  font-size: 20px;
  margin: 50px;
}
</style>