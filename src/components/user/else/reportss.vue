<template>
    <div class="reportpage">
        <div class="content">
            <div class="title">诊疗记录</div>
            <div class="content-box" >
                <!-- 主要内容 -->
                <div class="main-box">
                    <!-- 患者信息 -->
                    <div class="patient-info" v-show="!isshowdoctorlist">
                        <div class="tabbar-box">
                          <div @click="selecttabtag(0)" :class="{'active':curenttabindex==0}">已缴费订单</div>
                          <div @click="selecttabtag(1)" :class="{'active':curenttabindex==1}">未缴费订单</div>
                        </div>
                        <!-- 推送消息列表 -->
                        <div class="result" v-show="curenttabindex==0&&!isshowdetaile">
                          <div class="item-list">
                            <div  v-for="(item,index) in itemlist" :key="index"><p>{{item}}</p></div>
                          </div>
                          <div class="result-info-box">
                            <!-- 病历消息推送 -->
                            <div @click="showdetail('病历',0)">
                              <div>
                                <div class="title-text">{{recordlist!=null&&recordlist.diagdesc?"项目名称：":""}}</div>
                                <div class="content-text">{{recordlist!=null&&recordlist.diagdesc?"诊断":""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{recordlist!=null&&recordlist.diagdesc?"诊断信息：":""}}</div>
                                <div class="content-text overflow-text" style="">{{recordlist&&recordlist.diagdesc?recordlist.diagdesc:""}}</div>                               
                              </div>
                              <div class="cilcas">
                                <!-- {{recordlist!=null&&recordlist.diagdesc?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                            <!-- 检查推送消息 -->
                            <div @click="showdetail('检查',1)">
                              <div>
                                <div class="title-text">{{paychecklist.length>0?"项目名称：":""}}</div>
                                <div class="content-text">{{paychecklist.length>0?paychecklist[paychecklist.length-1].itemname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paychecklist.length>0?"科室位置：":""}}</div>
                                <div class="content-text overflow-text" style="">{{paychecklist.length>0?paychecklist[paychecklist.length-1].position:""}}</div>                               
                              </div>
                              <div class="cilcas">
                                 <!-- {{paychecklist.length>0?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                            <!-- 化验推送消息 -->
                            <div @click="showdetail('化验',2)">
                              <div>
                                <div class="title-text">{{paytestlist.length>0?"项目名称：":""}}</div>
                                <div class="content-text">{{paytestlist.length>0?paytestlist[paytestlist.length-1].itemname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paytestlist.length>0?"科室位置：":""}}</div>
                                <div class="content-text overflow-text" style="">{{paytestlist.length>0?paytestlist[paytestlist.length-1].position:""}}</div>                               
                              </div>
                              <div class="cilcas">
                                <!-- {{paytestlist.length>0?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                            <!-- 处方推送消息 -->
                            <div @click="showdetail('处方',3)">
                              <div>
                                <div class="title-text">{{paydrugslist.length>0?"项目名称：":""}}</div>
                                <div class="content-text">{{paydrugslist.length>0?paydrugslist[paydrugslist.length-1].drugname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paydrugslist.length>0?"科室位置：":""}}</div>
                                <div class="content-text overflow-text" style="">{{paydrugslist.length>0?"一楼大厅药房:":""}}</div>                               
                              </div>
                              <div class="cilcas">
                                <!-- {{paydrugslist.length>0?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                            <!-- 治疗消息推送 -->
                            <div @click="showdetail('治疗',4)">
                              <div>
                                <div class="title-text">{{payMycurelist.length>0?"项目名称：":""}}</div>
                                <div class="content-text">{{payMycurelist.length>0?payMycurelist[payMycurelist.length-1].itemname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{payMycurelist.length>0?"科室位置：":""}}</div>
                                <div class="content-text overflow-text" style="">{{payMycurelist.length>0?payMycurelist[payMycurelist.length-1].position:""}}</div>                               
                              </div>
                              <div class="cilcas">
                                <!-- {{payMycurelist.length>0?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                            <!-- 住院消息推送 -->
                            <div @click="showdetail('住院',5)">
                              <div>
                                <div class="title-text">{{hospitalizedlist.length>0?"项目名称：":""}}</div>
                                <div class="content-text">{{hospitalizedlist.length>0?hospitalizedlist[hospitalizedlist.length-1].drugname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{hospitalizedlist.length>0?"科室位置：":""}}</div>
                                <div class="content-text overflow-text" style="">{{hospitalizedlist.length>0?hospitalizedlist[hospitalizedlist.length-1].position:""}}</div>                               
                              </div>
                              <div class="cilcas">
                                <!-- {{hospitalizedlist.length>0?"...点击查看更多":""}} -->
                              </div>
                              <img src="./../../../common/imager/fanhui.png" alt="" class="fanhui">
                            </div>
                          </div>
                          
                        </div>
                        <!-- 未缴费信息 -->
                        <div class="checklist" v-show="curenttabindex==1" v-if="unpayobj.inspect.length!=0||unpayobj.cure.length!=0||unpayobj.assay.length!=0||unpayobj.drug.length!=0||unpayobj.sundry.length!=0">
                          <Collapse v-model="Collapsevalue">
                            <Panel name="1" v-if="unpayobj.inspect">
                              <span>检查处方({{querylength("inspect")}})</span>
                              <div slot="content"  class="tesgt">
                                  <div  class="text" v-for="(item,index) in unpayobj.inspect" :key="index">
                                      <p>
                                        <span class="text-title">流水单号：</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期：</span>
                                        <span class="text-info">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.RecipeDate)[0]}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室：</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生：</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述：</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用：</span>
                                        <span>￥{{item.TotalFee}}</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="2" v-if="unpayobj.cure">
                              <span>治疗处方({{querylength("cure")}})</span>
                              <div slot="content"  class="tesgt">
                                  <div  class="text" v-for="(item,index) in unpayobj.cure" :key="index" >
                                      <p>
                                        <span class="text-title">流水单号：</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期：</span>
                                        <span class="text-info">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.RecipeDate)[0]}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室：</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生：</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述：</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用：</span>
                                        <span>￥{{item.TotalFee}}</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="3" v-if="unpayobj.assay">
                              <span>化验处方({{querylength("assay")}})</span>
                              <div slot="content"  class="tesgt">
                                  <div  class="text" v-for="(item,index) in unpayobj.assay" :key="index" >
                                      <p>
                                        <span class="text-title">流水单号:</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期:</span>
                                        <span class="text-info">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.RecipeDate)[0]}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室:</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生:</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述:</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用:</span>
                                        <span>￥{{item.TotalFee}}</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="4" v-if="unpayobj.drug">
                              <span>药品处方({{querylength("drug")}})</span>
                              <div slot="content"  class="tesgt">
                                  <div  class="text" v-for="(item,index) in unpayobj.drug" :key="index" >
                                      <p>
                                        <span class="text-title">流水单号:</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期：</span>
                                        <span class="text-info">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.RecipeDate)[0]}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室：</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生：</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述：</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用：</span>
                                        <span>￥{{item.TotalFee}}</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="5" v-if="unpayobj.sundry">
                              <span>杂费处方({{querylength("sundry")}})</span>
                              <div slot="content" class="tesgt">
                                  <div  class="text" v-for="(item,index) in unpayobj.sundry" :key="index" >
                                      <p>
                                        <span class="text-title">流水单号：</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期：</span>
                                        <span class="text-info">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.RecipeDate)[0]}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室：</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生：</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述：</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用：</span>
                                        <span>￥{{item.TotalFee}}</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                          </Collapse>
                          <div class="submit-box">
                            <div class="bttent" @click="submit">
                              <div class="jiesaun">立即支付</div>
                              <div class="heh">合计 ￥{{payFee}}</div>
                            </div>
                            <!-- <div class="payfee">合计 ￥{{payFee}}</div>
                            <button class="submitbtn" >结算</button> -->
                          </div>
                        </div>
                        <!-- 已缴费详情 -->
                        <div class="checkdetail" v-show="curenttabindex==0&&isshowdetaile">
                          <div class="item-list">
                            <div :class="{'activebtn':index==activeindex}" @click="showdetail(item,index)" v-for="(item,index) in itemlist" :key="index"><p>{{item}}</p></div>
                          </div>
                          <div class="checkdetail-info-box" >
                            <div class="records" v-show="activeindex==0">
                              <div class="data-null" v-show="recordlist==null">暂无数据</div>
                              <div class="record-item" v-if="recordlist!=null">
                                  <p v-if="recordlist.visitdate!==undefined">
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{recordlist.visitdate}}</span>
                                  </p>
                                  <p v-if="recordlist.visitno!==undefined">
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{recordlist.visitno}}</span>
                                  </p>
                                  <!-- <p v-if="recordlist.cardno!==undefined">
                                      <span class="item-title">患者卡号：</span>
                                      <span class="item-content">{{item.cardno}}</span>
                                  </p> -->
                                  <p v-if="recordlist.doctor!==undefined">
                                      <span class="item-title">医生姓名：</span>
                                      <span class="item-content">{{recordlist.doctor}}</span>
                                  </p>
                                  <!-- <p v-if="recordlist.doctorno!==undefined">
                                      <span class="item-title">医生编码：</span>
                                      <span class="item-content">{{item.doctorno}}</span>
                                  </p> -->
                                  <p v-if="recordlist.diagdesc!==undefined&&recordlist.diagdesc!==null">
                                      <span class="item-title">诊断结果：</span>
                                      <span class="item-content">{{recordlist.diagdesc}}</span>
                                  </p>
                                  <p v-if="recordlist.illnessdesc!==undefined&&recordlist.illnessdesc!==null">
                                      <span class="item-title">医生主诉：</span>
                                      <span class="item-content">{{recordlist.illnessdesc}}</span>
                                  </p>
                                  <p v-if="recordlist.advice!==undefined&&recordlist.advice!==null">
                                      <span class="item-title">医生建议：</span>
                                      <span class="item-content">{{recordlist.advice}}</span>
                                  </p>
                                  <p v-if="recordlist.memo!==undefined&&recordlist.memo!==null">
                                      <span class="item-title">医生备注：</span>
                                      <span class="item-content">{{recordlist.memo}}</span>
                                  </p>
                                  <p v-if="recordlist.maternity!==undefined&&recordlist.maternity!==null"> 
                                      <span class="item-title">婚孕历史：</span>
                                      <span class="item-content">{{recordlist.maternity}}</span>
                                  </p>
                                  <p v-if="recordlist.menses!==undefined&&recordlist.menses!==null"> 
                                    <span class="item-title">月经历史：</span>
                                    <span class="item-content">{{recordlist.menses}}</span>
                                  </p>
                                  <p v-if="recordlist.anamnesis!==undefined&&recordlist.anamnesis!==null"> 
                                    <span class="item-title">既往病史：</span>
                                    <span class="item-content">{{recordlist.anamnesis}}</span>
                                  </p>
                                  <p v-if="recordlist.individual!==undefined&&recordlist.individual!==null"> 
                                    <span class="item-title">个人病史：</span>
                                    <span class="item-content">{{recordlist.individual}}</span>
                                  </p>
                                  <p v-if="recordlist.familyill!==undefined&&recordlist.familyill!==null"> 
                                    <span class="item-title">家族病史：</span>
                                    <span class="item-content">{{recordlist.familyill}}</span>
                                  </p>
                                  <p v-if="recordlist.medhistory!==undefined&&recordlist.medhistory!==null"> 
                                    <span class="item-title">现在病史：</span>
                                    <span class="item-content">{{recordlist.medhistory}}</span>
                                  </p>
                                  <p v-if="recordlist.marrital!==undefined&&recordlist.marrital!==null">
                                    <span class="item-title">婚姻历史：</span>
                                    <span class="item-content">{{recordlist.marrital}}</span>
                                  </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==1">
                              <div class="data-null" v-show="daelpaychecklist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaychecklist" :key="index">
                                <div class="check_title">
                                  <span class="title_biao"></span>
                                  <span class="title_txt">检查</span>
                                  <div class="tit_right">
                                    <span class="tit_right_txt"  @click="showdetaillist('check',items.list)">查看详情</span>
                                    <img src="./../../../common/imager/fanhui.png"  class="tit_right_img" alt="">
                                  </div>
                                </div>
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">检查处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">检查地址：</span>
                                      <span class="item-content">{{items.list[0].position}}</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" >￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==2">
                              <div class="data-null" v-if="daelpaytestlist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaytestlist" :key="index">
                                <div class="check_title">
                                  <span class="title_biao"></span>
                                  <span class="title_txt">化验</span>
                                  <div class="tit_right">
                                    <span class="tit_right_txt" @click="showdetaillist('test',items.list)">查看详情</span>
                                    <img src="./../../../common/imager/fanhui.png"  class="tit_right_img" alt="">
                                  </div>
                                </div>
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">化验处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">化验地址：</span>
                                      <span class="item-content">{{items.list[0].position}}</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" >￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==3">
                              <div class="data-null" v-show="daelpaydruglist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaydruglist" :key="index">
                                <div class="check_title">
                                  <span class="title_biao"></span>
                                  <span class="title_txt">处方</span>
                                  <div class="tit_right">
                                    <span class="tit_right_txt"  @click="showdetaillist('drug',items.list)">查看详情</span>
                                    <img src="./../../../common/imager/fanhui.png"  class="tit_right_img" alt="">
                                  </div>
                                </div>
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">药品处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">取药地址：</span>
                                      <span class="item-content">一楼大厅药房</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" >￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==4">
                              <div class="data-null" v-if="daelMycurelist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelMycurelist" :key="index">
                                <div class="check_title">
                                  <span class="title_biao"></span>
                                  <span class="title_txt">治疗</span>
                                  <div class="tit_right">
                                    <span class="tit_right_txt"  @click="showdetaillist('cure',items.list)">查看详情</span>
                                    <img src="./../../../common/imager/fanhui.png"  class="tit_right_img" alt="">
                                  </div>
                                </div>
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">治疗处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">治疗地址：</span>
                                      <span class="item-content">{{items.list[0].position}}</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" >￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==5">
                              <div class="data-null" v-show="hospitalizedlist.length==0">暂无数据</div>
                               <div v-for="(items,index) in hospitalizedlist" :key="index">
                                  <p>
                                      <span>患者姓名：</span>
                                      <span>{{items.name}}</span>
                                  </p>
                                  <p>
                                      <span>患者卡号：</span>
                                      <span>{{items.patient_id}}</span>
                                  </p>
                                  <p>
                                    <span>门诊诊断：</span>
                                    <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" >{{items.diagnosis_desc}}</span>
                                  </p>
                                  <p>
                                    <span>入院科室：</span>
                                    <span>{{items.dept_name}}</span>
                                  </p>
                                  <p>
                                    <span>通知次数：</span>
                                    <span>{{items.notice_id}}</span>
                                  </p>
                                  <p>
                                    <span>详细数据：</span>
                                    <span style="color:blue" @click="mod4click(index)">查看></span>
                                  </p>
                                   <Modal v-model="mod4" fullscreen title="入院信息">
                                      <div class="motel">
                                          <div>
                                              <p>
                                                  <span>患者姓名：</span>
                                                  <span >{{itemes.name}}</span>
                                              </p>
                                          </div>
                                            <div>
                                            <p>
                                                  <span style="text-indent:2rem;">民族：</span>
                                                  <span >{{itemes.nation}}</span>
                                            </p>
                                          </div>
                                          <div>
                                            <p>
                                                  <span>患者性别：</span>
                                                  <span >{{itemes.sex}}</span>
                                            </p>
                                          </div>
                                          <div>
                                                <p>
                                                  <span>出生日期：</span>
                                                  <span>{{datatranst(itemes.date_of_birth)}}</span>
                                              </p>
                                            </div>
                                              <div>
                                                <p>
                                                  <span style="text-indent:1rem;">现住址：</span>
                                                  <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" @click="modddel101()">{{itemes.insurance_aera}}</span>
                                              </p>
                                            </div>
                                          <div>
                                              <p>
                                                  <span>患者卡号：</span>
                                                  <span>{{itemes.patient_id}}</span>
                                              </p>
                                          </div>
                                          <div>
                                              <p>
                                                  <span>电话号码：</span>
                                                  <span>{{itemes.insurance_aera_phone}}</span>
                                              </p>
                                          </div>
                                          <div>
                                              <p >
                                                  <span>身份证号：</span>
                                                  <span >{{itemes.id_no}}</span>
                                              </p>
                                          </div>
                                            <div>
                                                <p >
                                                  <span>婚姻状况：</span>
                                                  <span>{{itemes.marital_status}}</span>
                                              </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>医生姓名：</span>
                                                  <span>{{itemes.operator}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p >
                                                  <span>门诊诊断：</span>
                                                  <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" @click="modddel1011()">{{itemes.diagnosis_desc}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>发病日期：</span>
                                                  <span>{{datatranst(itemes.onset_date)}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>入院科室：</span>
                                                  <span>{{itemes.dept_name}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>入院日期：</span>
                                                  <span>{{datatranst(itemes.admission_date_time)}}</span>
                                                </p>
                                            </div>
                                              <div>
                                                <p>
                                                  <span>通知次数：</span>
                                                  <span>{{itemes.notice_id}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span style="text-indent:1rem;">联系人：</span>
                                                  <span>{{items.next_of_kin}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>联系人民族：</span>
                                                  <span style="padding-right:14px">{{itemes.next_of_nation}}</span>
                                                </p>
                                            </div>
                                            <div class="a">
                                                <p>
                                                  <span>联系人地址：</span>
                                                  <span style="padding-right:14px;svertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;vertical-align: middle;" @click="modddel10()">{{itemes.next_of_kin_addr}}</span>
                                                </p>
                                            </div>
                                      </div>  
                                  </Modal>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                    </div>
                    <!-- 可选医生列表 -->
                    <div class="doctor-list" v-show="isshowdoctorlist">
                      <div v-for="(item,index) in doctorlist" :key="index" @click="selectdoctor(item,index)">
                        <div>
                          <img class="avatar" src="./../../../common/imager/toux.png" alt="">
                        </div>
                        <div class="textinfo">
                          <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                          <p><span>医生编号：</span><span>{{item.doctor_code}}</span></p>
                        </div>
                        <div class="icon-box">
                          <div class="icon-w">
                            <div class=" un-icon-n" :class="{'icon-n':currenticonindex==index}">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <!-- <div class=" tip" >
              今日暂无数据
            </div> -->
        </div>
        <Modal
            v-model="drugmodel"
            fullscreen 
            :footer-hide="true"
            title="处方明细"
            >
            <div  class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;">
              <div  style="font-size:18px;padding:10px 0;" >
                <span class="reports_biao">

                </span>
                <span class="reports_txt">
                  {{item.drugname}}
                </span>
                
              </div>
              <p><span>编码：</span><span>{{item.drugcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>规格：</span><span>{{item.drugspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
              <p><span>用法：</span><span>{{item.administration}}</span></p>
              <p><span>频次：</span><span>{{item.frequency}}</span></p>
              <p><span>总价：</span><span style="color:red;font-size:18px;">￥{{item.costs.toFixed(2)}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="checkmodel"
            fullscreen 
            :footer-hide="true"
            title="检查明细"
            >
            <div class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;">
              <div  style="font-size:18px;padding:10px 0;" >
                <span class="reports_biao">

                </span>
                <span class="reports_txt">
                  {{item.itemname}}
                </span>
                
              </div>
              <p><span>编码：</span><span>{{item.itemcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item.charges.toFixed(2)}}</span></p>
              <p><span>规格：</span><span>{{item.itemspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="testmodel"
            fullscreen 
            :footer-hide="true"
            title="化验明细"
            >
            <div class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;">
              <div  style="font-size:18px;padding:10px 0;" >
                <span class="reports_biao">

                </span>
                <span class="reports_txt">
                  {{item.itemname}}
                </span>
                
              </div>
              <p><span>编码：</span><span>{{item.itemcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item.charges.toFixed(2)}}</span></p>
              <p><span>规格：</span><span>{{item.itemspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="curemodel"
            fullscreen 
            :footer-hide="true"
            title="化验明细"
            >
            <div class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;">
              <div  style="font-size:18px;padding:10px 0;" >
                <span class="reports_biao">

                </span>
                <span class="reports_txt">
                  {{item.itemname}}
                </span>
                
              </div>
              <p><span>编码：</span><span>{{item.itemcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item.charges.toFixed(2)}}</span></p>
              <p><span>规格：</span><span>{{item.itemspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="erromodal1"
            title="提示">
            <p>查询卡号失败，系统异常!</p>
        </Modal>
        <Modal
            v-model="erromodal"
            title="提示">
            <p>查询挂号医生失败，系统异常!</p>
        </Modal>
        <Modal
            v-model="paymodal"
            title="提示"
            @on-ok="selecttabtag(1)"
            >
            <p>有未缴费订单</p>
        </Modal>
        <Modal
            v-model="nonepaymodel"
            title="提示"
            >
            <p>没有需要缴费的订单！</p>
        </Modal>
        <tabbar  class="tabbar" @freshinit="freshinit"></tabbar>
        <loading v-show="isshowloading" class="loading"></loading>
        <div class="zhao" v-if="zhezhao">
          <!-- <div class="let">
             <Steps :current="1">
              <Step title="已支付" ></Step>
              <Step title="审核中" ></Step>
              <Step title="已完成"></Step>
            </Steps>
          </div> -->
         
          <div class="zhaoContent" >
            
            <svg t="1589168090256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7367" width="50" height="50"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM768 620c0 11.044-8.954 20-20 20L404 640c-0.814 0-1.614-0.062-2.402-0.158-1.216-0.146-2.406-0.386-3.544-0.74-0.096-0.032-0.188-0.074-0.284-0.106-7.992-2.62-13.768-10.126-13.768-18.996L384.002 276c0-11.046 8.956-20 20-20l88 0c11.044 0 20 8.954 20 20l0 236 236 0c11.046 0 20 8.956 20 20L768.002 620z" p-id="7368" fill="#1296db"></path></svg>
            <p>支付成功等待支付审核请稍后</p>
          </div>
        </div>
        <Modal v-model="weika"  @on-ok="weikas" @on-cancel='weikas' title="提示信息">
          <p>请先添加就诊卡</p>
        </Modal>
    </div>
</template>

<script>
import tabbar from "@/common/tabbar";
import loading from "../../../common/loading";
import http from '@/utils/http';
    export default {
        components: {
                tabbar,
                loading
            },
        data(){
            return{
                nonepaymodel:false,
                setlocaldayarr:[],
                hasfetchVisitRecList:false,
                Collapsevalue:'0',
                paymodellist:[],
                drugmodel:false,
                testmodel:false,
                checkmodel:false,
                activeindex:-1,
                paymodal:false,
                erromodal:false,
                isshowloading:false,
                currentdoctor:{},
                isshowdoctorlist:false,
                currenticonindex:0,
                curenttabindex:0,
                isshowdetaile:false,
                itemlist:['病历','检查','化验','处方','治疗','住院'],
                doctorlist:[],
                paytestlist:[],//已缴费化验订单
                paychecklist:[],//已缴费检查订单
                paydrugslist:[],//已缴费药品订单
                paycurelist:[],//已缴费治疗
                hospitalizedlist:[],//已缴费住院
                daelpaytestlist:[],//处理后的已缴费化验
                daelpaychecklist:[],//处理后的已缴费检查
                daelpaydruglist:[],//处理后的已缴费药品
                recordlist:[],//当天病历
                reportsList:[],//所有未缴费订单
                payFee:0,
                unpayobj:{inspect:[],
                cure:[],
                assay:[],
                drug:[],
                sundry:[]},
                docxiang:[],
                mod4:false,
                itemes:{},
                jiajie:'',
                cardsAll:[],
                erromodal1:false,
                payMycurelist:[],
                daelMycurelist:[],
                curemodel:false,
                zhezhao:false,
                weika:false
            }
        },
    
        methods:{
            //去往建卡界面
            weikas(){
              localStorage.setItem('herf',window.location.href);
              this.$router.push("/authentication");
              
            },
            async freshinit(num){
              // if(num!=0){
              //   const itemnum=await this.fetchItemsSum(this.currentdoctor)
              //   //如果itemnum大于0说明有未缴费订单出弹窗
              //   if(itemnum>0){
              //     this.paymodal=true
              //     this.hasfetchVisitRecList=false;
              //   }  
              // }
            },
            mod4click(index){
              this.mod4=true;
              this.itemes=this.hospitalizedlist[index];
            },
            datatranst(data) {
              let date = new Date(data);
              var Y = date.getFullYear();
              var m = date.getMonth() + 1;
              var d = date.getDate();
              var H = date.getHours();
              var i = date.getMinutes();
              if (m < 10) {
                m = "0" + m;
              }
              if (d < 10) {
                d = "0" + d;
              }
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              var t = Y + "-" + m + "-" + d ;
              if (t !== "NaN-NaN-NaN- NaN:NaN") {
                return t;
              } else {
                return "";
              }
            },
            async submit(){
              if(this.setlocaldayarr.length>0&&this.payFee!=0){
                localStorage.setItem('reportsfang',JSON.stringify(this.setlocaldayarr));
                localStorage.setItem('herf',window.location.href);
                localStorage.setItem("body", '微信处方'); //保存订单号
                localStorage.setItem("price", this.payFee); //保存订单号
                this.$router.push("/payment"); 
              }else if(this.setlocaldayarr.length>0&&this.payFee==0){
                let that = this;
                var url = 'patientRegister/queryNoPayTotalPrice';
                var data = {
                  recipeIDList:JSON.stringify(this.setlocaldayarr),
                  patientID:localStorage.getItem('cardno')
                }
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                  history.go(0);
                }
              }else
              {
                 this.$Message.warning('您暂无需交费的处方');
              }
            },
            querylength(type){
              let arr=[]
              if(this.unpayobj[type].length>0){
                for(let i=0;i<this.unpayobj[type].length;i++){
                  // if(this.unpayobj[type][i].Doctor==this.currentdoctor.name){
                    arr.push(this.unpayobj[type][i])
                  // }
                }
              }
              return arr.length
            },
            showdetaillist(type,data){
              this.paymodellist=data
              if(type=="check"){
                this.checkmodel=true
              }
              if(type=="test"){
                this.testmodel=true
              }
              if(type=="drug"){
                this.drugmodel=true
              }
              if(type=="cure"){
                this.curemodel=true
              }
            },
            //计算已缴费总价
            sumprice(items){
              let sum=0
              for(let i=0;i<items.length;i++){
                sum+=items[i].costs
              }
              return sum.toFixed(2)
            },
            //转换时间
            formatDate(now) { 
                  var year=now.getFullYear();//取得4位数的年份
                  var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                  var date=now.getDate();      //返回日期月份中的天数（1到31）
                  var hour=now.getHours();     //返回日期中的小时数（0到23）
                  var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                  var second=now.getSeconds(); //返回日期中的秒数（0到59）
                  return year+"-"+month+"-"+date; 
            },
            
            getdate(doctor){
              let currentDay = new Date();
              //获取当前年份
              let year = currentDay.getFullYear();
              //获取当前月份
              if( currentDay.getMonth() + 1<10){
              var mon = currentDay.getMonth() + 1;
              var month = '0'+mon;
              }else{
                var month = currentDay.getMonth() + 1;
              }
              //获取当天日期
              if( currentDay.getDate()<10){
                var mon =  currentDay.getDate();
                var day = '0'+mon;
              }else{
                var day =currentDay.getDate();
              }
              //当前年月日
              return year + "-" + month + "-" + day;
            },
            async init(doctor){
             
              if(localStorage.getItem('cardno')==undefined||localStorage.getItem('cardno')==null){
                var cardall = await this.getcards();
                  localStorage.setItem('cardno',cardall[0].cardno);
                  localStorage.setItem('cardername',cardall[0].name);
                        var alreadyfeeList=await this.alreadyfee();
                        
                        if(alreadyfeeList!=undefined){
                        //病历
                        if(alreadyfeeList.mediaclRecord!=null){
                          
                            this.recordlist=alreadyfeeList.mediaclRecord[0];
                        }else{
                          this.recordlist=[]
                        }
                        
                        //检查化验
                        var chaketeortest = alreadyfeeList.checkOrAssays;
                        if(chaketeortest.length>0){
                          for(var i = 0;i<chaketeortest.length;i++){
                            if(chaketeortest[i].itemclass=='C'){
                              this.paytestlist.push(chaketeortest[i]);
                              this.dealpaydate("test",this.paytestlist)
                            }else if(chaketeortest[i].itemclass=='D'){
                                  this.paychecklist.push(chaketeortest[i]);
                                  this.dealpaydate("check",this.paychecklist);
                            }
                          }
                        }else{
                          this.paytestlist=[]
                          this.daelpaytestlist=[]
                          this.paychecklist=[]
                          this.daelpaychecklist=[]
                        }
                        //治疗
                        var payMycurelist =  alreadyfeeList.treats;
                        if(payMycurelist.length>0){
                          this.payMycurelist=payMycurelist;
                          this.dealpaydate("cure",this.payMycurelist);
                        }else{
                          this.payMycurelist=[];
                          this.daelMycurelist=[];
                        }
                        //药品处方
                        var paydrugslist = alreadyfeeList.drugs;
                        if(paydrugslist.length>0){
                          this.paydrugslist=paydrugslist;
                          this.dealpaydate("drug",this.paydrugslist);
                        }else{
                          this.paydrugslist=[];
                          this.daelpaydruglist=[];
                        }
                    }
              }else{

                   var alreadyfeeList=await this.alreadyfee();
                   if(alreadyfeeList!=undefined){
                      //病历
                        this.recordlist=alreadyfeeList.mediaclRecord[0];
                      //检查化验
                      var chaketeortest = alreadyfeeList.checkOrAssays;
                      if(chaketeortest.length>0){
                        for(var i = 0;i<chaketeortest.length;i++){
                          if(chaketeortest[i].itemclass=='C'){
                            this.paytestlist.push(chaketeortest[i]);
                            this.dealpaydate("test",this.paytestlist)
                          }else if(chaketeortest[i].itemclass=='D'){
                                this.paychecklist.push(chaketeortest[i]);
                                this.dealpaydate("check",this.paychecklist);
                          }
                        }
                      }else{
                        this.paytestlist=[]
                          this.daelpaytestlist=[]
                          this.paychecklist=[]
                          this.daelpaychecklist=[]
                      }
                        //治疗
                        var payMycurelist =  alreadyfeeList.treats;
                        if(payMycurelist.length>0){
                          this.payMycurelist=payMycurelist;
                          this.dealpaydate("cure",this.payMycurelist);
                        }else{
                          this.payMycurelist=[];
                          this.daelMycurelist=[];
                        }
                        //药品处方
                        var paydrugslist = alreadyfeeList.drugs;
                        if(paydrugslist.length>0){
                          this.paydrugslist=paydrugslist;
                          this.dealpaydate("drug",this.paydrugslist);
                        }else{
                          this.paydrugslist=[];
                          this.daelpaydruglist=[];
                        }
                  }
              }
              
               
            },
            //获取卡号
            async getcards(){
             var url ="user/cardList";
              var data = {

              }
              var that = this;
              var res  = await http.post(that,url,data);
              if(res.errcode==0 && res.data.length!==0){
                return res.data
              }else{
                that.weika = true;
              }
            },
            toggledoctorlist(){
              this.isshowdoctorlist=!this.isshowdoctorlist;
            },
            selectdoctor(item,index){
              let that=this
              
              this.toggledoctorlist()
              if(item.doctor_code==this.currentdoctor.doctor_code){
                localStorage.setItem('hosdoccode',this.currentdoctor.doctor_code);
                return
              }
              this.currenticonindex=index
              this.currentdoctor=item
              localStorage.setItem('hosdoccode',this.currentdoctor.doctor_code);
              setTimeout(function(){
                that.init(item);
              },100)
              // this.sumpayfee(this.dayarr)
              
            },
           
            async fetchdealunpaydata(){
                let that=this
                const data=await that.fetchVisitRecList();
                this.hasfetchVisitRecList=true;
                
            },
            //切换已支付未支付
            selecttabtag(index){
              this.activeindex=-1
              this.curenttabindex=index
              if(index==0){
                this.isshowdetaile=false
              }
              if(index==1){
                let that=this
                if(!this.hasfetchVisitRecList){
                  setTimeout(function(){
                    that.fetchdealunpaydata();
                  },100)
                }
              }
            },
            showdetail(item,index){
              // this.isshowdetaile=true;
              // this.activeindex=index;
              if(index===0){
                localStorage.setItem("itemListItem", JSON.stringify(this.recordlist));
                localStorage.setItem("itemListName","病历");
                this.$router.push('/inforreport');
              }else if(index===1){
                localStorage.setItem("itemListItem",JSON.stringify(this.daelpaychecklist));
                localStorage.setItem("itemListName","检查");
                this.$router.push('/inforreport');
              }else if(index===2){
                localStorage.setItem("itemListItem",JSON.stringify(this.daelpaytestlist));
                localStorage.setItem("itemListName","化验");
                this.$router.push('/inforreport');
              }else if(index===3){
                localStorage.setItem("itemListItem",JSON.stringify(this.daelpaydruglist));
                localStorage.setItem("itemListName","药品");
                this.$router.push('/inforreport');
              }else if(index===4){
                localStorage.setItem("itemListItem",JSON.stringify(this.daelMycurelist));
                localStorage.setItem("itemListName","治疗");
                this.$router.push('/inforreport');
              }else if(index===5){
                // localStorage.setItem("itemListItem",JSON.stringify(this.hospitalizedlist));
                // localStorage.setItem("itemListName","住院");
                // this.$router.push('/inforreport');
              }
            },
           
            
           
            //获取已缴费信息
            async alreadyfee(){
              var that  = this;
              var url = 'patTreat/queryTreatmentPayedInfo';
              // var doctor_no=item.doctor_code;
              var data = {
                // doctor_no
              }
              var res  = await http.post(that,url,data);
              if(res.errcode==0&&res.data!=null){
                return res.data;
              }
            },
            dealpaydate(type,data){
              let _visitnoarr=[]
              let visitnoarr=[]
              let paylist=[]
              for(let i=0;i<data.length;i++){
                _visitnoarr.push(data[i].visitno)
              }
              for(let i=0;i<_visitnoarr.length;i++){
                if(visitnoarr.indexOf(_visitnoarr[i])==-1){
                  visitnoarr.push(_visitnoarr[i])
                }
              }
              for(let i=0;i<visitnoarr.length;i++){
                paylist.push({visitno:visitnoarr[i],list:[]})
              }
              for(let i=0;i<data.length;i++){
                let index=visitnoarr.indexOf(data[i].visitno)
                paylist[index].list.push(data[i])
              }
              if(type=="check"){
                this.daelpaychecklist=paylist
              }else if(type=="test"){
                this.daelpaytestlist=paylist
              }else if(type=="drug"){
                this.daelpaydruglist=paylist
              }else if(type=="cure"){
                this.daelMycurelist=paylist
              }
            },
            //查询未交费的处方
            async fetchVisitRecList(){
              var that = this;
              var url ="patTreat/queryTreatmentNoPayItems";
              var data ={

              }
              var res = await http.post(that,url,data)
              if(res.errcode==0 && res.data!=undefined&&res.data!=null){
                that.dealunpaydata(res.data.items);
                that.payFee=res.data.totalFee;
                that.setlocaldayarr = res.data.items;
              }
            },
            dealunpaydata(arr){
              // let arr=[]
              let sum=0
              let dayarr=[]
              let day=this.getdate()
              let unpayobj={
                inspect:[],
                cure:[],
                assay:[],
                drug:[],
                sundry:[]
              }
                for(let i=0;i<arr.length;i++){
                  //  if (/\d{4}-\d{1,2}-\d{1,2}/g.exec(arr[i].RecipeDate)[0]==day) {
                      dayarr.push(arr[i]);
                      if(arr[i].RecipeMsg=='检查'){
                        unpayobj.inspect.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='治疗'){
                        unpayobj.cure.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='化验'){
                        unpayobj.assay.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='西药'||arr[i].RecipeMsg=='中药'){
                        unpayobj.drug.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='杂费'){
                        unpayobj.sundry.push(arr[i]);
                      }
                    // }
                }
                this.dayarr=dayarr;
                this.unpayobj=unpayobj;
              // }
            },
            
            //获取住院报告
            beInHospital(){
              var that = this;
              var url ="details/beInHospital.do";
              var cardno  = localStorage.getItem("cardno");
              return new Promise((resolve,reject)=>{
                http({
                    method:'post',
                    url:url,
                    data:{
                       cardno: '1312231032'
                    },
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                    }
                }).then(function(res){
                  
                  var res = JSON.parse(res);
                    if(res.status=='1'){
                      resolve(res)
                    }
                }).catch(function (err) {
                   reject(err)
                });
              })
            },
        },
        mounted(){
          
          let that=this;
          if(that.$route.query.stater==0){
            that.zhezhao = true
            setTimeout(function(){
              that.zhezhao = false
              that.init();
            },2000)
          }else{
              that.isshowloading=true;
              var timerr = setInterval(() => {
                if(localStorage.getItem('token')!=''&&localStorage.getItem('token')!=undefined&&localStorage.getItem('token')!=null){
                  clearInterval(timerr);
                  that.init();
                }
              }, 500);
          }
          
          
        }
    }
</script>

<style scoped>
.let{
   padding: 50px 0 0 0;
}
.zhao{
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
  text-align: center;
}
.zhaoContent{
  padding: 150px 0 0 0;
}
.zhaoContent p{
  padding: 10px 0;
  font-size: 16px;
  color: #1296db;
}
.reportpage{
    height: 100%;
    position: relative;
}
.content{
    height: 100%;
    padding-bottom: 50px;
    overflow: auto;
}
.tip{
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
}
.main-box{

}
.reports p{
  /* display: flex; */
  padding: 0 20px;
}
.reports_biao{
  display: inline-block;
  width: 3px;
  height: 15px;
  background: rgb(40, 184, 161);
  vertical-align: middle;
  margin: 0 5px;
}
.reports_txt{
  display: inline-block;
  font-weight: bold;
  vertical-align: middle;
}
.reports p span:nth-child(1){
  /* flex: 1; */
}
/* 医生信息 */
.doctor-info{
    display: flex;
    padding: 7px 0;
    margin: 3px 0;
    border-bottom: 1px solid #ccc;
}
.doctor-info>div{
    align-self: center
}
.avatar{
    height: 15.33333vw;
    margin: 0 10px;
    margin-right: 25px;
}
.textinfo{
    flex: 1;
}
.textinfo p{
    line-height: 20px;
}
.selecticon{
    text-align: right;
    margin: 0 10px;
}
.iconarrow{
    margin-right: 10px;
}
/* 医生列表信息 */
.doctor-list>div{
    display: flex;
    margin: 10px 0;
    border-bottom: 1px solid #ccc;
}
.icon-box{
    align-self: center;
    
}
.icon-w{
  margin-right: 20px;
  height: 20px;
  width: 20px;
  padding: 3px;
  border:1px solid rgb(18,183,245);
  border-radius: 50%;
}
.un-icon-n{
  height: 12px;
  width: 12px;
  background: rgb(255, 255, 255);
  border-radius: 50%;
}
.icon-n{
  height: 12px;
  width: 12px;
  background: rgb(18,183,245);
  border-radius: 50%;
}

/*已缴费订单*/
.tabbar-box{
  display: flex;
}
.tabbar-box>div{
  flex:1;
  text-align: center;
  padding: 5vw 0;
}
.tabbar{
    position: absolute;
    bottom: 0;
}
.active{
  color: rgb(18,183,245);
  border-bottom: 2px solid rgb(18,183,245);
}
.title{
    background: rgb(40, 184, 161);
    font-size: 20px;
    color: white;
    padding: 10px 0;
    text-align: center;
}
.po{
  line-height: 2;
  display: inline-block;
  padding-left: 10px;
}
/* 推送消息列表 */
.result{
  display: flex;
  margin: 2px;
}
.result-info-box{
  flex: 1;
  margin-right: 2px;
}
.result-info-box>div{
  width: 100%;
  height: 80px;
  border:1px solid #dcdee2;
  margin-bottom: 2px;
  border-left: 0;
  padding: 15px 0;
  position: relative;
  /* border-radius: 5px; */
}
.fanhui{
  width: 8px;
  height: 15px;
  position: absolute;
  top: calc(50% - 7px);
  right: 20px;
}
.result-info-box>div>div{
  width: 100%;
  display: flex;
  line-height: 18px;
  padding: 0 7vw;
}
.cilcas{
  color: rgb(154,154,154);
}
.title-text{
  /* width: 80px; */
}
.content-text{
  flex: 1;
}
.overflow-text{
  /* height: 40px; */
  overflow: hidden;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
}
.item-list{
  width: 80px;
}
.item-list>div{
  text-align: center;
  height: 80px;
  /* padding:15px 20px; */
  border:1px solid #dcdee2;
  border-right: 1px solid rgb(238,238,238);
  line-height: 80px;
  /* border-radius: 5px; */
  margin-bottom: 2px;
}
.item-list>div p{
  /* line-height: 25px; */
}
/* 已缴费详情 */
.checkdetail{
  display: flex;
  margin: 2px;
}
.checkdetail-info-box{
  flex: 1;
  margin-right: 2px;
}
.item-list{
  width: 80px;
}
.item-list>div{
  height: 80px;
  /* padding:15px 20px; */
  border:1px solid #dcdee2;
  border-right: 1px solid rgb(238,238,238);
  /* border-radius: 5px; */
  margin-bottom: 2px;
}
.item-list>div p{
  /* line-height: 25px; */
}
/*  */
.records{

}
.record-item{
  margin:10px 0;
  border-bottom: 1px solid #e8eaec;
}
.record-item p{
  display: flex;
  padding:0 10px 0 20px;
  margin:5px 0;
}
.record-item .item-title{
  font-size: 14px;
  font-weight: bold;
  width: 80px;
}
.record-item .item-content{
  font-size: 14px;
  flex: 1;
}
/* 已缴费检查 */
.check-detail{
  
}
.check-detail>div{
  padding:5px 0px 5px 0px;
  border-bottom: 1px solid #e8eaec;
}
.check-detail>div p{
  /* display: flex; */
  line-height: 25px;
   margin:0px 10px 0px 20px;
}
.check-detail>div p .item-title{
  font-size: 14px;
  /* font-weight: bold; */
  width: 80px;
  /* flex: 1; */
}
.check-detail>div p .item-content{
  font-size: 14px;
  
}
/* animate */
.activebtn{
  background: rgb(40, 184, 161)
}
.data-null{
  border-bottom: 1px solid rgb(255, 255, 255) !important;
  text-align: center;
  font-size: 20px;
  margin: 50px;
}
/*  */
.text{
  border-bottom: 1px solid #e8eaec;
}
.tesgt .text:nth-last-of-type(1){
  border-bottom: 0;
}
.text p{
  /* display: flex; 
  */
  font-size: 14px;
  margin-left: 10px;
}
.text p:nth-last-of-type(1){
  text-align: right;
  margin-right: 10px;
}
.text-title{
  /* font-size: 16px; */
  /* font-weight: bold; */
  /* flex: 1; */
}
.text-info{
  /* font-size: 16px; */
}
/* 支付 */
.submit-box{
  text-align: center;
  /* position: absolute; */
  /* width: 100%;
  left: 0;
  bottom: 100px; */
  padding-top: 100px;
}
.bttent{
  display: inline-block;
  width: 60%;
  /* height: 50px; */
  /* line-height: 50px; */
  background: rgb(40, 184, 161);
  color: #fff;
  font-size: 12px;
  border-radius: 40px;
  padding: 5px 0;
}
.heh{
  font-size: 10px;
}
.payfee{
  text-align: center;
  font-size: 16px;
  color: red;
  margin: 10px 0;
}
.submitbtn{
  background: rgb(40, 184, 161);
  width: 200px;
  padding: 10px 10px;
  text-align: center;
  border: unset;
  border-radius: 5px;
  font-size: 16px;
  color: rgb(255, 255, 255)
  
}
.check_title{
  margin-bottom: 5px;
  position: relative;
}
.title_biao{
  width: 3px;
  height: 15px;
  background:rgb(40, 184, 161);
  margin: 0 5px;
  display: inline-block;
}
.title_txt{
  font-size: 16px;
}
.tit_right{
  position: absolute;
  right: 10px;
  top: 0;
}
.tit_right_txt{
  color: rgb(154,154,154);
  display: inline-block;
  vertical-align: middle;
}
.tit_right_img{
 display: inline-block;
  vertical-align: middle;
  width: 8px;
  height: 15px;
}
</style>