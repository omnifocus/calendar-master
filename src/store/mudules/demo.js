import api from '../../api/index'

export default {
    // namespaced: true, // 配置命名空间，默认是false 配置后可以这么用...mapState('demos',['test'])   {{test}},否则只能...mapState(['demos']),   {{demos.test}}
    state: {
        test:'测试用'
    },
    mutations: {
        setTest(state,data){
            state.test = data
        }
    },
    actions: {
        async test({commit},payload){
            const res = await api.test(payload)
            if(res.result.code == 0){
                return res.data
            }else{
                console.log(res.result.message)
                console.log(commit)
            }
        }
    }
}