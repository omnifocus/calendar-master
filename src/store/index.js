
import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex);
import demos from './mudules/demo'
import loginS from './mudules/login'
import callBackS from './mudules/callBack'

export default new Vuex.Store({
  // 声明变量
  state: {
    demoTest: 'test',
    demoTest2: 'test2'
  },
  mutations: {
  },
  actions: {

  },
    modules: {
        demos,
        loginS,
        callBackS
    }
});

