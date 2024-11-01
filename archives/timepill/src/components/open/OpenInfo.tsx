interface Props {
  name: string
  time: string
  info: string
}

export default class OpenInfo extends React.Component<Props> {
  render() {
    return (
      <div className="open-content">
        <h2 className="pill-label">
          {this.props.name} 在 {this.props.time} 对你说：
        </h2>
        <div className="pill-content">{this.props.info}</div>
      </div>
    )
  }
}
