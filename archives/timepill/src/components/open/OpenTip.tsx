import { stringToDate, getRemainning, secondsToDateString } from '../../utils/format.js'

interface Props {
  time: string
  name: string
  tip: string
}

interface State {
  interval: string
  timer: number
  date: Date
}

export default class OpenTip extends React.Component<Props, State> {
  state: State = {
    interval: '',
    timer: -1,
    date: stringToDate(this.props.time),
  }

  render() {
    return (
      <div className="open-tip">
        <h2 className="pill-label">这颗胶囊未到提取时间，不能打开。</h2>
        <br />
        <p className="tips">
          打开时间在 <span>{this.props.time}</span> ，距离现在 <span>{this.state.interval}</span>
        </p>
        <div className="pill-content">
          <span>{this.props.name}</span> 给你留的提示信息：<span>{this.props.tip}</span>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let timer = setInterval(this.getRemain.bind(this), 1000) as unknown as number
    this.setState({
      timer,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  getRemain() {
    let remain = getRemainning(this.state.date, new Date())
    if (remain >= 0) {
      clearInterval(this.state.timer)
    }
    this.setState({
      interval: secondsToDateString(Math.abs(remain)),
    })
  }
}
