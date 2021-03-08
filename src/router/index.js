import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path: "/",
      name: "indexPage",
      redirect: "/home",
    },
    /**=========================================================== 挂号 ============================================== */
    //首页
    {
      path: "/home",
      name: "homePage",
      component: resolve=>(require(["@/components/user/registration/home"],resolve)),
    },
    //挂号医生详情页
    {
      path: "/appointment",
      name: "appointment",
      component: resolve=>(require(["@/components/user/registration/appointment"],resolve)),
    },
    //免费号详情页
    {
      path: "/mianAppointmen",
      name: "mianAppointmen",
      component: resolve=>(require(["@/components/user/registration/mianAppointmen"],resolve)),
    },
    //确认挂号界面
    {
      path: "/registeredInfo",
      name: "registeredInfo",
      component: resolve=>(require(["@/components/user/registration/registeredInfo"],resolve)),
    },
    //选择患者界面
    {
      path: "/selectuser",
      name: "selectuser",
      component: resolve=>(require(["@/components/user/registration/selectuser"],resolve)),
    },
    //挂号须知
    //选择患者界面
    {
      path: "/notice",
      name: "notice",
      component: resolve=>(require(["@/components/user/registration/notice"],resolve)),
    },
    
    /**=========================================================== 患者个人中心 ============================================== */
    // 主页
    {
      path: "/HomePage",
      name: "HomePage",
      component: resolve=>(require(["@/components/user/usereContre/HomePage"],resolve)),
    },
    //我的就诊卡
    {
      path: "/MyCard",
      name: "MyCard",
      component: resolve=>(require(["@/components/user/usereContre/MyCard/MyCard"],resolve)),
    },
    //挂号订单
    {
      path: "/GuaorderList",
      name: "GuaorderList",
      component: resolve=>(require(["@/components/user/usereContre/GuaorderList/GuaorderList"],resolve)),
    },
    //评价
    {
      path: "/Orderevaluate",
      name: "Orderevaluate",
      component: resolve=>(require(["@/components/user/usereContre/GuaorderList/Orderevaluate"],resolve)),
    },
    //我的病历
    {
      path: "/Mycase",
      name: "Mycase",
      component: resolve=>(require(["@/components/user/usereContre/Mycase/Mycase"],resolve)),
    },
    {
      path: "/Mycase1",
      name: "Mycase1",
      component: resolve=>(require(["@/components/user/usereContre/Mycase/Mycase1"],resolve)),
    },
    
    //我的关注
    {
      path: "/myCollect",
      name: "myCollect",
      component: resolve=>(require(["@/components/user/usereContre/myCollect/myCollect"],resolve)),
    },
    //我的化验结果
    {
      path: "/Myassay",
      name: "Myassay",
      component: resolve=>(require(["@/components/user/usereContre/Myassay/Myassay"],resolve)),
    },
    {
      path: "/Myassay1",
      name: "Myassay1",
      component: resolve=>(require(["@/components/user/usereContre/Myassay/Myassay1"],resolve)),
    },
    {
      path: "/MyassayInfor",
      name: "MyassayInfor",
      component: resolve=>(require(["@/components/user/usereContre/Myassay/MyassayInfor"],resolve)),
    },
    
    //我的检查处方
    {
      path: "/Myincidentals",
      name: "Myincidentals",
      component: resolve=>(require(["@/components/user/usereContre/Myincidentals/Myincidentals"],resolve)),
    },
    //我的化验处方
    {
      path: "/Laboratorys",
      name: "Laboratorys",
      component: resolve=>(require(["@/components/user/usereContre/Laboratorys/Laboratorys"],resolve)),
    },
    {
      path: "/video",
      name: "video",
      component: resolve=>(require(["@/components/user/usereContre/video/video"],resolve)),
    },
    
    //我的药品处方
    {
      path: "/Myprescription",
      name: "Myprescription",
      component: resolve=>(require(["@/components/user/usereContre/Myprescription/Myprescription"],resolve)),
    },
    {
      path: "/Myprescription1",
      name: "Myprescription1",
      component: resolve=>(require(["@/components/user/usereContre/Myprescription/Myprescription1"],resolve)),
    },
    //我的治疗处方
    {
      path: "/Mycure",
      name: "Mycure",
      component: resolve=>(require(["@/components/user/usereContre/Mycure/Mycure"],resolve)),
    },
    //我的治疗处方
    {
      path: "/MyExamine",
      name: "MyExamine",
      component: resolve=>(require(["@/components/user/usereContre/MyExamine/MyExamine"],resolve)),
    },
    {
      path: "/MyExamine1",
      name: "MyExamine1",
      component: resolve=>(require(["@/components/user/usereContre/MyExamine/MyExamine1"],resolve)),
    },
    {
      path: "/MyExamineInfor",
      name: "MyExamineInfor",
      component: resolve=>(require(["@/components/user/usereContre/MyExamine/MyExamineInfor"],resolve)),
    },
    
    //我的评价界面
    {
      path: "/Myevaluation",
      name: "Myevaluation",
      component: resolve=>(require(["@/components/user/usereContre/Myevaluation/Myevaluation"],resolve)),
    },
    //咨询订单页
    {
      path: "/inquiryList",
      name: "inquiryList",
      component: resolve=>(require(["@/components/user/usereContre/inquiryList/inquiryList"],resolve)),
    },
    {
      path: "/elePingja",
      name: "elePingja",
      component: resolve=>(require(["@/components/user/usereContre/inquiryList/elePingja"],resolve)),
    },
    {
      path: "/appletCard",
      name: "appletCard",
      component: resolve=>(require(["@/components/user/usereContre/inquiryList/appletCard"],resolve)),
    },
    {
      path: "/setImg",
      name: "setImg",
      component: resolve=>(require(["@/components/user/usereContre/inquiryList/setImg"],resolve)),
    },
    
    /**=========================================================== 咨询 ============================================== */

    /**=========================================================== 其他 ============================================== */
    //建卡
    {
      path: "/authentication",
      name: "authentication",
      component: resolve=>(require(["@/components/user/else/authentication"],resolve)),
    },
    //支付
    {
      path: "/payment",
      name: "payment",
      component: resolve=>(require(["@/components/user/else/payment"],resolve)),
    },
    //诊疗
    {
      path: "/reportss",
      name: "reportss",
      component: resolve=>(require(["@/components/user/else/reportss"],resolve)),
    },
    {
      path: "/inforreport",
      name: "inforreport",
      component: resolve=>(require(["@/components/user/else/inforreport"],resolve)),
    },
    {
      path: "/detailinfo",
      name: "detailinfo",
      component: resolve=>(require(["@/components/user/else/detailinfo"],resolve)),
    },
    /**=========================================================== 医生个人中心 ============================================== */
    //工会福利
    
    {
      path: "/welfare",
      name: "welfare",
      component: resolve=>(require(["@/components/doctor/doctorCenter/welfare/welfare"],resolve)),
    },
    // 医生个人中心主页
    {
      path: "/Personalcenter",
      name: "Personalcenter",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Personalcenter"],resolve)),
    },
    //
    {
      path: "/Personalprofile",
      name: "Personalprofile",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Personalprofile/Personalprofile"],resolve)),
    },
    {
      path: "/staffPay",
      name: "staffPay",
      component: resolve=>(require(["@/components/doctor/doctorCenter/staffPay/staffPay"],resolve)),
      
    },
    //医生出诊列表
    {
      path: "/doctorvisit",
      name: "doctorvisit",
      component: resolve=>(require(["@/components/doctor/doctorCenter/doctorvisit/doctorvisit"],resolve)),
    },
    //未就诊患者挂号列表
    {
      path: "/registeredlist",
      name: "registeredlist",
      component: resolve=>(require(["@/components/doctor/doctorCenter/registeredlist/registeredlist"],resolve)),
    },
    //已就诊患者挂号列表
    {
      path: "/Historicpatients",
      name: "registeredlist",
      component: resolve=>(require(["@/components/doctor/doctorCenter/registeredlist/Historicpatients"],resolve)),
    },
    //医生二维码
    {
      path: "/MaxCard",
      name: "MaxCard",
      component: resolve=>(require(["@/components/doctor/doctorCenter/MaxCard/MaxCard"],resolve)),
    },
    //关注的患者
    {
      path: "/Concernedpatients",
      name: "Concernedpatients",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Concernedpatients/Concernedpatients"],resolve)),
    },
    //医生收入
    {
      path: "/Mywallet",
      name: "Mywallet",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Mywallet/Mywallet"],resolve)),
    },
    {
      path: "/zixunPrice",
      name: "zixunPrice",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Mywallet/zixunPrice"],resolve)),
    },
    
    //医生收入
    {
      path: "/docDetail",
      name: "docDetail",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Mywallet/docDetail"],resolve)),
    },
    // 评论中心
    
    {
      path: "/Commentinformation",
      name: "Commentinformation",
      component: resolve=>(require(["@/components/doctor/doctorCenter/Commentinformation/Commentinformation"],resolve)),
    },
    /**================================================================医生操作========================================= */
    //医生开方
    {
      path: "/detail",
      name: "detail",
      component: resolve=>(require(["@/components/doctor/doctorOperation/detail"],resolve)),
    },
    /**===========================================================  =====管理端========================================= */
    //首页
    {
      path: "/admin",
      name: "admin",
      component: resolve=>(require(["@/components/admin/admin"],resolve)),
    },
    // 挂号收入
    {
      path: "/Incomestatements",
      name: "Incomestatements",
      component: resolve=>(require(["@/components/admin/Incomestatements/Incomestatements"],resolve)),
    },
    //收入明细
    {
      path: "/particulars",
      name: "particulars",
      component: resolve=>(require(["@/components/admin/Incomestatements/particulars"],resolve)),
    },
    //科室列表
    {
      path: "/administrativemanagement",
      name: "administrativemanagement",
      component: resolve=>(require(["@/components/admin/adminDepte/administrativemanagement"],resolve)),
    },
    //医生管理
    {
      path: "/doctormanagement",
      name: "doctormanagement",
      component: resolve=>(require(["@/components/admin/doctorAdmin/doctormanagement"],resolve)),
    },
    //管理下的医生
    {
      path: "/adminDowndoc",
      name: "adminDowndoc",
      component: resolve=>(require(["@/components/admin/doctorAdmin/adminDowndoc"],resolve)),
    },
    //添加管理的医生
    {
      path: "/adddoctor",
      name: "adddoctor",
      component: resolve=>(require(["@/components/admin/doctorAdmin/adddoctor"],resolve)),
    },
    //医生账单
    {
      path: "/zhangdan",
      name: "zhangdan",
      component: resolve=>(require(["@/components/admin/doctorAdmin/zhangdan"],resolve)),
    },
    {
      path: "/zixunxinx",
      name: "zixunxinx",
      component: resolve=>(require(["@/components/admin/doctorAdmin/zixunxinx"],resolve)),
    },
    
    //我管理的医生
    {
      path: "/myDoctor",
      name: "myDoctor",
      component: resolve=>(require(["@/components/admin/doctorAdmin/myDoctor"],resolve)),
    },
    //医生二维码
    
    {
      path: "/docCard",
      name: "docCard",
      component: resolve=>(require(["@/components/admin/doctorAdmin/docCard"],resolve)),
    },
    //患者病历权限管理
    {
      path: "/authoritymanagement",
      name: "authoritymanagement",
      component: resolve=>(require(["@/components/admin/authoritymanagement/authoritymanagement"],resolve)),
    },
    
    /**==========================================================医生端患者信息========================================= */
    // 主页
    {
      path: "/doctorckeck",
      name: "doctorckeck",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckeck"],resolve)),
    },
    //患者病历
    {
      path: "/doctorckeckrec",
      name: "doctorckeckrec",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckeckrec/doctorckeckrec"],resolve)),
    },
    //患者检查信息
    {
      path: "/doctorckeckjc",
      name: "doctorckeckjc",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckeckjc/doctorckeckjc"],resolve)),
    },
    //患者化验信息
    {
      path: "/doctorckecktest",
      name: "doctorckecktest",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckecktest/doctorckecktest"],resolve)),
    },
    //患者药品信息
    {
      path: "/doctorckeckdrug",
      name: "doctorckeckdrug",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckeckdrug/doctorckeckdrug"],resolve)),
    },
    // 患者检查结果
    {
      path: "/doctorckeckjcresult",
      name: "doctorckeckjcresult",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckeckjcresult/doctorckeckjcresult"],resolve)),
    },
    //患者化验结果
    {
      path: "/doctorckecktestresult",
      name: "doctorckecktestresult",
      component: resolve=>(require(["@/components/doctor/doctorUser/doctorckecktestresult/doctorckecktestresult"],resolve)),
    },
    //医生端聊天页
    {
      path: "/doctorMian",
      name: "doctorMian",
      component: resolve=>(require(["@/components/doctor/doctorMian/doctorMian"],resolve)),
    },
    {
      path: "/userOrderList",
      name: "userOrderList",
      component: resolve=>(require(["@/components/doctor/doctorMian/userOrderList"],resolve)),
    },
    {
      path: "/docNewList",
      name: "docNewList",
      component: resolve=>(require(["@/components/doctor/doctorMian/docNewList"],resolve)),
    },
    {
      path: "/artifact",
      name: "artifact",
      component: resolve=>(require(["@/components/doctor/doctorMian/artifact"],resolve)),
    },
    
    {
      path: "/zixunCase",
      name: "zixunCase",
      component: resolve=>(require(["@/components/doctor/doctorMian/zixunCase"],resolve)),
    },
    
    /**==========================================================咨询医生========================================= */
    //首页
    {
      path: "/ConsultHome",
      name: "ConsultHome",
      component: resolve=>(require(["@/components/user/userConsult/ConsultHome"],resolve)),
    },
    //医生详情
    {
      path: "/docparticular",
      name: "docparticular",
      component: resolve=>(require(["@/components/user/userConsult/docparticular/docparticular"],resolve)),
      
    },
    //医生详情
    {
      path: "/evaluationtent",
      name: "evaluationtent",
      component: resolve=>(require(["@/components/user/userConsult/docparticular/evaluationtent."],resolve)),
      
    },
    
    
    //聊天页
    {
      path: "/chatJieMian",
      name: "chatJieMian",
      component: resolve=>(require(["@/components/user/userConsult/chatJieMian/chatJieMian"],resolve)),
    },
    //医生列表
    {
      path: "/doctorList",
      name: "doctorList",
      component: resolve=>(require(["@/components/user/userConsult/doctorList/doctorList"],resolve)),
    },
    {
      path: "/userNewList",
      name: "userNewList",
      component: resolve=>(require(["@/components/user/userConsult/userNewList/userNewList"],resolve)),
    },
     /**==========================================================住院========================================= */
     //住院信息
     {
      path: "/Hospitalinformation",
      name: "Hospitalinformation",
      component: resolve=>(require(["@/components/user/behospitalized/Hospitalinformation"],resolve)),
    },
    {
      path: "/Hospitalmingxi",
      name: "Hospitalmingxi",
      component: resolve=>(require(["@/components/user/behospitalized/Hospitalmingxi"],resolve)),
    },
    
  ]
})
