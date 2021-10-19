/**
* @file utils/apiCreater 支持get、post、delete三种api
* @author lhy
 */
import request from './apiRequest'

export default function createApi(){
    return {
        /**
        * @param {String} url apiurl
        * @param {Object} query 请求参数
        */
        get(url,query){
            return request({
                url: url,
                method: 'get',
                validateStatus: function(staus){
                    return staus>=100 && staus<599
                },
                params: {...query,_:new Date().getTime()}
            })
        },

        /**
        * @param {String} url apiurl
        * @param {Object} query 请求参数
        */
        post(url,query){
            return request({
                url: url,
                method: 'post',
                validateStatus: function(staus){
                    return staus>=100 && staus<599
                },
                data: query
            })
        },

        /**
        * @param {String} url apiurl
        * @param {Object} query 请求参数
        */
        delete(url,query){
            return request({
                url: url,
                method: 'delete',
                validateStatus: function(staus){
                    return staus>=100 && staus<599
                },
                params: {...query,_:new Date().getTime()}
            })
        },
    }
}