const getSolarFestival = (month, day) => {
    let key = Number(month) + '-' + Number(day)
    // 公历节日
    let gregorianFestival = {
        "1-1": "元旦",
        "2-14": "情人节",
        "3-8": "妇女节",
        "3-12": "植树节",
        "4-4": "清明节",
        "5-1": "劳动节",
        "5-4": "青年节",
        "6-1": "儿童节",
        "7-1": "建党节",
        "8-1": "建军节",
        "9-10": "教师节",
        "10-1": "国庆节",
        "10-31": "万圣节",
        "11-26": "感恩节",
        "12-25": "圣诞节",
    }
    // 阳历
    return gregorianFestival[key]
}
const getLunarFestival = (month, day) => {
    let key = Number(month) + '-' + Number(day)
    // 农历节日
    let lunarFestival = {
        "1-1": "春节",
        "1-15": "元宵节",
        // "4-5": "清明节",
        "5-5": "端午节" ,
        "7-7": "七夕节" ,
        "7-15": "中元节" ,
        "8-15": "中秋节" ,
        "9-9": "重阳节" ,
        "12-30": "除夕"
    }
    return lunarFestival[key]
}
export default{
    getSolarFestival,
    getLunarFestival
}