interface IContext {
  navigate(path: string): void
}

export const Context = React.createContext<IContext>({
  navigate(path) {
    console.log(path)
  },
})
