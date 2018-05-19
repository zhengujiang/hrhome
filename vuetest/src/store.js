import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
//创建Store实例
let store = new Vuex.Store({
    // 存储状态值
    state: {
        headerTil: [],
        token: ''
    },
    mutations: {
        setHeaderTil(state, obj) {
            state.headerTil = obj.params;
        },
        setRunheard(state, data) {
            state.runHeard = data;
        },
        setToken(state, data){
            state.token = data;
        },
    },
    getters: {},
    actions: {}
});

export default store;

