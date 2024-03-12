// import '../../../styles/home.css'

import { Context } from '../context.js'
import { NavigateFn } from '../types.js'

interface Props {
  navigate: NavigateFn
}

class Home extends React.Component<Props> {
  render() {
    return (
      <div className="home-main">
        <div className="big-logo">
          <img src="./img/logo_big.png" />
        </div>
        <h1 className="home-title">时间胶囊</h1>
        <ul className="home-nav">
          <li className="home-nav-item">
            <a href="" onClick={this.handleClick.bind(this, '/put')}>
              <h1>Put</h1>
              <span>添加</span>
            </a>
          </li>
          <li className="home-nav-item">
            <a href="" onClick={this.handleClick.bind(this, '/open')}>
              <h1>Open</h1>
              <span>打开</span>
            </a>
          </li>
        </ul>
        <div className="home-footer">
          <a href="#i've-no-idea" title="别点，我也不晓得~">
            什么是时间胶囊？
          </a>
        </div>
      </div>
    )
  }

  handleClick(to) {
    event.preventDefault()
    this.props.navigate(to)
  }
}

export default React.memo(() => (
  <Context.Consumer>{({ navigate }) => <Home navigate={navigate} />}</Context.Consumer>
))
