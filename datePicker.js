/**
 * datePicker组件中用到的公共方法
 */
import moment from 'moment';

// 获取日期的年份，用来当value为空的时候赋给年份选择器默认值
const getCurrentYear = (date = new Date()) => {
  const year = moment(date).year();
  return [year];
};

// 获取日期的年月，用来value为空的时候给月份选择器默认值
const getCurrentYearMonth = (date = new Date()) => {
  const year = moment(date).year();
  const month = moment(date).month() + 1;
  return [year, month];
};

// 判断是哪年哪月的第几周，传入一个起始时间，后续有需求变更，可以修改该方法
const getMonthAndWeek = (date = new Date()) => {
  const yearMonth = moment(date).format('YYYY/MM');
  const currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
  const currentDay = moment(date).date(); // 是当月的第几天
  const day = moment(date).day(); // 是星期几
  const week = Math.floor((currentDay - day + currentWeekday - 1) / 7 + 1); // 当月的第几周
  const startDate = moment(date).subtract(day - 1, 'days').format('YYYY-MM-DD');
  const endDate = moment(date).add(7 - day, 'days').format('YYYY-MM-DD');
  return {
    yearMonth,
    week,
    range: [startDate, endDate]
  }
};

const getMonthList = () => {
  return [
    { label: '12月', value: 12 },
    { label: '11月', value: 11 },
    { label: '10月', value: 10 },
    { label: '09月', value: 9 },
    { label: '08月', value: 8 },
    { label: '07月', value: 7 },
    { label: '06月', value: 6 },
    { label: '05月', value: 5 },
    { label: '04月', value: 4 },
    { label: '03月', value: 3 },
    { label: '02月', value: 2 },
    { label: '01月', value: 1 },
  ];
}

// 获取年选择器的范围，默认是2000-2030年
const getYearRange = (min, max) => {
  var arr = [];
  for (let i = max; i >= min; i--) {
    arr.push(i);
  }
  return arr;
}

// 获取一个月的日历格式的时间
function monthDay(date = new Date()) {
  const daysArr = [[], [], [], [], [], []]; // 7*7的日历数组
  const currentWeekday = moment(date).date(1).weekday() === 0 ? 7 : moment(date).date(1).weekday(); // 获取当月1日为星期几
  const lastMonthDays = moment(date).subtract(1, 'month').daysInMonth(); // 获取上月天数
  const currentMonthDays = moment(date).daysInMonth(); // 获取当月天数

  const getDay = (day) => {
    let _day = 0;
    if(day <= lastMonthDays) {
      _day = day;
    } else {
      if(day <= (lastMonthDays + currentMonthDays)) {
        _day = day - lastMonthDays;
      } else {
        _day = day - lastMonthDays - currentMonthDays;
      }
    }
    return _day;
  };


  for (let i = 0; i < 7; i += 1) {
    let virtualDay = (lastMonthDays - currentWeekday) + i + 2;
    for (let j = 0; j < 6; j += 1) {
      daysArr[j][i] = getDay(virtualDay + (j * 7));
    }
  }

  if(daysArr[daysArr.length - 1][0] < 10) {
    daysArr.pop();
  }

  const res = daysArr.map((days, weekIndex) => {
    if (weekIndex === 0) {
      return days.map((day, dayIndex) => {
        if (day > 1) { // 处理上个月的时间
          return {
            day,
            date: moment(date).date(1).subtract(currentWeekday - dayIndex - 1, 'days')
          }
        } else {
          return {
            day,
            date: moment(date).date(1).add(day - 1, 'days')
          }
        }
      })
    } else if (weekIndex === 5 || weekIndex === 4) {
      return days.map((day, dayIndex) => {
        if (day < 15) { // 处理下个月的时间
          return {
            day,
            date: moment(date).date(1).add(1, 'months').add(day - 1, 'days')
          }
        } else {
          return {
            day,
            date: moment(date).date(1).add(day - 1, 'days')
          }
        }
      })
    } else {
      return days.map((day, dayIndex) => {
        return {
          day,
          date: moment(date).date(1).add(day - 1, 'days')
        }
      });
    }
  });
  return res;
}

export {
  getCurrentYear,
  getCurrentYearMonth,
  getMonthAndWeek,
  getMonthList,
  getYearRange,
  monthDay
}