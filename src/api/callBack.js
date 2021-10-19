export default function gloablAPI(api){
    return {
        // 反馈 默认列表
        queryDefaultQuestionList: query => api.post('/api/queryDefaultQuestionList',query),

        // 反馈 列表
        queryQuestionList: query => api.post('/api/queryQuestionList',query),

        // 插入反馈
        insertCallBack: query => api.post('/api/insertCallBack',query),

        // 修改反馈
        updateCallBack: query => api.post('/api/updateCallBack',query),

        // 我的-反馈列表
        queryCallBack: query => api.post('/api/queryCallBack',query),

        // 我的-反馈列表-详情
        queryCallBackImg: query => api.post('/api/queryCallBackImg',query),
    }
}