import moment from 'moment'

/*根据出生日期算出年龄*/
export function jsGetAge(strBirthday?: string) {
  if (!strBirthday) {
    return ''
  }
  let returnAge = 0
  const strBirthdayArr = strBirthday.split('-')
  const birthYear = parseInt(strBirthdayArr[0])
  const birthMonth = parseInt(strBirthdayArr[1])
  const birthDay = parseInt(strBirthdayArr[2])

  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge //返回周岁年龄
}

export function formatTimeNoTime(time: string) {
  const date = moment(time).format('YYYY-MM-DD')
  if (date === 'Invalid date') {
    return ''
  }
  return date
}

export function formatTimeWithTime(time: string) {
  const date = moment(time).format('YYYY-MM-DD hh:mm')
  if (date === 'Invalid Date') {
    return ''
  }
  return date
}

export function dateFormat(
  time: string | number,
  format = 'YYYY-MM-DD'
) {
  const date = moment(time).format(format)
  if (date === 'Invalid Date') {
    return ''
  }
  return date
}
export function getCurrentDate() {
  return new Date().getFullYear()
}
