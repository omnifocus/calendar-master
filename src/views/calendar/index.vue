<template>
  <div class="body">
    <!-- 头部选择 -->
    <div>
      <h3>{{currentYear}}年{{currentMon}}月</h3>
      <div class="calendar-head-type">
        <div :class="[item.id == active? 'active' : '']" v-for="(item,index) in titles" :key="index" @click="canlendarType(item.id)">{{item.name}}</div>
      </div>
    </div>
    <!-- 日历部分 -->
    <v-touch @swipeleft="swipeleft" @swiperight="swiperight" @swipedown='swipedown' @swipeup='swipeup'>
      <div class="calendar-body">
        <van-grid :column-num="7">
          <van-grid-item v-for="(item,index) in weekName" :key="index" :text="item.name" />
        </van-grid>
        <van-grid :column-num="7">
          <van-grid-item v-for="(item,index) in monthDay" :key="index" @click="calendarItemEvent(item)">
            <div class="calendar-item" :class="item.solar == clickedSolar &&  !isOpen &&  item.mon == currentMon? 'calendar-item-active' : ''">
              <div :class="[item.isCurrentMon? 'isCurrentMon' : 'unCurrentMon']">{{item.solar}}</div>
              <div :class="item.isFestival?'festival':'subtitle'">{{item.lunarDay.dateStr | lunarFormater(item.lunarDay.lunarDate,[item.lunarDay.solarTerm, item.solarFestival, item.lunarFestival])}}</div>
              <div class="agendas" v-show="isOpen">
                  <div class="ellipsis1" :class="j==3 && item.agendas.length>4?'festival':''" v-for="(i,j) in item.agendas" :key="j" style="width:40px" :style="{background: color[j]}">
                    {{i.event | agendaItem(item.agendas.length, j)}}
                  </div>
              </div>
              <div class="dot" v-show="!isOpen && item.agendas"></div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </v-touch>
    <div class="splice" v-show="!isOpen"></div>
    <!-- 日程部分 -->
    <Agendas v-show="!isOpen && agendasData" :month='currentMon' :agendasData='agendasData'/>
  </div>
</template>

<script>
  import Agendas from '@/views/calendar/Agendas'
  import calendar from '@/utils/calendar'
  import festival from '@/utils/festival'
  import { getLunar } from 'chinese-lunar-calendar' // 获取农历
  import color from '@/assets/style/color.js'
  import data from '@/views/testData/calendar.js'
  export default {
    props: [],
    components: {
      Agendas,
    },
    data() {
      return {
        titles: [
          // {id: 'month', name: '月'}
          // {id: 'week', name: '周'},
          // {id: 'day', name: '日'},
          // {id: 'agenda', name: '日程'},
        ],
        weekName: [
          {id: 'Sun', name: '日'},
          {id: ' Mon', name: '一'},
          {id: 'Tue', name: '二'},
          {id: 'Wed', name: '三'},
          {id: 'Thu', name: '四'},
          {id: 'Fri', name: '五'},
          {id: 'Sat', name: '六'},
        ],
        monthDay: [],
        active: 'month',
        currentMon: new Date().getMonth()+1, // 默认当前月
        currentYear: new Date().getFullYear(), // 默认当年
        isOpen: false,
        color: color.agendaColor,
        clickedSolar: new Date().getDate(),
        agendasData: null, // 传给子组件的数据
        weekState: 0, // 周视图时状态，0为默认，正数右滑，负数左滑
      }
    },
    filters: {
      lunarFormater(value,lunarDate,festival) {
        let [solarTerm,solarFestival,lunarFestival] = festival
        if(solarTerm || solarFestival || lunarFestival){
          return lunarFestival || solarFestival || solarTerm
        }
        if(lunarDate === 1) {
          return value.split('月')[0]+'月'
        }else{
          return value.split('月')[1]
        }
      },
      agendaItem(value, len, index) {
        // 超过4条显示+xx的数字，多余内容隐藏
        if( index == 3 && len > 4) return `+${len-3}`
        if( index > 3) return
        return value
      }
    },
    mounted() {
      this.monthDay = this.getCurrentMonVal(this.currentYear,this.currentMon)
      console.log("this.monthday:" + this.monthDay.length)
    },
    watch: {
      active: {
        handler(type){
          if(type == 'week') {
            this.monthDay = this.getCurrentWeekVal()
          }else if(type == 'month') {
            this.monthDay = this.getCurrentMonVal()
          }
        },
        // deep: true
      }
    },
    methods: {
      // 类型
      canlendarType(type) {
        this.active = type
      },
      // 获取当月显示日期
      getCurrentMonVal(year=this.currentYear,month=this.currentMon){
        month = month - 1
         let getWeekday = calendar.getWeekday(year,month)
        let getPreMonthCount = calendar.getPreMonthCount(year,month)
        let getMonthCount = calendar.getMonthCount(year,month)
        let preMon = []
        let mon = []
        let nextMon = []
        // 获取上个月内容(置灰部分)
        for (let i = getPreMonthCount.length - getWeekday+1; i <= getPreMonthCount.length; i++) {
          let lunarDay = getLunar(calendar.getPreMonth(year,month+1).year, calendar.getPreMonth(year,month+1).month, i)
          let solarFestival = festival.getSolarFestival(calendar.getPreMonth(year,month+1).month, i)
          let lunarFestival = festival.getLunarFestival(lunarDay.lunarMonth,lunarDay.lunarDate)
          preMon.push({
            solar: i,
            year: calendar.getPreMonth(year,month+1).year,
            mon: calendar.getPreMonth(year,month+1).month,
            isCurrentMon: false,
            lunarDay: lunarDay,
            solarFestival: solarFestival, // 阳历节日
            lunarFestival: lunarFestival, // 农历节日
            isFestival: solarFestival || lunarFestival || lunarDay.solarTerm,
            agendas: data.agendas[calendar.dateFormater(calendar.getPreMonth(year,month+1).year, calendar.getPreMonth(year,month+1).month, i)]
          })
        }
        // 获取本月数据
        for (let i = 1; i <= getMonthCount.length; i++) {
          let lunarDay = getLunar(year, month+1, i)
          let solarFestival = festival.getSolarFestival(month+1, i)
          let lunarFestival = festival.getLunarFestival(lunarDay.lunarMonth,lunarDay.lunarDate)
          mon.push({
            solar: i,
            year: year,
            mon: this.currentMon,
            isCurrentMon: true,
            lunarDay: lunarDay,
            solarFestival: festival.getSolarFestival(month+1, i),
            lunarFestival: festival.getLunarFestival(lunarDay.lunarMonth,lunarDay.lunarDate), // 农历节日
            isFestival: solarFestival || lunarFestival || lunarDay.solarTerm,
            agendas: data.agendas[calendar.dateFormater(year, month+1, i)]
          })
        }
        // 获取下个月数据(置灰部分)
        for (let i = 1; i <= ((getWeekday+getMonthCount.length)<=35?35-getWeekday-getMonthCount.length:42-getWeekday-getMonthCount.length); i++) {
          let lunarDay = getLunar(calendar.getNextMonth(year,month+1).year, calendar.getNextMonth(year,month+1).month, i)
          let solarFestival = festival.getSolarFestival(calendar.getNextMonth(year,month+1).month, i)
          let lunarFestival = festival.getLunarFestival(lunarDay.lunarMonth,lunarDay.lunarDate)
          nextMon.push({
            solar: i,
            year: calendar.getNextMonth(year,month+1).year,
            mon: calendar.getNextMonth(year,month+1).month,
            isCurrentMon: false,
            lunarDay: lunarDay,
            solarFestival: solarFestival,
            lunarFestival: lunarFestival, // 农历节日
            isFestival: solarFestival || lunarFestival || lunarDay.solarTerm,
            agendas: data.agendas[calendar.dateFormater(calendar.getNextMonth(year,month+1).year, calendar.getNextMonth(year,month+1).month, i)]
          })
        }
        return preMon.concat(mon).concat(nextMon)
      },
      // 获取当周显示数据，根据本月显示数据以及今日日期，获取今日在数据中的位置，然后截取最近一周数据
      // 默认data为monthDay，day为当前日期
      getCurrentWeekVal(data = this.monthDay = this.getCurrentMonVal(),day = this.clickedSolar,index = data.indexOf(data.filter(item=>item.solar == day)[0]) + 7*this.weekState) {
        // data = this.monthDay = this.getCurrentMonVal()
        // 获取当前日期在月数组中的位置
        // let index = data.indexOf(data.filter(item=>item.solar == day)[0]) + 7*this.weekState
        console.log('数据',data,index,this.weekState,this.currentMon)
        // console.log(data,this.weekState)
        let arr = [] // 存储本周数据
        let startIndex = index - index%7  // 获取本周开始索引，即当前日期索引-当前日期索引在本周位置+1
        arr = data.splice(startIndex,7)
        if(arr.length){
          console.log(222,arr)
          console.log(555)
          return arr
        }else{
          // console.log(calendar.getNextMonth(this.currentYear,this.currentMon))
          this.currentYear = calendar.getNextMonth(this.currentYear,this.currentMon).year
          this.currentMon = calendar.getNextMonth(this.currentYear,this.currentMon).month
          this.getCurrentWeekVal(this.getCurrentMonVal(),this.clickedSolar,0)
          // console.log(this.currentMon)
        }
      },
      // 单元格点击事件
      calendarItemEvent(item) {
        // 判断点击的是否是当前月，若是，则高亮,否则，跳转到该月
        this.clickedSolar = item.solar
        this.agendasData = item
        if(this.active == 'month'){
          if(!item.isCurrentMon){
            this.currentMon = item.mon
            this.currentYear = item.year
            this.monthDay = this.getCurrentMonVal(this.currentYear,this.currentMon)
          }
        }
      },
      // 左滑
      swipeleft(){
        if(this.active == 'month'){
          if(this.currentMon === 12){
            this.currentYear = this.currentYear+1
            this.currentMon = 1
          }else{
            this.currentMon = this.currentMon+1
          }
          this.monthDay = this.getCurrentMonVal(this.currentYear,this.currentMon)
        }else if(this.active == 'week') {
          this.weekState ++
          this.monthDay = this.getCurrentWeekVal()
          console.log('左滑',this.monthDay)
        }
      },
      // 右滑
      swiperight(){
        if(this.active == 'month'){
          if(this.currentMon === 1){
            this.currentYear = this.currentYear-1
            this.currentMon = 12
          }else{
            this.currentMon = this.currentMon-1
          }
          this.monthDay = this.getCurrentMonVal(this.currentYear,this.currentMon)
        }else if(this.active == 'week') {
          this.weekState --
          console.log('右滑向前',this.weekState)
          this.monthDay = this.getCurrentWeekVal()

        }
      },
      // 下滑
      swipedown(){
        if(this.active == 'week'){
          this.active = 'month'
        }else{
          this.isOpen = true
        }
      },
      // 上滑
      swipeup(){
        // 如果是展开模式，上滑则关闭，否则进入周模式
        if(this.isOpen){
          this.isOpen = false
        }else{
          // 切换至周模式
          this.active = 'week'
          this.weekState = 0
        }
      },
    }
  }
</script>
<style lang="less" scoped>
@import '@/assets/style/color.less';
@import '@/assets/style/font.less';
.body{
  font-size: 14px;
  .calendar-head-type{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 16px;
    >div{
      padding: 8px;
    }
  }
  .calendar-body{
    font-size: 16px;
    .calendar-item{
      width: 90%;
      text-align: center;
    }
    .calendar-item-active{
      background: @color_bg_213;
      border-radius: 50%;
    }
    .agendas{
      margin-top: 2px;
      font-size: 10px;
      text-align: center;
      >div{
        margin: 1px 0;
      }
    }
  }
}
.active{
  color: @color_font_377ef6;
  border-bottom: 1px solid @color_font_377ef6;
}
.isCurrentMon{
  color: @color_font_333;
}
.unCurrentMon{
  color: @color_font_999;
}
h3{
  text-align: center;
  margin-bottom: 0;
}
.dot{
  background: @color_font_377ef6;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 3px;
}
/deep/.van-grid-item__content{
  padding: 4px;
}
.splice{
  width: 100%;
  height: 4px;
  background: @color_border_f5;
  margin: 8px 0 0 0;
}
</style>
