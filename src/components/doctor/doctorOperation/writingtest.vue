<template>
    <div class="writecheck-page">
        <div class="content">
            <div class="item-wrapper" >
                <div class="title-tip">
                    化验类别:
                </div>
                <Select v-model="form.examclass" @on-change="changeexamclass" placeholder=''>
                    <Option v-for="(item,index) in dealchecklist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    执行科室:
                </div>
                <Input class="input-item" v-model="depname" disabled  @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    申请医生:
                </div>
                <Input class="input-item" v-model="form.reqphysician" disabled  @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="add-btn" @click="showmodel" v-if="form.examclass">
                添加项目
            </div>
            <div class="input-wrapper" v-for="(item,index) in projectname" :key='index'>
                {{item.item_name}}<div @click="deleteitem(item.item_name,index)">删除</div>
            </div>
        </div>
        <div>
            <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="tosubmit"   class="primarybtn">提交</div>
        </div>
        <Modal
            v-model="requestmodel"
            title="提示">
            <p>{{infomsg}}</p>
        </Modal>
        <Modal
            v-model="modal1"
            title="提示">
            <p>开化验失败</p>
        </Modal>
        <Modal
            v-model="issubmit"
            @on-ok='submit'
            title="提示">
            请确认是否提交
        </Modal>
        <Modal
            v-model="modal3"
            title="提示">
            <p>内容不全禁止提交</p>
        </Modal>
        <Modal
            v-model="projectmodel"
            fullscreen
            title="化验项目">
            <CheckboxGroup size="large" v-model="dealprojectnamelist" @on-change="changeproject">
                <Checkbox v-for="(item,index) in projectnamelist" :key="index" class="Checkbox" size="large" :label="item.item_name"></Checkbox>
            </CheckboxGroup>
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
                requestmodel:false,
                infomsg:"",
                modal3:false,
                issubmit:false,
                projectmodel:false,
                isshowloading:false,
                // tradeno:'',
                modal1:false,
                inputsize:{ minRows: 6, maxRows: 6 },
                opacity:1,
                depname:'检验科',
                position:'二楼东侧',
                form:{
                    examclass:'',
                    patientid:'',//卡号
                    performedby:'',//执行科室编码
                    sysdate:'',//申请日期和时间
                    visitdate:'',
                    reqdept:'',//申请科室 
                    reqphysician:'',//申请医生
                    doctorno:'',//申请医生编号
                    itemcode:'',//项目编码(?)
                    itemname:'',//项目名称
                    chargetype:"",//费别
                    clinicno:'',//门诊号
                    visitno:''//就诊序号
                },
                projectname:[],//选择的项目名称
                checklist:[],//化验类别
                dealchecklist:[],//处理过后的化验类别数据
                projectnamelist:[],//项目列表
                dealprojectnamelist:[]//渲染列表
            }
        },
        methods:{
            tosubmit(){
                this.issubmit=true
            },
            showmodel(){
                this.projectmodel=true
            },
            //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            topath(){
                this.$router.push('/registeredlist')
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            //开化验
            async insertPatientAssay(arr){
                let items=this.form.examclass;
                let that=this
                let patientinfo=JSON.parse(localStorage.getItem('userxinxi'));
                let clinicno = patientinfo.clinicno;
                let visitdate = patientinfo.visitdate;
                let card_no =  patientinfo.cardNo;
                let doctor_code = patientinfo.doctor;
                let visitno = patientinfo.visitno;
                let dept_code = patientinfo.deptcode;
                var doctorName = patientinfo.hosdocname;
                let url='docAssay/openAssayPres'
                var data = {
                    items,assaydata:JSON.stringify(arr),visitdate,card_no,doctor_code,visitno,dept_code,doctorName,clinicno
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.init()
                    that.$Message.success(res.errmsg)
                }else{
                    that.$Message.error(res.errmsg)
                }
                
            },
            //提交
            submit(){
                let _this=this
                //向后台插入数据
                if(this.projectname.length==0){
                    return
                }

                let arr=[]
                for(var i=0;i<this.projectname.length;i++){
                    let obj={}
                    for(var j in this.form){
                        obj[j]=this.form[j]
                    }
                    obj.itemcode=this.projectname[i].item_code
                    obj.itemname=this.projectname[i].item_name
                    obj.specimen=this.projectname[i].expand1
                    // delete obj.depname
                    arr.push(obj)
                }

               this.insertPatientAssay(arr);
            },
            //选择项目
            changeproject(value){
                this.projectname=[]
                if(value.length==0){
                    return
                }
                for(let i=0;i<this.projectnamelist.length;i++){
                    for(let j=0;j<value.length;j++){
                        if(this.projectnamelist[i].item_name==value[j]){
                            this.projectname.push(this.projectnamelist[i])
                        }
                    }
                }
            },
            //获取某个类别下的项目列表
            async _fetchprojectnamelist(expand3,expand2){
                let that=this
                let url='docAssay/queryAssaySecondClass'
                var data = {
                    expand3,expand2
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null&&res.data.length>0){
                    return res.data
                }else{
                    that.$Message.info(res.errmsg)
                }
                
            },
            deleteitem(item,index){
                for(let i=0;i<this.projectname.length;i++){
                    if(this.projectname[i].item_name==item){
                        this.projectname.splice(index,1)
                    }
                }
                // this.dealchecklist
                this.dealprojectnamelist.splice(index,1)
            },
            //选择类别
            async changeexamclass(value){
                if(!value){
                    return
                }
                let _this=this
                _this.dealprojectnamelist=[]
                _this.projectname=[]
                for(let i=0;i<this.checklist.length;i++){
                    if(this.checklist[i].class_name==value){
                        this.form.examclass=this.checklist[i].class_name
                        this.form.performedby=this.checklist[i].dept_code
                    }
                }
                const projectnamelist= await _this._fetchprojectnamelist(this.form.performedby,this.form.examclass)
                _this.projectnamelist=projectnamelist;
            },
            //存储获取的化验类别存到checklist变量 把获取的化验类别处理成iview组件可用的数据结构保存到dealchecklist
            _dealchemicalexamlist(data){
                //获取的化验列表进行数据保存
                this.checklist=data
                let arr=[]
                for(let i=0;i<data.length;i++){
                    if(data[i].class_name){
                        let item={
                            value:data[i].class_name,
                            label:data[i].class_name
                        }
                        arr.push(item)
                    }
                    
                }
                //要渲染的化验列表
                return arr
            },
            //获取化验项目类别
            async _fetchchemicalexamlist(){
                    let that=this
                    let url='docAssay/queryAssayClass'
                    var data = {}
                    var res = await http.post(that,url,data);
                    if(res.errcode==0){
                        return res.data
                    }else{
                        that.$Message.info(res.errmsg)
                    }
            },
            //页面初始化
            async init(){
                this.form.patientid='',//卡号
                this.form.performedby='',//执行科室编码
                this.form.sysdate='',//申请日期和时间
                this.form.visitdate='',
                this.form.reqdept='',//申请科室 
                this.form.reqphysician='',//申请医生
                this.form.doctorno='',//申请医生编号
                this.form.itemcode='',//项目编码(?)
                this.form.itemname='',//项目名称
                this.depname='检验科',
                this.form.examclass="",
                this.form.chargetype="",//费别
                this.form.clinicno='',//门诊号
                this.form.visitno=''//就诊序号
                this.projectname=[],//选择的项目名称
                this.checklist=[],//化验类别
                this.dealchecklist=[],//处理过后的化验类别数据
                this.projectnamelist=[],//项目列表
                this.dealprojectnamelist=[]//渲染列表
                let patientinfo=localStorage.getItem('userxinxi')
                let data=JSON.parse(patientinfo)
                this.form.reqphysician=data.hosdocname//申请医生

                var examlist=await this._fetchchemicalexamlist()
                this.dealchecklist=this._dealchemicalexamlist(examlist)
                
                // this.form.doctorno=data.doctor//申请医生编码
                // this.form.reqdept=data.registerdept//申请科室
                // this.form.patientid=data.patientid//患者卡号
                // this.form.clinicno=data.clinicno
                // this.form.visitno=data.visitno
                // this.tradeno=data.tradeno
                let now=new Date();
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                this.form.sysdate=y+'-'+m+'-'+d;
                if(m<10){
                    m='0'+m
                }
                if(d<10){
                    d="0"+d
                }
                this.form.visitdate=y+'-'+m+'-'+d;
            }

        },
        mounted(){
            this.init()
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
    display: flex;
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
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