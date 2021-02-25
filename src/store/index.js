import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
var usernums = '';
if (localStorage.getItem("usernums") != "") {
    usernums = localStorage.getItem("usernums");
  } else {
    usernums = "";
}
export default new Vuex.Store({
    state:{
        usernums:usernums,
    },
    getters:{
        //选中的是那个
        getusernums(state) {
            return state.usernums;
        },
    },
    mutations:{
        setusernums(state, usernums) {
        localStorage.setItem("usernums", usernums);
        state.usernums = usernums;
     },
    }
})
