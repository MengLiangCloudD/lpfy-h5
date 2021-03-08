// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import store from "./store";
import "./common/style/base.css";
import { Button,Icon,Modal,Message,Radio,RadioGroup,Poptip,Input,Select,Option,Checkbox,CheckboxGroup,FormItem,Form,Collapse,Panel,Steps,Step,Switch,Badge,Table } from 'iview';
import { DatePicker} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import "iview/dist/styles/iview.css";
Vue.component(DatePicker.name, DatePicker);
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Modal', Modal);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Poptip', Poptip);
Vue.component('Input', Input);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Checkbox', Checkbox);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('FormItem', FormItem);
Vue.component('Collapse', Collapse);
Vue.component('Form', Form);
Vue.component('Panel', Panel);
Vue.component('Steps', Steps);
Vue.component('Step', Step);
Vue.component('Switchs', Switch);
Vue.component('Badge', Badge);
Vue.component('Table', Table);


Vue.prototype.$Modal=Modal;
Vue.prototype.$Message=Message;
axios.defaults.baseURL = '/api';
Vue.config.productionTip = false
var code = '';
var token  = localStorage.getItem('token');
var avatar =localStorage.getItem('avatar');
window.router = router;
/**========================================================== token授权=================================================== */
router.beforeEach((to,from,next)=>{
  setTimeout(() => {
    switch (to.path) {
      case '/reportss':
          _czc.push(["诊疗", "/reportss"]);
          break;
      case "/home":
          _czc.push(["找医生", "/home"]);
          break;
      case "/HomePage":
          _czc.push(["我的", "/HomePage"]);
          break;
      case "/Hospitalinformation":
        _czc.push(["住院信息", "/Hospitalinformation"]);
      
  }
}, 500);
  if (document.URL.indexOf('index.html?t=') < 0&&to.fullPath!=''&& to.fullPath!=undefined) {
    // var storage = window.localStorage;
    // storage.clear();
    let timestamp = (new Date()).valueOf();
    window.location.href = '/index.html?t=' + timestamp + '#' + to.fullPath;
    
  }
  next()
  if(avatar==''||avatar==undefined){
    getCode();
  }
  //判断有没有code有没有token去请求token
  if(code!=null&&code!==''){
    if(localStorage.getItem('avatar')==''||localStorage.getItem('avatar')==undefined||localStorage.getItem('token')==''||localStorage.getItem('token')==undefined){
      gettoken();
    }
  }
})
var a = 0;
 //非静默授权，第一次有弹框 获取code
 function getCode () {
  // 获取页面url
  var url = window.location.href
  var appid = 'wxf9532549ca01fa1f'
  // 截取code
  code = getUrlCode().code 
  // 如果没有code，则去请求
  if ((code == null || code === ''||token==''||token==undefined) && a==0) { 
      // var url  = local.split('#')[0];
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
      a=1
  } else {
        // 你自己的业务逻辑
  }
}
// 截取url中的code方法
function getUrlCode() { 
  var url = location.search
  var theRequest = new Object()
  if (url.indexOf("?") != -1) {
    var str = url.substr(1)
    var strs = str.split("&")
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
    }
  }
  return theRequest
}
// 获取token
function gettoken(){
  var url = "system/userLogin";
  
  var data ={
      code:code
  };
  axios({
    //这里是你自己的请求方式、url和data参数
    method: 'post',
    url: url,
    data: qs.stringify(data), 
    timeout: 10000,
    //假设后台需要的是表单数据这里你就可以更改
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(function (res) {
    a=0
    //将token存到vuex
    // that.$store.commit("settoken", res.data.token);
    localStorage.setItem('token',res.data.data.token);
    localStorage.setItem('avatar',res.data.data.avatar);
    localStorage.setItem('permission',res.data.data.permission);
  }).catch(function (err) {
      console.log(err);
  });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
