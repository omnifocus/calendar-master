/**
* @file utils/calendat 日历相关方法
* @author lhy
 */
// 工具方法 - start
  // 1.为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
    const isLeapYear = (year) => {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    };
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    const getMonthCount = (year, month) => {
        let arr = [
        31, null, 31, 30, 
        31, 30, 31, 31,
        30, 31, 30, 31
        ];
        let count = arr[month] || (isLeapYear(year) ? 29 : 28);
        return Array.from(new Array(count), (item, value) => value + 1);
    };
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    const getWeekday = (year, month) => {
        let date = new Date(year, month, 1);
        return date.getDay();
    };
    // 4.获得上个月的天数
    const getPreMonthCount = (year, month) => {
        if (month === 0) {
        return getMonthCount(year - 1, 11);
        } else {
        return getMonthCount(year, month - 1);
        }
    };
    // 5.获得下个月的天数
    const getNextMonthCount = (year, month) => {
        if (month === 11) {
        return getMonthCount(year + 1, 0);
        } else {
        return getMonthCount(year, month + 1);
        }
    };
    // 6.获得上个月是几月
    const getPreMonth = (year, month) => {
      if (month === 1) {
        return {
          year: year - 1,
          month: 12
        }
      } else {
        return {
          year: year,
          month: month - 1
        }
      }
    };
    // 6.获得下个月是几月
    const getNextMonth = (year, month) => {
      if (month === 12) {
        return {
          year: year + 1,
          month: 1
        }
      } else {
        return {
          year: year,
          month: month + 1
        }
      }
    };
    // 7.知道年月日，获取yyyy-mm-dd形式
    const dateFormater = (year, month, day) => {
      if(month <10) month = '0' + month
      if(day <10) day = '0' + day
      return year + '-' + month  + '-' + day
    }
  //#region 
/*   // 工具方法 - end
  let weekStr = '日一二三四五六';
  weekArr = weekStr.split('').map(item => '星期' + item);
  // 插入星期 dom
  let weekDomStr = '';
  let oFragWeek = document.createDocumentFragment();
  weekArr.forEach(item => {
    let oSpan = document.createElement('span');
    let oText = document.createTextNode(item);
    oSpan.appendChild(oText);
    oSpan.classList.add('week-item');
    oFragWeek.appendChild(oSpan);
  });
  let weekWrap = document.getElementById('weekLine');
  weekWrap.appendChild(oFragWeek);

  // 这里获得我们第一次的 数据 数组
  const updateCalendar = (year, month, day) => {
    if (typeof year === 'undefined' && typeof month === 'undefined' && typeof day === 'undefined') {
      let nowDate = new Date();
      year = nowDate.getFullYear();
      month = nowDate.getMonth();
      day = nowDate.getDate();
    }
    // 更新一下顶部的年月显示
    document.getElementById('nowYear').innerHTML = year;
    document.getElementById('nowMonth').innerHTML = month + 1;
    document.getElementById('nowDate').innerHTML = day;
    // 生成日历数据，上个月剩下的的 x 天 + 当月的 28（平年的2月）或者29（闰年的2月）或者30或者31天 + 下个月的 y 天 = 42
    let res = [];
    let currentMonth = getMonthCount(year, month);
    let preMonth = getPreMonthCount(year, month);
    let nextMonth = getNextMonthCount(year, month);
    let whereMonday = getWeekday(year, month);
    if (whereMonday === 0) {
      whereMonday = 7
    }
    // 感谢网友 luoyiming 的测试（哈哈！谢谢！）：这里当 whereMonday 为 0 的时候会截取上月的所有数据
    let preArr = preMonth.slice(-1 * whereMonday)
    let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
    res = [].concat(preArr, currentMonth, nextArr);
    // 上面经过我本人的测试是没有什么问题，接下来就是更新 dom 的信息的问题
    let hadDom = document.getElementsByClassName('date-item');
    if (hadDom && hadDom.length) {
      let domArr = document.getElementsByClassName('date-item');
      for (let i = 0; i < domArr.length; i++) {
        domArr[i].innerHTML = res.shift();
      }
    } else {
      // 如果之前没有结构的话
      let str = '';
      for (let i = 0; i < 6; i++) {
        str += '<div class="date-line">';
        for (let j = 0; j < 7; j++) {
          str += `<span class='date-item'>${res.shift()}</span>`;
          if (j === 6) {
            str += '</div>';
          }
        }
      }
      document.getElementById('dateWrap').innerHTML = str;
    }
  };

  updateCalendar();
  // 添加上一月，下一月事件
  let oPreButton = document.getElementById('preMonth');
  let oNextButton = document.getElementById('nextMonth');
  oPreButton.addEventListener('click', function () {
    let currentYear = +document.getElementById('nowYear').textContent;
    let currentMonth = +document.getElementById('nowMonth').textContent - 1;
    let currentDate = +document.getElementById('nowDate').textContent;
    if (currentMonth === 0) {
      updateCalendar(currentYear - 1, 11, currentDate);
    } else {
      updateCalendar(currentYear, currentMonth - 1, currentDate);
    }
  });
  oNextButton.addEventListener('click', function () {
    let currentYear = +document.getElementById('nowYear').textContent;
    let currentMonth = +document.getElementById('nowMonth').textContent - 1;
    let currentDate = +document.getElementById('nowDate').textContent;
    if (currentMonth === 11) {
      updateCalendar(currentYear + 1, 0, currentDate);
    } else {
      updateCalendar(currentYear, currentMonth + 1, currentDate);
    }
  }); */
//#endregion
export default {
    getWeekday,
    getPreMonthCount,
    getNextMonthCount,
    getMonthCount,
    getPreMonth,
    getNextMonth,
    dateFormater
}
