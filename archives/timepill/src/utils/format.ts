export function dateToString(time: Date, fmt?: string): string {
  fmt = fmt || 'YYYY-MM-DD hh:mm:ss'
  let ret: any
  let date = time ? new Date(time) : new Date()
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'D+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

export function stringToDate(dateString: string): Date {
  if (dateString) {
    let temp = dateString.split(' ')
    let [year, month, day] = temp[0].split('-')
    let [hour, minute, second] = temp[1].split(':')
    let date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
    )
    return date
  }
}

export function ifNameValidate(name: string): boolean {
  if (name.trim().length > 0) return true
  return false
}

export function ifEMailValidate(email: string): boolean {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

export function ifTimeValidate(time: string): boolean {
  const reg =
    /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
  return reg.test(time)
}

export function ifContentValid(content: string): boolean {
  if (content.trim().length > 0) return true
  return false
}

export function secondsToDateString(sec: number): string {
  let year: number, month: number, day: number, hour: number, minute: number, second
  year = Math.floor(sec / 31536000)
  sec = sec % 31536000
  month = Math.floor(sec / 2592000)
  sec = sec % 2592000
  day = Math.floor(sec / 86400)
  sec = sec % 86400
  hour = Math.floor(sec / 3600)
  sec = sec % 3600
  minute = Math.floor(sec / 60)
  second = sec % 60
  return `${year}年${month}月${day}天 ${hour}小时${minute}分钟${second}秒`
}

export function getRemainning(d1: Date, d2: Date): number {
  let inetrval: number = Math.floor((d2.getTime() - d1.getTime()) / 1000)
  return inetrval
}
