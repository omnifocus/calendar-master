/**
* @file utils/commonFun 公共方法
* @author lhy
 */
export default {
    // 时间戳转换为 yyyy-mm-dd hh:mm:ss
    timeFormat(time){
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        if(month >= 1 && month <= 9){month = `0${month}`}
        if(day >= 1 && day <= 9){day = `0${day}`}
        let hour = time.getHours()
        if(hour >= 0 && hour <= 9){hour = `0${hour}`}
        let minutes = time.getMinutes()
        if(minutes >= 0 && minutes <= 9){minutes = `0${minutes}`}
        let seconds = time.getSeconds()
        if(seconds >= 0 && seconds <= 9){seconds = `0${seconds}`}
        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
    },
    // 生成随机字符串
    randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}