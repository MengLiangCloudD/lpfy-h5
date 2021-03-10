import wx from "weixin-js-sdk";
import {hidemenu} from './WXconfig'
const requesturl= "system/getJSSDKConfig";
 hidemenu(requesturl);
export default {
  //微信支付
  wexinPay(data) {
   return new Promise((resolve, reject) => {
    //后台传入数据
    let {
      // appId: appId, 
      timeStamp,
      nonceStr,
      packages,
      paySign,
      signType
    } = data
    wx.ready(function() {
      wx.chooseWXPay({
        // appId: appId, // 必填，公众号的唯一标识
        timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
        package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: paySign, // 支付签名
        success: function(res) {
          // 支付成功后的回调函数
          resolve(res)
        },
        fail: function(res) {
          //失败回调函数
          reject({
            payFail: res
          })
        }
      });
    });
    wx.error(function(res) {
        reject({
          configFail: res
        })
        // config信息验证失败会执行error函数
      });
    })

  },
  // 上传图片
  chooseimg(){
    return new Promise((resolve, reject) => {
      wx.ready(function() {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              console.log(res);
              wx.uploadImage({
                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  resolve(res)  //返回图片的服务器端ID
                }
            });
              
            },
            fail: function(res) {
              //失败回调函数
              reject({
                payFail: res
              })
            }
        });
      }),
      wx.error(function(res) {
        reject({
          configFail: res
        })
        // config信息验证失败会执行error函数
      });
    })
  },
  //预览图片
  previewImage(href,imgArr){
    wx.ready(function() {
      wx.previewImage({
        current: href, // 当前显示图片的http链接
        urls: imgArr// 需要预览的图片http链接列表
      });
    })
  },
  // 开始录音
  beginRecord(){
    wx.startRecord();
  },
  //停止录音
  stopRecord(that){
    return new Promise((resolve, reject) => {
      wx.ready(function() {
        wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
              if(!that.uploading){
                wx.uploadVoice({
                  localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                      resolve(res)  // 返回音频的服务器端ID
                  },fail: function(res) {
                    //失败回调函数
                    reject({
                      payFail: res
                    })
                  }
                })
              }
              
          }
        });
      }),
      wx.error(function(res) {
        reject({
          configFail: res
        })
        // config信息验证失败会执行error函数
      });
    })
  },
  //监听录音
  onVoiceRecordEnd(that){
    return new Promise((resolve, reject) => {
      wx.ready(function() {
        wx.onVoiceRecordEnd({
          // 录音时间超过一分钟没有停止的时候会执行 complete 回调
          complete: function (res) {
            var localId = res.localId;
            clearInterval(that.temar);
            that.voiceCartoon=false;
            if(!that.uploading){
              wx.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    resolve(res)  // 返回音频的服务器端ID
                },fail: function(res) {
                  //失败回调函数
                  reject({
                    payFail: res
                  })
                }
              })
            }
          }
        });
      })
    })
  },
  //分享链接
  onMenuShareAppMessage(url){
    return new Promise((resolve, reject) => {
      wx.ready(function() {
        wx.onMenuShareAppMessage({
          title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
          desc: '助诊医师', // 分享描述
          link: url, // 分享链接
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) { 
            resolve(res) 
          },
          cancel: function (res) { 
            reject({
              payFail: res
            })
          }
        });
        wx.showOptionMenu();
      });
    })
  },
  //禁止分享的方法
  hideAllNonBaseMenuItem(){
    // return new Promise((resolve, reject) => {
      wx.ready(function() {
        wx.checkJsApi({
              jsApiList: [ 'hideAllNonBaseMenuItem'],
              success: function (res) {
                if (res.checkResult.getLocation == false){
                  alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                  return;
                }
                
              }
        }); 
        wx.hideAllNonBaseMenuItem();
      });
    // })
  }
}