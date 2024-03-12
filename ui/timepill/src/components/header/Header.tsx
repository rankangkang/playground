interface Props {
  route: Function,
  path: string
}

export default class Header extends React.Component<Props> {
  render() {
    let activeClasses = Array(3).fill('header-nav-item');
    switch(this.props.path) {
      case '/home': activeClasses[0] += ' nav-item-active'; break;
      case '/put': activeClasses[1] += ' nav-item-active'; break;
      case '/open': activeClasses[2] += ' nav-item-active'; break;
    }
    return <div className="header">
      <div className="container">
        <a className="header-logo">时间胶囊</a>
        <ul className="header-nav">
          <li className={activeClasses[0]}>
            <a href="" onClick={this.handleClick.bind(this, '/home')}>首页</a>
          </li>
          <li className={activeClasses[1]}>
            <a href="" onClick={this.handleClick.bind(this, '/put')}>添加</a>
          </li>
          <li className={activeClasses[2]}>
            <a href="" onClick={this.handleClick.bind(this, '/open')}>
              打开
            </a>
          </li>
        </ul>
      </div>
    </div>
  }

  handleClick(to) {
    event.preventDefault();
    console.log('change route to', to);
    this.props.route(to);
  }

}