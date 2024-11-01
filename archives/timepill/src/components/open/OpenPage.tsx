import { IPill, NavigateFn } from '../../types'
import Header from '../header/Header.js'
import { getRemainning, stringToDate } from '../../utils/format.js'
import { getPill } from '../../utils/store.js'
import NoSUchKey from './NoSuchKey.js'
import OpenInfo from './OpenInfo.js'
import OpenTip from './OpenTip.js'
import { Context } from '../../context.js'

interface State {
  flag: number
  pill: IPill
  input: string
}

interface Props {
  navigate: NavigateFn
}

class OpenPage extends React.Component<Props, State> {
  state: State = {
    // 此处利用flag来分辨当前页，也可使用同put的方式，更改route时改变url与组件，实现页面路由效果
    flag: 0, // 0: 初始；1：no key；2：未到时间；3：打开
    pill: undefined,
    input: '',
  }

  render() {
    let component: any = ''
    if (this.state.pill) {
      let { time, name, tip, info, key } = this.state.pill
      switch (this.state.flag) {
        case 1:
          component = <NoSUchKey />
          break
        case 2:
          component = <OpenTip time={time} name={name} tip={tip} key={key} />
          break
        case 3:
          component = <OpenInfo time={time} name={name} info={info} key={key} />
          break
        default:
          component = ''
      }
    } else {
      switch (this.state.flag) {
        case 1:
          component = <NoSUchKey />
          break
        default:
          component = ''
      }
    }
    return (
      <React.Fragment>
        <Header path="/open" />
        <div className="open-main">
          <div className="open">
            <h1 className="page-title">打开胶囊</h1>
            <div className="open-input">
              <label htmlFor="">胶囊Key: </label>
              <input
                type="text"
                name="key"
                value={this.state.input}
                id="key"
                onChange={this.handleInputChange}
              />
              <div className="submit-btn" onClick={this.handleClick}>
                打开胶囊
              </div>
            </div>
          </div>
          {component}
        </div>
      </React.Fragment>
    )
  }

  handleInputChange = () => {
    let value = (event.target as any).value || ''
    this.setState({
      input: value,
    })
  }

  handleClick = () => {
    let flag = 0
    if (this.state.input.trim().length < 1) {
      this.setState({ flag })
      return
    }
    let pill = getPill(this.state.input)
    console.log(pill)
    // 错误验证
    if (!pill) {
      // 没有该胶囊
      flag = 1
      this.setState({ flag })
      return
    }
    if (getRemainning(stringToDate(pill.time), new Date()) < 0) {
      // 未到时间
      flag = 2
    } else {
      flag = 3
    }
    this.setState({
      flag,
      pill,
    })
  }
}

export default React.memo(() => (
  <Context.Consumer>{({ navigate }) => <OpenPage navigate={navigate} />}</Context.Consumer>
))
