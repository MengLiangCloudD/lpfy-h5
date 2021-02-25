let socket;
var lockReconnect = false;
var tt;
var a=0;
var _this;
export const webSocket=(orderNo,identity,that)=>{
    if(that!=undefined){
        _this=that;
    }
    socket= new WebSocket(`ws://222.223.131.177:9998?orderNo=${orderNo}&identity=${identity}`);
    // socket= new WebSocket(`ws://192.168.0.110:9999?orderNo=${orderNo}&identity=${identity}`);
    socket.onclose = function () {
        console.log('链接关闭');
        //关闭后重新连接
        if(a<10&&_this.orer==false){
            reconnect();
        }
    };
    socket.onerror = function() {
        console.log('发生异常了');
        //出错后重新连接
        if(a<10&&_this.orer==false){
            reconnect();
        }
    };
    socket.onopen = function () {
        //心跳检测重置
        console.log('成功');
        a=0
        heartCheck.start();
    };
    socket.onmessage = function (event) {
        // 将json字符串转换为对象
        if(event.data!=='成功'){
            var resData = JSON.parse(event.data);
            
            console.log(resData); 
            if(resData.type==4){
                socket.close(); 
                _this.orer=true
                _this.isDisabl=false;
                _this.tishi=true;
            }else if(resData.type==5){
                var timer=resData.surplusTime
                debugger
                clearInterval(_this.tamaer);
                var h =   Math.floor(timer/60);
                var s  =   timer % 60;
                if(s>=30){
                    h+=1 
                }else if(h==0){
                    h=1
                }
                _this.timer=h
                if(timer!=''&&timer>0){
                    _this.jiezhenstate=1
                    _this.tamaer=setInterval(() => {
                            timer--
                            if(timer<=0){
                                clearInterval(_this.tamaer);
                                socket.close(); 
                                _this.orer=true
                                _this.isDisabl=false;
                                _this.tishi=true;
                                _this.jiezhenstate=2
                            }else{
                                if(timer==300){
                                    if(location.hash.indexOf('doctorMian')!=-1){
                                        _this.$Message.warning({
                                            content: '咨询剩余时长不足五分钟，及时提醒患者',
                                            duration: 3
                                        });
                                    }else{
                                        _this.$Message.warning({
                                            content: '咨询剩余时长不足五分钟，请及时去续费',
                                            duration: 3
                                        });
                                    }
                                    
                                }else if(timer==180){
                                    _this.xufei=true
                                }
                                var h =   Math.floor(timer/60);
                                var s  =   timer % 60;
                                if(s>=30){
                                    h+=1 
                                }else if(h==0){
                                    h=1
                                }
                                _this.timer=h
                            }
                        }, 1000);
                }else if(timer==-1){
                    _this.jiezhenstate=0
                }
            }else{
                _this.comtent.push(resData);
                a=0
                var ele = document.getElementsByClassName("liao")[0];
                    //判断元素是否出现了滚动条
                    if(ele.scrollHeight > ele.clientHeight) {
                        setTimeout(function(){
                            //设置滚动条到最底部
                            ele.scrollTop = ele.scrollHeight;
                            // ele.style.opacity = 1;
                        },500);
                    }
            }
        }
        heartCheck.start();
    };
    window.onbeforeunload = function() {  
        //closeWebSocket();  
        websocket.close(); 
    } 
    _this.websocketobj=socket;
}
//重新连接
function reconnect() {
    if(lockReconnect) {
      return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        webSocket();
      lockReconnect = false;
    }, 4000);
}
  //心跳检测
var heartCheck = {
    timeout: 210000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function(){
        console.log(getNowTime() +" Socket 心跳检测");  
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            console.log(getNowTime() +' Socket 连接重试');
            var json = {identity:'3',orderNo:'0',content:'3',time:'0',type:'0'}
            socket.send(JSON.stringify(json));
            self.serverTimeoutObj = setTimeout(function() {
                console.log(socket);
                socket.close();
            }, self.timeout);
        }, this.timeout)
    }
} 
function getNowTime() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    return year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
}
function p(obj){
    if(obj<10){
        return '0'+obj;
    }else{
        return obj
    }

}