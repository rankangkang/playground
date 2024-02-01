type DateSeprator = '-' | '.' | '/'
type TimeSeprator = ':'
type MiddleSeprator = ' ' | 'T'

type N1 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type N2 = N1 | 0

type DateYYYY = `19${N2}${N2}` | `20${N2}${N2}`
type DateMM = `0${N1}` | `1${0 | 1 | 2}`
type DateDD = `${0}${N1}` | `${1 | 2}${N2}` | `3${0 | 1}`

type TimeHH = `${0 | 1}${N2}` | `${2}${0 | 1 | 2 | 3}`
type TimeMM = `${0 | 1 | 2 | 3 | 4 | 5}${N2}`
type TimeSS = TimeMM

export type GenDateUnit<T extends string> = T extends 'YYYY' | 'yyyy'
  ? DateYYYY
  : T extends 'MM' | 'mm'
  ? DateMM
  : T extends 'DD' | 'dd'
  ? DateDD
  : never

export type GenTimeUnit<T extends string> = T extends 'HH' | 'hh'
  ? TimeHH
  : T extends 'MM' | 'mm'
  ? TimeMM
  : T extends 'SS' | 'ss'
  ? TimeSS
  : never

export type IsDatePattern<Pattern extends string> =
  Pattern extends `${infer Year}${DateSeprator}${infer Month}${DateSeprator}${infer Day}`
    ? Year extends 'YYYY' | 'yyyy'
      ? Month extends 'MM' | 'mm'
        ? Day extends 'DD' | 'dd'
          ? true
          : false
        : false
      : false
    : false

export type FormatDate<Pattern extends string> =
  Pattern extends `${infer Year}${DateSeprator}${infer Month}${DateSeprator}${infer Day}`
    ? Pattern extends `${Year}${infer DateSep}${Month}${infer DateSep}${Day}`
      ? `${GenDateUnit<Year>}${DateSep}${GenDateUnit<Month>}${DateSep}${GenDateUnit<Day>}`
      : never
    : never

// 判断 pattern 是否满足
export type IsTimePattern<Pattern extends string> =
  Pattern extends `${infer Hour}${TimeSeprator}${infer Minute}${TimeSeprator}${infer Second}`
    ? Hour extends 'HH' | 'hh'
      ? Minute extends 'MM' | 'mm'
        ? Second extends 'SS' | 'ss'
          ? true
          : false
        : false
      : false
    : false

export type FormatTime<Pattern extends string> =
  Pattern extends `${infer Hour}${TimeSeprator}${infer Miniute}${TimeSeprator}${infer Second}`
    ? Pattern extends `${Hour}${infer TimeSep}${Miniute}${infer TimeSep}${Second}`
      ? `${GenTimeUnit<Hour>}${TimeSep}${GenTimeUnit<Miniute>}${TimeSep}${GenTimeUnit<Second>}`
      : never
    : never

// 判断是否为 YYYY:MM:DDTHH:MM:SS
export type IsDateTimePattern<Pattern extends string> =
  Pattern extends `${infer DatePattern}${MiddleSeprator}${infer TimePattern}`
    ? IsDatePattern<DatePattern> extends true
      ? IsTimePattern<TimePattern> extends true
        ? true
        : false
      : false
    : false

// 一般会报太过复杂
type FormatDateTime<Pattern extends string> = IsDateTimePattern<Pattern> extends true
  ? Pattern extends `${infer DatePattern}${MiddleSeprator}${infer TimePattern}`
    ? `${FormatDate<DatePattern>}${MiddleSeprator}${FormatTime<TimePattern>}`
    : never
  : never

