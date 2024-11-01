import {
  GenDateUnit,
  GenTimeUnit,
  FormatDate,
  FormatTime,
  IsDatePattern,
  IsTimePattern,
  IsDateTimePattern,
} from './formatDateTime'

type A = GenDateUnit<'DD'>

type B = 'YYYY-MM-DD' extends FormatDate<'YYYY-MM-DD'> ? true : false

type C = IsDatePattern<'YYYY-MM-DD'>

type D = IsTimePattern<'HH:MM:SS'>

type E = IsDateTimePattern<'YYYY-MM-DDTHH:mm:SS'>

const d1: FormatDate<'YYYY-MM-DD'> = '2024-02-01'
const d2: FormatDate<'DD-MM-YYYY'> = '02-01-2024'

const t1: FormatTime<'HH:MM:SS'> = '23:59:59'
const t2: FormatTime<'SS:MM:HH'> = '00:00:00'
