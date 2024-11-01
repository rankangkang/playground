export interface IPill {
  name: string
  email: string
  time: string
  info: string
  tip: string
  key: string
}

export type NavigateFn = (path: string) => void
