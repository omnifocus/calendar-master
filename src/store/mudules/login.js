import api from '@/api/index'
import { Toast } from 'vant'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async login({commit},payload){
            const res = await api.login(payload)
            if(res.result.code == 0){
                return res.list
            }else{
                console.log('报错信息',res.result.message)
                console.log(commit)
                Toast(res.result.message)
            }
        }
    }
}