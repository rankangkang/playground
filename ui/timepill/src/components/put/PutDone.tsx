interface Props {
  _key: string
}
export default class PutDone extends React.Component<Props> {
  render() {
    return (
      <div className="put-done">
        <h2 className="page-title">胶囊添加成功</h2>
        <div className="form-item">
          <label htmlFor="key">胶囊Key</label>
          {/* @ts-ignore */}
          <input type="text" name="key" value={this.props._key} id="key" disabled="disabled" />
          <span className="tips">
            你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。
          </span>
        </div>
      </div>
    )
  }
}
