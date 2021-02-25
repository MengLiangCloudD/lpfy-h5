<template>
    <div class="notice" style="-webkit-overflow-scrolling: touch;height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white;">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            <span style="font-size:18px;">挂号须知</span>
        </div>
        <div class="content">
          <p>尊敬的各位患者及家属：</p>
          <p
            style="margin-top:20px"
          >为了给您提供便捷、舒心、有序的挂号就诊服务，承德市医院管理局和全部市属医院共同打造滦平妇幼服务平台，现将服务流程和规则介绍如下：</p>
          <p style="margin-top:20px">一、线上挂号</p>
          <p>1．同一个临时卡，只能锁定一个号源（即只能有一个待取号、待缴费的挂号记录）；</p>
          <p>2．同一账号，1天最多只能取消挂号2次，超过2次后，无法通过微信或自助机挂号，只能到医院窗口挂号;</p>
          <p>3．同一患者，同一天，同一就诊单元，同一科室（二级科室），同一医院，同一级别，只能挂1个号（已挂1个专家号，则还可挂1个普通号；若已挂1个普通号，则还可以挂1个普通号或1个专家号）；</p>
          <p>4．同一患者，同一自然周（星期一到星期日），最多可挂10个号，其中不超过5个专家号7.患者一个自然月内，最多可挂15个号，其中不超过10个专家号；</p>
          <p>5．同一患者，同一自然月（1－31日），最多可挂15个号，其中不超过10个专家号；</p>
          <p>6．同一患者，同一季度内（1月到3月），最多可挂30个号，其中不超过15个专家号；</p>
          <p>7．患者个人原因退号，所退号源仍占用挂号名额；因医生停诊、系统问题等导致的退号，不占用可挂号的名额。</p>
          <p style="margin-top:20px">二、自助机挂号、取号</p>
          <p>1．自助机预约挂号完成后会打印预约单，预约单不能作为就诊凭证使用，患者仍需于就诊当日在自助机上取号；</p>
          <p>2．自助机只支持患者就诊当天取号，不可提前取号；</p>
          <p>3．就诊当天，工作日上午号需在11:30前取号，下午号需在16:30前取号，周末上午号需在11:30前取号，下午号需在16:00前取号，未取号，视为爽约，该号不退不换。</p>
          <p style="margin-top:20px">三、支付</p>
          <p>1．为保证患者就诊权益，落实实名就诊要求，微信未绑定银行卡的患者不允许使用微信支付。</p>
          <p style="margin-top:20px">四、退号</p>
          <p>1．未到就诊当天可在线退号退费，就诊当天请到医院办理退号退费，逾期将不可办理退号退费；</p>
          <p>2．就诊当天，未取号，可在“候诊时间”段起始时间前在自助机办理；已取号，上午号凭挂号单需在11:30前窗口办理退号退费，下午号凭挂号单需在16:30前窗口办理退号退费，逾期将不可办理退号退费。</p>
          <p style="margin-top:20px">五、爽约</p>
          <p>1.爽约的定义</p>
          <p>就诊单元内未取号，视为爽约</p>
          <p>2.爽约规则</p>
          <p>（1）同一患者一个自然年内爽约3次，包含第三次爽约时间的91天内不可预约挂号（微信、自助机均不可预约挂号），仅能在自助机挂当天号</p>
          <p>（2）爽约次数会在下一自然年清零，重新计数</p>
          <p style="margin-top:20px">六、建卡</p>
          <p>在线建滦平妇幼临时卡和滦平社保卡预约开户请务必填写准确的实名信息，若线下核对信息与实际的不符，将不能领取滦平妇幼实体卡和关联滦平妇幼账户，从而无法就诊，由此带来的损失须本人承担。</p>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/registeredInfo');
            },
        }
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
    margin: 10px;
    
}
</style>