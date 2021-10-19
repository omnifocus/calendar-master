import axios from 'axios';
// import store from '../store';

// 创建请求实例
const service = axios.create({
    baseURL: '', // 请求前缀
    timeout: 60 * 1000, // 请求超时时间
})

// request请求拦截器
service.interceptors.request.use(
    config => {
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        return config;
    },
    error => {
        console.error(error)
        Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        // 在这里可以做相应的拦截处理
        // console.log(response.status)
        const res = response.data
        return res
    },
    error => {
        console.log(error)
        return Promise.reject(error.response) // 只写error捕获不了
    }
)

export default service