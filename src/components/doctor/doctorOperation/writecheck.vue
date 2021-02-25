<template>
    <div class="writecheck-page">
        <div class="content">
            <div class="item-wrapper"> 
                <div class="title-tip">
                    临床诊断:
                </div>
                <Input class="input-item" v-model="form.clindiag"  disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper" >
                <div class="title-tip">
                    检查类别:
                </div>
                <Select v-model="form.examclass" @on-change="changeexamclass" >
                    <Option v-for="(item,index) in dealchecklist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper" v-if="isshowsubclass">
                <div class="title-tip">
                    检查子类:
                </div>
                <Select v-model="form.examsubclass" @on-change="changesubexamclass" clearable >
                    <Option v-for="(item,index) in dealsubchecklist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper" v-if="!isshowsubclass">
                <div class="title-tip">
                    检查子类:
                </div>
                <Select v-model="skyvalue"  clearable >
                    <Option v-for="(item,index) in testlist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    执行科室:
                </div>
                <Input class="input-item" v-model="depname" disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    申请医生:
                </div>
                <Input class="input-item" v-model="form.reqphysician" disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="add-btn" @click="showmodel" v-if="form.examsubclass">
                添加项目
            </div>
            <div class="input-wrapper" v-for="(item,index) in projectname" :key='index'>
                {{item.description}}<div @click="deleteitem(item.description,index)">删除</div>
            </div>
        </div>
        <div>
            <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="tosubmit"  long class="primarybtn">提交</div>
        </div>
        <Modal
            v-model="modal1"
            title="提示">
            提交失败
        </Modal>
        <Modal
            v-model="modal3"
            title="提示">
            信息不全禁止提交
        </Modal>
        <Modal
            v-model="issubmit"
            @on-ok='submit'
            title="提示">
            请确认是否提交
        </Modal>
        <Modal
            v-model="projectmodel"
            fullscreen
            title="检查项目">
            <CheckboxGroup size="large" v-model="dealprojectnamelist" @on-change="changeproject">
                <Checkbox v-for="(item,index) in projectnamelist" :key="index" class="Checkbox" size="large" :label="item.description"></Checkbox>
            </CheckboxGroup>
        </Modal>
        <Modal
            v-model="requestmodel"
            title="提示">
            {{infomsg}}
        </Modal>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
    import loading from "@/common/loading"
    import http from '@/utils/http'
    export default {
        components:{
            loading
        },
        data(){
            return{
                infomsg:"",
                requestmodel:false,
                testlist:[],
                skyvalue:'',
                isshowsubclass:false,
                modal3:false,
                issubmit:false,
                projectmodel:false,
                isshowloading:false,
                // tradeno:"",
                modal1:false,
                ishownullmodel:'',
                opacity:"",
                opacity:1,
                inputsize:{ minRows: 6, maxRows: 6 },
                visitdate:"",
                depname:'',
                position:'',//科室地址
                form:{
                    cardno:'',//卡号
                    examsubclass:'',//检查子类
                    examclass:'',//检查类别 
                    clindiag:"",//临床诊断
                    performedby:'',//执行科室编码
                    patientsource:'1',//病人来源(?)
                    reqdatetime:'',//申请日期和时间
                    reqdept:'',//申请科室 
                    reqphysician:'',//申请医生
                    doctoruser:'',//申请医生编号
                    descriptioncode:'',//描述代码(?)
                    projectname:'',//项目名称
                    clinicno:'',//门诊号
                    visitno:''//就诊序号
                },
                projectname:[],//选择的项目名称
                checklist:[],//检查类别
                dealchecklist:[],//处理过后的检查类别数据
                subchecklist:[],//检查子类别
                dealsubchecklist:[],//处理过后的检查子类别数据
                projectnamelist:[],//项目列表
                dealprojectnamelist:[]//渲染列表
            }
        },
        methods:{
            showmodel(){
                this.projectmodel=true
            },
             //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            async insertcheck(arr){
                var that = this;
                let checkdata=arr;
                let items=that.form.examsubclass;
                let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
                let url='docCheck/openCheckPres';
                let clinicno = patientinfo.clinicno;
                let visitdate = patientinfo.visitdate;
                let card_no =  patientinfo.cardNo;
                let doctor_code = patientinfo.doctor;
                let visitno = patientinfo.visitno;
                let dept_code = patientinfo.deptcode;
                var data = {
                    checkdata,items,clinicno,visitdate,card_no,doctor_code,visitno,dept_code
                }
                
                var res  =  await http.post(that,url,data);
                if(res.errcode == 0){
                     that.$Message.info('提交成功！');
                     this.init()
                }else{
                     that.$Message.error(res.errmsg)
                     this.init()
                }
            },
            tosubmit(){
                this.issubmit=true
            },
            submit(){
                if(this.projectname.length==0){
                    this.modal3=true
                    return
                }
                // delete this.form.depname
                let arr=[]
                let obj=this.form
                for(let i=0;i<this.projectname.length;i++){
                    obj.descriptioncode=this.projectname[i].description_code
                    obj.projectname=this.projectname[i].description
                    arr.push({
                        // cardno:obj.cardno,//卡号
                        examsubclass:obj.examsubclass,//检查子类
                        examclass:obj.examclass,//检查类别 
                        clindiag:obj.clindiag,//临床诊断
                        performedby:obj.performedby,//执行科室编码
                        patientsource:'1',//病人来源(?)
                        descriptioncode:obj.descriptioncode,//描述代码(?)
                        projectname:obj.projectname,//项目名称
                    })
                }
                this.insertcheck(JSON.stringify(arr))
                
            },
            //删除检查项目
            deleteitem(item,index){
                for(let i=0;i<this.projectname.length;i++){
                    if(this.projectname[i].description==item){
                        this.projectname.splice(index,1)
                    }
                }
                this.dealprojectnamelist.splice(index,1)
            },
            //添加检查项目
            changeproject(value){
                this.projectname=[]
                if(value.length==0){
                    return
                }
                for(let i=0;i<this.projectnamelist.length;i++){
                    for(let j=0;j<value.length;j++){
                        if(this.projectnamelist[i].description==value[j]){
                            this.projectname.push(this.projectnamelist[i])
                        }
                    }
                }
            },
            async changesubexamclass(value){
                //获取项目
                let _this=this
                let examclassname=this.form.examclass
                let examsubclassname=this.form.examsubclass
                 _this.fetchprojectnamelist(_this.form.examclass,_this.form.examsubclass)
            },
            topath(){
                this.$router.push('/registeredlist')
            },
            async fetchprojectnamelist(examclassname,examsubclassname){
                let that=this
                var url = 'docCheck/queryCheckThreeItem'
                var data={
                    examsubclassname,examclassname 
                }
                var res  =  await http.post(that,url,data);
                if(res.errcode == 0 && res.data != null){
                    that.isshowsubclass=true
                    that.projectnamelist=res.data
                }else{
                    that.infomsg="请求发送失败"
                    that.requestmodel=true
                }
            },
            //保存子类
            dealsubcheklist(data){
                let that=this
               
                that.subchecklist=data;
                 that.dealsubchecklist=[]
                for(let i=0;i<data.length;i++){
                    let item={
                        value:data[i].exam_subclass_name,
                        label:data[i].exam_subclass_name
                    }
                     that.dealsubchecklist.push(item);
                }
                that.form.examsubclass=that.dealsubchecklist[0].value
                that.isshowsubclass=true
                that.fetchprojectnamelist(that.form.examclass,that.form.examsubclass)
                // })
            },
            //获取子类
            async fetchSubchecklit(value){
                let that=this
                var url = 'docCheck/queryCheckSubClass';
                var data={
                    classname:value
                }
                var res  =  await http.post(that,url,data);
                if(res.errcode == 0 && res.data != null){
                    
                     that.dealsubcheklist(res.data)
                }else{
                    this.infomsg="请求发送失败"
                    this.requestmodel=true
                }
            },
            //获取科室名称
            async fetchdepname(deptcode){
                let that=this
                var url = 'docCheck/queryCheckDeptName';
                var data = {
                    deptcode
                }
                var res  =  await http.post(that,url,data);
                if(res.errcode == 0 && res.data != null){
                    that.depname=res.data[0].dept_name;
                    that.position=res.data[0].position;
                }else{
                    that.infomsg="请求发送失败"
                    that.requestmodel=true
                }
            },
            //选择类别
            async changeexamclass(value){
                this.isshowsubclass=false
                if(!value){
                    return
                }
                let that=this
                for(let i=0;i<that.checklist.length;i++){
                    if(that.checklist[i].exam_class_name==value){
                        that.form.performedby=that.checklist[i].perform_by
                    }
                }
                that.fetchdepname(that.form.performedby);
                that.fetchSubchecklit(that.form.examclass);
            //    
                
            },
            //处理查询检查类别获取的结果
            dealcheckresult(data){
                this.dealchecklist=[]
                let arr=[]
                for(let i=0;i<data.length;i++){
                    let item={
                        value:data[i].exam_class_name,
                        label:data[i].exam_class_name
                    }
                    arr.push(item)
                }
                return arr
            },
            //获取检查类别
            async fetchecklist(){
                let that=this
                var url  = 'docCheck/queryCheckClass';
                var data  ={

                }
                var res  =  await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null&&res.data!=''){
                     that.checklist=res.data
                     that.dealchecklist=that.dealcheckresult(res.data)
                }else{
                     that.infomsg="获取数据失败"
                    that.requestmodel=true
                }
                
            },
            async fetchclindiag(){
                let that=this
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
                let visitdate=y+'-'+m+'-'+d;
                let url='docCheck/queryOutpMrDiagDesc'
                let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
                var data ={};
                data.card_no = patientinfo.cardNo;
                data.doctor_code = patientinfo.doctor;
                data.visitdate = patientinfo.visitdate;
                // var data = {
                //     order_no
                // }
                var res  =  await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null&&res.data!=''){
                    that.form.clindiag=res.data[0].diagdesc;
                }
            },
            async init(){
                this.visitdate=""
                this.depname=''
                this.form.cardno='',//卡号
                this.form.examsubclass='',//检查子类
                this.form.examclass='',//检查类别 
                this.form.clindiag="",//临床诊断
                this.form.performedby='',//执行科室编码
                this.form.patientsource='1',//病人来源(?)
                this.form.reqdatetime='',//申请日期和时间
                this.form.reqdept='',//申请科室 
                this.form.reqphysician='',//申请医生
                this.form.doctoruser='',//申请医生编号
                this.form.descriptioncode='',//描述代码(?)
                this.form.projectname='',//项目名称
                this.form.clinicno='',//门诊号
                this.form.visitno=''//就诊序号
                this.projectname=[]//选择的项目名称
                this.checklist=[]//检查类别
                this.dealchecklist=[]//处理过后的检查类别数据
                this.subchecklist=[]//检查子类别
                this.dealsubchecklist=[]//处理过后的检查子类别数据
                this.projectnamelist=[]//项目列表
                this.dealprojectnamelist=[]//渲染列表
                let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
                this.form.reqphysician=patientinfo.hosdocname//申请医生
                // this.form.doctoruser=data.doctor//申请医生编码
                // this.form.reqdept=data.registerdept//申请科室
                // this.form.cardno=data.patientid//患者卡号
                // this.form.clinicno=data.clinicno
                // this.form.visitno=data.visitno
                // this.tradeno=data.tradeno
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
                this.visitdate=y+'-'+m+'-'+d;
                this.form.reqdatetime=y+'-'+m+'-'+d;
                let that=this
                that.fetchclindiag();
                that.fetchecklist();
            }
        },
        mounted(){
            let that=this
            setTimeout(function(){
                that.init()
            },10)
            
        }
    }
</script>

<style scoped>
.title{
    background: rgb(0,187,187);
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: white;
}
.title-arrow-icon{
  position: absolute;
  left: 0px;
  top: 0px;
  height: 50px;
  width:50px;
}
.item-wrapper{
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    padding-right: 5px;
}
.title-tip{
    width: 80px;
    padding: 15px 0;
}
.text-area{
    align-self:flex-start;
    margin: 10px 0;
}
.input-item{
    margin: 10px 0;
}
.project-name{
    display: block;

}
.Checkbox{
    display: block;
    padding: 8px 0;
}
.primarybtn{
    background: rgb(0,187,187);
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: rgb(255,255,255);
}
.add-btn{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    text-align: center;
    background: rgb(0, 187, 187);
    color: white;
    font-size: 20px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
}
.input-wrapper{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    display: flex;
}
.input-wrapper>div{
    flex: 1;
    text-align: right;
    padding-right:10px;
    color:rgb(87,197,247)
}
.content >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
.content >>> .ivu-input{
    border: 1px solid #ffffff;
    background: #ffffff
}
.content >>> .ivu-select-selection{
    border: 1px solid #ffffff;
    box-shadow: none
}
.content >>> .select-selection:hover {
    border-color: #ffffff;
    box-shadow: none
}
</style>