import { IPill } from "../../types";
import Header from '../header/Header.js';
import PutMain from './PutMain.js'
import PutDone from './PutDone.js';
import { addPill } from '../../utils/store.js';

interface Props {
  pill?: IPill,
  route: Function
}

interface State {
  route: string,
  _key: string
}

export default class PutPage extends React.Component<Props, State> {
  state: State = {
    // 使用hash路由
    route: '/main',
    _key: ''
  }
  render() {
    let component;
    switch(this.state.route) {
      case '/main': component = <PutMain addPill={this.addPill.bind(this)} />; break;
      case '/done': component = <PutDone _key={this.state._key} />; break;
      default: component = <PutMain addPill={this.addPill.bind(this)}/>; break;
    }
    return (
      <React.Fragment>
        <Header path={'/put'} route={this.props.route}/>
        {
          component
        }
      </React.Fragment>
    )
  }

  addPill(pill: IPill) {
    // 请求数据
    let key = addPill(pill);
    if(key) {
      this.setState({
        _key: key
      })
    }
    // 设置路由
    this.setRoute('/done');
  }

  setRoute(to: string) {
    // 设置路由
    this.setState({
      route: to
    });

    location.hash = '/put#' + to;
  }
  
}

