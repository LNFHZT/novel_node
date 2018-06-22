import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
    role: {
        1: '管理员',
        2: '财务',
        3: '营销人员',
        4: '运维',
    }
}

// 定义所需的 mutations  $store.commit 触发
const mutations = {
    
}
const getters = {
    GETROLE(state) {
        console.log(state.role["1"]);
        return state.role["1"];
    }
}
// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations,
    actions:{
        // 用来执行多个mutations方法 $store.dispatch
    },
    getters
})