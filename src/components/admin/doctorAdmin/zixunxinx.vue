<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
              咨询信息
        </div>
        <div class="content">
            <div class="input">
                <Form ref="formInline" :model="formInline"  :label-width="80">
                    <FormItem label="图文价格：">
                        <Input v-model="formInline.tuwenprice" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="视频价格：">
                        <Input v-model="formInline.shipingprice" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="图文出诊：">
                        <Select v-model="formInline.tuwem" style="width:200px">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="视频出诊：">
                        <Select v-model="formInline.shipin" style="width:200px">
                            <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long style="width:200px" @click="updateInfor()">修改</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http'
    export default {
        data () {
            return {
                biao:'添加医生',
                formInline: {
                    tuwenprice:'',
                    shipingprice:'',
                    tuwem:'',
                    shipin:''
                },
                cityList4: [
                    {
                        label: '出诊',
                        value: '0'
                    },
                    {
                        label: '不出诊',
                        value: '1'
                    },
                ],
                cityList5: [
                   {
                        label: '出诊',
                        value: '0'
                    },
                    {
                        label: '不出诊',
                        value: '1'
                    },
                ],
            }
        },
        methods: {
            // 返回上一层
            tobackdetail(){
                this.$router.push('/zhangdan')
            },
            //查询信息
            async selectInfor(){
                var that = this;
                var url = 'adminRefund/adminQueryDoctorStatusAndPrice';
                var data = {
                    doctorCode:that.$route.query.depcode
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.formInline.tuwenprice=res.data.graphic_consultation_price;
                    that.formInline.shipingprice=res.data.consult_price;
                    if(res.data.graphic_status==0){
                        that.formInline.tuwem='0'
                    }else{
                        that.formInline.tuwem='1'
                    }
                    if(res.data.consult_status==0){
                        that.formInline.shipin='0'
                    }else{
                        that.formInline.shipin='1'
                    }
                }
            },
            //修改咨询 信息
            async updateInfor(){
                 var that = this;
                var url = 'adminRefund/adminUpdateDoctorStatusAndPrice';
                var data = {
                    doctorCode:that.$route.query.depcode,
                    consultStatus:that.formInline.shipin,
                    graphicStatus:that.formInline.tuwem,
                    graphicConsultationPrice:that.formInline.tuwenprice,
                    consultPrice:that.formInline.shipingprice
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$Message.info('修改成功');
                }
            }
        },
        created() {
            this.selectInfor()
        },
    }
</script>

<style scoped>
.tittle {
  background: rgb(255, 255, 255);
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
.input{
    width: 80%;
    margin: 20px auto;
}
</style>