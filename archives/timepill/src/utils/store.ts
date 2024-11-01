import { IPill } from '../types'
import getKey from './key.js'

export function addPill(pill: IPill): string {
  let key = getKey()
  pill.key = key
  let pills: Array<IPill> = JSON.parse(localStorage.getItem('timepills')) || []
  pills.push(pill)
  localStorage.setItem('timepills', JSON.stringify(pills))
  return key
}

export function getPill(_key: string): IPill {
  let pills: Array<IPill> = JSON.parse(localStorage.getItem('timepills'))
  let p: IPill
  let flag = false
  for (const pill of pills) {
    const { key } = pill
    if (key === _key) {
      // p.name = pill.name;
      // p.email = pill.email;
      // p.time = pill.time;
      // p.info = pill.info;
      // p.tip = pill.tip;
      // p.key = pill.key;
      p = pill
      flag = true
      break
    }
  }
  console.log(p)
  return flag ? p : null
}
