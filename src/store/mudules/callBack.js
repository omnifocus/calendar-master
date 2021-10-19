import api from '@/api/index'
import { Toast } from 'vant'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async queryQuestionList({commit},payload){
            const res = await api.queryQuestionList(payload)
            if(res.result.code == 0){
                return res.list
            }else{
                console.log('报错信息',res.result.message)
                console.log(commit)
                Toast(res.result.message)
            }
        },
        // 默认问题列表
        async queryDefaultQuestionList({commit},payload){
            const res = await api.queryDefaultQuestionList(payload)
            if(res.result.code == 0){
                return res.list
            }else{
                console.log('报错信息',res.result.message)
                console.log(commit)
                Toast(res.result.message)
            }
        },
        // 插入反馈
        async insertCallBack({commit},payload){
            const res = await api.insertCallBack(payload)
            if(res.result.code == 0){
                Toast('提交成功')
            }else{
                console.log(commit)
                console.log('报错信息',res.result.message)
                Toast(res.result.message)
            }
        },
        // 修改反馈
        async updateCallBack({commit},payload){
            const res = await api.updateCallBack(payload)
            if(res.result.code == 0){
                Toast('提交成功')
            }else{
                console.log(commit)
                console.log('报错信息',res.result.message)
                Toast(res.result.message)
            }
        },
        // 我的-反馈列表
        async queryCallBack({commit},payload){
            const res = await api.queryCallBack(payload)
            if(res.result.code == 0){
                return res.list
            }else{
                console.log('报错信息',res.result.message)
                console.log(commit)
                Toast(res.result.message)
            }
        },
        // 我的-反馈列表-详情
        async queryCallBackImg({commit},payload){
            const res = await api.queryCallBackImg(payload)
            if(res.result.code == 0){
                return res.list
            }else{
                console.log('报错信息',res.result.message)
                console.log(commit)
                Toast(res.result.message)
            }
        },
    }
}