export default function gloablAPI(api){
    return {
        // demo
        test: query => api.get('/api/test',query),

        // login
        login: query => api.post('/api/login',query),
    }
}