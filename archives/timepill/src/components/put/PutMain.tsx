/* eslint-disable */
// @ts-nocheck
import {
  ifNameValidate,
  ifEMailValidate,
  ifTimeValidate,
  ifContentValid,
  dateToString,
} from '../../utils/format.js'
import { IPill } from '../../types.js'

interface Props {
  addPill: Function
}

interface State {
  pill: IPill
  errInit: boolean
}

export default class PutMain extends React.Component<Props, State> {
  state: State = {
    pill: {
      name: '',
      email: '',
      time: '',
      info: '',
      tip: '',
      key: '',
    },
    errInit: true,
  }

  render() {
    let { name, email, time, info, tip } = this.state.pill
    let init = this.state.errInit
    let nameErr = init ? '' : !ifNameValidate(name) ? <div className="err">名字 必须填写</div> : ''
    let timeErr = init ? (
      ''
    ) : time.trim().length <= 0 ? (
      <div className="err">时间 必须填写</div>
    ) : !ifTimeValidate(time) ? (
      <div className="err">时间 格式不正确</div>
    ) : (
      ''
    )
    let emailErr = init ? (
      ''
    ) : email.trim().length <= 0 ? (
      <div className="err">时间 必须填写</div>
    ) : !ifEMailValidate(email) ? (
      <div className="err">邮箱地址 格式不正确</div>
    ) : (
      ''
    )
    let contentErr = init ? (
      ''
    ) : !ifContentValid(info) ? (
      <div className="err">内容必须填写</div>
    ) : (
      ''
    )
    return (
      <div className="put-main">
        <h1 className="page-title">添加胶囊</h1>
        <div className="form">
          <div className="form-item">
            <label htmlFor="name">你的名字</label>
            {nameErr}
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              onChange={() => this.handleInputChange('name')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">你的邮箱</label>
            {emailErr}
            <input
              type="text"
              name="email"
              value={email}
              id="email"
              onChange={() => this.handleInputChange('email')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="time">打开时间</label>
            {timeErr}
            <input
              type="text"
              name="time"
              value={time}
              id="time"
              onChange={() => this.handleInputChange('time')}
            />
            <span className="tips">打开时间之前，胶囊内容不可见。</span>
          </div>
          <div className="form-item">
            <label htmlFor="info">胶囊内容</label>
            {contentErr}
            {/* @ts-ignore */}
            <textarea
              name="info"
              value={info}
              id="info"
              // @ts-ignore
              cols="50"
              // @ts-ignore
              rows="8"
              onChange={() => this.handleInputChange('info')}
            ></textarea>
            <span className="tips">胶囊内容不能超过5000字。</span>
          </div>
          <div className="form-item">
            <label htmlFor="tip">未到日期提示信息</label>
            <textarea
              name="tip"
              value={tip}
              id="tip"
              // @ts-ignore
              cols="50"
              // @ts-ignore
              rows="3"
              onChange={() => this.handleInputChange('tip')}
            ></textarea>
            <span className="tips">在 打开时间 之前打开胶囊，会看到提示信息。</span>
          </div>
          <button className="submit-btn" onClick={this.handleSubmit}>
            添加胶囊
          </button>
        </div>
      </div>
    )
  }

  handleInputChange = (type) => {
    // console.log('input change')
    let value = (event.target as any).value
    let pill = this.state.pill
    switch (type) {
      case 'name':
        pill.name = value
        break
      case 'email':
        pill.email = value
        break
      case 'time':
        pill.time = value
        break
      case 'info':
        pill.info = value
        break
      case 'tip':
        pill.tip = value
        break
    }
    this.setState({
      pill,
    })
  }

  handleSubmit = () => {
    // 确定
    if (this.state.errInit) {
      this.setState({
        // 首次，之后可以显示错误信息
        errInit: false,
      })
    }
    // 验证合法性
    let { name, email, time, info, tip } = this.state.pill
    if (
      ifNameValidate(name) &&
      ifEMailValidate(email) &&
      ifTimeValidate(time) &&
      ifContentValid(info)
    ) {
      // 合法的操作
      console.log('验证通过。')
      // 调用
      this.props.addPill(this.state.pill)
      this.setState({
        pill: {
          name: '',
          email: '',
          time: '',
          info: '',
          tip: '',
          key: '',
        },
      })
    }
  }

  componentDidMount() {
    let time = dateToString(new Date())
    let pill = this.state.pill
    pill.time = time
    this.setState({
      pill,
    })
  }
}
